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
    if (!/^\d*$/.test(value)) return;
    
    const newTacCode = [...tacCode];
    newTacCode[index] = value.slice(0, 1);
    setTacCode(newTacCode);
    
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !tacCode[index] && index > 0) {
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
        
        setTimeout(() => {
          navigate(`/dashboard/transfer/status/${transferId}`);
        }, 2000);
      } else {
        setError(result.message || 'Invalid TAC code. Please try again.');
        setTacCode(['', '', '', '', '', '']);
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
        <Alert severity="error" className={styles.errorAlert} sx={{ mt: 4 }}>
          Transfer not found
        </Alert>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/dashboard/transfer')}
          className={styles.backButton}
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
            <Card variant="outlined" sx={{ mb: 3, borderColor: 'rgba(197, 160, 40, 0.2)', backgroundColor: 'rgba(245, 240, 230, 0.5)' }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" sx={{ color: '#475569' }}>
                      Amount
                    </Typography>
                    <Typography variant="h5" sx={{ color: '#0A2540', fontWeight: 800 }}>
                      ${parseFloat(transfer.amount).toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" sx={{ color: '#475569' }}>
                      Recipient
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#0A2540', fontWeight: 600 }}>
                      {transfer.recipient_name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" sx={{ color: '#475569' }}>
                      Reference
                    </Typography>
                    <Typography variant="body1" fontFamily="monospace" sx={{ color: '#8626E9' }}>
                      {transfer.reference}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Error/Success Messages */}
            {error && (
              <Alert severity="error" className={styles.errorAlert} sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            
            {success && (
              <Alert severity="success" className={styles.successAlert} sx={{ mb: 3 }}>
                {success}
              </Alert>
            )}

            {/* TAC Input Form */}
            <form onSubmit={handleSubmit}>
              <Box mb={4}>
                <Typography variant="h6" gutterBottom align="center" sx={{ color: '#0A2540' }}>
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
                      className={`${digit ? 'filled' : ''}`}
                      sx={{
                        width: '60px',
                        '& .MuiOutlinedInput-root': {
                          height: '60px',
                          backgroundColor: 'var(--cream)',
                          borderRadius: '16px',
                          '& fieldset': {
                            borderColor: digit ? '#1E6F6F' : 'rgba(197, 160, 40, 0.2)',
                            borderWidth: digit ? '2px' : '1px',
                          },
                          '&:hover fieldset': {
                            borderColor: '#C5A028',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#C5A028',
                            borderWidth: '2px',
                          },
                        },
                        '& input': {
                          color: digit ? '#1E6F6F' : '#0A2540',
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
                    size="large"
                    startIcon={verifying ? <CircularProgress size={20} /> : <CheckCircle />}
                    disabled={verifying || tacCode.join('').length !== 6}
                    className={styles.primaryButton}
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
              className={styles.infoAlert}
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
            <Box display="flex" justifyContent="space-between" mt={4} flexWrap="wrap" gap={2}>
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={() => navigate('/dashboard/transfer')}
                className={styles.secondaryButton}
              >
                Back to Transfer
              </Button>
              
              <Button
                variant="text"
                onClick={() => navigate('/dashboard/transfer')}
                sx={{ color: '#475569' }}
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