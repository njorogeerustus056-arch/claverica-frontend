import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  MenuItem,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  LinearProgress,
  Chip,
} from '@mui/material';
import {
  AccountBalanceWallet,
  Send,
  ArrowBack,
  Close,
  BadgeCheck,
  Person,
  Description,
  PhotoCamera,
  CreditCard,
  Shield,
  Lock,
  VerifiedUser,
  Warning,
  CheckCircle,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import transferAPI from '../../services/transfer-api';
import styles from './Transfer.module.css';

interface TransferFormData {
  amount: string;
  recipient_name: string;
  destination_type: 'bank' | 'mobile_wallet' | 'crypto';
  destination_details: {
    bank_name?: string;
    account_number?: string;
    account_type?: string;
    branch?: string;
    mobile_provider?: string;
    mobile_number?: string;
    crypto_address?: string;
    crypto_type?: string;
  };
  narration: string;
}

interface WalletBalance {
  balance: number;
  currency: string;
}

interface KycPayload {
  service_type: string;
  transfer_amount?: number;
  destination_type?: string;
  redirectTo?: string;
  action_label?: string;
}

const KYC_STEPS = [
  { id: 'identity', icon: Person, title: 'Personal Info', desc: 'Name, DOB, address' },
  { id: 'documents', icon: Description, title: 'ID Document', desc: 'Passport or government ID' },
  { id: 'selfie', icon: PhotoCamera, title: 'Selfie Verification', desc: 'Live face-match photo' },
  { id: 'financial', icon: CreditCard, title: 'Financial Details', desc: 'Income & employment' },
];

const KycModal = ({
  open,
  payload,
  onClose,
  onConfirm,
}: {
  open: boolean;
  payload: KycPayload | null;
  onClose: () => void;
  onConfirm: (p: KycPayload) => void;
}) => {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!payload) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onConfirm(payload);
    }, 800);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          border: '1px solid #334155',
        }
      }}
    >
      <Box sx={{ height: 4, background: 'linear-gradient(90deg, #06b6d4, #8b5cf6, #ec4899)' }} />

      <DialogTitle sx={{ borderBottom: '1px solid #334155', pb: 2 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={2}>
            <Box sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background: 'rgba(6, 182, 212, 0.1)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <VerifiedUser sx={{ color: '#06b6d4', fontSize: 20 }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                KYC Verification Required
              </Typography>
              <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                One-time identity check to unlock transfers
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={onClose} size="small" sx={{ color: '#94a3b8' }}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{
          background: 'rgba(251, 191, 36, 0.1)',
          border: '1px solid rgba(251, 191, 36, 0.3)',
          borderRadius: 2,
          p: 2,
          mb: 3,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 1.5,
        }}>
          <Warning sx={{ color: '#fbbf24', fontSize: 18, mt: 0.2 }} />
          <Typography variant="body2" sx={{ color: '#e2e8f0' }}>
            To proceed with{' '}
            <Box component="span" sx={{ color: 'white', fontWeight: 600 }}>
              {payload?.action_label || 'this transfer'}
            </Box>
            , please complete identity verification below.
          </Typography>
        </Box>

        <List sx={{ mb: 3 }}>
          {KYC_STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <ListItem
                key={step.id}
                sx={{
                  background: 'rgba(30, 41, 59, 0.5)',
                  border: '1px solid #334155',
                  borderRadius: 2,
                  mb: 1,
                  py: 2,
                }}
              >
                <ListItemIcon sx={{ minWidth: 44 }}>
                  <Box sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 1.5,
                    background: 'rgba(71, 85, 105, 0.3)',
                    border: '1px solid #475569',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Icon sx={{ fontSize: 16, color: '#94a3b8' }} />
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
                      {step.title}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                      {step.desc}
                    </Typography>
                  }
                />
                <Chip
                  label={`Step ${index + 1}`}
                  size="small"
                  sx={{
                    background: 'rgba(71, 85, 105, 0.3)',
                    color: '#94a3b8',
                    fontWeight: 500,
                    fontSize: '0.75rem',
                  }}
                />
              </ListItem>
            );
          })}
        </List>

        <Box display="flex" alignItems="center" gap={1.5} mb={3}>
          <Shield sx={{ fontSize: 16, color: '#10b981' }} />
          <Typography variant="caption" sx={{ color: '#64748b' }}>
            256-bit encrypted · Processed in under 5 minutes · PSD2 & GDPR compliant
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Box display="flex" justifyContent="space-between" mb={0.5}>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>Verification progress</Typography>
            <Typography variant="caption" sx={{ color: '#06b6d4', fontWeight: 600 }}>0%</Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={0}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: '#1e293b',
              '& .MuiLinearProgress-bar': {
                background: 'linear-gradient(90deg, #06b6d4, #8b5cf6)',
                borderRadius: 3,
              }
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, borderTop: '1px solid #334155', pt: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          fullWidth
          sx={{
            py: 1.5,
            borderColor: '#475569',
            color: '#94a3b8',
            '&:hover': {
              borderColor: '#64748b',
              backgroundColor: 'rgba(100, 116, 139, 0.1)',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={submitting}
          variant="contained"
          fullWidth
          sx={{
            py: 1.5,
            background: 'linear-gradient(90deg, #06b6d4, #8b5cf6)',
            color: 'white',
            fontWeight: 600,
            '&:hover': {
              background: 'linear-gradient(90deg, #0891b2, #7c3aed)',
            },
            '&:disabled': {
              background: '#475569',
            },
          }}
        >
          {submitting ? (
            <Box display="flex" alignItems="center" gap={1}>
              <CircularProgress size={20} color="inherit" />
              Preparing Verification...
            </Box>
          ) : (
            <Box display="flex" alignItems="center" gap={1}>
              Start KYC Verification
              <ArrowBack sx={{ transform: 'rotate(180deg)', fontSize: 20 }} />
            </Box>
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Transfer = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState<WalletBalance | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // KYC State
  const [kycOpen, setKycOpen] = useState(false);
  const [kycPayload, setKycPayload] = useState<KycPayload | null>(null);
  const [kycStatus, setKycStatus] = useState<'pending' | 'verified' | 'unverified'>('unverified');
  const [showKycBanner, setShowKycBanner] = useState(true);

  const [formData, setFormData] = useState<TransferFormData>({
    amount: '',
    recipient_name: '',
    destination_type: 'bank',
    destination_details: {
      bank_name: '',
      account_number: '',
      account_type: '',
      branch: '',
    },
    narration: '',
  });

  // Check KYC status on component mount
  useEffect(() => {
    const checkKycStatus = async () => {
      // Simulate API call - replace with actual API
      const status = user?.kyc_status || 'unverified';
      setKycStatus(status as any);
      
      // Auto-show banner if KYC is unverified
      if (status === 'unverified') {
        setShowKycBanner(true);
      }
    };
    
    checkKycStatus();
  }, [user]);

  // Fetch wallet balance
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const balanceData = await transferAPI.getWalletBalance();
        
        if (!balanceData) {
          setBalance({
            balance: 0,
            currency: 'USD'
          });
          return;
        }
        
        const parsedBalance = parseFloat(balanceData.balance);
        
        setBalance({
          balance: isNaN(parsedBalance) ? 0 : parsedBalance,
          currency: balanceData.currency || 'USD'
        });
      } catch (err) {
        console.error('Error fetching balance:', err);
        setBalance({
          balance: 0,
          currency: 'USD'
        });
      }
    };
    fetchBalance();
  }, []);

  // KYC Handler
  const requireKyc = useCallback((payload: KycPayload) => {
    setKycPayload(payload);
    setKycOpen(true);
  }, []);

  const handleKycConfirm = useCallback(
    (p: KycPayload) => {
      setKycOpen(false);
      setKycPayload(null);
      navigate("/dashboard/kyc/submit", {
        state: {
          service_type: p.service_type,
          transfer_amount: p.transfer_amount,
          destination_type: p.destination_type,
          redirectTo: p.redirectTo || "/dashboard/transfer",
        },
      });
    },
    [navigate]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('destination_details.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        destination_details: {
          ...prev.destination_details,
          [field]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleDestinationTypeChange = (type: 'bank' | 'mobile_wallet' | 'crypto') => {
    setFormData(prev => ({
      ...prev,
      destination_type: type,
      destination_details: {
        bank_name: '',
        account_number: '',
        account_type: '',
        branch: '',
        mobile_provider: '',
        mobile_number: '',
        crypto_address: '',
        crypto_type: '',
      },
    }));
  };

  const validateForm = (): boolean => {
    setError('');

    // Amount validation
    const amount = parseFloat(formData.amount);
    if (!amount || amount <= 0) {
      setError('Please enter a valid amount');
      return false;
    }

    if (balance && amount > balance.balance) {
      setError(`Insufficient balance. Available: $${balance.balance.toFixed(2)}`);
      return false;
    }

    // Recipient validation
    if (!formData.recipient_name.trim()) {
      setError('Please enter recipient name');
      return false;
    }

    // Destination validation based on type
    switch (formData.destination_type) {
      case 'bank':
        if (!formData.destination_details.bank_name?.trim() || 
            !formData.destination_details.account_number?.trim() ||
            !formData.destination_details.account_type?.trim()) {
          setError('Please fill in all bank details');
          return false;
        }
        break;
      case 'mobile_wallet':
        if (!formData.destination_details.mobile_provider?.trim() || 
            !formData.destination_details.mobile_number?.trim()) {
          setError('Please fill in all mobile wallet details');
          return false;
        }
        break;
      case 'crypto':
        if (!formData.destination_details.crypto_address?.trim()) {
          setError('Please enter crypto wallet address');
          return false;
        }
        break;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const amount = parseFloat(formData.amount);
    
    // Require KYC for amounts >= $1,500 AND user not KYC verified
    if (amount >= 1500 && kycStatus !== 'verified') {
      requireKyc({
        service_type: 'transfer',
        transfer_amount: amount,
        destination_type: formData.destination_type,
        redirectTo: '/dashboard/transfer',
        action_label: `Transfer $${amount} to ${formData.recipient_name}`,
      });
      return;
    }
    
    // Proceed directly to TAC flow
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      console.log('📤 SUBMITTING TRANSFER DATA:', {
        amount: amount,
        recipient_name: formData.recipient_name,
        destination_type: formData.destination_type,
        destination_details: formData.destination_details,
        narration: formData.narration,
      });

      // ✅ FIXED: Using correct endpoint (transferAPI will handle the URL)
      const response = await transferAPI.createTransfer({
        amount: amount,
        recipient_name: formData.recipient_name,
        destination_type: formData.destination_type,
        destination_details: formData.destination_details,
        narration: formData.narration,
      });

      console.log('📥 TRANSFER API RESPONSE:', response);

      if (response.success) {
        setSuccess(`Transfer #${response.transfer_id} submitted successfully! Redirecting to TAC page...`);
        
        // Auto-redirect to TAC page after 2 seconds
        setTimeout(() => {
          navigate(`/dashboard/transfer/verify-tac/${response.transfer_id}`);
        }, 2000);
        
        // Reset form
        setFormData({
          amount: '',
          recipient_name: '',
          destination_type: 'bank',
          destination_details: {
            bank_name: '',
            account_number: '',
            account_type: '',
            branch: '',
          },
          narration: '',
        });
        
      } else {
        setError(response.message || 'Failed to submit transfer request');
      }
    } catch (err: any) {
      console.error('Transfer error:', err);
      setError(err.message || 'An error occurred while submitting transfer');
    } finally {
      setLoading(false);
    }
  };

  const handleStartKYC = () => {
    const amount = parseFloat(formData.amount) || 0;
    requireKyc({
      service_type: 'transfer',
      transfer_amount: amount,
      destination_type: formData.destination_type,
      redirectTo: '/dashboard/transfer',
      action_label: 'Complete KYC for transfers',
    });
  };

  const renderDestinationFields = () => {
    switch (formData.destination_type) {
      case 'bank':
        return (
          <>
            <Grid size={{ xs: 12 }}>
              <TextField
                select
                fullWidth
                label="Bank Name"
                name="destination_details.bank_name"
                value={formData.destination_details.bank_name || ''}
                onChange={handleChange}
                required
              >
                <MenuItem value="KCB">Kenya Commercial Bank (KCB)</MenuItem>
                <MenuItem value="Equity">Equity Bank</MenuItem>
                <MenuItem value="Cooperative">Cooperative Bank</MenuItem>
                <MenuItem value="Stanbic">Stanbic Bank</MenuItem>
                <MenuItem value="Standard Chartered">Standard Chartered Bank</MenuItem>
                <MenuItem value="Absa">Absa Bank</MenuItem>
                <MenuItem value="NCBA">NCBA Bank</MenuItem>
                <MenuItem value="DTB">Diamond Trust Bank (DTB)</MenuItem>
                <MenuItem value="CBA">Commercial Bank of Africa</MenuItem>
                <MenuItem value="I&M">I&M Bank</MenuItem>
                <MenuItem value="Bank of Africa">Bank of Africa</MenuItem>
                <MenuItem value="Prime">Prime Bank</MenuItem>
                <MenuItem value="Other">Other Bank</MenuItem>
              </TextField>
            </Grid>
            
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Account Number"
                name="destination_details.account_number"
                value={formData.destination_details.account_number || ''}
                onChange={handleChange}
                required
              />
            </Grid>
            
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                select
                fullWidth
                label="Account Type"
                name="destination_details.account_type"
                value={formData.destination_details.account_type || ''}
                onChange={handleChange}
                required
              >
                <MenuItem value="savings">Savings Account</MenuItem>
                <MenuItem value="checking">Checking Account</MenuItem>
                <MenuItem value="current">Current Account</MenuItem>
                <MenuItem value="business">Business Account</MenuItem>
                <MenuItem value="fixed_deposit">Fixed Deposit Account</MenuItem>
              </TextField>
            </Grid>
            
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Branch (Optional)"
                name="destination_details.branch"
                value={formData.destination_details.branch || ''}
                onChange={handleChange}
                placeholder="e.g., Nairobi CBD, Westlands, etc."
              />
            </Grid>
          </>
        );

      case 'mobile_wallet':
        return (
          <>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                select
                fullWidth
                label="Mobile Provider"
                name="destination_details.mobile_provider"
                value={formData.destination_details.mobile_provider || ''}
                onChange={handleChange}
                required
              >
                <MenuItem value="M-Pesa">M-Pesa</MenuItem>
                <MenuItem value="Airtel Money">Airtel Money</MenuItem>
                <MenuItem value="T-Kash">T-Kash</MenuItem>
                <MenuItem value="Equity Eazzy">Equity Eazzy</MenuItem>
              </TextField>
            </Grid>
            
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Mobile Number"
                name="destination_details.mobile_number"
                value={formData.destination_details.mobile_number || ''}
                onChange={handleChange}
                required
                placeholder="07XXXXXXXX"
              />
            </Grid>
          </>
        );

      case 'crypto':
        return (
          <>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                select
                fullWidth
                label="Cryptocurrency"
                name="destination_details.crypto_type"
                value={formData.destination_details.crypto_type || ''}
                onChange={handleChange}
                required
              >
                <MenuItem value="Bitcoin">Bitcoin (BTC)</MenuItem>
                <MenuItem value="Ethereum">Ethereum (ETH)</MenuItem>
                <MenuItem value="USDT">USDT (ERC20)</MenuItem>
                <MenuItem value="USDC">USDC</MenuItem>
                <MenuItem value="BNB">BNB</MenuItem>
                <MenuItem value="Solana">Solana (SOL)</MenuItem>
              </TextField>
            </Grid>
            
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Wallet Address"
                name="destination_details.crypto_address"
                value={formData.destination_details.crypto_address || ''}
                onChange={handleChange}
                required
                multiline
                rows={2}
                placeholder="Enter the full wallet address"
              />
            </Grid>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" className={styles.container}>
      {/* KYC Modal */}
      <KycModal
        open={kycOpen}
        payload={kycPayload}
        onClose={() => { setKycOpen(false); setKycPayload(null); }}
        onConfirm={handleKycConfirm}
      />

      <Box mb={4}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/dashboard')}
          className={styles.backButton}
        >
          Back to Dashboard
        </Button>
        <Typography variant="h4" component="h1" gutterBottom>
          Send Money
        </Typography>
        <Typography color="textSecondary">
          Transfer funds to bank accounts, mobile wallets, or cryptocurrency addresses
        </Typography>
      </Box>

      {/* KYC Banner */}
      {showKycBanner && kycStatus !== 'verified' && (
        <Paper
          elevation={2}
          sx={{
            mb: 3,
            p: 2.5,
            background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(251, 191, 36, 0.05) 100%)',
            border: '1px solid rgba(251, 191, 36, 0.2)',
            borderRadius: 2,
          }}
        >
          <Box display="flex" alignItems="flex-start" justifyContent="space-between">
            <Box display="flex" alignItems="flex-start" gap={2} flex={1}>
              <Box sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: 'rgba(251, 191, 36, 0.1)',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 0.5,
              }}>
                <Warning sx={{ color: '#fbbf24', fontSize: 20 }} />
              </Box>
              <Box flex={1}>
                <Typography variant="subtitle1" sx={{ color: '#1e293b', fontWeight: 600, mb: 0.5 }}>
                  Verification Required
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', mb: 1.5 }}>
                  Complete KYC verification to unlock unlimited transfers and higher limits.
                  Transfers over $1,500 require verified identity.
                </Typography>
                <Box display="flex" gap={1.5}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleStartKYC}
                    startIcon={<VerifiedUser />}
                    sx={{
                      background: 'linear-gradient(90deg, #06b6d4, #8b5cf6)',
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Start Verification
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setShowKycBanner(false)}
                    sx={{ textTransform: 'none', borderColor: '#cbd5e1', color: '#64748b' }}
                  >
                    Remind Later
                  </Button>
                </Box>
              </Box>
            </Box>
            <IconButton
              size="small"
              onClick={() => setShowKycBanner(false)}
              sx={{ color: '#94a3b8' }}
            >
              <Close fontSize="small" />
            </IconButton>
          </Box>
        </Paper>
      )}

      {/* KYC Verified Badge */}
      {kycStatus === 'verified' && (
        <Paper
          elevation={1}
          sx={{
            mb: 3,
            p: 2,
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            borderRadius: 2,
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Box sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <CheckCircle sx={{ color: '#10b981', fontSize: 20 }} />
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ color: '#1e293b', fontWeight: 600 }}>
                Identity Verified ✓
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b' }}>
                Your KYC is complete. You can transfer up to $25,000 per transaction.
              </Typography>
            </Box>
          </Box>
        </Paper>
      )}

      <Grid container spacing={4}>
        {/* Balance Card */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card className={styles.balanceCard} sx={{
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <Box sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 120,
              height: 120,
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
              borderRadius: '50%',
              transform: 'translate(40px, -40px)',
            }} />
            <CardContent>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <AccountBalanceWallet sx={{ color: '#06b6d4', fontSize: 32 }} />
                <Typography variant="h6" sx={{ color: '#e2e8f0', fontWeight: 600 }}>
                  Available Balance
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ color: 'white', fontWeight: 700, mb: 0.5 }}>
                ${balance ? balance.balance.toFixed(2) : '0.00'}
              </Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                {balance?.currency || 'USD'}
              </Typography>
              
              {/* KYC Limit Info */}
              <Box mt={3} pt={2} borderTop="1px solid #334155">
                <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', mb: 0.5 }}>
                  Transfer Limits
                </Typography>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="caption" sx={{ color: '#cbd5e1' }}>
                    Per Transaction:
                  </Typography>
                  <Typography variant="caption" sx={{ 
                    color: kycStatus === 'verified' ? '#10b981' : '#fbbf24',
                    fontWeight: 600 
                  }}>
                    {kycStatus === 'verified' ? '$25,000' : '$1,500'}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="caption" sx={{ color: '#cbd5e1' }}>
                    Daily Limit:
                  </Typography>
                  <Typography variant="caption" sx={{ 
                    color: kycStatus === 'verified' ? '#10b981' : '#fbbf24',
                    fontWeight: 600 
                  }}>
                    {kycStatus === 'verified' ? '$100,000' : '$5,000'}
                </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Transfer Form */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper className={styles.paper} sx={{ 
            background: 'white',
            borderRadius: 3,
            overflow: 'hidden',
            border: '1px solid #e2e8f0',
          }}>
            {/* Form header with KYC indicator */}
            <Box sx={{
              p: 2.5,
              borderBottom: '1px solid #e2e8f0',
              background: kycStatus === 'verified' 
                ? 'linear-gradient(90deg, rgba(16, 185, 129, 0.05), transparent)' 
                : 'linear-gradient(90deg, rgba(251, 191, 36, 0.05), transparent)',
            }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" sx={{ color: '#1e293b', fontWeight: 600 }}>
                  Transfer Details
                </Typography>
                <Chip
                  icon={kycStatus === 'verified' ? <CheckCircle /> : <Warning />}
                  label={kycStatus === 'verified' ? 'KYC Verified' : 'KYC Required'}
                  size="small"
                  color={kycStatus === 'verified' ? 'success' : 'warning'}
                  variant="outlined"
                />
              </Box>
            </Box>

            <Box sx={{ p: 3 }}>
              <form onSubmit={handleSubmit}>
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

                <Grid container spacing={3}>
                  {/* Amount */}
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Amount"
                      name="amount"
                      type="number"
                      value={formData.amount}
                      onChange={handleChange}
                      required
                      InputProps={{
                        startAdornment: (
                          <Typography color="textSecondary" sx={{ mr: 1 }}>
                            $
                          </Typography>
                        ),
                      }}
                      helperText={
                        kycStatus !== 'verified' && formData.amount 
                          ? `Amounts over $1,500 require KYC verification`
                          : `Available: $${balance ? balance.balance.toFixed(2) : '0.00'}`
                      }
                    />
                  </Grid>

                  {/* Recipient Name */}
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Recipient Name"
                      name="recipient_name"
                      value={formData.recipient_name}
                      onChange={handleChange}
                      required
                      placeholder="Full name of the recipient"
                    />
                  </Grid>

                  {/* Destination Type */}
                  <Grid size={{ xs: 12 }}>
                    <Typography variant="subtitle1" gutterBottom sx={{ color: '#1e293b', fontWeight: 600 }}>
                      Destination Type
                    </Typography>
                    <Box display="flex" gap={2} mb={2}>
                      <Button
                        variant={formData.destination_type === 'bank' ? 'contained' : 'outlined'}
                        onClick={() => handleDestinationTypeChange('bank')}
                        sx={{ textTransform: 'none' }}
                      >
                        Bank Account
                      </Button>
                      <Button
                        variant={formData.destination_type === 'mobile_wallet' ? 'contained' : 'outlined'}
                        onClick={() => handleDestinationTypeChange('mobile_wallet')}
                        sx={{ textTransform: 'none' }}
                      >
                        Mobile Wallet
                      </Button>
                      <Button
                        variant={formData.destination_type === 'crypto' ? 'contained' : 'outlined'}
                        onClick={() => handleDestinationTypeChange('crypto')}
                        sx={{ textTransform: 'none' }}
                      >
                        Cryptocurrency
                      </Button>
                    </Box>
                  </Grid>

                  {/* Dynamic Destination Fields */}
                  {renderDestinationFields()}

                  {/* Narration */}
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Narration (Optional)"
                      name="narration"
                      value={formData.narration}
                      onChange={handleChange}
                      multiline
                      rows={2}
                      placeholder="Add a note about this transfer"
                    />
                  </Grid>

                  {/* Submit Button */}
                  <Grid size={{ xs: 12 }}>
                    <Box display="flex" justifyContent="flex-end" gap={2}>
                      <Button
                        variant="outlined"
                        onClick={() => navigate('/dashboard')}
                        disabled={loading}
                        sx={{ textTransform: 'none' }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={loading ? <CircularProgress size={20} /> : <Send />}
                        disabled={loading}
                        sx={{
                          textTransform: 'none',
                          background: 'linear-gradient(90deg, #06b6d4, #8b5cf6)',
                          minWidth: 160,
                          fontWeight: 600,
                          '&:hover': {
                            background: 'linear-gradient(90deg, #0891b2, #7c3aed)',
                          },
                        }}
                      >
                        {loading ? 'Processing...' : 'Submit Transfer'}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Transfer;