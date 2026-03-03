import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card as MuiCard,
  CardContent,
  Button,
  Chip,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
  CircularProgress,
  Divider,
  Tabs,
  Tab,
  Stack,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import {
  Add as AddIcon,
  CreditCard as CreditCardIcon,
  Lock as FreezeIcon,
  PowerSettingsNew as PowerIcon,
  Visibility as ViewIcon,
  ContentCopy as CopyIcon,
  Check as CheckIcon,
  Refresh as RefreshIcon,
  AccountBalance as AccountBalanceIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../lib/store/auth';
import api from '../../api';
import styles from './Cards.module.css';

interface CardData {
  id: number;
  type: 'virtual' | 'physical';
  last4: string;
  balance: number;
  expiry: string;
  isActive: boolean;
  color: string;
  brand: 'Visa' | 'Mastercard' | string;
  cardholderName?: string;
  maskedNumber?: string;
  isPrimary?: boolean;
  accountNumber?: string;
}

interface NewCardForm {
  cardholderName: string;
  colorScheme: string;
  isPrimary: boolean;
  cardType: 'virtual' | 'physical';
}

const Cards: React.FC = () => {
  const { user } = useAuthStore();
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openCardDetails, setOpenCardDetails] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [newCard, setNewCard] = useState<NewCardForm>({
    cardholderName: '',
    colorScheme: 'blue-gradient',
    isPrimary: false,
    cardType: 'virtual',
  });
  const [activeTab, setActiveTab] = useState(0);
  const [copiedCardNumber, setCopiedCardNumber] = useState<number | null>(null);
  const [copiedAccountNumber, setCopiedAccountNumber] = useState<number | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
  }>({ open: false, message: '', severity: 'info' });

  const totalBalance = cards.reduce((sum, card) => sum + card.balance, 0);
  const activeCards = cards.filter(c => c.isActive).length;
  const virtualCards = cards.filter(c => c.type === 'virtual').length;

  const colorSchemes = [
    { value: 'blue-gradient', label: 'Blue Ocean', color: '#2196F3' },
    { value: 'purple-gradient', label: 'Purple Dream', color: '#9C27B0' },
    { value: 'green-gradient', label: 'Green Forest', color: '#4CAF50' },
    { value: 'orange-gradient', label: 'Orange Sunset', color: '#FF9800' },
    { value: 'dark-gradient', label: 'Dark Night', color: '#263238' },
    { value: 'gold-gradient', label: 'Gold Elite', color: '#FFD700' },
  ];

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      setLoading(true);
      console.log('Fetching cards...');
      const response = await api.get('cards/user-cards/');
      console.log('Cards API response:', response.data);
      
      // Handle both array and object responses
      let cardsArray = [];
      if (Array.isArray(response.data)) {
        cardsArray = response.data;
      } else if (response.data && Array.isArray(response.data.cards)) {
        cardsArray = response.data.cards;
      } else if (response.data && Array.isArray(response.data.results)) {
        cardsArray = response.data.results;
      } else {
        cardsArray = [];
      }
      
      const transformedCards = cardsArray.map((card: any) => ({
        id: card.id,
        type: card.card_type || card.type || 'virtual',
        last4: card.last_four || card.last4 || '4242',
        balance: card.balance || 0,
        expiry: card.expiry_date || card.expiry || '12/25',
        isActive: card.status === 'active' || card.isActive === true,
        color: card.color_scheme || card.color || 'blue-gradient',
        brand: card.brand || (card.card_number?.startsWith('4') ? 'Visa' : 'Mastercard'),
        cardholderName: card.cardholder_name || card.cardholderName || card.display_name,
        maskedNumber: card.masked_number || card.maskedNumber || `**** **** **** ${card.last_four || '4242'}`,
        isPrimary: card.is_primary || card.isPrimary || false,
        accountNumber: card.account_number || user?.account_number,
      }));
      
      setCards(transformedCards);
      setError(null);
      
    } catch (err: any) {
      console.error('Error fetching cards:', err);
      const errorMsg = err.response?.data?.error || err.message || 'Failed to load cards';
      setError(errorMsg);
      setSnackbar({
        open: true,
        message: errorMsg,
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCard = async () => {
    if (!newCard.cardholderName.trim()) {
      setSnackbar({
        open: true,
        message: 'Please enter cardholder name',
        severity: 'error',
      });
      return;
    }

    try {
      setRefreshing(true);
      const payload = {
        cardholder_name: newCard.cardholderName,
        color_scheme: newCard.colorScheme,
        is_primary: newCard.isPrimary,
        card_type: newCard.cardType,
      };
      
      console.log('Creating card with payload:', payload);
      const response = await api.post('cards/', payload);
      console.log('Card creation response:', response.data);
      
      const newCardData: CardData = {
        id: response.data.id,
        type: response.data.card_type || 'virtual',
        last4: response.data.last_four?.slice(-4) || '4242',
        balance: response.data.balance || 0,
        expiry: response.data.expiry_date || '12/25',
        isActive: response.data.status === 'active',
        color: response.data.color_scheme || 'blue-gradient',
        brand: response.data.brand || 'Visa',
        cardholderName: response.data.cardholder_name,
        maskedNumber: `**** **** **** ${response.data.last_four?.slice(-4) || '4242'}`,
        isPrimary: response.data.is_primary || false,
        accountNumber: user?.account_number,
      };
      
      setCards([...cards, newCardData]);
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
      
    } catch (err: any) {
      console.error('Card creation error:', err);
      const errorMsg = err.response?.data?.error || err.message || 'Failed to create card';
      setSnackbar({
        open: true,
        message: errorMsg,
        severity: 'error',
      });
    } finally {
      setRefreshing(false);
    }
  };

  const handleFreezeCard = async (cardId: number) => {
    try {
      await api.post(`cards/${cardId}/freeze/`);
      setCards(cards.map(card => 
        card.id === cardId ? { ...card, isActive: false } : card
      ));
      setSnackbar({
        open: true,
        message: 'Card frozen successfully',
        severity: 'success',
      });
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || err.message || 'Failed to freeze card';
      setSnackbar({
        open: true,
        message: errorMsg,
        severity: 'error',
      });
    }
  };

  const handleUnfreezeCard = async (cardId: number) => {
    try {
      await api.post(`cards/${cardId}/unfreeze/`);
      setCards(cards.map(card => 
        card.id === cardId ? { ...card, isActive: true } : card
      ));
      setSnackbar({
        open: true,
        message: 'Card unfrozen successfully',
        severity: 'success',
      });
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || err.message || 'Failed to unfreeze card';
      setSnackbar({
        open: true,
        message: errorMsg,
        severity: 'error',
      });
    }
  };

  const handleCopyCardNumber = (cardId: number, last4: string) => {
    navigator.clipboard.writeText(`**** **** **** ${last4}`);
    setCopiedCardNumber(cardId);
    setTimeout(() => setCopiedCardNumber(null), 2000);
    setSnackbar({
      open: true,
      message: 'Card number copied to clipboard',
      severity: 'info',
    });
  };

  const handleCopyAccountNumber = (accountNumber: string) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedAccountNumber(selectedCard?.id || null);
    setTimeout(() => setCopiedAccountNumber(null), 2000);
    setSnackbar({
      open: true,
      message: 'Account number copied to clipboard',
      severity: 'info',
    });
  };

  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(balance);
  };

  const formatExpiry = (expiry: string) => {
    return expiry.replace('/', '/');
  };

  const getCardBackground = (colorScheme: string) => {
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

  const CardItem = ({ card }: { card: CardData }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className={styles.cardMotion}
    >
      <MuiCard
        className={`${styles.card} ${styles[card.color.replace('-', '')]}`}
        sx={{
          background: getCardBackground(card.color),
        }}
      >
        <CardContent className={styles.cardContent}>
          <div className={styles.cardHeader}>
            <div className={styles.brandContainer}>
              <CreditCardIcon className={styles.cardIcon} />
              <Typography variant="h6" className={styles.brandText}>
                {card.brand}
              </Typography>
            </div>
            <div className={styles.badgeContainer}>
              {card.isPrimary && (
                <Chip
                  label="Primary"
                  size="small"
                  className={styles.primaryBadge}
                />
              )}
              <Chip
                label={card.isActive ? 'Active' : 'Frozen'}
                size="small"
                className={card.isActive ? styles.activeBadge : styles.frozenBadge}
              />
            </div>
          </div>

          <div className={styles.cardMiddle}>
            <Typography variant="h5" className={styles.cardNumber}>
              {card.maskedNumber || `**** **** **** ${card.last4}`}
            </Typography>
            
            <div className={styles.cardDetails}>
              <div className={styles.detailItem}>
                <Typography variant="caption" className={styles.detailLabel}>
                  Cardholder
                </Typography>
                <Typography variant="body1" className={styles.detailValue}>
                  {card.cardholderName || (user ? `${user.first_name} ${user.last_name}` : 'Cardholder')}
                </Typography>
              </div>
              <div className={styles.detailItem}>
                <Typography variant="caption" className={styles.detailLabel}>
                  Expires
                </Typography>
                <Typography variant="body1" className={styles.detailValue}>
                  {formatExpiry(card.expiry)}
                </Typography>
              </div>
            </div>

            {card.accountNumber && (
              <div className={styles.accountContainer}>
                <Typography variant="caption" className={styles.detailLabel}>
                  Account Number
                </Typography>
                <Typography variant="body2" className={styles.accountNumber}>
                  {card.accountNumber}
                </Typography>
              </div>
            )}

            <div className={styles.balanceContainer}>
              <div className={styles.balanceInfo}>
                <Typography variant="caption" className={styles.detailLabel}>
                  Balance
                </Typography>
                <Typography variant="h5" className={styles.balanceAmount}>
                  {formatBalance(card.balance)}
                </Typography>
              </div>
              <Avatar className={styles.brandAvatar}>
                {card.brand === 'Visa' ? 'V' : 'MC'}
              </Avatar>
            </div>
          </div>
        </CardContent>

        <div className={styles.cardActions}>
          <IconButton
            size="small"
            className={styles.actionButton}
            onClick={() => handleCopyCardNumber(card.id, card.last4)}
            title="Copy card number"
          >
            {copiedCardNumber === card.id ? <CheckIcon fontSize="small" /> : <CopyIcon fontSize="small" />}
          </IconButton>
          
          <IconButton
            size="small"
            className={styles.actionButton}
            onClick={() => {
              setSelectedCard(card);
              setOpenCardDetails(true);
            }}
            title="View details"
          >
            <ViewIcon fontSize="small" />
          </IconButton>
          
          <IconButton
            size="small"
            className={styles.actionButton}
            onClick={() => card.isActive ? handleFreezeCard(card.id) : handleUnfreezeCard(card.id)}
            title={card.isActive ? 'Freeze card' : 'Unfreeze card'}
          >
            {card.isActive ? <FreezeIcon fontSize="small" /> : <PowerIcon fontSize="small" />}
          </IconButton>
        </div>
      </MuiCard>
    </motion.div>
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" className={styles.container}>
      <Box className={styles.header}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box>
            <Typography variant="h4" className={styles.title}>
              My Cards
            </Typography>
            <Typography variant="body1" className={styles.subtitle}>
              Manage your virtual and physical payment cards
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenCreateDialog(true)}
            className={styles.newCardButton}
          >
            New Card
          </Button>
        </Box>
        
        <Grid container spacing={2} className={styles.statsGrid}>
          <Grid item xs={12} sm={6} md={3}>
            <MuiCard className={styles.statCard}>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar className={styles.statIconPrimary}>
                  <CreditCardIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" className={styles.statValue}>
                    {cards.length}
                  </Typography>
                  <Typography variant="body2" className={styles.statLabel}>
                    Total Cards
                  </Typography>
                </Box>
              </Box>
            </MuiCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MuiCard className={styles.statCard}>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar className={styles.statIconSuccess}>
                  <AccountBalanceIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" className={styles.statValue}>
                    {formatBalance(totalBalance)}
                  </Typography>
                  <Typography variant="body2" className={styles.statLabel}>
                    Total Balance
                  </Typography>
                </Box>
              </Box>
            </MuiCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MuiCard className={styles.statCard}>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar className={styles.statIconInfo}>
                  <PowerIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" className={styles.statValue}>
                    {activeCards}
                  </Typography>
                  <Typography variant="body2" className={styles.statLabel}>
                    Active Cards
                  </Typography>
                </Box>
              </Box>
            </MuiCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MuiCard className={styles.statCard}>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar className={styles.statIconWarning}>
                  <InfoIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" className={styles.statValue}>
                    {virtualCards}
                  </Typography>
                  <Typography variant="body2" className={styles.statLabel}>
                    Virtual Cards
                  </Typography>
                </Box>
              </Box>
            </MuiCard>
          </Grid>
        </Grid>
        
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          className={styles.tabs}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label={`All Cards (${cards.length})`} className={styles.tab} />
          <Tab label={`Active (${activeCards})`} className={styles.tab} />
          <Tab label={`Frozen (${cards.length - activeCards})`} className={styles.tab} />
          <Tab label={`Virtual (${virtualCards})`} className={styles.tab} />
        </Tabs>
      </Box>

      {error && (
        <Alert 
          severity="error" 
          className={styles.errorAlert}
          action={
            <Button color="inherit" size="small" onClick={fetchCards}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      {cards.length === 0 ? (
        <Box className={styles.emptyState}>
          <CreditCardIcon className={styles.emptyIcon} />
          <Typography variant="h6" className={styles.emptyTitle}>
            No cards yet
          </Typography>
          <Typography variant="body1" className={styles.emptyText}>
            Create your first virtual card to start spending
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenCreateDialog(true)}
            className={styles.emptyButton}
          >
            Create Your First Card
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3} className={styles.cardsGrid}>
          {cards
            .filter(card => {
              if (activeTab === 1) return card.isActive;
              if (activeTab === 2) return !card.isActive;
              if (activeTab === 3) return card.type === 'virtual';
              return true;
            })
            .map((card) => (
              <Grid item xs={12} sm={6} md={4} key={card.id}>
                <CardItem card={card} />
              </Grid>
            ))}
        </Grid>
      )}

      <Box className={styles.quickActions}>
        <Typography variant="h6" className={styles.quickActionsTitle}>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={fetchCards}
              disabled={refreshing}
              className={styles.quickActionButton}
            >
              {refreshing ? 'Refreshing...' : 'Refresh Cards'}
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => setOpenCreateDialog(true)}
              className={styles.quickActionButton}
            >
              Add New Card
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Create Card Dialog */}
      <Dialog 
        open={openCreateDialog} 
        onClose={() => setOpenCreateDialog(false)} 
        maxWidth="sm" 
        fullWidth
        className={styles.dialog}
        disableEnforceFocus
        disableAutoFocus
      >
        <DialogTitle className={styles.dialogTitle}>Create New Card</DialogTitle>
        <DialogContent className={styles.dialogContent}>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Cardholder Name"
              value={newCard.cardholderName}
              onChange={(e) => setNewCard({...newCard, cardholderName: e.target.value})}
              placeholder={user ? `${user.first_name} ${user.last_name}` : 'Your Name'}
              error={!newCard.cardholderName.trim()}
              helperText={!newCard.cardholderName.trim() ? 'Cardholder name is required' : ''}
              className={styles.textField}
            />
            
            <TextField
              select
              fullWidth
              label="Card Design"
              value={newCard.colorScheme}
              onChange={(e) => setNewCard({...newCard, colorScheme: e.target.value})}
              className={styles.textField}
            >
              {colorSchemes.map((scheme) => (
                <MenuItem key={scheme.value} value={scheme.value}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Box
                      width={20}
                      height={20}
                      borderRadius="50%"
                      bgcolor={scheme.color}
                    />
                    {scheme.label}
                  </Box>
                </MenuItem>
              ))}
            </TextField>
            
            <TextField
              select
              fullWidth
              label="Card Type"
              value={newCard.cardType}
              onChange={(e) => setNewCard({...newCard, cardType: e.target.value as 'virtual' | 'physical'})}
              className={styles.textField}
            >
              <MenuItem value="virtual">Virtual Card (Instant)</MenuItem>
              <MenuItem value="physical" disabled>
                Physical Card (Coming Soon)
              </MenuItem>
            </TextField>
            
            <FormControlLabel
              control={
                <Checkbox
                  checked={newCard.isPrimary}
                  onChange={(e) => setNewCard({...newCard, isPrimary: e.target.checked})}
                  className={styles.checkbox}
                />
              }
              label="Set as primary card"
              className={styles.checkboxLabel}
            />
          </Stack>
        </DialogContent>
        <DialogActions className={styles.dialogActions}>
          <Button onClick={() => setOpenCreateDialog(false)} className={styles.cancelButton}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleCreateCard}
            disabled={!newCard.cardholderName.trim() || refreshing}
            className={styles.createButton}
          >
            {refreshing ? <CircularProgress size={24} /> : 'Create Card'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Card Details Dialog */}
      <Dialog 
        open={openCardDetails} 
        onClose={() => setOpenCardDetails(false)} 
        maxWidth="sm" 
        fullWidth
        className={styles.dialog}
        disableEnforceFocus
        disableAutoFocus
      >
        {selectedCard && (
          <>
            <DialogTitle className={styles.dialogTitle}>Card Details</DialogTitle>
            <DialogContent className={styles.dialogContent}>
              <Box
                className={styles.detailCardPreview}
                sx={{
                  background: getCardBackground(selectedCard.color),
                }}
              >
                <Typography variant="h6" className={styles.detailCardNumber}>
                  {selectedCard.maskedNumber}
                </Typography>
                <Typography variant="body2" className={styles.detailCardText}>
                  {selectedCard.cardholderName || (user ? `${user.first_name} ${user.last_name}` : 'Cardholder')}
                </Typography>
                <Typography variant="body2" className={styles.detailCardText}>
                  Expires: {formatExpiry(selectedCard.expiry)}
                </Typography>
                {selectedCard.accountNumber && (
                  <Typography variant="body2" className={styles.detailCardAccount}>
                    Account: {selectedCard.accountNumber}
                  </Typography>
                )}
              </Box>
              
              <Grid container spacing={2} className={styles.detailGrid}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" className={styles.detailLabel}>
                    Balance
                  </Typography>
                  <Typography variant="h5" className={styles.detailBalance}>
                    {formatBalance(selectedCard.balance)}
                  </Typography>
                </Grid>
                
                <Grid item xs={6}>
                  <Typography variant="subtitle2" className={styles.detailLabel}>
                    Type
                  </Typography>
                  <Typography className={styles.detailText}>
                    {selectedCard.type === 'virtual' ? 'Virtual Card' : 'Physical Card'}
                  </Typography>
                </Grid>
                
                <Grid item xs={6}>
                  <Typography variant="subtitle2" className={styles.detailLabel}>
                    Status
                  </Typography>
                  <Chip
                    label={selectedCard.isActive ? 'Active' : 'Frozen'}
                    size="small"
                    color={selectedCard.isActive ? 'success' : 'warning'}
                    className={styles.statusChip}
                  />
                </Grid>
                
                <Grid item xs={6}>
                  <Typography variant="subtitle2" className={styles.detailLabel}>
                    Brand
                  </Typography>
                  <Typography className={styles.detailText}>{selectedCard.brand}</Typography>
                </Grid>
                
                <Grid item xs={6}>
                  <Typography variant="subtitle2" className={styles.detailLabel}>
                    Primary
                  </Typography>
                  <Typography className={styles.detailText}>{selectedCard.isPrimary ? 'Yes' : 'No'}</Typography>
                </Grid>
              </Grid>
              
              <Divider className={styles.divider} />
              
              <Typography variant="subtitle1" className={styles.quickActionsSubtitle}>
                Quick Actions
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      selectedCard.isActive 
                        ? handleFreezeCard(selectedCard.id)
                        : handleUnfreezeCard(selectedCard.id);
                      setOpenCardDetails(false);
                    }}
                    startIcon={selectedCard.isActive ? <FreezeIcon /> : <PowerIcon />}
                    className={styles.detailActionButton}
                  >
                    {selectedCard.isActive ? 'Freeze' : 'Unfreeze'}
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      selectedCard.accountNumber && handleCopyAccountNumber(selectedCard.accountNumber);
                    }}
                    startIcon={copiedAccountNumber === selectedCard.id ? <CheckIcon /> : <CopyIcon />}
                    className={styles.detailActionButton}
                  >
                    Copy Account #
                  </Button>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions className={styles.dialogActions}>
              <Button onClick={() => setOpenCardDetails(false)} className={styles.closeButton}>
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Snackbar Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          className={styles.alert}
          elevation={6}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Cards;