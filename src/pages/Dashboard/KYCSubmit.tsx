import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  ArrowBack,
  CheckCircle,
  Upload,
  Description,
  Person,
  PhotoCamera,
  VerifiedUser,
  Warning,
  Close,
  Send,
  Visibility,
  Delete,
} from '@mui/icons-material';
import { useAuthStore } from '../../lib/store/auth';
import styles from './KYCSubmit.module.css';

const KYCSubmit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  const token = localStorage.getItem('token');
  
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // KYC Data
  const [documentType, setDocumentType] = useState('national_id');
  
  // File states
  const [idFront, setIdFront] = useState<File | null>(null);
  const [idBack, setIdBack] = useState<File | null>(null);
  const [selfie, setSelfie] = useState<File | null>(null);
  
  // Preview states
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState('');
  
  // Extract from location state
  const { amount, service_type, redirectTo } = location.state || {};

  // ✅ FIXED: Clean up aria-hidden when component unmounts
  useEffect(() => {
    return () => {
      // Clean up any stray aria-hidden attributes
      const root = document.getElementById('root');
      if (root && root.getAttribute('aria-hidden') === 'true') {
        root.removeAttribute('aria-hidden');
      }
    };
  }, []);

  // Clean up preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const steps = ['Document Type', 'Upload Documents', 'Review & Submit'];

  // Handle file upload
  const handleFileUpload = (
    setter: React.Dispatch<React.SetStateAction<File | null>>,
    file: File,
    title: string
  ) => {
    // Validate file type - BACKEND ONLY ACCEPTS IMAGES
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload JPG or PNG files only (PDF not supported)');
      return;
    }
    
    // Validate file size (max 5MB - matches backend)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size should be less than 5MB');
      return;
    }
    
    setter(file);
    setError('');
  };

  // Open preview
  const handlePreview = (file: File | null, title: string) => {
    if (file) {
      // Clean up previous preview URL
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setPreviewTitle(title);
    }
  };

  // Close preview
  const handleClosePreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
      setPreviewTitle('');
    }
  };

  // Handle next step
  const handleNext = () => {
    // Validate current step
    if (activeStep === 0 && !documentType) {
      setError('Please select a document type');
      return;
    }
    
    if (activeStep === 1) {
      if (!idFront) {
        setError('Please upload front of ID document');
        return;
      }
      if (!selfie) {
        setError('Please upload a selfie with ID');
        return;
      }
      if (documentType !== 'passport' && !idBack) {
        setError('Please upload back of ID document');
        return;
      }
    }
    
    setError('');
    if (activeStep < steps.length - 1) {
      setActiveStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  // Handle back
  const handleBack = () => {
    setActiveStep(prev => prev - 1);
    setError('');
  };

  // Submit KYC - FIXED VERSION
  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      
      // CORRECT FIELD NAMES (match backend exactly)
      formDataToSend.append('document_type', documentType);
      if (idFront) formDataToSend.append('id_front_image', idFront);
      if (idBack) formDataToSend.append('id_back_image', idBack);
      if (selfie) formDataToSend.append('facial_image', selfie);
      
      // Get auth token (from context or localStorage)
      const authToken = token || localStorage.getItem('token');
      
      if (!authToken) {
        setError('Authentication required. Please login again.');
        setSubmitting(false);
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/kyc/documents/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        body: formDataToSend
      });

      // Handle HTML response (404 errors)
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        // Server returned HTML (likely 404 page)
        throw new Error('Server returned unexpected response. Check if endpoint exists.');
      }

      const responseData = await response.json();
      
      if (response.ok) {
        setSuccess(true);
        
        // Redirect after success
        setTimeout(() => {
          if (redirectTo) {
            navigate(redirectTo, { 
              state: { 
                kycSubmitted: true,
                message: 'KYC submitted successfully' 
              }
            });
          } else {
            navigate('/dashboard', { 
              state: { 
                kycSubmitted: true,
                message: 'KYC submitted successfully' 
              }
            });
          }
        }, 2000);
      } else {
        // Handle backend errors
        const errorMsg = responseData.message || 
                        responseData.detail || 
                        responseData.error || 
                        'KYC submission failed';
        setError(errorMsg);
      }
    } catch (err: any) {
      console.error('KYC submission error:', err);
      
      // Better error messages
      if (err.message.includes('Unexpected token')) {
        setError('Server returned HTML instead of JSON. The API endpoint may not exist. Check backend routes.');
      } else if (err.message.includes('Network error')) {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError(err.message || 'An error occurred during submission.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Get step content
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Select Document Type
            </Typography>
            <Typography color="textSecondary" paragraph>
              Choose the document you'll use for verification
            </Typography>
            
            <FormControl component="fieldset" sx={{ mt: 2 }}>
              <RadioGroup
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
              >
                <Card 
                  sx={{ 
                    mb: 2, 
                    border: documentType === 'national_id' ? '2px solid #1976d2' : '1px solid #e0e0e0',
                    cursor: 'pointer'
                  }}
                  onClick={() => setDocumentType('national_id')}
                >
                  <CardContent>
                    <FormControlLabel
                      value="national_id"
                      control={<Radio />}
                      label={
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            National ID Card
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Upload front and back of your national ID
                          </Typography>
                        </Box>
                      }
                    />
                  </CardContent>
                </Card>
                
                <Card 
                  sx={{ 
                    mb: 2,
                    border: documentType === 'passport' ? '2px solid #1976d2' : '1px solid #e0e0e0',
                    cursor: 'pointer'
                  }}
                  onClick={() => setDocumentType('passport')}
                >
                  <CardContent>
                    <FormControlLabel
                      value="passport"
                      control={<Radio />}
                      label={
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            Passport
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Upload passport photo page only
                          </Typography>
                        </Box>
                      }
                    />
                  </CardContent>
                </Card>
                
                <Card 
                  sx={{ 
                    border: documentType === 'driver_license' ? '2px solid #1976d2' : '1px solid #e0e0e0',
                    cursor: 'pointer'
                  }}
                  onClick={() => setDocumentType('driver_license')}
                >
                  <CardContent>
                    <FormControlLabel
                      value="driver_license"
                      control={<Radio />}
                      label={
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            Driver's License
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Upload front and back of your driver's license
                          </Typography>
                        </Box>
                      }
                    />
                  </CardContent>
                </Card>
              </RadioGroup>
            </FormControl>
            
            {/* Requirements */}
            <Alert severity="info" sx={{ mt: 3 }}>
              <Typography variant="body2">
                <strong>Requirements:</strong> Clear, well-lit images • All text readable • No glare
              </Typography>
            </Alert>
          </Box>
        );
        
      case 1:
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Upload Documents
            </Typography>
            <Typography color="textSecondary" paragraph>
              Upload clear photos of your documents
            </Typography>
            
            <Grid container spacing={3}>
              {/* ID Front */}
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Description sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="subtitle1" fontWeight="bold">
                        ID Front
                      </Typography>
                      <Chip 
                        label="Required" 
                        size="small" 
                        color="error" 
                        sx={{ ml: 2 }}
                      />
                    </Box>
                    
                    {idFront ? (
                      <Box>
                        <Typography variant="body2" color="textSecondary">
                          {idFront.name}
                        </Typography>
                        <Box display="flex" gap={1} mt={2}>
                          <Button
                            size="small"
                            startIcon={<Visibility />}
                            onClick={() => handlePreview(idFront, 'ID Front')}
                          >
                            Preview
                          </Button>
                          <Button
                            size="small"
                            color="error"
                            startIcon={<Delete />}
                            onClick={() => setIdFront(null)}
                          >
                            Remove
                          </Button>
                        </Box>
                      </Box>
                    ) : (
                      <Button
                        variant="outlined"
                        component="label"
                        startIcon={<Upload />}
                        fullWidth
                      >
                        Upload ID Front
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(setIdFront, file, 'ID Front');
                          }}
                        />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Grid>
              
              {/* ID Back (not required for passport) */}
              {documentType !== 'passport' && (
                <Grid item xs={12} md={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box display="flex" alignItems="center" mb={2}>
                        <Description sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="subtitle1" fontWeight="bold">
                          ID Back
                        </Typography>
                        <Chip 
                          label="Required" 
                          size="small" 
                          color="error" 
                          sx={{ ml: 2 }}
                        />
                      </Box>
                      
                      {idBack ? (
                        <Box>
                          <Typography variant="body2" color="textSecondary">
                            {idBack.name}
                          </Typography>
                          <Box display="flex" gap={1} mt={2}>
                            <Button
                              size="small"
                              startIcon={<Visibility />}
                              onClick={() => handlePreview(idBack, 'ID Back')}
                            >
                              Preview
                            </Button>
                            <Button
                              size="small"
                              color="error"
                              startIcon={<Delete />}
                              onClick={() => setIdBack(null)}
                            >
                              Remove
                            </Button>
                          </Box>
                        </Box>
                      ) : (
                        <Button
                          variant="outlined"
                          component="label"
                          startIcon={<Upload />}
                          fullWidth
                        >
                          Upload ID Back
                          <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload(setIdBack, file, 'ID Back');
                            }}
                          />
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              )}
              
              {/* Selfie */}
              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <PhotoCamera sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="subtitle1" fontWeight="bold">
                        Selfie with ID
                      </Typography>
                      <Chip 
                        label="Required" 
                        size="small" 
                        color="error" 
                        sx={{ ml: 2 }}
                      />
                    </Box>
                    
                    {selfie ? (
                      <Box>
                        <Typography variant="body2" color="textSecondary">
                          {selfie.name}
                        </Typography>
                        <Box display="flex" gap={1} mt={2}>
                          <Button
                            size="small"
                            startIcon={<Visibility />}
                            onClick={() => handlePreview(selfie, 'Selfie with ID')}
                          >
                            Preview
                          </Button>
                          <Button
                            size="small"
                            color="error"
                            startIcon={<Delete />}
                            onClick={() => setSelfie(null)}
                          >
                            Remove
                          </Button>
                        </Box>
                      </Box>
                    ) : (
                      <Button
                        variant="outlined"
                        component="label"
                        startIcon={<Upload />}
                        fullWidth
                      >
                        Upload Selfie with ID
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(setSelfie, file, 'Selfie with ID');
                          }}
                        />
                      </Button>
                    )}
                    
                    <Typography variant="caption" color="textSecondary" sx={{ mt: 2, display: 'block' }}>
                      Take a clear photo of yourself holding your ID
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            
            {/* File Requirements */}
            <Alert severity="info" sx={{ mt: 3 }}>
              <Typography variant="body2">
                <strong>Accepted formats:</strong> JPG, PNG only • <strong>Max size:</strong> 5MB per file
              </Typography>
            </Alert>
          </Box>
        );
        
      case 2:
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Review & Submit
            </Typography>
            <Typography color="textSecondary" paragraph>
              Review your documents before submitting for verification
            </Typography>
            
            <Grid container spacing={3}>
              {/* User Information (Read-only) */}
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Your Information
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="textSecondary">
                        Name:
                      </Typography>
                      <Typography variant="body1">
                        {user?.first_name} {user?.last_name}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="textSecondary">
                        Account Number:
                      </Typography>
                      <Typography variant="body1" fontWeight="bold" color="primary">
                        {user?.account_number}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="textSecondary">
                        Email:
                      </Typography>
                      <Typography variant="body1">
                        {user?.email}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              {/* Document Summary */}
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Document Summary
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="textSecondary">
                        Document Type:
                      </Typography>
                      <Typography variant="body1">
                        {documentType === 'national_id' ? 'National ID Card' :
                         documentType === 'passport' ? 'Passport' : 'Driver\'s License'}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="textSecondary">
                        Uploaded Files:
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        {idFront && (
                          <Chip 
                            icon={<CheckCircle />} 
                            label="ID Front" 
                            color="success" 
                            size="small" 
                            sx={{ mr: 1, mb: 1 }}
                          />
                        )}
                        {idBack && (
                          <Chip 
                            icon={<CheckCircle />} 
                            label="ID Back" 
                            color="success" 
                            size="small" 
                            sx={{ mr: 1, mb: 1 }}
                          />
                        )}
                        {selfie && (
                          <Chip 
                            icon={<CheckCircle />} 
                            label="Selfie" 
                            color="success" 
                            size="small" 
                            sx={{ mr: 1, mb: 1 }}
                          />
                        )}
                      </Box>
                    </Box>
                    
                    {/* Context */}
                    {amount && (
                      <Box sx={{ mt: 3, p: 2, bgcolor: 'warning.light', borderRadius: 1 }}>
                        <Typography variant="body2">
                          <strong>Required for:</strong> ${amount} transfer
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            
            {/* Verification Benefits */}
            <Card variant="outlined" sx={{ mt: 3, bgcolor: 'success.light' }}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <VerifiedUser sx={{ mr: 2, color: 'success.main' }} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Benefits of Verification
                    </Typography>
                    <Typography variant="body2">
                      • Higher transfer limits • Full platform access • Enhanced security
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        );
        
      default:
        return null;
    }
  };

  // If success
  if (success) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            KYC Submitted Successfully!
          </Typography>
          <Typography color="textSecondary" paragraph>
            Your documents have been submitted for verification.
            You'll receive an email once the verification is complete.
          </Typography>
          
          {amount && (
            <Alert severity="info" sx={{ mb: 3, textAlign: 'left' }}>
              <Typography>
                Once verified, you can proceed with your ${amount} transfer
              </Typography>
            </Alert>
          )}
          
          <Button
            variant="contained"
            onClick={() => navigate(redirectTo || '/dashboard')}
            sx={{ mt: 2 }}
          >
            Return to Dashboard
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back Button */}
      <Box mb={3}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </Button>
      </Box>

      {/* Header */}
      <Typography variant="h4" gutterBottom>
        Identity Verification
      </Typography>
      
      {amount && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography>
            Required for transfers over ${amount}
          </Typography>
        </Alert>
      )}
      
      <Typography color="textSecondary" paragraph>
        Complete verification to unlock higher limits and full platform access
      </Typography>

      {/* Stepper */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {/* Content */}
      <Paper sx={{ p: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        {getStepContent(activeStep)}
        
        {/* Navigation Buttons */}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            onClick={handleBack}
            disabled={activeStep === 0 || submitting}
          >
            Back
          </Button>
          
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={submitting}
            startIcon={submitting ? <CircularProgress size={20} /> : <Send />}
          >
            {activeStep === steps.length - 1 
              ? (submitting ? 'Submitting...' : 'Submit Verification')
              : 'Continue'
            }
          </Button>
        </Box>
      </Paper>

      {/* ✅ FIXED: File Preview Dialog with proper focus management */}
      <Dialog 
        open={!!previewUrl} 
        onClose={handleClosePreview} 
        maxWidth="md"
        // ✅ Added these props to fix focus management and aria-hidden warning
        disableEnforceFocus
        disableAutoFocus
        keepMounted={false}
        // ✅ Add transition to prevent focus trapping
        transitionDuration={300}
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">{previewTitle}</Typography>
            <IconButton onClick={handleClosePreview} size="small">
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {previewUrl && (
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <img
                src={previewUrl}
                alt="Preview"
                style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePreview}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default KYCSubmit;