// src/hooks/useDashboardData.ts - FIXED VERSION
import { useState, useEffect } from 'react';
import { api } from '../api'; // Your existing api.ts
import { useAuthStore } from '../lib/store/auth';

export function useDashboardData() {
  const [wallet, setWallet] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
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

      // ✅ FIXED: Use walletAPI instead of api.fetch with /api prefix
      const [walletRes, transactionsRes] = await Promise.all([
        api.wallet.getBalance(),  // ✅ CORRECT - uses /transactions/wallet/balance/
        api.wallet.getTransactions(), // ✅ CORRECT - uses /transactions/recent/
      ]);

      // Transform to match your Home.tsx UI
      setWallet({
        balance: parseFloat(walletRes.balance || "0"),
        available: parseFloat(walletRes.balance || "0"),
        pending: 0,
        currency: walletRes.currency || "USD"
      });

      // Transform transactions
      const txList = Array.isArray(transactionsRes?.transactions) 
        ? transactionsRes.transactions 
        : [];
      
      setTransactions(txList.map((tx: any) => ({
        id: tx.id,
        amount: parseFloat(tx.amount),
        transaction_type: tx.transaction_type,
        description: tx.description || tx.reference,
        created_at: tx.created_at || tx.timestamp,
        status: tx.status || "completed",
        reference: tx.reference
      })));

    } catch (err: any) {
      console.error("Dashboard fetch error:", err);
      setError(err.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tokens?.access) {
      fetchDashboardData();
    }
  }, [tokens?.access]);

  return {
    wallet,
    transactions,
    loading,
    error,
    refetch: fetchDashboardData
  };
}