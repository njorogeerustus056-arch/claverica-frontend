import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Pagination,
  CircularProgress,
  IconButton,
  Tooltip,
  Grid,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  ArrowBack,
  Search,
  Visibility,
  Download,
  Refresh,
  ErrorOutline,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import transferAPI, { TransfersHistory as TransfersHistoryType } from '../../services/transfer-api';
import styles from './Transfer.module.css';

const TransfersHistory = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [transfers, setTransfers] = useState<any[]>([]); // ✅ Initialize as empty array
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalCount: 0,
  });
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);

  // Fetch transfers with proper error handling
  const fetchTransfers = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const history: TransfersHistoryType = await transferAPI.getTransfersHistory(page, 20);
      
      // ✅ SAFE ACCESS: Handle different API response structures
      const results = history?.results || history?.transfers || history?.data || [];
      const count = history?.count || results.length || 0;
      
      setTransfers(Array.isArray(results) ? results : []);
      
      // Calculate pagination
      const totalPages = Math.ceil(count / 20) || 1;
      setPagination({
        page,
        totalPages,
        totalCount: count,
      });
    } catch (error: any) {
      console.error('Error fetching transfers:', error);
      setError(error?.message || 'Failed to load transfer history. Please try again.');
      setTransfers([]); // ✅ Reset to empty array on error
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchTransfers();
  }, []);

  // Handle page change
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    fetchTransfers(page);
  };

  // Get status chip color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'tac_sent': return 'info';
      case 'tac_verified': return 'info';
      case 'pending_settlement': return 'info';
      case 'failed': return 'error';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return 'Invalid Date';
    }
  };

  // Format date with time
  const formatDateTime = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Invalid Date';
    }
  };

  // ✅ SAFE FILTER: Use optional chaining and null check
  const filteredTransfers = (transfers || []).filter(transfer => {
    if (!transfer) return false; // ✅ Skip null/undefined transfers
    
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        (transfer.reference?.toLowerCase() || '').includes(searchLower) ||
        (transfer.recipient_name?.toLowerCase() || '').includes(searchLower) ||
        (transfer.destination_details?.bank_name?.toLowerCase() || '').includes(searchLower) ||
        (transfer.destination_details?.account_number?.toLowerCase() || '').includes(searchLower) ||
        (transfer.destination_details?.mobile_number?.toLowerCase() || '').includes(searchLower);
      
      if (!matchesSearch) return false;
    }

    // Status filter
    if (statusFilter !== 'all' && transfer.status !== statusFilter) {
      return false;
    }

    // Type filter
    if (typeFilter !== 'all' && transfer.destination_type !== typeFilter) {
      return false;
    }

    // Date filters
    if (dateFrom && transfer.created_at) {
      try {
        const transferDate = new Date(transfer.created_at);
        if (transferDate < dateFrom) return false;
      } catch {
        // Invalid date, skip filtering
      }
    }

    if (dateTo && transfer.created_at) {
      try {
        const transferDate = new Date(transfer.created_at);
        const toDate = new Date(dateTo);
        toDate.setHours(23, 59, 59, 999);
        if (transferDate > toDate) return false;
      } catch {
        // Invalid date, skip filtering
      }
    }

    return true;
  });

  // Export to CSV
  const handleExport = () => {
    const csvContent = [
      ['Reference', 'Date', 'Amount', 'Recipient', 'Type', 'Status', 'Destination Details', 'Narration'],
      ...filteredTransfers.map(t => [
        t.reference || 'N/A',
        formatDate(t.created_at),
        `$${parseFloat(t.amount || 0).toFixed(2)}`,
        t.recipient_name || 'N/A',
        t.destination_type || 'N/A',
        t.status || 'N/A',
        t.destination_type === 'bank' 
          ? `${t.destination_details?.bank_name || 'N/A'} - ${t.destination_details?.account_number || 'N/A'}`
          : t.destination_type === 'mobile_wallet'
            ? `${t.destination_details?.mobile_provider || 'N/A'} - ${t.destination_details?.mobile_number || 'N/A'}`
            : (t.destination_details?.crypto_address?.slice(0, 20) || 'N/A') + '...',
        t.narration || '',
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transfers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setTypeFilter('all');
    setDateFrom(null);
    setDateTo(null);
  };

  // Calculate stats safely
  const totalAmount = (transfers || []).reduce((sum, t) => {
    const amount = parseFloat(t?.amount || 0);
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);

  const completedCount = (transfers || []).filter(t => t?.status === 'completed').length;
  const pendingCount = (transfers || []).filter(t => 
    ['pending', 'tac_sent', 'tac_verified', 'pending_settlement'].includes(t?.status || '')
  ).length;

  // Handle error snackbar close
  const handleErrorClose = () => {
    setError(null);
  };

  return (
    <Container maxWidth="xl" className={styles.container}>
      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleErrorClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={handleErrorClose} icon={<ErrorOutline />}>
          {error}
        </Alert>
      </Snackbar>

      <Box mb={4}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/dashboard')}
          className={styles.backButton}
        >
          Back to Dashboard
        </Button>
        <Typography variant="h4" component="h1" gutterBottom>
          Transfer History
        </Typography>
        <Typography color="textSecondary">
          View and manage all your money transfers
        </Typography>
      </Box>

      {/* Filters Section */}
      <Paper className={styles.paper} sx={{ mb: 3 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6">
            Filters
          </Typography>
          <Box display="flex" gap={1}>
            <Button
              startIcon={<Refresh />}
              onClick={() => fetchTransfers(pagination.page)}
              size="small"
              disabled={loading}
            >
              Refresh
            </Button>
            <Button
              startIcon={<Download />}
              onClick={handleExport}
              size="small"
              variant="outlined"
              disabled={filteredTransfers.length === 0}
            >
              Export CSV
            </Button>
          </Box>
        </Box>

        <Grid container spacing={2}>
          {/* Search */}
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              placeholder="Search transfers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              size="small"
              disabled={loading}
            />
          </Grid>

          {/* Status Filter */}
          <Grid item xs={12} md={2}>
            <FormControl fullWidth size="small" disabled={loading}>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="tac_sent">TAC Sent</MenuItem>
                <MenuItem value="tac_verified">TAC Verified</MenuItem>
                <MenuItem value="pending_settlement">Pending Settlement</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="failed">Failed</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Type Filter */}
          <Grid item xs={12} md={2}>
            <FormControl fullWidth size="small" disabled={loading}>
              <InputLabel>Type</InputLabel>
              <Select
                value={typeFilter}
                label="Type"
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="bank">Bank Transfer</MenuItem>
                <MenuItem value="mobile_wallet">Mobile Wallet</MenuItem>
                <MenuItem value="crypto">Cryptocurrency</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Date From */}
          <Grid item xs={12} md={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="From Date"
                value={dateFrom}
                onChange={(newValue) => setDateFrom(newValue)}
                slotProps={{ textField: { size: 'small', fullWidth: true, disabled: loading } }}
              />
            </LocalizationProvider>
          </Grid>

          {/* Date To */}
          <Grid item xs={12} md={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="To Date"
                value={dateTo}
                onChange={(newValue) => setDateTo(newValue)}
                slotProps={{ textField: { size: 'small', fullWidth: true, disabled: loading } }}
              />
            </LocalizationProvider>
          </Grid>

          {/* Clear Filters */}
          <Grid item xs={12} md={1}>
            <Button
              fullWidth
              variant="outlined"
              onClick={clearFilters}
              size="small"
              disabled={loading}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Stats Summary */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={styles.statsCard}>
            <Typography variant="h6" gutterBottom>
              Total Transfers
            </Typography>
            <Typography variant="h4">
              {pagination.totalCount}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={styles.statsCard}>
            <Typography variant="h6" gutterBottom>
              Total Amount
            </Typography>
            <Typography variant="h4">
              ${totalAmount.toFixed(2)}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={styles.statsCard}>
            <Typography variant="h6" gutterBottom>
              Completed
            </Typography>
            <Typography variant="h4" color="success.main">
              {completedCount}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={styles.statsCard}>
            <Typography variant="h6" gutterBottom>
              Pending
            </Typography>
            <Typography variant="h4" color="warning.main">
              {pendingCount}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Transfers Table */}
      <Paper className={styles.paper}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box textAlign="center" py={8}>
            <ErrorOutline color="error" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h6" color="error" gutterBottom>
              Error Loading Data
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              {error}
            </Typography>
            <Button
              variant="contained"
              onClick={() => fetchTransfers()}
              sx={{ mt: 2 }}
            >
              Retry
            </Button>
          </Box>
        ) : filteredTransfers.length === 0 ? (
          <Box textAlign="center" py={8}>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              No transfers found
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              {(transfers || []).length === 0 
                ? "You haven't made any transfers yet."
                : "No transfers match your current filters."}
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/dashboard/transfer')}
              sx={{ mt: 2 }}
            >
              Make Your First Transfer
            </Button>
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Reference</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Recipient</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Details</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTransfers.map((transfer) => (
                    <TableRow key={transfer.id || transfer.reference} hover>
                      <TableCell>
                        <Typography variant="body2" fontFamily="monospace">
                          {transfer.reference || 'N/A'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {formatDate(transfer.created_at)}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {formatDateTime(transfer.created_at).split(',')[1]}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" fontWeight="bold">
                          ${parseFloat(transfer.amount || 0).toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {transfer.recipient_name || 'N/A'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={(transfer.destination_type || 'N/A').toUpperCase()}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={(transfer.status || 'N/A').replace('_', ' ').toUpperCase()}
                          color={getStatusColor(transfer.status) as any}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" noWrap sx={{ maxWidth: '200px' }}>
                          {transfer.destination_type === 'bank' && 
                            `${transfer.destination_details?.bank_name || 'N/A'} ••• ${transfer.destination_details?.account_number?.slice(-4) || 'N/A'}`}
                          {transfer.destination_type === 'mobile_wallet' && 
                            `${transfer.destination_details?.mobile_provider || 'N/A'} ••• ${transfer.destination_details?.mobile_number?.slice(-4) || 'N/A'}`}
                          {transfer.destination_type === 'crypto' && 
                            `${transfer.destination_details?.crypto_type || 'N/A'} ••• ${transfer.destination_details?.crypto_address?.slice(-10) || 'N/A'}`}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => navigate(`/dashboard/transfer/status/${transfer.id}`)}
                            disabled={!transfer.id}
                          >
                            <Visibility fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <Box display="flex" justifyContent="center" mt={3}>
                <Pagination
                  count={pagination.totalPages}
                  page={pagination.page}
                  onChange={handlePageChange}
                  color="primary"
                  showFirstButton
                  showLastButton
                  disabled={loading}
                />
              </Box>
            )}
          </>
        )}
      </Paper>

      {/* Quick Actions */}
      <Box mt={3} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          onClick={() => navigate('/dashboard/transfer')}
          startIcon={<Download />}
        >
          New Transfer
        </Button>
      </Box>
    </Container>
  );
};

export default TransfersHistory;
