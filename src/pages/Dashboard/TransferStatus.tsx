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

  const statusConfig: Record<string, { color: any; icon: any; label: string; progress: number }> = {
    pending: { color: 'warning', icon: <AccessTime />, label: 'Awaiting Processing', progress: 25 },
    tac_sent: { color: 'info', icon: <CheckCircle />, label: 'TAC Sent', progress: 50 },
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
      <Container maxWidth="lg" className={styles.container}>
        <Box mb={4}>
          <div className={styles.skeletonTextShort} style={{ height: '40px', marginBottom: '20px' }}></div>
          <div className={styles.skeletonText} style={{ height: '48px', width: '50%' }}></div>
          <div className={styles.skeletonTextShort} style={{ width: '30%' }}></div>
        </Box>
        
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div className={styles.skeletonCard} style={{ height: '300px' }}>
              <div style={{ padding: '24px' }}>
                <div className={styles.skeletonAvatar}></div>
                <div className={styles.skeletonText} style={{ width: '40%', margin: '16px auto' }}></div>
                <div className={styles.skeletonText} style={{ width: '60%', margin: '0 auto' }}></div>
                <div className={styles.skeletonText} style={{ width: '80%', margin: '24px auto' }}></div>
                <div className={styles.skeletonTextShort} style={{ width: '50%', margin: '0 auto' }}></div>
              </div>
            </div>
          </Grid>
        </Grid>
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
                <Box sx={{ color: statusInfo.icon.props.color || '#8626E9', fontSize: 40 }}>
                  {statusInfo.icon}
                </Box>
                <Box ml={2}>
                  <Typography variant="h5" sx={{ color: '#0A2540', fontWeight: 800 }}>
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
                  sx={{ 
                    borderColor: 'rgba(197, 160, 40, 0.3)',
                    fontWeight: 600,
                    '& .MuiChip-icon': { color: statusInfo.color === 'success' ? '#1E6F6F' : '#C5A028' }
                  }}
                />
                {['pending', 'tac_sent', 'pending_settlement', 'tac_verified', 'funds_deducted'].includes(transfer.status) && (
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => setAutoRefresh(!autoRefresh)}
                    className={styles.secondaryButton}
                  >
                    {autoRefresh ? 'Stop Auto-Refresh' : 'Start Auto-Refresh'}
                  </Button>
                )}
              </Box>
            </Box>

            {/* Progress Bar */}
            <Box mb={4}>
              <Typography variant="subtitle2" gutterBottom sx={{ color: '#0A2540', fontWeight: 600 }}>
                Transfer Progress
              </Typography>
              <Box className={styles.progressBar}>
                <Box 
                  className={styles.progressFill} 
                  style={{ width: `${statusInfo.progress}%` }}
                />
              </Box>
              <Box display="flex" justifyContent="space-between" mt={1}>
                <Typography variant="caption" sx={{ color: '#1E6F6F', fontWeight: 600 }}>Submitted</Typography>
                <Typography variant="caption" sx={{ color: '#C5A028', fontWeight: 600 }}>TAC Sent</Typography>
                <Typography variant="caption" sx={{ color: '#8626E9', fontWeight: 600 }}>Funds Deducted</Typography>
                <Typography variant="caption" sx={{ color: '#1E6F6F', fontWeight: 600 }}>Settled</Typography>
                <Typography variant="caption" sx={{ color: '#1E6F6F', fontWeight: 600 }}>Completed</Typography>
              </Box>
            </Box>

            {/* Status Message */}
            <Alert 
              severity={
                transfer.status === 'completed' ? 'success' :
                transfer.status === 'failed' || transfer.status === 'cancelled' ? 'error' :
                transfer.status === 'pending_settlement' || transfer.status === 'tac_sent' ? 'info' : 'warning'
              }
              className={
                transfer.status === 'completed' ? styles.successAlert :
                transfer.status === 'failed' || transfer.status === 'cancelled' ? styles.errorAlert :
                styles.infoAlert
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
                <Typography variant="body2" sx={{ color: '#0A2540' }}>
                  {autoRefresh ? '🔄 Auto-refreshing every 30 seconds' : '⏸️ Manual refresh only'}
                </Typography>
                <Box display="flex" gap={1}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={fetchTransfer}
                    disabled={loading}
                    className={styles.secondaryButton}
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
            <Typography variant="h6" gutterBottom sx={{ color: '#0A2540', fontWeight: 700 }}>
              Transfer Details
            </Typography>
            <Divider sx={{ mb: 2, borderColor: 'rgba(197, 160, 40, 0.2)' }} />
            
            <List dense>
              <ListItem>
                <ListItemIcon sx={{ color: '#8626E9' }}>
                  <AccountBalanceWallet />
                </ListItemIcon>
                <ListItemText 
                  primary={<Typography variant="body2" sx={{ color: '#0A2540', fontWeight: 600 }}>Amount</Typography>}
                  secondary={<Typography variant="body2" sx={{ color: '#1E6F6F', fontWeight: 700 }}>${parseFloat(transfer.amount).toFixed(2)}</Typography>}
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon sx={{ color: '#C5A028' }}>
                  <Schedule />
                </ListItemIcon>
                <ListItemText 
                  primary={<Typography variant="body2" sx={{ color: '#0A2540', fontWeight: 600 }}>Recipient</Typography>}
                  secondary={<Typography variant="body2" sx={{ color: '#475569' }}>{transfer.recipient_name}</Typography>}
                />
              </ListItem>
              
              <ListItem>
                <ListItemText 
                  primary={<Typography variant="body2" sx={{ color: '#0A2540', fontWeight: 600 }}>Destination Type</Typography>}
                  secondary={<Typography variant="body2" sx={{ color: '#8626E9', fontWeight: 600 }}>{transfer.destination_type.toUpperCase()}</Typography>}
                />
              </ListItem>
              
              {transfer.destination_type === 'bank' && (
                <>
                  <ListItem>
                    <ListItemText 
                      primary={<Typography variant="body2" sx={{ color: '#0A2540', fontWeight: 600 }}>Bank Name</Typography>}
                      secondary={<Typography variant="body2" sx={{ color: '#475569' }}>{transfer.destination_details.bank_name}</Typography>}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary={<Typography variant="body2" sx={{ color: '#0A2540', fontWeight: 600 }}>Account Number</Typography>}
                      secondary={<Typography variant="body2" sx={{ color: '#475569' }}>{transfer.destination_details.account_number}</Typography>}
                    />
                  </ListItem>
                </>
              )}
              
              {transfer.destination_type === 'mobile_wallet' && (
                <>
                  <ListItem>
                    <ListItemText 
                      primary={<Typography variant="body2" sx={{ color: '#0A2540', fontWeight: 600 }}>Provider</Typography>}
                      secondary={<Typography variant="body2" sx={{ color: '#475569' }}>{transfer.destination_details.mobile_provider}</Typography>}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary={<Typography variant="body2" sx={{ color: '#0A2540', fontWeight: 600 }}>Mobile Number</Typography>}
                      secondary={<Typography variant="body2" sx={{ color: '#475569' }}>{transfer.destination_details.mobile_number}</Typography>}
                    />
                  </ListItem>
                </>
              )}
              
              {transfer.destination_type === 'crypto' && (
                <>
                  <ListItem>
                    <ListItemText 
                      primary={<Typography variant="body2" sx={{ color: '#0A2540', fontWeight: 600 }}>Cryptocurrency</Typography>}
                      secondary={<Typography variant="body2" sx={{ color: '#475569' }}>{transfer.destination_details.crypto_type}</Typography>}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary={<Typography variant="body2" sx={{ color: '#0A2540', fontWeight: 600 }}>Wallet Address</Typography>}
                      secondary={
                        <Typography variant="body2" fontFamily="monospace" fontSize="12px" sx={{ color: '#475569' }}>
                          {transfer.destination_details.crypto_address}
                        </Typography>
                      }
                    />
                  </ListItem>
                </>
              )}
              
              <ListItem>
                <ListItemText 
                  primary={<Typography variant="body2" sx={{ color: '#0A2540', fontWeight: 600 }}>Narration</Typography>}
                  secondary={<Typography variant="body2" sx={{ color: '#475569' }}>{transfer.narration || 'No description provided'}</Typography>}
                />
              </ListItem>
              
              <ListItem>
                <ListItemText 
                  primary={<Typography variant="body2" sx={{ color: '#0A2540', fontWeight: 600 }}>Created</Typography>}
                  secondary={<Typography variant="body2" sx={{ color: '#475569' }}>{formatDate(transfer.created_at)}</Typography>}
                />
              </ListItem>
              
              <ListItem>
                <ListItemText 
                  primary={<Typography variant="body2" sx={{ color: '#0A2540', fontWeight: 600 }}>Last Updated</Typography>}
                  secondary={<Typography variant="body2" sx={{ color: '#475569' }}>{formatDate(transfer.updated_at)}</Typography>}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Status Information */}
        <Grid item xs={12} md={6}>
          <Paper className={styles.paper}>
            <Typography variant="h6" gutterBottom sx={{ color: '#0A2540', fontWeight: 700 }}>
              Status Information
            </Typography>
            <Divider sx={{ mb: 2, borderColor: 'rgba(197, 160, 40, 0.2)' }} />
            
            <Card variant="outlined" sx={{ mb: 3, borderColor: 'rgba(197, 160, 40, 0.2)', backgroundColor: 'rgba(245, 240, 230, 0.5)' }}>
              <CardContent>
                <Typography variant="subtitle2" gutterBottom sx={{ color: '#8626E9', fontWeight: 700 }}>
                  {statusInfo.label}
                </Typography>
                <Typography variant="body2" sx={{ color: '#475569' }}>
                  {getStatusMessage(transfer.status)}
                </Typography>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Typography variant="subtitle2" gutterBottom sx={{ color: '#0A2540', fontWeight: 700 }}>
              Next Steps
            </Typography>
            <Typography variant="body2" sx={{ color: '#475569' }} paragraph>
              {getNextSteps(transfer.status)}
            </Typography>

            {(transfer.status === 'pending' || transfer.status === 'tac_sent') && (
              <Box mt={3}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate(`/dashboard/transfer/verify-tac/${transferId}`)}
                  startIcon={<CheckCircle />}
                  className={styles.primaryButton}
                >
                  Enter TAC Code
                </Button>
                <Typography variant="caption" sx={{ color: '#475569', mt: 1, display: 'block' }}>
                  Contact live agent for TAC code
                </Typography>
              </Box>
            )}

            {/* External Reference */}
            {transfer.external_reference && (
              <Box mt={3}>
                <Typography variant="subtitle2" gutterBottom sx={{ color: '#0A2540', fontWeight: 700 }}>
                  External Reference
                </Typography>
                <Typography variant="body2" fontFamily="monospace" sx={{ color: '#1E6F6F' }}>
                  {transfer.external_reference}
                </Typography>
              </Box>
            )}

            {/* Balance Information */}
            {(transfer.balance_before && transfer.balance_after) && (
              <Box mt={3}>
                <Typography variant="subtitle2" gutterBottom sx={{ color: '#0A2540', fontWeight: 700 }}>
                  Balance Impact
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Typography variant="caption" sx={{ color: '#475569' }}>
                      Before:
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#0A2540', fontWeight: 600 }}>
                      ${parseFloat(transfer.balance_before).toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" sx={{ color: '#475569' }}>
                      After:
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#1E6F6F', fontWeight: 700 }}>
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
            <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
              <Typography variant="subtitle2" sx={{ color: '#475569' }}>
                Transfer #{transfer.reference}
              </Typography>
              
              <Box display="flex" gap={2} flexWrap="wrap">
                <Button
                  variant="outlined"
                  onClick={() => navigate('/dashboard/transfer/history')}
                  className={styles.secondaryButton}
                >
                  View All Transfers
                </Button>
                
                <Button
                  variant="contained"
                  onClick={() => navigate('/dashboard/transfer')}
                  className={styles.primaryButton}
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
    case 'tac_sent':
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
    case 'tac_sent':
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