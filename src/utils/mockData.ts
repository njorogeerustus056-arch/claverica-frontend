export interface User {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  avatar: string | null;
}

export interface Account {
  id: string;
  type: 'checking' | 'savings';
  currency: string;
  balance: number;
  localBalance: number;
}

export interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  category: string;
  description: string;
  amount: number;
  currency: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  merchant: string;
  icon: string;
}

export interface SpendingCategory {
  category: string;
  amount: number;
  color: string;
  icon: string;
}

export interface CryptoAsset {
  symbol: string;
  name: string;
  amount: number;
  value: number;
  change24h: number;
  icon: string;
}

export const mockUser: User = {
  id: '7116500084',
  name: 'Erustus Njoroge Nyaga',
  initials: 'EN',
  email: 'erustus@claverica.com',
  phone: '+254 712 345 678',
  avatar: null,
};

export const mockAccounts: Account[] = [
  {
    id: '****00084',
    type: 'checking',
    currency: 'USD',
    balance: 2300.00,
    localBalance: 2300.00,
  },
  {
    id: '****00085',
    type: 'savings',
    currency: 'EUR',
    balance: 1500.50,
    localBalance: 1762.09,
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: 'FIN/171KIGXE2-0525',
    type: 'credit',
    category: 'payment',
    description: 'PROJECT PAYMENT',
    amount: 2300,
    currency: 'USD',
    date: '2025-05-20T11:13:00',
    status: 'completed',
    merchant: 'Freelance Client',
    icon: '💼',
  },
  {
    id: 'TXN-002',
    type: 'debit',
    category: 'shopping',
    description: 'Amazon Purchase',
    amount: -89.99,
    currency: 'USD',
    date: '2025-05-19T14:22:00',
    status: 'completed',
    merchant: 'Amazon',
    icon: '🛒',
  },
  {
    id: 'TXN-003',
    type: 'debit',
    category: 'food',
    description: 'Starbucks',
    amount: -12.50,
    currency: 'USD',
    date: '2025-05-19T09:15:00',
    status: 'completed',
    merchant: 'Starbucks',
    icon: '☕',
  },
  {
    id: 'TXN-004',
    type: 'credit',
    category: 'transfer',
    description: 'Refund from Nike',
    amount: 156.00,
    currency: 'USD',
    date: '2025-05-18T16:45:00',
    status: 'completed',
    merchant: 'Nike',
    icon: '↩️',
  },
  {
    id: 'TXN-005',
    type: 'debit',
    category: 'transport',
    description: 'Uber Ride',
    amount: -23.40,
    currency: 'USD',
    date: '2025-05-18T08:30:00',
    status: 'completed',
    merchant: 'Uber',
    icon: '🚗',
  },
];

export const mockSpendingData: SpendingCategory[] = [
  { category: 'Food & Dining', amount: 245.80, color: '#FF6B6B', icon: '🍔' },
  { category: 'Shopping', amount: 432.50, color: '#4ECDC4', icon: '🛍️' },
  { category: 'Transport', amount: 156.30, color: '#45B7D1', icon: '🚗' },
  { category: 'Entertainment', amount: 98.00, color: '#FFA07A', icon: '🎬' },
  { category: 'Bills', amount: 567.40, color: '#98D8C8', icon: '📄' },
];

export const mockExchangeRates: Record<string, number> = {
  'EUR/USD': 1.17983,
  'GBP/AUD': 2.07026,
  'GBP/CAD': 1.85295,
  'GBP/USD': 1.36332,
  'GBP/NZD': 2.23928,
  'EUR/NZD': 1.89858,
};

export const mockCryptoPortfolio: CryptoAsset[] = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    amount: 0.0234,
    value: 1245.67,
    change24h: 3.45,
    icon: '₿',
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    amount: 0.5678,
    value: 987.23,
    change24h: -1.23,
    icon: 'Ξ',
  },
  {
    symbol: 'USDT',
    name: 'Tether',
    amount: 500,
    value: 500.00,
    change24h: 0.01,
    icon: '₮',
  },
];