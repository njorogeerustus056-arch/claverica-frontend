"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var material_1 = require("@mui/material");
var icons_material_1 = require("@mui/icons-material");
var AuthContext_1 = require("../../context/AuthContext");
var KYCSubmit = function () {
    var navigate = (0, react_router_dom_1.useNavigate)();
    var location = (0, react_router_dom_1.useLocation)();
    var _a = (0, AuthContext_1.useAuth)(), user = _a.user, token = _a.token; // Get token from auth
    var _b = (0, react_1.useState)(0), activeStep = _b[0], setActiveStep = _b[1];
    var _c = (0, react_1.useState)(false), loading = _c[0], setLoading = _c[1];
    var _d = (0, react_1.useState)(false), submitting = _d[0], setSubmitting = _d[1];
    var _e = (0, react_1.useState)(''), error = _e[0], setError = _e[1];
    var _f = (0, react_1.useState)(false), success = _f[0], setSuccess = _f[1];
    // KYC Data
    var _g = (0, react_1.useState)('national_id'), documentType = _g[0], setDocumentType = _g[1];
    // File states
    var _h = (0, react_1.useState)(null), idFront = _h[0], setIdFront = _h[1];
    var _j = (0, react_1.useState)(null), idBack = _j[0], setIdBack = _j[1];
    var _k = (0, react_1.useState)(null), selfie = _k[0], setSelfie = _k[1];
    // Preview states
    var _l = (0, react_1.useState)(null), previewUrl = _l[0], setPreviewUrl = _l[1];
    var _m = (0, react_1.useState)(''), previewTitle = _m[0], setPreviewTitle = _m[1];
    // Extract from location state
    var _o = location.state || {}, amount = _o.amount, service_type = _o.service_type, redirectTo = _o.redirectTo;
    var steps = ['Document Type', 'Upload Documents', 'Review & Submit'];
    // Handle file upload
    var handleFileUpload = function (setter, file, title) {
        // Validate file type - BACKEND ONLY ACCEPTS IMAGES
        var validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
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
    var handlePreview = function (file, title) {
        if (file) {
            var url = URL.createObjectURL(file);
            setPreviewUrl(url);
            setPreviewTitle(title);
        }
    };
    // Close preview
    var handleClosePreview = function () {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
            setPreviewTitle('');
        }
    };
    // Handle next step
    var handleNext = function () {
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
            setActiveStep(function (prev) { return prev + 1; });
        }
        else {
            handleSubmit();
        }
    };
    // Handle back
    var handleBack = function () {
        setActiveStep(function (prev) { return prev - 1; });
        setError('');
    };
    // Submit KYC - FIXED VERSION
    var handleSubmit = function () { return __awaiter(void 0, void 0, void 0, function () {
        var formDataToSend, authToken, response, contentType, responseData, errorMsg, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setSubmitting(true);
                    setError('');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    formDataToSend = new FormData();
                    // âœ… CORRECT FIELD NAMES (match backend exactly)
                    formDataToSend.append('document_type', documentType);
                    if (idFront)
                        formDataToSend.append('id_front_image', idFront); // âœ… Changed from 'id_front'
                    if (idBack)
                        formDataToSend.append('id_back_image', idBack); // âœ… Changed from 'id_back'
                    if (selfie)
                        formDataToSend.append('facial_image', selfie); // âœ… Changed from 'selfie'
                    authToken = token || localStorage.getItem('token');
                    if (!authToken) {
                        setError('Authentication required. Please login again.');
                        setSubmitting(false);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, fetch('`${import.meta.env.VITE_API_URL}`/api/kyc/documents/', {
                            method: 'POST',
                            headers: {
                                'Authorization': "Bearer ".concat(authToken) // âœ… Add auth header
                                // NO 'Content-Type' header - browser sets it for FormData
                            },
                            body: formDataToSend
                        })];
                case 2:
                    response = _a.sent();
                    contentType = response.headers.get('content-type');
                    if (!contentType || !contentType.includes('application/json')) {
                        // Server returned HTML (likely 404 page)
                        throw new Error('Server returned unexpected response. Check if endpoint exists.');
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    responseData = _a.sent();
                    if (response.ok) {
                        setSuccess(true);
                        // Redirect after success
                        setTimeout(function () {
                            if (redirectTo) {
                                navigate(redirectTo, {
                                    state: {
                                        kycSubmitted: true,
                                        message: 'KYC submitted successfully'
                                    }
                                });
                            }
                            else {
                                navigate('/dashboard', {
                                    state: {
                                        kycSubmitted: true,
                                        message: 'KYC submitted successfully'
                                    }
                                });
                            }
                        }, 2000);
                    }
                    else {
                        errorMsg = responseData.message ||
                            responseData.detail ||
                            responseData.error ||
                            'KYC submission failed';
                        setError(errorMsg);
                    }
                    return [3 /*break*/, 6];
                case 4:
                    err_1 = _a.sent();
                    console.error('KYC submission error:', err_1);
                    // Better error messages
                    if (err_1.message.includes('Unexpected token')) {
                        setError('Server returned HTML instead of JSON. The API endpoint may not exist. Check backend routes.');
                    }
                    else if (err_1.message.includes('Network error')) {
                        setError('Network error. Please check your connection and try again.');
                    }
                    else {
                        setError(err_1.message || 'An error occurred during submission.');
                    }
                    return [3 /*break*/, 6];
                case 5:
                    setSubmitting(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    // Get step content
    var getStepContent = function (step) {
        switch (step) {
            case 0:
                return (<material_1.Box sx={{ mt: 3 }}>
            <material_1.Typography variant="h6" gutterBottom>
              Select Document Type
            </material_1.Typography>
            <material_1.Typography color="textSecondary" paragraph>
              Choose the document you'll use for verification
            </material_1.Typography>
            
            <material_1.FormControl component="fieldset" sx={{ mt: 2 }}>
              <material_1.RadioGroup value={documentType} onChange={function (e) { return setDocumentType(e.target.value); }}>
                <material_1.Card sx={{
                        mb: 2,
                        border: documentType === 'national_id' ? '2px solid #1976d2' : '1px solid #e0e0e0',
                        cursor: 'pointer'
                    }} onClick={function () { return setDocumentType('national_id'); }}>
                  <material_1.CardContent>
                    <material_1.FormControlLabel value="national_id" control={<material_1.Radio />} label={<material_1.Box>
                          <material_1.Typography variant="subtitle1" fontWeight="bold">
                            National ID Card
                          </material_1.Typography>
                          <material_1.Typography variant="body2" color="textSecondary">
                            Upload front and back of your national ID
                          </material_1.Typography>
                        </material_1.Box>}/>
                  </material_1.CardContent>
                </material_1.Card>
                
                <material_1.Card sx={{
                        mb: 2,
                        border: documentType === 'passport' ? '2px solid #1976d2' : '1px solid #e0e0e0',
                        cursor: 'pointer'
                    }} onClick={function () { return setDocumentType('passport'); }}>
                  <material_1.CardContent>
                    <material_1.FormControlLabel value="passport" control={<material_1.Radio />} label={<material_1.Box>
                          <material_1.Typography variant="subtitle1" fontWeight="bold">
                            Passport
                          </material_1.Typography>
                          <material_1.Typography variant="body2" color="textSecondary">
                            Upload passport photo page only
                          </material_1.Typography>
                        </material_1.Box>}/>
                  </material_1.CardContent>
                </material_1.Card>
                
                <material_1.Card sx={{
                        border: documentType === 'driver_license' ? '2px solid #1976d2' : '1px solid #e0e0e0',
                        cursor: 'pointer'
                    }} onClick={function () { return setDocumentType('driver_license'); }}>
                  <material_1.CardContent>
                    <material_1.FormControlLabel value="driver_license" control={<material_1.Radio />} label={<material_1.Box>
                          <material_1.Typography variant="subtitle1" fontWeight="bold">
                            Driver's License
                          </material_1.Typography>
                          <material_1.Typography variant="body2" color="textSecondary">
                            Upload front and back of your driver's license
                          </material_1.Typography>
                        </material_1.Box>}/>
                  </material_1.CardContent>
                </material_1.Card>
              </material_1.RadioGroup>
            </material_1.FormControl>
            
            {/* Requirements */}
            <material_1.Alert severity="info" sx={{ mt: 3 }}>
              <material_1.Typography variant="body2">
                <strong>Requirements:</strong> Clear, well-lit images â€¢ All text readable â€¢ No glare
              </material_1.Typography>
            </material_1.Alert>
          </material_1.Box>);
            case 1:
                return (<material_1.Box sx={{ mt: 3 }}>
            <material_1.Typography variant="h6" gutterBottom>
              Upload Documents
            </material_1.Typography>
            <material_1.Typography color="textSecondary" paragraph>
              Upload clear photos of your documents
            </material_1.Typography>
            
            <material_1.Grid container spacing={3}>
              {/* ID Front */}
              <material_1.Grid size={{ xs: 12, md: 6 }}>
                <material_1.Card variant="outlined">
                  <material_1.CardContent>
                    <material_1.Box display="flex" alignItems="center" mb={2}>
                      <icons_material_1.Description sx={{ mr: 1, color: 'primary.main' }}/>
                      <material_1.Typography variant="subtitle1" fontWeight="bold">
                        ID Front
                      </material_1.Typography>
                      <material_1.Chip label="Required" size="small" color="error" sx={{ ml: 2 }}/>
                    </material_1.Box>
                    
                    {idFront ? (<material_1.Box>
                        <material_1.Typography variant="body2" color="textSecondary">
                          {idFront.name}
                        </material_1.Typography>
                        <material_1.Box display="flex" gap={1} mt={2}>
                          <material_1.Button size="small" startIcon={<icons_material_1.Visibility />} onClick={function () { return handlePreview(idFront, 'ID Front'); }}>
                            Preview
                          </material_1.Button>
                          <material_1.Button size="small" color="error" startIcon={<icons_material_1.Delete />} onClick={function () { return setIdFront(null); }}>
                            Remove
                          </material_1.Button>
                        </material_1.Box>
                      </material_1.Box>) : (<material_1.Button variant="outlined" component="label" startIcon={<icons_material_1.Upload />} fullWidth>
                        Upload ID Front
                        <input type="file" hidden accept="image/*" // âœ… Remove .pdf (backend only accepts images)
                     onChange={function (e) {
                            var _a;
                            var file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
                            if (file)
                                handleFileUpload(setIdFront, file, 'ID Front');
                        }}/>
                      </material_1.Button>)}
                  </material_1.CardContent>
                </material_1.Card>
              </material_1.Grid>
              
              {/* ID Back (not required for passport) */}
              {documentType !== 'passport' && (<material_1.Grid size={{ xs: 12, md: 6 }}>
                  <material_1.Card variant="outlined">
                    <material_1.CardContent>
                      <material_1.Box display="flex" alignItems="center" mb={2}>
                        <icons_material_1.Description sx={{ mr: 1, color: 'primary.main' }}/>
                        <material_1.Typography variant="subtitle1" fontWeight="bold">
                          ID Back
                        </material_1.Typography>
                        <material_1.Chip label="Required" size="small" color="error" sx={{ ml: 2 }}/>
                      </material_1.Box>
                      
                      {idBack ? (<material_1.Box>
                          <material_1.Typography variant="body2" color="textSecondary">
                            {idBack.name}
                          </material_1.Typography>
                          <material_1.Box display="flex" gap={1} mt={2}>
                            <material_1.Button size="small" startIcon={<icons_material_1.Visibility />} onClick={function () { return handlePreview(idBack, 'ID Back'); }}>
                              Preview
                            </material_1.Button>
                            <material_1.Button size="small" color="error" startIcon={<icons_material_1.Delete />} onClick={function () { return setIdBack(null); }}>
                              Remove
                            </material_1.Button>
                          </material_1.Box>
                        </material_1.Box>) : (<material_1.Button variant="outlined" component="label" startIcon={<icons_material_1.Upload />} fullWidth>
                          Upload ID Back
                          <input type="file" hidden accept="image/*" // âœ… Remove .pdf
                         onChange={function (e) {
                                var _a;
                                var file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
                                if (file)
                                    handleFileUpload(setIdBack, file, 'ID Back');
                            }}/>
                        </material_1.Button>)}
                    </material_1.CardContent>
                  </material_1.Card>
                </material_1.Grid>)}
              
              {/* Selfie */}
              <material_1.Grid size={{ xs: 12 }}>
                <material_1.Card variant="outlined">
                  <material_1.CardContent>
                    <material_1.Box display="flex" alignItems="center" mb={2}>
                      <icons_material_1.PhotoCamera sx={{ mr: 1, color: 'primary.main' }}/>
                      <material_1.Typography variant="subtitle1" fontWeight="bold">
                        Selfie with ID
                      </material_1.Typography>
                      <material_1.Chip label="Required" size="small" color="error" sx={{ ml: 2 }}/>
                    </material_1.Box>
                    
                    {selfie ? (<material_1.Box>
                        <material_1.Typography variant="body2" color="textSecondary">
                          {selfie.name}
                        </material_1.Typography>
                        <material_1.Box display="flex" gap={1} mt={2}>
                          <material_1.Button size="small" startIcon={<icons_material_1.Visibility />} onClick={function () { return handlePreview(selfie, 'Selfie with ID'); }}>
                            Preview
                          </material_1.Button>
                          <material_1.Button size="small" color="error" startIcon={<icons_material_1.Delete />} onClick={function () { return setSelfie(null); }}>
                            Remove
                          </material_1.Button>
                        </material_1.Box>
                      </material_1.Box>) : (<material_1.Button variant="outlined" component="label" startIcon={<icons_material_1.Upload />} fullWidth>
                        Upload Selfie with ID
                        <input type="file" hidden accept="image/*" onChange={function (e) {
                            var _a;
                            var file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
                            if (file)
                                handleFileUpload(setSelfie, file, 'Selfie with ID');
                        }}/>
                      </material_1.Button>)}
                    
                    <material_1.Typography variant="caption" color="textSecondary" sx={{ mt: 2, display: 'block' }}>
                      Take a clear photo of yourself holding your ID
                    </material_1.Typography>
                  </material_1.CardContent>
                </material_1.Card>
              </material_1.Grid>
            </material_1.Grid>
            
            {/* File Requirements */}
            <material_1.Alert severity="info" sx={{ mt: 3 }}>
              <material_1.Typography variant="body2">
                <strong>Accepted formats:</strong> JPG, PNG only â€¢ <strong>Max size:</strong> 5MB per file
              </material_1.Typography>
            </material_1.Alert>
          </material_1.Box>);
            case 2:
                return (<material_1.Box sx={{ mt: 3 }}>
            <material_1.Typography variant="h6" gutterBottom>
              Review & Submit
            </material_1.Typography>
            <material_1.Typography color="textSecondary" paragraph>
              Review your documents before submitting for verification
            </material_1.Typography>
            
            <material_1.Grid container spacing={3}>
              {/* User Information (Read-only) */}
              <material_1.Grid size={{ xs: 12, md: 6 }}>
                <material_1.Card variant="outlined">
                  <material_1.CardContent>
                    <material_1.Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Your Information
                    </material_1.Typography>
                    
                    <material_1.Box sx={{ mb: 2 }}>
                      <material_1.Typography variant="body2" color="textSecondary">
                        Name:
                      </material_1.Typography>
                      <material_1.Typography variant="body1">
                        {user === null || user === void 0 ? void 0 : user.first_name} {user === null || user === void 0 ? void 0 : user.last_name}
                      </material_1.Typography>
                    </material_1.Box>
                    
                    <material_1.Box sx={{ mb: 2 }}>
                      <material_1.Typography variant="body2" color="textSecondary">
                        Account Number:
                      </material_1.Typography>
                      <material_1.Typography variant="body1" fontWeight="bold" color="primary">
                        {user === null || user === void 0 ? void 0 : user.account_number}
                      </material_1.Typography>
                    </material_1.Box>
                    
                    <material_1.Box sx={{ mb: 2 }}>
                      <material_1.Typography variant="body2" color="textSecondary">
                        Email:
                      </material_1.Typography>
                      <material_1.Typography variant="body1">
                        {user === null || user === void 0 ? void 0 : user.email}
                      </material_1.Typography>
                    </material_1.Box>
                  </material_1.CardContent>
                </material_1.Card>
              </material_1.Grid>
              
              {/* Document Summary */}
              <material_1.Grid size={{ xs: 12, md: 6 }}>
                <material_1.Card variant="outlined">
                  <material_1.CardContent>
                    <material_1.Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Document Summary
                    </material_1.Typography>
                    
                    <material_1.Box sx={{ mb: 2 }}>
                      <material_1.Typography variant="body2" color="textSecondary">
                        Document Type:
                      </material_1.Typography>
                      <material_1.Typography variant="body1">
                        {documentType === 'national_id' ? 'National ID Card' :
                        documentType === 'passport' ? 'Passport' : 'Driver\'s License'}
                      </material_1.Typography>
                    </material_1.Box>
                    
                    <material_1.Box sx={{ mb: 2 }}>
                      <material_1.Typography variant="body2" color="textSecondary">
                        Uploaded Files:
                      </material_1.Typography>
                      <material_1.Box sx={{ mt: 1 }}>
                        {idFront && (<material_1.Chip icon={<icons_material_1.CheckCircle />} label="ID Front" color="success" size="small" sx={{ mr: 1, mb: 1 }}/>)}
                        {idBack && (<material_1.Chip icon={<icons_material_1.CheckCircle />} label="ID Back" color="success" size="small" sx={{ mr: 1, mb: 1 }}/>)}
                        {selfie && (<material_1.Chip icon={<icons_material_1.CheckCircle />} label="Selfie" color="success" size="small" sx={{ mr: 1, mb: 1 }}/>)}
                      </material_1.Box>
                    </material_1.Box>
                    
                    {/* Context */}
                    {amount && (<material_1.Box sx={{ mt: 3, p: 2, bgcolor: 'warning.light', borderRadius: 1 }}>
                        <material_1.Typography variant="body2">
                          <strong>Required for:</strong> ${amount} transfer
                        </material_1.Typography>
                      </material_1.Box>)}
                  </material_1.CardContent>
                </material_1.Card>
              </material_1.Grid>
            </material_1.Grid>
            
            {/* Verification Benefits */}
            <material_1.Card variant="outlined" sx={{ mt: 3, bgcolor: 'success.light' }}>
              <material_1.CardContent>
                <material_1.Box display="flex" alignItems="center">
                  <icons_material_1.VerifiedUser sx={{ mr: 2, color: 'success.main' }}/>
                  <material_1.Box>
                    <material_1.Typography variant="subtitle1" fontWeight="bold">
                      Benefits of Verification
                    </material_1.Typography>
                    <material_1.Typography variant="body2">
                      â€¢ Higher transfer limits â€¢ Full platform access â€¢ Enhanced security
                    </material_1.Typography>
                  </material_1.Box>
                </material_1.Box>
              </material_1.CardContent>
            </material_1.Card>
          </material_1.Box>);
            default:
                return null;
        }
    };
    // If success
    if (success) {
        return (<material_1.Container maxWidth="md" sx={{ py: 4 }}>
        <material_1.Paper sx={{ p: 4, textAlign: 'center' }}>
          <icons_material_1.CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }}/>
          <material_1.Typography variant="h4" gutterBottom>
            KYC Submitted Successfully!
          </material_1.Typography>
          <material_1.Typography color="textSecondary" paragraph>
            Your documents have been submitted for verification.
            You'll receive an email once the verification is complete.
          </material_1.Typography>
          
          {amount && (<material_1.Alert severity="info" sx={{ mb: 3, textAlign: 'left' }}>
              <material_1.Typography>
                Once verified, you can proceed with your ${amount} transfer
              </material_1.Typography>
            </material_1.Alert>)}
          
          <material_1.Button variant="contained" onClick={function () { return navigate(redirectTo || '/dashboard'); }} sx={{ mt: 2 }}>
            Return to Dashboard
          </material_1.Button>
        </material_1.Paper>
      </material_1.Container>);
    }
    return (<material_1.Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back Button */}
      <material_1.Box mb={3}>
        <material_1.Button startIcon={<icons_material_1.ArrowBack />} onClick={function () { return navigate('/dashboard'); }}>
          Back to Dashboard
        </material_1.Button>
      </material_1.Box>

      {/* Header */}
      <material_1.Typography variant="h4" gutterBottom>
        Identity Verification
      </material_1.Typography>
      
      {amount && (<material_1.Alert severity="warning" sx={{ mb: 3 }}>
          <material_1.Typography>
            Required for transfers over ${amount}
          </material_1.Typography>
        </material_1.Alert>)}
      
      <material_1.Typography color="textSecondary" paragraph>
        Complete verification to unlock higher limits and full platform access
      </material_1.Typography>

      {/* Stepper */}
      <material_1.Paper sx={{ p: 3, mb: 3 }}>
        <material_1.Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(function (label) { return (<material_1.Step key={label}>
              <material_1.StepLabel>{label}</material_1.StepLabel>
            </material_1.Step>); })}
        </material_1.Stepper>
      </material_1.Paper>

      {/* Content */}
      <material_1.Paper sx={{ p: 4 }}>
        {error && (<material_1.Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </material_1.Alert>)}
        
        {getStepContent(activeStep)}
        
        {/* Navigation Buttons */}
        <material_1.Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <material_1.Button onClick={handleBack} disabled={activeStep === 0 || submitting}>
            Back
          </material_1.Button>
          
          <material_1.Button variant="contained" onClick={handleNext} disabled={submitting} startIcon={submitting ? <material_1.CircularProgress size={20}/> : <icons_material_1.Send />}>
            {activeStep === steps.length - 1
            ? (submitting ? 'Submitting...' : 'Submit Verification')
            : 'Continue'}
          </material_1.Button>
        </material_1.Box>
      </material_1.Paper>

      {/* File Preview Dialog */}
      <material_1.Dialog open={!!previewUrl} onClose={handleClosePreview} maxWidth="md">
        <material_1.DialogTitle>
          <material_1.Box display="flex" justifyContent="space-between" alignItems="center">
            <material_1.Typography variant="h6">{previewTitle}</material_1.Typography>
            <material_1.IconButton onClick={handleClosePreview}>
              <icons_material_1.Close />
            </material_1.IconButton>
          </material_1.Box>
        </material_1.DialogTitle>
        <material_1.DialogContent>
          {previewUrl && (<material_1.Box sx={{ textAlign: 'center', mt: 2 }}>
              <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }}/>
            </material_1.Box>)}
        </material_1.DialogContent>
        <material_1.DialogActions>
          <material_1.Button onClick={handleClosePreview}>Close</material_1.Button>
        </material_1.DialogActions>
      </material_1.Dialog>
    </material_1.Container>);
};
exports.default = KYCSubmit;
