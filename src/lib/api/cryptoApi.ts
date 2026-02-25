// src/lib/api/cryptoApi.ts - Mock API for crypto data
import { cryptoCoins } from '../../data/cryptoCoins';
import { fiatPlatforms } from '../../data/fiatPlatforms';

export interface CryptoCoin {
  symbol: string;
  name: string;
  logo: string;
  price: number;
  change24h: number;
  balance: number;
  valueUSD: number;
}

export interface FiatPlatform {
  id: string;
  name: string;
  logo: string;
  type: "bank" | "payment";
  balance: number;
  currency: string;
  accountNumber?: string;
}

export interface PortfolioData {
  totalValue: number;
  dayChange: number;
  weekChange: number;
  monthChange: number;
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'deposit' | 'withdrawal' | 'transfer';
  asset: string;
  amount: number;
  valueUSD: number;
  status: 'completed' | 'pending' | 'failed';
  timestamp: string;
  description?: string;
}

// Mock delay to simulate API call
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch crypto data
export const fetchCryptoData = async (): Promise<CryptoCoin[]> => {
  await delay(500); // Simulate network delay
  
  // In a real app, this would be an API call
  return cryptoCoins.map(coin => ({
    ...coin,
    valueUSD: coin.price * coin.balance,
    // Add some random variation for demo
    price: coin.price * (1 + (Math.random() - 0.5) * 0.02),
    change24h: coin.change24h + (Math.random() - 0.5) * 0.5,
  }));
};

// Fetch fiat platforms data
export const fetchFiatPlatforms = async (): Promise<FiatPlatform[]> => {
  await delay(300);
  return fiatPlatforms;
};

// Fetch portfolio summary
export const fetchPortfolioData = async (): Promise<PortfolioData> => {
  await delay(400);
  
  const totalCryptoValue = cryptoCoins.reduce((sum, coin) => sum + (coin.price * coin.balance), 0);
  const totalFiatValue = fiatPlatforms.reduce((sum, platform) => sum + platform.balance, 0);
  const totalValue = totalCryptoValue + totalFiatValue;
  
  return {
    totalValue,
    dayChange: 2.34 + (Math.random() - 0.5) * 1,
    weekChange: 5.67 + (Math.random() - 0.5) * 2,
    monthChange: 12.45 + (Math.random() - 0.5) * 3,
  };
};

// Fetch transaction history
export const fetchTransactions = async (limit: number = 10): Promise<Transaction[]> => {
  await delay(600);
  
  const mockTransactions: Transaction[] = [
    {
      id: '1',
      type: 'buy',
      asset: 'BTC',
      amount: 0.005,
      valueUSD: 342.10,
      status: 'completed',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      description: 'Market buy order',
    },
    {
      id: '2',
      type: 'deposit',
      asset: 'Wise',
      amount: 1000,
      valueUSD: 1000,
      status: 'completed',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      description: 'Bank transfer deposit',
    },
    {
      id: '3',
      type: 'transfer',
      asset: 'Monzo',
      amount: 500,
      valueUSD: 500,
      status: 'pending',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
      description: 'International transfer to USD',
    },
    {
      id: '4',
      type: 'sell',
      asset: 'ETH',
      amount: 0.2,
      valueUSD: 762.40,
      status: 'completed',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      description: 'Limit sell order filled',
    },
    {
      id: '5',
      type: 'withdrawal',
      asset: 'Revolut',
      amount: 200,
      valueUSD: 200,
      status: 'completed',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      description: 'ATM withdrawal',
    },
    {
      id: '6',
      type: 'buy',
      asset: 'SOL',
      amount: 2.5,
      valueUSD: 356.25,
      status: 'completed',
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
      description: 'Quick buy',
    },
    {
      id: '7',
      type: 'deposit',
      asset: 'Skrill',
      amount: 750,
      valueUSD: 750,
      status: 'completed',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      description: 'Card deposit',
    },
    {
      id: '8',
      type: 'transfer',
      asset: 'Wise',
      amount: 300,
      valueUSD: 300,
      status: 'failed',
      timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
      description: 'Insufficient funds',
    },
  ];
  
  return mockTransactions.slice(0, limit);
};

// Fetch market data (prices, changes)
export const fetchMarketData = async () => {
  await delay(800);
  
  // Simulate real market data
  const marketData = cryptoCoins.map(coin => ({
    symbol: coin.symbol,
    price: coin.price * (1 + (Math.random() - 0.5) * 0.05),
    change24h: coin.change24h + (Math.random() - 0.5) * 2,
    volume24h: Math.random() * 1000000,
    marketCap: Math.random() * 1000000000,
  }));
  
  return {
    timestamp: new Date().toISOString(),
    data: marketData,
    source: 'CoinGecko Mock API',
  };
};

// Submit buy order
export const submitBuyOrder = async (symbol: string, amount: number, price?: number) => {
  await delay(1000); // Simulate processing time
  
  // In reality, this would call your backend
  return {
    success: true,
    orderId: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    symbol,
    amount,
    executedPrice: price || cryptoCoins.find(c => c.symbol === symbol)?.price || 0,
    timestamp: new Date().toISOString(),
    status: 'pending_execution',
  };
};

// Submit sell order
export const submitSellOrder = async (symbol: string, amount: number, price?: number) => {
  await delay(1000);
  
  return {
    success: true,
    orderId: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    symbol,
    amount,
    executedPrice: price || cryptoCoins.find(c => c.symbol === symbol)?.price || 0,
    timestamp: new Date().toISOString(),
    status: 'pending_execution',
  };
};

// Check KYC status and limits
export const fetchKYCLimits = async () => {
  await delay(200);
  
  return {
    isVerified: false, // This would come from backend
    dailyLimit: 1500,
    monthlyLimit: 10000,
    withdrawalLimit: 2000,
    depositLimit: 5000,
    remainingDaily: 1500,
    kycLevel: 1, // 0 = no KYC, 1 = basic, 2 = enhanced, 3 = full
    nextLevelRequirements: ['identity_verification', 'address_proof', 'source_of_funds'],
  };
};
