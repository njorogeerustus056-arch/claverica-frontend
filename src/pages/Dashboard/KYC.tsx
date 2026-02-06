import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  LinearProgress,
  Alert,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  CheckCircle,
  Pending,
  Error,
  Upload,
  Description,
  Assignment,
  HowToReg,
  Lock,
  ArrowForward,
  HourglassEmpty,
  VerifiedUser,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const KYC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [kycStatus, setKycStatus] = useState<any>(null);
  const [error, setError] = useState('');

  // Fetch KYC status on mount
  useEffect(() => {
    fetchKYCStatus();
  }, []);

  const fetchKYCStatus = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('`${import.meta.env.VITE_API_URL}`/api/kyc/simple-status/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setKycStatus(data);
      } else {
        setError('Failed to fetch KYC status');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStartVerification = () => {
    navigate('/dashboard/kyc/submit');
  };

  const handleCheckRequirements = () => {
    // Navigate to transfer or trigger KYC check
    navigate('/dashboard/transfer');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'success';
      case 'pending': return 'warning';
      case 'rejected': return 'error';
      case 'needs_correction': return 'warning';
      case 'under_review': return 'info';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle />;
      case 'pending': return <HourglassEmpty />;
      case 'rejected': return <Error />;
      case 'needs_correction': return <Assignment />;
      case 'under_review': return <Pending />;
      default: return <Description />;
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'approved': return 'Your identity is verified';
      case 'pending': return 'Your documents are under review';
      case 'rejected': return 'Your verification was rejected';
      case 'needs_correction': return 'Corrections needed in your documents';
      case 'under_review': return 'Your documents are being reviewed';
      case 'no_kyc': return 'No KYC documents submitted';
      default: return 'Status unknown';
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Identity Verification
        </Typography>
        <Typography color="textSecondary">
          Verify your identity to unlock full platform features
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Left Column: Status */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <VerifiedUser sx={{ mr: 2, fontSize: 40, color: 'primary.main' }} />
                <Box flex={1}>
                  <Typography variant="h5" gutterBottom>
                    Verification Status
                  </Typography>
                  
                  {kycStatus ? (
                    <Box>
                      <Box display="flex" alignItems="center" mb={2}>
                        <Chip
                          icon={getStatusIcon(kycStatus.status)}
                          label={kycStatus.status_display || getStatusMessage(kycStatus.status)}
                          color={getStatusColor(kycStatus.status)}
                          sx={{ mr: 2 }}
                        />
                        {kycStatus.is_approved && (
                          <Chip
                            icon={<CheckCircle />}
                            label="Verified"
                            color="success"
                            variant="outlined"
                          />
                        )}
                      </Box>

                      {/* Status Details */}
                      {kycStatus.submitted_at && (
                        <Typography variant="body2" color="textSecondary">
                          Submitted: {new Date(kycStatus.submitted_at).toLocaleDateString()}
                        </Typography>
                      )}
                      {kycStatus.reviewed_at && (
                        <Typography variant="body2" color="textSecondary">
                          Reviewed: {new Date(kycStatus.reviewed_at).toLocaleDateString()}
                        </Typography>
                      )}
                      {kycStatus.rejection_reason && (
                        <Alert severity="warning" sx={{ mt: 2 }}>
                          <Typography variant="body2">
                            <strong>Reason:</strong> {kycStatus.rejection_reason}
                          </Typography>
                        </Alert>
                      )}
                    </Box>
                  ) : (
                    <Typography variant="body1" color="textSecondary">
                      No verification documents submitted yet.
                    </Typography>
                  )}
                </Box>
              </Box>

              {/* Action Buttons */}
              <Box display="flex" gap={2} mt={3}>
                {(!kycStatus || kycStatus.status === 'no_kyc') ? (
                  <Button
                    variant="contained"
                    startIcon={<Upload />}
                    onClick={handleStartVerification}
                  >
                    Start Verification
                  </Button>
                ) : kycStatus.status === 'needs_correction' ? (
                  <Button
                    variant="contained"
                    startIcon={<Upload />}
                    onClick={handleStartVerification}
                  >
                    Resubmit Documents
                  </Button>
                ) : kycStatus.status === 'rejected' ? (
                  <Button
                    variant="contained"
                    startIcon={<Upload />}
                    onClick={handleStartVerification}
                  >
                    Submit New Documents
                  </Button>
                ) : null}

                {kycStatus?.is_approved ? (
                  <Button
                    variant="outlined"
                    startIcon={<CheckCircle />}
                    disabled
                  >
                    Verification Complete
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={handleCheckRequirements}
                  >
                    Check Requirements
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>

          {/* Requirements Card */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Verification Requirements
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Description color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Valid Government ID"
                    secondary="National ID, Passport, or Driver's License"
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <Assignment color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Clear Document Photos"
                    secondary="Front and back (if applicable), all text readable"
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <HowToReg color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Selfie with ID"
                    secondary="Photo of you holding your ID"
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <Lock color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Privacy Protected"
                    secondary="Documents are encrypted and securely stored"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column: Benefits */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Benefits of Verification
              </Typography>
              
              <List dense>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircle color="success" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Higher Transfer Limits"
                    secondary="Up to $10,000 per transaction"
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircle color="success" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Full Crypto Access"
                    secondary="Buy, sell, and trade cryptocurrencies"
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircle color="success" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Loan Eligibility"
                    secondary="Apply for personal and business loans"
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircle color="success" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Escrow Services"
                    secondary="Secure transaction protection"
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircle color="success" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Virtual Card"
                    secondary="Get a Claverica virtual debit card"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              
              <Box display="flex" flexDirection="column" gap={2}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Upload />}
                  onClick={handleStartVerification}
                >
                  {kycStatus?.status === 'no_kyc' ? 'Start Verification' : 'Update Documents'}
                </Button>
                
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Description />}
                  onClick={() => navigate('/dashboard/compliance')}
                >
                  View Compliance
                </Button>
                
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<ArrowForward />}
                  onClick={() => navigate('/dashboard/transfer')}
                >
                  Make a Transfer
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Processing Time Info */}
      <Alert severity="info" sx={{ mt: 3 }}>
        <Typography variant="body2">
          <strong>Processing Time:</strong> 24-48 hours during business days. 
          You'll receive an email notification when your verification is complete.
        </Typography>
      </Alert>
    </Container>
  );
};

export default KYC;
