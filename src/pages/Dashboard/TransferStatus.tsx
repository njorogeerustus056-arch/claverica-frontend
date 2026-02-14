import React, { useState, useEffect } from 'react';
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
  Grid,
  Chip,
  LinearProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  ArrowBack,
  CheckCircle,
  AccessTime,
  Error,
  Pending,
  DoneAll,
  AccountBalanceWallet,
  Schedule,
} from '@mui/icons-material';
import transferAPI, { TransferStatus } from '../../services/transfer-api';
import styles from './Transfer.module.css';

const TransferStatusPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const transferId = parseInt(id || '0');
  const [transfer, setTransfer] = useState<TransferStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // ✅ FIXED: Status config with all backend statuses including 'tac_sent'
  const statusConfig: Record<string, { color: any; icon: any; label: string; progress: number }> = {
    pending: { color: 'warning', icon: <AccessTime />, label: 'Awaiting Processing', progress: 25 },
    tac_sent: { color: 'info', icon: <CheckCircle />, label: 'TAC Sent', progress: 50 }, // ✅ ADDED
    tac_verified: { color: 'success', icon: <CheckCircle />, label: 'TAC Verified', progress: 60 },
    funds_deducted: { color: 'success', icon: <AccountBalanceWallet />, label: 'Funds Deducted', progress: 70 },
    pending_settlement: { color: 'info', icon: <Schedule />, label: 'Pending Settlement', progress: 80 },
    completed: { color: 'success', icon: <DoneAll />, label: 'Completed', progress: 100 },
    failed: { color: 'error', icon: <Error />, label: 'Failed', progress: 100 },
    cancelled: { color: 'error', icon: <Error />, label: 'Cancelled', progress: 100 },
  };

  // Fetch transfer details
  const fetchTransfer = async () => {
    try {
      const data = await transferAPI.getTransfer(transferId);
      setTransfer(data);
    } catch (error) {
      console.error('Error fetching transfer:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    if (transferId) {
      fetchTransfer();
    }
  }, [transferId]);

  // Manual refresh for pending statuses
  useEffect(() => {
    if (!autoRefresh || !transferId || !transfer) return;

    const intervalId = setInterval(() => {
      // ✅ FIXED: Include 'tac_sent' in auto-refresh list
      if (['pending', 'tac_sent', 'pending_settlement', 'tac_verified', 'funds_deducted'].includes(transfer.status)) {
        fetchTransfer();
      }
    }, 30000);

    return () => clearInterval(intervalId);
  }, [autoRefresh, transferId, transfer]);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get status color and icon
  const getStatusInfo = (status: string) => {
    return statusConfig[status] || { color: 'default', icon: <Pending />, label: status, progress: 0 };
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

  const statusInfo = getStatusInfo(transfer.status);

  return (
    <Container maxWidth="lg" className={styles.container}>
      <Box mb={4}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/dashboard/transfer')}
          className={styles.backButton}
        >
          Back to Transfer
        </Button>
        <Typography variant="h4" component="h1" gutterBottom>
          Transfer Status
        </Typography>
        <Typography color="textSecondary">
          Track the progress of your transfer #{transfer.reference}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Status Overview Card */}
        <Grid item xs={12}>
          <Paper className={styles.paper}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
              <Box display="flex" alignItems="center">
                {statusInfo.icon}
                <Box ml={2}>
                  <Typography variant="h5">
                    ${parseFloat(transfer.amount).toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    To: {transfer.recipient_name}
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <Chip
                  label={statusInfo.label}
                  color={statusInfo.color}
                  icon={statusInfo.icon}
                  variant="outlined"
                  size="medium"
                />
                {['pending', 'tac_sent', 'pending_settlement', 'tac_verified', 'funds_deducted'].includes(transfer.status) && (
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => setAutoRefresh(!autoRefresh)}
                  >
                    {autoRefresh ? 'Stop Auto-Refresh' : 'Start Auto-Refresh'}
                  </Button>
                )}
              </Box>
            </Box>

            {/* Progress Bar */}
            <Box mb={4}>
              <Typography variant="subtitle2" gutterBottom>
                Transfer Progress
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={statusInfo.progress} 
                sx={{ 
                  height: 10, 
                  borderRadius: 5, 
                  mb: 2,
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 5,
                  }
                }}
              />
              <Box display="flex" justifyContent="space-between">
                <Typography variant="caption" color="textSecondary">
                  Submitted
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  TAC Sent
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Funds Deducted
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Settled
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Completed
                </Typography>
              </Box>
            </Box>

            {/* Status Message */}
            <Alert 
              severity={
                transfer.status === 'completed' ? 'success' :
                transfer.status === 'failed' || transfer.status === 'cancelled' ? 'error' :
                transfer.status === 'pending_settlement' || transfer.status === 'tac_sent' ? 'info' : 'warning'
              }
              sx={{ mb: 3 }}
            >
              <Typography variant="body2">
                {getStatusMessage(transfer.status)}
              </Typography>
            </Alert>

            {/* Refresh Controls */}
            {['pending', 'tac_sent', 'pending_settlement', 'tac_verified', 'funds_deducted'].includes(transfer.status) && (
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="body2" color="textSecondary">
                  {autoRefresh ? '🔄 Auto-refreshing every 30 seconds' : '⏸️ Manual refresh only'}
                </Typography>
                <Box display="flex" gap={1}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={fetchTransfer}
                    disabled={loading}
                  >
                    Refresh Now
                  </Button>
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Transfer Details */}
        <Grid item xs={12} md={6}>
          <Paper className={styles.paper}>
            <Typography variant="h6" gutterBottom>
              Transfer Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <AccountBalanceWallet />
                </ListItemIcon>
                <ListItemText 
                  primary="Amount" 
                  secondary={`$${parseFloat(transfer.amount).toFixed(2)}`}
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <Schedule />
                </ListItemIcon>
                <ListItemText 
                  primary="Recipient" 
                  secondary={transfer.recipient_name}
                />
              </ListItem>
              
              <ListItem>
                <ListItemText 
                  primary="Destination Type" 
                  secondary={transfer.destination_type.toUpperCase()}
                />
              </ListItem>
              
              {transfer.destination_type === 'bank' && (
                <>
                  <ListItem>
                    <ListItemText 
                      primary="Bank Name" 
                      secondary={transfer.destination_details.bank_name}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Account Number" 
                      secondary={transfer.destination_details.account_number}
                    />
                  </ListItem>
                </>
              )}
              
              {transfer.destination_type === 'mobile_wallet' && (
                <>
                  <ListItem>
                    <ListItemText 
                      primary="Provider" 
                      secondary={transfer.destination_details.mobile_provider}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Mobile Number" 
                      secondary={transfer.destination_details.mobile_number}
                    />
                  </ListItem>
                </>
              )}
              
              {transfer.destination_type === 'crypto' && (
                <>
                  <ListItem>
                    <ListItemText 
                      primary="Cryptocurrency" 
                      secondary={transfer.destination_details.crypto_type}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Wallet Address" 
                      secondary={
                        <Typography variant="body2" fontFamily="monospace" fontSize="12px">
                          {transfer.destination_details.crypto_address}
                        </Typography>
                      }
                    />
                  </ListItem>
                </>
              )}
              
              <ListItem>
                <ListItemText 
                  primary="Narration" 
                  secondary={transfer.narration || 'No description provided'}
                />
              </ListItem>
              
              <ListItem>
                <ListItemText 
                  primary="Created" 
                  secondary={formatDate(transfer.created_at)}
                />
              </ListItem>
              
              <ListItem>
                <ListItemText 
                  primary="Last Updated" 
                  secondary={formatDate(transfer.updated_at)}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Status Information */}
        <Grid item xs={12} md={6}>
          <Paper className={styles.paper}>
            <Typography variant="h6" gutterBottom>
              Status Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="subtitle2" gutterBottom color="primary">
                  {statusInfo.label}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {getStatusMessage(transfer.status)}
                </Typography>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Typography variant="subtitle2" gutterBottom color="primary">
              Next Steps
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              {getNextSteps(transfer.status)}
            </Typography>

            {/* Action Buttons */}
            {/* ✅ FIXED: Show button for both 'pending' AND 'tac_sent' statuses */}
            {(transfer.status === 'pending' || transfer.status === 'tac_sent') && (
              <Box mt={3}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate(`/dashboard/transfer/verify-tac/${transferId}`)}
                  startIcon={<CheckCircle />}
                >
                  Enter TAC Code
                </Button>
                <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                  Contact live agent for TAC code
                </Typography>
              </Box>
            )}

            {/* External Reference */}
            {transfer.external_reference && (
              <Box mt={3}>
                <Typography variant="subtitle2" gutterBottom color="primary">
                  External Reference
                </Typography>
                <Typography variant="body2" fontFamily="monospace" color="textSecondary">
                  {transfer.external_reference}
                </Typography>
              </Box>
            )}

            {/* Balance Information */}
            {(transfer.balance_before && transfer.balance_after) && (
              <Box mt={3}>
                <Typography variant="subtitle2" gutterBottom color="primary">
                  Balance Impact
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="textSecondary">
                      Before:
                    </Typography>
                    <Typography variant="body2">
                      ${parseFloat(transfer.balance_before).toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="textSecondary">
                      After:
                    </Typography>
                    <Typography variant="body2">
                      ${parseFloat(transfer.balance_after).toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Action Buttons */}
        <Grid item xs={12}>
          <Paper className={styles.paper}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle2" color="textSecondary">
                Transfer #{transfer.reference}
              </Typography>
              
              <Box display="flex" gap={2}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/dashboard/transfer/history')}
                >
                  View All Transfers
                </Button>
                
                <Button
                  variant="contained"
                  onClick={() => navigate('/dashboard/transfer')}
                >
                  New Transfer
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

// Helper function for status messages
const getStatusMessage = (status: string): string => {
  switch (status) {
    case 'pending':
      return 'Transfer submitted. Contact live agent for TAC code to proceed.';
    case 'tac_sent': // ✅ ADDED
      return 'TAC code has been sent. Enter the code to verify and proceed with the transfer.';
    case 'tac_verified':
      return 'TAC verified successfully. Funds will be deducted from your wallet.';
    case 'funds_deducted':
      return 'Funds deducted from your wallet. Admin will now process the external transfer.';
    case 'pending_settlement':
      return 'Waiting for admin to process external bank transfer. This usually takes 1-2 business days.';
    case 'completed':
      return 'Transfer completed successfully. Funds have been sent to the recipient.';
    case 'failed':
      return 'Transfer failed. Please contact support for assistance.';
    case 'cancelled':
      return 'Transfer cancelled. No funds were deducted from your account.';
    default:
      return 'Processing your transfer...';
  }
};

// Helper function for next steps
const getNextSteps = (status: string): string => {
  switch (status) {
    case 'pending':
      return '1. Contact live agent for TAC code → 2. Enter TAC code → 3. Funds deducted → 4. Admin processes external transfer';
    case 'tac_sent': // ✅ ADDED
      return '1. Enter the TAC code you received → 2. Funds will be deducted → 3. Admin processes external transfer';
    case 'tac_verified':
      return 'Funds have been reserved. Admin will process the external transfer shortly.';
    case 'funds_deducted':
    case 'pending_settlement':
      return 'Admin is processing the external bank transfer. You will receive a notification when completed.';
    case 'completed':
      return 'Transfer completed. The recipient should have received the funds.';
    default:
      return 'Please wait for the process to complete or contact support for assistance.';
  }
};

export default TransferStatusPage;