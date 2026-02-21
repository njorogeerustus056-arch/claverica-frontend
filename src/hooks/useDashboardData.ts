// src/hooks/useDashboardData.ts - CORRECTED VERSION (No Fake Data)
import { useState, useEffect } from 'react';
import { api } from '../api';
import { useAuthStore } from '../lib/store/auth';

export function useDashboardData() {
  const [wallet, setWallet] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { tokens } = useAuthStore();

  const fetchDashboardData = async () => {
    if (!tokens?.access) {
      setError("Not authenticated");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log('🔍 Fetching dashboard data...');

      // Fetch all data in parallel
      const [userRes, walletRes, transactionsRes] = await Promise.allSettled([
        api.auth.getProfile(),
        api.wallet.getBalance(),
        api.wallet.getTransactions(),
      ]);

      // Track if any request failed
      let hasError = false;

      // ✅ Handle user data - NO FALLBACKS
      if (userRes.status === 'fulfilled') {
        console.log('✅ User data fetched:', userRes.value);
        const userData = userRes.value;
        setUser({
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          account_number: userData.account_number,
          is_verified: userData.is_verified
        });
      } else {
        console.error('❌ Failed to fetch user:', userRes.reason);
        setUser(null);
        hasError = true;
      }

      // ✅ Handle wallet data - NO FALLBACKS
      if (walletRes.status === 'fulfilled') {
        console.log('✅ Wallet data fetched:', walletRes.value);
        const walletData = walletRes.value;
        setWallet({
          balance: parseFloat(walletData.balance),
          available: parseFloat(walletData.balance),
          pending: walletData.pending || 0,
          currency: walletData.currency
        });
      } else {
        console.error('❌ Failed to fetch wallet:', walletRes.reason);
        setWallet(null);
        hasError = true;
      }

      // ✅ Handle transactions data
      if (transactionsRes.status === 'fulfilled') {
        console.log('✅ Transactions fetched:', transactionsRes.value);
        const txData = transactionsRes.value;
        const txList = Array.isArray(txData?.transactions) 
          ? txData.transactions 
          : Array.isArray(txData) ? txData : [];
        
        setTransactions(txList.map((tx: any) => ({
          id: tx.id,
          amount: parseFloat(tx.amount),
          transaction_type: tx.transaction_type,
          description: tx.description || tx.reference,
          created_at: tx.created_at || tx.timestamp,
          status: tx.status,
          reference: tx.reference
        })));
      } else {
        console.error('❌ Failed to fetch transactions:', transactionsRes.reason);
        setTransactions([]);
        hasError = true;
      }

      if (hasError) {
        setError('Some data failed to load');
      }

    } catch (err: any) {
      console.error("❌ Dashboard fetch error:", err);
      setError(err.message || "Failed to load dashboard data");
      setUser(null);
      setWallet(null);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tokens?.access) {
      fetchDashboardData();
    } else {
      setUser(null);
      setWallet(null);
      setTransactions([]);
      setLoading(false);
    }
  }, [tokens?.access]);

  return {
    wallet,
    transactions,
    user,
    loading,
    error,
    refetch: fetchDashboardData
  };
}