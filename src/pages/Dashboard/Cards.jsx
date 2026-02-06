"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var material_1 = require("@mui/material");
var icons_material_1 = require("@mui/icons-material");
var framer_motion_1 = require("framer-motion");
var auth_1 = require("../../lib/store/auth");
var api_1 = require("../../services/api");
var Cards = function () {
    var user = (0, auth_1.useAuthStore)().user;
    var _a = (0, react_1.useState)([]), cards = _a[0], setCards = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(false), refreshing = _c[0], setRefreshing = _c[1];
    var _d = (0, react_1.useState)(null), error = _d[0], setError = _d[1];
    var _e = (0, react_1.useState)(false), openCreateDialog = _e[0], setOpenCreateDialog = _e[1];
    var _f = (0, react_1.useState)(false), openCardDetails = _f[0], setOpenCardDetails = _f[1];
    var _g = (0, react_1.useState)(null), selectedCard = _g[0], setSelectedCard = _g[1];
    var _h = (0, react_1.useState)({
        cardholderName: '',
        colorScheme: 'blue-gradient',
        isPrimary: false,
        cardType: 'virtual',
    }), newCard = _h[0], setNewCard = _h[1];
    var _j = (0, react_1.useState)(0), activeTab = _j[0], setActiveTab = _j[1];
    var _k = (0, react_1.useState)(null), copiedCardNumber = _k[0], setCopiedCardNumber = _k[1];
    var _l = (0, react_1.useState)(null), copiedAccountNumber = _l[0], setCopiedAccountNumber = _l[1];
    var _m = (0, react_1.useState)({ open: false, message: '', severity: 'info' }), snackbar = _m[0], setSnackbar = _m[1];
    var totalBalance = cards.reduce(function (sum, card) { return sum + card.balance; }, 0);
    var activeCards = cards.filter(function (c) { return c.isActive; }).length;
    var virtualCards = cards.filter(function (c) { return c.type === 'virtual'; }).length;
    var colorSchemes = [
        { value: 'blue-gradient', label: 'Blue Ocean', color: '#2196F3' },
        { value: 'purple-gradient', label: 'Purple Dream', color: '#9C27B0' },
        { value: 'green-gradient', label: 'Green Forest', color: '#4CAF50' },
        { value: 'orange-gradient', label: 'Orange Sunset', color: '#FF9800' },
        { value: 'dark-gradient', label: 'Dark Night', color: '#263238' },
        { value: 'gold-gradient', label: 'Gold Elite', color: '#FFD700' },
    ];
    (0, react_1.useEffect)(function () {
        fetchCards();
    }, []);
    var fetchCards = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, transformedCards, err_1, errorMsg;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 2, 3, 4]);
                    setLoading(true);
                    console.log('Fetching cards...');
                    return [4 /*yield*/, api_1.default.get('/api/cards/user-cards/')];
                case 1:
                    response = _d.sent();
                    console.log('Cards API response:', response.data);
                    transformedCards = ((_a = response.data.cards) === null || _a === void 0 ? void 0 : _a.map(function (card) { return ({
                        id: card.id,
                        type: card.type || 'virtual',
                        last4: card.last4 || (card.last_four || '4242').slice(-4),
                        balance: card.balance || 0,
                        expiry: card.expiry || card.expiry_date || '12/25',
                        isActive: card.isActive !== undefined ? card.isActive : (card.status === 'active'),
                        color: card.color || card.color_scheme || 'blue-gradient',
                        brand: card.brand || (card.card_type === 'visa' ? 'Visa' : 'Mastercard'),
                        cardholderName: card.cardholderName || card.display_name || card.cardholder_name,
                        maskedNumber: card.maskedNumber || card.masked_number || "**** **** **** ".concat(card.last_four || '4242'),
                        isPrimary: card.isPrimary || card.is_primary || false,
                        accountNumber: card.accountNumber || (user === null || user === void 0 ? void 0 : user.account_number),
                    }); })) || [];
                    setCards(transformedCards);
                    setError(null);
                    return [3 /*break*/, 4];
                case 2:
                    err_1 = _d.sent();
                    console.error('Error fetching cards:', err_1);
                    errorMsg = ((_c = (_b = err_1.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.error) || err_1.message || 'Failed to load cards';
                    setError(errorMsg);
                    setSnackbar({
                        open: true,
                        message: errorMsg,
                        severity: 'error',
                    });
                    return [3 /*break*/, 4];
                case 3:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleCreateCard = function () { return __awaiter(void 0, void 0, void 0, function () {
        var payload, response, newCardData, err_2, errorMsg;
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    if (!newCard.cardholderName.trim()) {
                        setSnackbar({
                            open: true,
                            message: 'Please enter cardholder name',
                            severity: 'error',
                        });
                        return [2 /*return*/];
                    }
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 3, 4, 5]);
                    setRefreshing(true);
                    payload = {
                        cardholder_name: newCard.cardholderName,
                        color_scheme: newCard.colorScheme,
                        is_primary: newCard.isPrimary,
                        card_type: newCard.cardType,
                    };
                    console.log('Creating card with payload:', payload);
                    return [4 /*yield*/, api_1.default.post('/api/cards/', payload)];
                case 2:
                    response = _e.sent();
                    console.log('Card creation response:', response.data);
                    newCardData = {
                        id: response.data.id,
                        type: response.data.card_type || 'virtual',
                        last4: ((_a = response.data.last_four) === null || _a === void 0 ? void 0 : _a.slice(-4)) || '4242',
                        balance: response.data.balance || 0,
                        expiry: response.data.expiry_date || '12/25',
                        isActive: response.data.status === 'active',
                        color: response.data.color_scheme || 'blue-gradient',
                        brand: response.data.brand || 'Visa',
                        cardholderName: response.data.cardholder_name,
                        maskedNumber: "**** **** **** ".concat(((_b = response.data.last_four) === null || _b === void 0 ? void 0 : _b.slice(-4)) || '4242'),
                        isPrimary: response.data.is_primary || false,
                        accountNumber: user === null || user === void 0 ? void 0 : user.account_number,
                    };
                    setCards(__spreadArray(__spreadArray([], cards, true), [newCardData], false));
                    setOpenCreateDialog(false);
                    setNewCard({
                        cardholderName: '',
                        colorScheme: 'blue-gradient',
                        isPrimary: false,
                        cardType: 'virtual',
                    });
                    setSnackbar({
                        open: true,
                        message: 'Card created successfully!',
                        severity: 'success',
                    });
                    return [3 /*break*/, 5];
                case 3:
                    err_2 = _e.sent();
                    console.error('Card creation error:', err_2);
                    errorMsg = ((_d = (_c = err_2.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.error) || err_2.message || 'Failed to create card';
                    setSnackbar({
                        open: true,
                        message: errorMsg,
                        severity: 'error',
                    });
                    return [3 /*break*/, 5];
                case 4:
                    setRefreshing(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleFreezeCard = function (cardId) { return __awaiter(void 0, void 0, void 0, function () {
        var err_3, errorMsg;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    // CORRECTED URL: /api/cards/{id}/freeze/
                    return [4 /*yield*/, api_1.default.post("/api/cards/".concat(cardId, "/freeze/"))];
                case 1:
                    // CORRECTED URL: /api/cards/{id}/freeze/
                    _c.sent();
                    setCards(cards.map(function (card) {
                        return card.id === cardId ? __assign(__assign({}, card), { isActive: false }) : card;
                    }));
                    setSnackbar({
                        open: true,
                        message: 'Card frozen successfully',
                        severity: 'success',
                    });
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _c.sent();
                    errorMsg = ((_b = (_a = err_3.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || err_3.message || 'Failed to freeze card';
                    setSnackbar({
                        open: true,
                        message: errorMsg,
                        severity: 'error',
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleUnfreezeCard = function (cardId) { return __awaiter(void 0, void 0, void 0, function () {
        var err_4, errorMsg;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    // CORRECTED URL: /api/cards/{id}/unfreeze/
                    return [4 /*yield*/, api_1.default.post("/api/cards/".concat(cardId, "/unfreeze/"))];
                case 1:
                    // CORRECTED URL: /api/cards/{id}/unfreeze/
                    _c.sent();
                    setCards(cards.map(function (card) {
                        return card.id === cardId ? __assign(__assign({}, card), { isActive: true }) : card;
                    }));
                    setSnackbar({
                        open: true,
                        message: 'Card unfrozen successfully',
                        severity: 'success',
                    });
                    return [3 /*break*/, 3];
                case 2:
                    err_4 = _c.sent();
                    errorMsg = ((_b = (_a = err_4.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || err_4.message || 'Failed to unfreeze card';
                    setSnackbar({
                        open: true,
                        message: errorMsg,
                        severity: 'error',
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleCopyCardNumber = function (cardId, last4) {
        navigator.clipboard.writeText("**** **** **** ".concat(last4));
        setCopiedCardNumber(cardId);
        setTimeout(function () { return setCopiedCardNumber(null); }, 2000);
        setSnackbar({
            open: true,
            message: 'Card number copied to clipboard',
            severity: 'info',
        });
    };
    var handleCopyAccountNumber = function (accountNumber) {
        navigator.clipboard.writeText(accountNumber);
        setCopiedAccountNumber((selectedCard === null || selectedCard === void 0 ? void 0 : selectedCard.id) || null);
        setTimeout(function () { return setCopiedAccountNumber(null); }, 2000);
        setSnackbar({
            open: true,
            message: 'Account number copied to clipboard',
            severity: 'info',
        });
    };
    var formatBalance = function (balance) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
        }).format(balance);
    };
    var formatExpiry = function (expiry) {
        return expiry.replace('/', '/');
    };
    var getCardBackground = function (colorScheme) {
        switch (colorScheme) {
            case 'blue-gradient':
                return 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)';
            case 'purple-gradient':
                return 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)';
            case 'green-gradient':
                return 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)';
            case 'orange-gradient':
                return 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)';
            case 'dark-gradient':
                return 'linear-gradient(135deg, #263238 0%, #000000 100%)';
            case 'gold-gradient':
                return 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)';
            default:
                return 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)';
        }
    };
    var CardItem = function (_a) {
        var card = _a.card;
        return (<framer_motion_1.motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} whileHover={{ scale: 1.02 }}>
      <material_1.Card sx={{
                background: getCardBackground(card.color),
                color: 'white',
                borderRadius: 3,
                overflow: 'hidden',
                position: 'relative',
                height: 240,
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                },
            }}>
        <material_1.CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <material_1.Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <material_1.Box display="flex" alignItems="center" gap={1}>
              <icons_material_1.CreditCard sx={{ fontSize: 24 }}/>
              <material_1.Typography variant="h6" fontWeight="bold">
                {card.brand}
              </material_1.Typography>
            </material_1.Box>
            <material_1.Box display="flex" gap={1}>
              {card.isPrimary && (<material_1.Chip label="Primary" size="small" sx={{
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    fontWeight: 'bold',
                }}/>)}
              <material_1.Chip label={card.isActive ? 'Active' : 'Frozen'} size="small" sx={{
                backgroundColor: card.isActive ? 'rgba(76, 175, 80, 0.2)' : 'rgba(255, 152, 0, 0.2)',
                color: 'white',
                fontWeight: 'bold',
                border: "1px solid ".concat(card.isActive ? '#4CAF50' : '#FF9800')
            }}/>
            </material_1.Box>
          </material_1.Box>

          <material_1.Box flexGrow={1} display="flex" flexDirection="column" justifyContent="center">
            <material_1.Typography variant="h5" fontWeight="bold" letterSpacing={2} mb={2} fontFamily="monospace">
              {card.maskedNumber || "**** **** **** ".concat(card.last4)}
            </material_1.Typography>
            
            <material_1.Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <material_1.Box>
                <material_1.Typography variant="caption" display="block" sx={{ opacity: 0.8 }}>
                  Cardholder
                </material_1.Typography>
                <material_1.Typography variant="body1" fontWeight="medium">
                  {card.cardholderName || (user ? "".concat(user.first_name, " ").concat(user.last_name) : 'Cardholder')}
                </material_1.Typography>
              </material_1.Box>
              <material_1.Box>
                <material_1.Typography variant="caption" display="block" sx={{ opacity: 0.8 }}>
                  Expires
                </material_1.Typography>
                <material_1.Typography variant="body1" fontWeight="medium">
                  {formatExpiry(card.expiry)}
                </material_1.Typography>
              </material_1.Box>
            </material_1.Box>

            {card.accountNumber && (<material_1.Box mb={2}>
                <material_1.Typography variant="caption" display="block" sx={{ opacity: 0.8 }}>
                  Account Number
                </material_1.Typography>
                <material_1.Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.75rem', fontFamily: 'monospace' }}>
                  {card.accountNumber}
                </material_1.Typography>
              </material_1.Box>)}

            <material_1.Box display="flex" justifyContent="space-between" alignItems="center">
              <material_1.Box>
                <material_1.Typography variant="caption" display="block" sx={{ opacity: 0.8 }}>
                  Balance
                </material_1.Typography>
                <material_1.Typography variant="h5" fontWeight="bold">
                  {formatBalance(card.balance)}
                </material_1.Typography>
              </material_1.Box>
              <material_1.Avatar sx={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                width: 40,
                height: 40,
                fontSize: '1rem',
                fontWeight: 'bold',
            }}>
                {card.brand === 'Visa' ? 'V' : 'MC'}
              </material_1.Avatar>
            </material_1.Box>
          </material_1.Box>
        </material_1.CardContent>

        <material_1.Box sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0,0,0,0.2)',
                backdropFilter: 'blur(10px)',
                p: 1.5,
                display: 'flex',
                justifyContent: 'space-around',
                gap: 0.5,
            }}>
          <material_1.IconButton size="small" sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }} onClick={function () { return handleCopyCardNumber(card.id, card.last4); }} title="Copy card number">
            {copiedCardNumber === card.id ? <icons_material_1.Check fontSize="small"/> : <icons_material_1.ContentCopy fontSize="small"/>}
          </material_1.IconButton>
          
          <material_1.IconButton size="small" sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }} onClick={function () {
                setSelectedCard(card);
                setOpenCardDetails(true);
            }} title="View details">
            <icons_material_1.Visibility fontSize="small"/>
          </material_1.IconButton>
          
          <material_1.IconButton size="small" sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }} onClick={function () { return card.isActive ? handleFreezeCard(card.id) : handleUnfreezeCard(card.id); }} title={card.isActive ? 'Freeze card' : 'Unfreeze card'}>
            {card.isActive ? <icons_material_1.Lock fontSize="small"/> : <icons_material_1.PowerSettingsNew fontSize="small"/>}
          </material_1.IconButton>
        </material_1.Box>
      </material_1.Card>
    </framer_motion_1.motion.div>);
    };
    if (loading) {
        return (<material_1.Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <material_1.CircularProgress />
      </material_1.Box>);
    }
    return (<material_1.Container maxWidth="lg" sx={{ py: 4 }}>
      <material_1.Box mb={4}>
        <material_1.Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <material_1.Box>
            <material_1.Typography variant="h4" fontWeight="bold" gutterBottom>
              My Cards
            </material_1.Typography>
            <material_1.Typography variant="body1" color="text.secondary">
              Manage your virtual and physical payment cards
            </material_1.Typography>
          </material_1.Box>
          <material_1.Button variant="contained" startIcon={<icons_material_1.Add />} onClick={function () { return setOpenCreateDialog(true); }} sx={{
            background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
            borderRadius: 2,
            px: 3,
            py: 1.5,
            fontWeight: 'bold',
        }}>
            New Card
          </material_1.Button>
        </material_1.Box>
        
        <material_1.Grid container spacing={2} sx={{ mb: 3 }}>
          <material_1.Grid item xs={12} sm={6} md={3}>
            <material_1.Card sx={{ p: 2, borderRadius: 2 }}>
              <material_1.Box display="flex" alignItems="center" gap={2}>
                <material_1.Avatar sx={{ bgcolor: 'primary.main' }}>
                  <icons_material_1.CreditCard />
                </material_1.Avatar>
                <material_1.Box>
                  <material_1.Typography variant="h6" fontWeight="bold">
                    {cards.length}
                  </material_1.Typography>
                  <material_1.Typography variant="body2" color="text.secondary">
                    Total Cards
                  </material_1.Typography>
                </material_1.Box>
              </material_1.Box>
            </material_1.Card>
          </material_1.Grid>
          <material_1.Grid item xs={12} sm={6} md={3}>
            <material_1.Card sx={{ p: 2, borderRadius: 2 }}>
              <material_1.Box display="flex" alignItems="center" gap={2}>
                <material_1.Avatar sx={{ bgcolor: 'success.main' }}>
                  <icons_material_1.AccountBalance />
                </material_1.Avatar>
                <material_1.Box>
                  <material_1.Typography variant="h6" fontWeight="bold">
                    {formatBalance(totalBalance)}
                  </material_1.Typography>
                  <material_1.Typography variant="body2" color="text.secondary">
                    Total Balance
                  </material_1.Typography>
                </material_1.Box>
              </material_1.Box>
            </material_1.Card>
          </material_1.Grid>
          <material_1.Grid item xs={12} sm={6} md={3}>
            <material_1.Card sx={{ p: 2, borderRadius: 2 }}>
              <material_1.Box display="flex" alignItems="center" gap={2}>
                <material_1.Avatar sx={{ bgcolor: 'info.main' }}>
                  <icons_material_1.PowerSettingsNew />
                </material_1.Avatar>
                <material_1.Box>
                  <material_1.Typography variant="h6" fontWeight="bold">
                    {activeCards}
                  </material_1.Typography>
                  <material_1.Typography variant="body2" color="text.secondary">
                    Active Cards
                  </material_1.Typography>
                </material_1.Box>
              </material_1.Box>
            </material_1.Card>
          </material_1.Grid>
          <material_1.Grid item xs={12} sm={6} md={3}>
            <material_1.Card sx={{ p: 2, borderRadius: 2 }}>
              <material_1.Box display="flex" alignItems="center" gap={2}>
                <material_1.Avatar sx={{ bgcolor: 'warning.main' }}>
                  <icons_material_1.Info />
                </material_1.Avatar>
                <material_1.Box>
                  <material_1.Typography variant="h6" fontWeight="bold">
                    {virtualCards}
                  </material_1.Typography>
                  <material_1.Typography variant="body2" color="text.secondary">
                    Virtual Cards
                  </material_1.Typography>
                </material_1.Box>
              </material_1.Box>
            </material_1.Card>
          </material_1.Grid>
        </material_1.Grid>
        
        <material_1.Tabs value={activeTab} onChange={function (_, newValue) { return setActiveTab(newValue); }} sx={{ mb: 3 }} variant="scrollable" scrollButtons="auto">
          <material_1.Tab label={"All Cards (".concat(cards.length, ")")}/>
          <material_1.Tab label={"Active (".concat(activeCards, ")")}/>
          <material_1.Tab label={"Frozen (".concat(cards.length - activeCards, ")")}/>
          <material_1.Tab label={"Virtual (".concat(virtualCards, ")")}/>
        </material_1.Tabs>
      </material_1.Box>

      {error && (<material_1.Alert severity="error" sx={{ mb: 3 }} action={<material_1.Button color="inherit" size="small" onClick={fetchCards}>
              Retry
            </material_1.Button>}>
          {error}
        </material_1.Alert>)}

      {cards.length === 0 ? (<material_1.Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="50vh" textAlign="center" p={3} sx={{ borderRadius: 3, bgcolor: 'grey.50' }}>
          <icons_material_1.CreditCard sx={{ fontSize: 80, color: 'text.secondary', mb: 2, opacity: 0.5 }}/>
          <material_1.Typography variant="h6" color="text.secondary" gutterBottom>
            No cards yet
          </material_1.Typography>
          <material_1.Typography variant="body1" color="text.secondary" mb={3}>
            Create your first virtual card to start spending
          </material_1.Typography>
          <material_1.Button variant="contained" startIcon={<icons_material_1.Add />} onClick={function () { return setOpenCreateDialog(true); }} size="large">
            Create Your First Card
          </material_1.Button>
        </material_1.Box>) : (<material_1.Grid container spacing={3}>
          {cards
                .filter(function (card) {
                if (activeTab === 1)
                    return card.isActive;
                if (activeTab === 2)
                    return !card.isActive;
                if (activeTab === 3)
                    return card.type === 'virtual';
                return true;
            })
                .map(function (card) { return (<material_1.Grid item xs={12} sm={6} md={4} key={card.id}>
                <CardItem card={card}/>
              </material_1.Grid>); })}
        </material_1.Grid>)}

      <material_1.Box mt={4}>
        <material_1.Typography variant="h6" gutterBottom>
          Quick Actions
        </material_1.Typography>
        <material_1.Grid container spacing={2}>
          <material_1.Grid item xs={12} sm={6} md={3}>
            <material_1.Button fullWidth variant="outlined" startIcon={<icons_material_1.Refresh />} onClick={fetchCards} disabled={refreshing}>
              {refreshing ? 'Refreshing...' : 'Refresh Cards'}
            </material_1.Button>
          </material_1.Grid>
          <material_1.Grid item xs={12} sm={6} md={3}>
            <material_1.Button fullWidth variant="outlined" startIcon={<icons_material_1.Add />} onClick={function () { return setOpenCreateDialog(true); }}>
              Add New Card
            </material_1.Button>
          </material_1.Grid>
        </material_1.Grid>
      </material_1.Box>

      {/* Create Card Dialog */}
      <material_1.Dialog open={openCreateDialog} onClose={function () { return setOpenCreateDialog(false); }} maxWidth="sm" fullWidth>
        <material_1.DialogTitle>Create New Card</material_1.DialogTitle>
        <material_1.DialogContent>
          <material_1.Stack spacing={3} sx={{ mt: 2 }}>
            <material_1.TextField fullWidth label="Cardholder Name" value={newCard.cardholderName} onChange={function (e) { return setNewCard(__assign(__assign({}, newCard), { cardholderName: e.target.value })); }} placeholder={user ? "".concat(user.first_name, " ").concat(user.last_name) : 'Your Name'} error={!newCard.cardholderName.trim()} helperText={!newCard.cardholderName.trim() ? 'Cardholder name is required' : ''}/>
            
            <material_1.TextField select fullWidth label="Card Design" value={newCard.colorScheme} onChange={function (e) { return setNewCard(__assign(__assign({}, newCard), { colorScheme: e.target.value })); }}>
              {colorSchemes.map(function (scheme) { return (<material_1.MenuItem key={scheme.value} value={scheme.value}>
                  <material_1.Box display="flex" alignItems="center" gap={2}>
                    <material_1.Box width={20} height={20} borderRadius="50%" bgcolor={scheme.color}/>
                    {scheme.label}
                  </material_1.Box>
                </material_1.MenuItem>); })}
            </material_1.TextField>
            
            <material_1.TextField select fullWidth label="Card Type" value={newCard.cardType} onChange={function (e) { return setNewCard(__assign(__assign({}, newCard), { cardType: e.target.value })); }}>
              <material_1.MenuItem value="virtual">Virtual Card (Instant)</material_1.MenuItem>
              <material_1.MenuItem value="physical" disabled>
                Physical Card (Coming Soon)
              </material_1.MenuItem>
            </material_1.TextField>
            
            <material_1.FormControlLabel control={<material_1.Checkbox checked={newCard.isPrimary} onChange={function (e) { return setNewCard(__assign(__assign({}, newCard), { isPrimary: e.target.checked })); }}/>} label="Set as primary card"/>
          </material_1.Stack>
        </material_1.DialogContent>
        <material_1.DialogActions>
          <material_1.Button onClick={function () { return setOpenCreateDialog(false); }}>Cancel</material_1.Button>
          <material_1.Button variant="contained" onClick={handleCreateCard} disabled={!newCard.cardholderName.trim() || refreshing}>
            {refreshing ? <material_1.CircularProgress size={24}/> : 'Create Card'}
          </material_1.Button>
        </material_1.DialogActions>
      </material_1.Dialog>

      {/* Card Details Dialog */}
      <material_1.Dialog open={openCardDetails} onClose={function () { return setOpenCardDetails(false); }} maxWidth="sm" fullWidth>
        {selectedCard && (<>
            <material_1.DialogTitle>Card Details</material_1.DialogTitle>
            <material_1.DialogContent>
              <material_1.Box sx={{
                background: getCardBackground(selectedCard.color),
                borderRadius: 2,
                p: 3,
                mb: 3,
                color: 'white',
                position: 'relative',
            }}>
                <material_1.Typography variant="h6" gutterBottom fontWeight="bold">
                  {selectedCard.maskedNumber}
                </material_1.Typography>
                <material_1.Typography variant="body2">
                  {selectedCard.cardholderName || (user ? "".concat(user.first_name, " ").concat(user.last_name) : 'Cardholder')}
                </material_1.Typography>
                <material_1.Typography variant="body2">
                  Expires: {formatExpiry(selectedCard.expiry)}
                </material_1.Typography>
                {selectedCard.accountNumber && (<material_1.Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
                    Account: {selectedCard.accountNumber}
                  </material_1.Typography>)}
              </material_1.Box>
              
              <material_1.Grid container spacing={2}>
                <material_1.Grid item xs={12}>
                  <material_1.Typography variant="subtitle2" color="text.secondary">
                    Balance
                  </material_1.Typography>
                  <material_1.Typography variant="h5" fontWeight="bold">
                    {formatBalance(selectedCard.balance)}
                  </material_1.Typography>
                </material_1.Grid>
                
                <material_1.Grid item xs={6}>
                  <material_1.Typography variant="subtitle2" color="text.secondary">
                    Type
                  </material_1.Typography>
                  <material_1.Typography>
                    {selectedCard.type === 'virtual' ? 'Virtual Card' : 'Physical Card'}
                  </material_1.Typography>
                </material_1.Grid>
                
                <material_1.Grid item xs={6}>
                  <material_1.Typography variant="subtitle2" color="text.secondary">
                    Status
                  </material_1.Typography>
                  <material_1.Chip label={selectedCard.isActive ? 'Active' : 'Frozen'} size="small" color={selectedCard.isActive ? 'success' : 'warning'}/>
                </material_1.Grid>
                
                <material_1.Grid item xs={6}>
                  <material_1.Typography variant="subtitle2" color="text.secondary">
                    Brand
                  </material_1.Typography>
                  <material_1.Typography>{selectedCard.brand}</material_1.Typography>
                </material_1.Grid>
                
                <material_1.Grid item xs={6}>
                  <material_1.Typography variant="subtitle2" color="text.secondary">
                    Primary
                  </material_1.Typography>
                  <material_1.Typography>{selectedCard.isPrimary ? 'Yes' : 'No'}</material_1.Typography>
                </material_1.Grid>
              </material_1.Grid>
              
              <material_1.Divider sx={{ my: 3 }}/>
              
              <material_1.Typography variant="subtitle1" gutterBottom fontWeight="bold">
                Quick Actions
              </material_1.Typography>
              <material_1.Grid container spacing={1}>
                <material_1.Grid item xs={6}>
                  <material_1.Button fullWidth variant="outlined" size="small" onClick={function () {
                selectedCard.isActive
                    ? handleFreezeCard(selectedCard.id)
                    : handleUnfreezeCard(selectedCard.id);
                setOpenCardDetails(false);
            }} startIcon={selectedCard.isActive ? <icons_material_1.Lock /> : <icons_material_1.PowerSettingsNew />}>
                    {selectedCard.isActive ? 'Freeze' : 'Unfreeze'}
                  </material_1.Button>
                </material_1.Grid>
                <material_1.Grid item xs={6}>
                  <material_1.Button fullWidth variant="outlined" size="small" onClick={function () {
                selectedCard.accountNumber && handleCopyAccountNumber(selectedCard.accountNumber);
            }} startIcon={copiedAccountNumber === selectedCard.id ? <icons_material_1.Check /> : <icons_material_1.ContentCopy />}>
                    Copy Account #
                  </material_1.Button>
                </material_1.Grid>
              </material_1.Grid>
            </material_1.DialogContent>
            <material_1.DialogActions>
              <material_1.Button onClick={function () { return setOpenCardDetails(false); }}>Close</material_1.Button>
            </material_1.DialogActions>
          </>)}
      </material_1.Dialog>

      {/* Snackbar Notifications */}
      <material_1.Snackbar open={snackbar.open} autoHideDuration={4000} onClose={function () { return setSnackbar(__assign(__assign({}, snackbar), { open: false })); }} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <material_1.Alert onClose={function () { return setSnackbar(__assign(__assign({}, snackbar), { open: false })); }} severity={snackbar.severity} sx={{ width: '100%' }} elevation={6}>
          {snackbar.message}
        </material_1.Alert>
      </material_1.Snackbar>
    </material_1.Container>);
};
exports.default = Cards;
