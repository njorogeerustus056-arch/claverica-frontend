import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  TextField,
  Grid,
} from '@mui/material';
import {
  Lock,
  ArrowBack,
  CheckCircle,
  Email,
} from '@mui/icons-material';
import { useTransfer } from '../../context/TransferContext';
import transferAPI from '../../services/transfer-api';
import styles from './Transfer.module.css';

const TransferVerifyTAC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { verifyTAC } = useTransfer();
  
  const transferId = parseInt(id || '0');
  const [transfer, setTransfer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // TAC code state (6 digits)
  const [tacCode, setTacCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Fetch transfer details
  useEffect(() => {
    const fetchTransfer = async () => {
      try {
        const data = await transferAPI.getTransfer(transferId);
        setTransfer(data);
        
        // ✅ FIXED: Check if already in tac_sent, tac_verified, or completed status
        if (['tac_sent', 'tac_verified', 'completed'].includes(data.status)) {
          navigate(`/dashboard/transfer/status/${transferId}`);
          return;
        }
        
      } catch (error) {
        console.error('Error fetching transfer:', error);
        setError('Failed to load transfer details');
      } finally {
        setLoading(false);
      }
    };

    if (transferId) {
      fetchTransfer();
    }
  }, [transferId, navigate]);

  // Handle TAC code input
  const handleTACChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;
    
    const newTacCode = [...tacCode];
    newTacCode[index] = value.slice(0, 1); // Only take first character
    setTacCode(newTacCode);
    
    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !tacCode[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      const newTacCode = [...tacCode];
      digits.forEach((digit, index) => {
        if (index < 6) {
          newTacCode[index] = digit;
        }
      });
      setTacCode(newTacCode);
      
      // Focus the last input
      setTimeout(() => {
        inputRefs.current[5]?.focus();
      }, 0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const code = tacCode.join('');
    if (code.length !== 6) {
      setError('Please enter the complete 6-digit TAC code');
      return;
    }
    
    setVerifying(true);
    setError('');
    setSuccess('');
    
    try {
      const result = await verifyTAC(transferId, code);
      
      if (result.success) {
        setSuccess('TAC verified successfully! Funds will be deducted shortly.');
        
        // Redirect to status page after 2 seconds
        setTimeout(() => {
          navigate(`/dashboard/transfer/status/${transferId}`);
        }, 2000);
      } else {
        setError(result.message || 'Invalid TAC code. Please try again.');
        // Clear the TAC inputs on error
        setTacCode(['', '', '', '', '', '']);
        // Focus first input
        inputRefs.current[0]?.focus();
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during verification');
    } finally {
      setVerifying(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" className={styles.container}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!transfer) {
    return (
      <Container maxWidth="md" className={styles.container}>
        <Alert severity="error" sx={{ mt: 4 }}>
          Transfer not found
        </Alert>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/dashboard/transfer')}
          sx={{ mt: 2 }}
        >
          Back to Transfer
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" className={styles.container}>
      <Box mb={4}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/dashboard/transfer')}
          className={styles.backButton}
        >
          Back to Transfer
        </Button>
        <Typography variant="h4" component="h1" gutterBottom>
          Enter TAC Code
        </Typography>
        <Typography color="textSecondary">
          Enter the 6-digit code from live agent
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={styles.paper}>
            {/* Transfer Summary */}
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" color="textSecondary">
                      Amount
                    </Typography>
                    <Typography variant="h5">
                      ${parseFloat(transfer.amount).toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" color="textSecondary">
                      Recipient
                    </Typography>
                    <Typography variant="body1">
                      {transfer.recipient_name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" color="textSecondary">
                      Reference
                    </Typography>
                    <Typography variant="body1" fontFamily="monospace">
                      {transfer.reference}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Error/Success Messages */}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            
            {success && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {success}
              </Alert>
            )}

            {/* TAC Input Form */}
            <form onSubmit={handleSubmit}>
              <Box mb={4}>
                <Typography variant="h6" gutterBottom align="center">
                  Enter 6-Digit TAC Code
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center" gutterBottom>
                  Enter code provided by live agent
                </Typography>

                {/* TAC Input Boxes */}
                <Box display="flex" justifyContent="center" gap={2} my={4}>
                  {tacCode.map((digit, index) => (
                    <TextField
                      key={index}
                      inputRef={el => inputRefs.current[index] = el}
                      value={digit}
                      onChange={(e) => handleTACChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      inputProps={{
                        maxLength: 1,
                        style: {
                          textAlign: 'center',
                          fontSize: '24px',
                          fontWeight: 'bold',
                          padding: '12px',
                        },
                      }}
                      sx={{
                        width: '60px',
                        '& .MuiOutlinedInput-root': {
                          height: '60px',
                        },
                      }}
                      autoFocus={index === 0}
                      disabled={verifying}
                    />
                  ))}
                </Box>

                {/* Submit Button */}
                <Box display="flex" justifyContent="center" mb={3}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={verifying ? <CircularProgress size={20} /> : <CheckCircle />}
                    disabled={verifying || tacCode.join('').length !== 6}
                    sx={{ minWidth: '200px' }}
                  >
                    {verifying ? 'Verifying...' : 'Verify & Proceed'}
                  </Button>
                </Box>
              </Box>
            </form>

            {/* Instructions */}
            <Alert 
              severity="info" 
              icon={<Email />}
              sx={{ mb: 3 }}
            >
              <Typography variant="body2">
                • Contact live agent if you don't have TAC code
                <br />
                • TAC codes are valid for one-time use
                <br />
                • After verification, funds will be deducted from your wallet
              </Typography>
            </Alert>

            {/* Action Buttons */}
            <Box display="flex" justifyContent="space-between" mt={4}>
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={() => navigate('/dashboard/transfer')}
              >
                Back to Transfer
              </Button>
              
              <Button
                variant="text"
                onClick={() => navigate('/dashboard/transfer')}
              >
                Cancel
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TransferVerifyTAC;