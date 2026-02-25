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
  Autocomplete,
  InputAdornment,
} from '@mui/material';
import {
  AccountBalanceWallet,
  Send,
  ArrowBack,
  Close,
  Person,
  Description,
  PhotoCamera,
  CreditCard,
  Shield,
  VerifiedUser,
  Warning,
  CheckCircle,
  Search as SearchIcon,
} from '@mui/icons-material';
import { useAuthStore } from '../../lib/store/auth';
import transferAPI from '../../services/transfer-api';
import { globalBanks, BankRecipient } from '../../data/globalBanks';
import styles from './Transfer.module.css';

// Add style tag for number rendering fix
const numberFixStyle = `
  .MuiTypography-root, .MuiTypography-h3, [class*="balance"], 
  .MuiInputBase-input, .MuiTableCell-root {
    font-variant-numeric: tabular-nums !important;
    font-feature-settings: "tnum" !important;
    letter-spacing: -0.02em !important;
  }
`;

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
          background: 'linear-gradient(135deg, #0A2540 0%, #8626E9 100%)',
          border: '1px solid rgba(197, 160, 40, 0.3)',
        }
      }}
    >
      <Box sx={{ height: 4, background: 'linear-gradient(90deg, #C5A028, #8626E9)' }} />

      <DialogTitle sx={{ borderBottom: '1px solid rgba(197, 160, 40, 0.2)', pb: 2 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={2}>
            <Box sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background: 'rgba(197, 160, 40, 0.1)',
              border: '1px solid rgba(197, 160, 40, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <VerifiedUser sx={{ color: '#C5A028', fontSize: 20 }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                KYC Verification Required
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                One-time identity check to unlock transfers
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={onClose} size="small" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{
          background: 'rgba(197, 160, 40, 0.1)',
          border: '1px solid rgba(197, 160, 40, 0.3)',
          borderRadius: 2,
          p: 2,
          mb: 3,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 1.5,
        }}>
          <Warning sx={{ color: '#C5A028', fontSize: 18, mt: 0.2 }} />
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
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
                  border: '1px solid rgba(197, 160, 40, 0.15)',
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
                    background: 'rgba(197, 160, 40, 0.1)',
                    border: '1px solid rgba(197, 160, 40, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Icon sx={{ fontSize: 16, color: '#C5A028' }} />
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
                      {step.title}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>
                      {step.desc}
                    </Typography>
                  }
                />
                <Chip
                  label={`Step ${index + 1}`}
                  size="small"
                  sx={{
                    background: 'rgba(197, 160, 40, 0.1)',
                    color: '#C5A028',
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    border: '1px solid rgba(197, 160, 40, 0.2)',
                  }}
                />
              </ListItem>
            );
          })}
        </List>

        <Box display="flex" alignItems="center" gap={1.5} mb={3}>
          <Shield sx={{ fontSize: 16, color: '#1E6F6F' }} />
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>
            256-bit encrypted · Processed in under 5 minutes · PSD2 & GDPR compliant
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Box display="flex" justifyContent="space-between" mb={0.5}>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>Verification progress</Typography>
            <Typography variant="caption" sx={{ color: '#C5A028', fontWeight: 600 }}>0%</Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={0}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: 'rgba(197, 160, 40, 0.1)',
              '& .MuiLinearProgress-bar': {
                background: 'linear-gradient(90deg, #C5A028, #8626E9)',
                borderRadius: 3,
              }
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, borderTop: '1px solid rgba(197, 160, 40, 0.2)', pt: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          fullWidth
          sx={{
            py: 1.5,
            borderColor: 'rgba(197, 160, 40, 0.3)',
            color: 'rgba(255,255,255,0.6)',
            borderRadius: '40px',
            '&:hover': {
              borderColor: '#C5A028',
              backgroundColor: 'rgba(197, 160, 40, 0.1)',
              color: 'white',
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
            background: '#8626E9',
            color: 'white',
            fontWeight: 600,
            borderRadius: '40px',
            '&:hover': {
              background: '#C5A028',
              transform: 'scale(1.02)',
            },
            '&:disabled': {
              background: 'rgba(197, 160, 40, 0.3)',
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
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState<WalletBalance | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // KYC State
  const [kycOpen, setKycOpen] = useState(false);
  const [kycPayload, setKycPayload] = useState<KycPayload | null>(null);
  const [kycStatus, setKycStatus] = useState<'pending' | 'verified' | 'unverified'>('unverified');
  const [showKycBanner, setShowKycBanner] = useState(true);

  // Bank search state
  const [bankSearchTerm, setBankSearchTerm] = useState('');

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

  // Filter banks based on search
  const filteredBanks = globalBanks.filter(bank => 
    bank.type === 'bank' && (
      bankSearchTerm === '' ||
      bank.name.toLowerCase().includes(bankSearchTerm.toLowerCase()) ||
      bank.shortName.toLowerCase().includes(bankSearchTerm.toLowerCase()) ||
      bank.country.toLowerCase().includes(bankSearchTerm.toLowerCase()) ||
      bank.region.toLowerCase().includes(bankSearchTerm.toLowerCase())
    )
  );

  // Inject number fix style
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = numberFixStyle;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

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
              <Autocomplete
                options={filteredBanks}
                getOptionLabel={(option) => `${option.name} (${option.country})`}
                value={globalBanks.find(b => b.name === formData.destination_details.bank_name) || null}
                onChange={(_, newValue) => {
                  handleChange({
                    target: {
                      name: 'destination_details.bank_name',
                      value: newValue?.name || ''
                    }
                  } as any);
                }}
                onInputChange={(_, newInputValue) => {
                  setBankSearchTerm(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search Bank Name"
                    required
                    placeholder="Type to search by bank name, country, or region..."
                    className={styles.inputField}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props} className={styles.bankOption}>
                    <Box display="flex" alignItems="center" gap={1} width="100%">
                      <span style={{ fontSize: '1.5rem' }}>{option.logo}</span>
                      <Box flex={1}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="body2" fontWeight={500}>
                            {option.name}
                          </Typography>
                          {option.popular && (
                            <Chip 
                              label="Popular" 
                              size="small" 
                              sx={{ 
                                backgroundColor: 'rgba(197, 160, 40, 0.12)', 
                                color: '#C5A028',
                                height: '20px',
                                fontSize: '0.7rem',
                                border: '1px solid rgba(197, 160, 40, 0.3)',
                              }} 
                            />
                          )}
                        </Box>
                        <Typography variant="caption" color="textSecondary">
                          {option.country} • {option.region}
                          {option.swiftCode && ` • SWIFT: ${option.swiftCode}`}
                        </Typography>
                      </Box>
                    </Box>
                  </li>
                )}
                loadingText="Searching banks..."
                noOptionsText="No banks found"
                filterOptions={(x) => x}
              />
            </Grid>
            
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Account Number"
                name="destination_details.account_number"
                value={formData.destination_details.account_number || ''}
                onChange={handleChange}
                required
                className={styles.inputField}
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
                className={styles.inputField}
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
                className={styles.inputField}
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
                className={styles.inputField}
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
                className={styles.inputField}
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
                className={styles.inputField}
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
                className={styles.inputField}
              />
            </Grid>
          </>
        );

      default:
        return null;
    }
  };

  if (loading && !balance) {
    return (
      <Container maxWidth="lg" className={styles.container}>
        <Box mb={4}>
          <div className={styles.skeletonTextShort} style={{ height: '40px', marginBottom: '20px' }}></div>
          <div className={styles.skeletonText} style={{ height: '48px', width: '70%' }}></div>
          <div className={styles.skeletonTextShort} style={{ width: '40%' }}></div>
        </Box>
        
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <div className={styles.skeletonCard}></div>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <div className={styles.skeletonCard}>
              <div style={{ padding: '24px' }}>
                <div className={styles.skeletonText} style={{ width: '40%' }}></div>
                {[1,2,3,4].map(i => (
                  <div key={i} className={styles.skeletonText} style={{ marginTop: '20px' }}></div>
                ))}
                <div className={styles.skeletonButton} style={{ marginTop: '24px' }}></div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    );
  }

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
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Send Money
        </Typography>
        <Typography color="textSecondary" sx={{ fontSize: '1rem' }}>
          Transfer funds to bank accounts, mobile wallets, or cryptocurrency addresses
        </Typography>
      </Box>

      {/* KYC Banner - Updated with new styles */}
      {showKycBanner && kycStatus !== 'verified' && (
        <Paper className={styles.kycBanner}>
          <Box className={styles.kycBannerContent}>
            <Box className={styles.kycBannerText}>
              <Typography variant="h6">Verification Required</Typography>
              <Typography variant="body2">
                Complete KYC verification to unlock unlimited transfers and higher limits. 
                Transfers over $1,500 require verified identity.
              </Typography>
            </Box>
            
            <Box className={styles.kycBannerActions}>
              <Button
                variant="contained"
                onClick={handleStartKYC}
                startIcon={<VerifiedUser />}
                className={styles.primaryButton}
              >
                Start Verification
              </Button>
              <Button
                variant="outlined"
                onClick={() => setShowKycBanner(false)}
                className={styles.secondaryButton}
              >
                Remind Later
              </Button>
            </Box>
          </Box>
        </Paper>
      )}

      {/* KYC Verified Badge */}
      {kycStatus === 'verified' && (
        <Paper
          elevation={0}
          sx={{
            mb: 3,
            p: 2.5,
            background: 'rgba(30, 111, 111, 0.05)',
            border: '1px solid rgba(30, 111, 111, 0.2)',
            borderRadius: 3,
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Box sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background: 'rgba(30, 111, 111, 0.1)',
              border: '1px solid rgba(30, 111, 111, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <CheckCircle sx={{ color: '#1E6F6F', fontSize: 20 }} />
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ color: '#0A2540', fontWeight: 600 }}>
                Identity Verified ✓
              </Typography>
              <Typography variant="caption" sx={{ color: '#475569' }}>
                Your KYC is complete. You can transfer up to $25,000 per transaction.
              </Typography>
            </Box>
          </Box>
        </Paper>
      )}

      <Grid container spacing={4}>
        {/* Balance Card - Updated with premium gradient */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card className={styles.balanceCard}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <AccountBalanceWallet sx={{ color: '#C5A028', fontSize: 28 }} />
                <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>
                  Available Balance
                </Typography>
              </Box>
              
              <Typography variant="h3" className={styles.balanceAmount}>
                ${balance ? balance.balance.toFixed(2) : '0.00'}
              </Typography>
              
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', mb: 3 }}>
                {balance?.currency || 'USD'}
              </Typography>
              
              {/* Limit Section with diminishing shades */}
              <Box className={styles.limitSection}>
                <Box className={styles.limitRow}>
                  <Typography className={styles.limitLabel}>Per Transaction</Typography>
                  <Typography className={styles.limitValue}>
                    {kycStatus === 'verified' ? '$25,000' : '$1,500'}
                  </Typography>
                </Box>
                <Box className={styles.limitRow}>
                  <Typography className={styles.limitLabel}>Daily Limit</Typography>
                  <Typography className={styles.limitValue}>
                    {kycStatus === 'verified' ? '$100,000' : '$5,000'}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Transfer Form - Updated with new styles */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper className={styles.paper}>
            <Box className={styles.paperHeader}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#0A2540' }}>
                Transfer Details
              </Typography>
              <Chip
                className={`${styles.statusChip} ${kycStatus === 'verified' ? styles.verified : styles.required}`}
                label={kycStatus === 'verified' ? 'KYC Verified' : 'KYC Required'}
                size="small"
              />
            </Box>

            <Box className={styles.paperContent}>
              <form onSubmit={handleSubmit}>
                {error && (
                  <Alert severity="error" className={styles.errorAlert}>
                    {error}
                  </Alert>
                )}
                
                {success && (
                  <Alert severity="success" className={styles.successAlert}>
                    {success}
                  </Alert>
                )}

                <Box className={styles.formContainer}>
                  <Box className={styles.formGrid}>
                    {/* Amount */}
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        className={styles.inputField}
                        label="Amount"
                        name="amount"
                        type="number"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        InputProps={{
                          startAdornment: (
                            <Typography color="textSecondary" sx={{ mr: 1, fontWeight: 500 }}>
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
                        className={styles.inputField}
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
                      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: '#0A2540' }}>
                        Destination Type
                      </Typography>
                      <Box className={styles.destTypeButtons}>
                        <Button
                          className={`${styles.destTypeButton} ${formData.destination_type === 'bank' ? styles.active : ''}`}
                          onClick={() => handleDestinationTypeChange('bank')}
                        >
                          Bank Account
                        </Button>
                        <Button
                          className={`${styles.destTypeButton} ${formData.destination_type === 'mobile_wallet' ? styles.active : ''}`}
                          onClick={() => handleDestinationTypeChange('mobile_wallet')}
                        >
                          Mobile Wallet
                        </Button>
                        <Button
                          className={`${styles.destTypeButton} ${formData.destination_type === 'crypto' ? styles.active : ''}`}
                          onClick={() => handleDestinationTypeChange('crypto')}
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
                        className={styles.inputField}
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
                      <Box display="flex" justifyContent="flex-end" gap={2} sx={{ mt: 2 }}>
                        <Button
                          variant="outlined"
                          onClick={() => navigate('/dashboard')}
                          disabled={loading}
                          className={styles.secondaryButton}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          startIcon={loading ? <CircularProgress size={20} /> : <Send />}
                          disabled={loading}
                          className={styles.primaryButton}
                        >
                          {loading ? 'Processing...' : 'Submit Transfer'}
                        </Button>
                      </Box>
                    </Grid>
                  </Box>
                </Box>
              </form>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Transfer;