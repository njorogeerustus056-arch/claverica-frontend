import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Button,
  CircularProgress,
  Alert,
  Card as MuiCard,
  CardContent,
  Grid,
} from '@mui/material';
import {
  Search as SearchIcon,
  Download as DownloadIcon,
  Receipt as ReceiptIcon,
  Store as StoreIcon,
  Restaurant as RestaurantIcon,
  Flight as FlightIcon,
  ShoppingCart as ShoppingIcon,
  CreditCard as CreditCardIcon,
  Refresh as RefreshIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { useAuthStore } from '../../lib/store/auth';
import api from '../../services/api';
import { motion } from 'framer-motion';

interface Transaction {
  id: string;
  type: string;
  amount: number;
  description: string;
  date: string;
  status: string;
  reference: string;
  currency: string;
}

const CardTransactions: React.FC = () => {
  const { user } = useAuthStore();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // CORRECTED URL: /api/transactions/recent/
      const response = await api.get('/api/transactions/recent/');
      console.log('Transactions API response:', response.data);
      
      setTransactions(response.data.transactions || []);
      
    } catch (err: any) {
      console.error('Failed to fetch transactions:', err);
      setError(err.response?.data?.error || err.message || 'Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = transactions.filter(tx => 
    tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.reference.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatAmount = (amount: number, type: string) => {
    const isCredit = type === 'credit';
    const color = isCredit ? 'success.main' : 'error.main';
    const prefix = isCredit ? '+' : '-';
    const absAmount = Math.abs(amount);
    
    return (
      <Typography
        variant="body1"
        fontWeight="bold"
        color={color}
      >
        {prefix}${absAmount.toFixed(2)}
      </Typography>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getCategoryIcon = (description: string) => {
    const desc = description.toLowerCase();
    if (desc.includes('amazon') || desc.includes('shopping')) return <ShoppingIcon />;
    if (desc.includes('starbucks') || desc.includes('coffee')) return <RestaurantIcon />;
    if (desc.includes('uber') || desc.includes('taxi') || desc.includes('flight')) return <FlightIcon />;
    return <StoreIcon />;
  };

  const getCategoryName = (description: string) => {
    const desc = description.toLowerCase();
    if (desc.includes('amazon') || desc.includes('shopping')) return 'Shopping';
    if (desc.includes('starbucks') || desc.includes('coffee') || desc.includes('food')) return 'Food & Dining';
    if (desc.includes('uber') || desc.includes('taxi') || desc.includes('transport')) return 'Transport';
    if (desc.includes('flight') || desc.includes('hotel') || desc.includes('travel')) return 'Travel';
    if (desc.includes('top-up') || desc.includes('transfer') || desc.includes('deposit')) return 'Transfer';
    return 'Other';
  };

  const statusColors: Record<string, any> = {
    completed: 'success',
    pending: 'warning',
    failed: 'error',
    reversed: 'default',
  };

  const totalSpent = transactions
    .filter(tx => tx.type === 'debit' && tx.status === 'completed')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const handleExportCSV = () => {
    const headers = ['Date', 'Description', 'Amount', 'Type', 'Status', 'Reference'];
    const csvData = filteredTransactions.map(tx => [
      formatDate(tx.date),
      tx.description,
      tx.type === 'credit' ? `+$${tx.amount.toFixed(2)}` : `-$${tx.amount.toFixed(2)}`,
      tx.type,
      tx.status,
      tx.reference
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    // Show success message
    setSnackbar({
      open: true,
      message: 'CSV exported successfully!',
      severity: 'success',
    });
  };

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
  }>({ open: false, message: '', severity: 'info' });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Card Transactions
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View all your transaction history
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={4}>
          <MuiCard>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Total Spent
              </Typography>
              <Typography variant="h4" color="error.main">
                ${Math.abs(totalSpent).toFixed(2)}
              </Typography>
            </CardContent>
          </MuiCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <MuiCard>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Transactions Count
              </Typography>
              <Typography variant="h4">{transactions.length}</Typography>
            </CardContent>
          </MuiCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <MuiCard>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Recent Activity
              </Typography>
              <Typography variant="h4">
                {transactions.filter(tx => tx.status === 'completed').length}
              </Typography>
            </CardContent>
          </MuiCard>
        </Grid>
      </Grid>

      <Paper sx={{ mb: 3, p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              placeholder="Search by description or reference..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={() => setSearchTerm('')}
            >
              Clear
            </Button>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={fetchTransactions}
            >
              Refresh
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {filteredTransactions.length === 0 ? (
        <Box textAlign="center" p={4}>
          <ReceiptIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {searchTerm ? 'No matching transactions found' : 'No transactions yet'}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            {searchTerm ? 'Try a different search term' : 'Your transactions will appear here'}
          </Typography>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={fetchTransactions}
          >
            Refresh
          </Button>
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Reference</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions.map((tx) => (
                <motion.tr
                  key={tx.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          bgcolor: 'action.hover',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {getCategoryIcon(tx.description)}
                      </Box>
                      <Box>
                        <Typography variant="body1" fontWeight="medium">
                          {tx.description}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getCategoryName(tx.description)}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    {formatAmount(tx.amount, tx.type)}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={tx.status}
                      size="small"
                      color={statusColors[tx.status] as any}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {formatDate(tx.date)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontFamily="monospace">
                      {tx.reference}
                    </Typography>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body2" color="text.secondary">
          Showing {filteredTransactions.length} of {transactions.length} transactions
        </Typography>
        <Box display="flex" gap={1}>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={fetchTransactions}
          >
            Refresh
          </Button>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleExportCSV}
          >
            Export CSV
          </Button>
        </Box>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CardTransactions;