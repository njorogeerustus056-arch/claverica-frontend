import React, { createContext, useContext, useState, useCallback } from 'react';
import transferAPI, { TransferStatus } from '../services/transfer-api';
import { TransferContextType } from '../utils/transfer-types';

const TransferContext = createContext<TransferContextType | undefined>(undefined);

export const useTransfer = () => {
  const context = useContext(TransferContext);
  if (!context) {
    throw new Error('useTransfer must be used within a TransferProvider');
  }
  return context;
};

interface TransferProviderProps {
  children: React.ReactNode;
}

export const TransferProvider: React.FC<TransferProviderProps> = ({ children }) => {
  const [currentTransfer, setCurrentTransfer] = useState<TransferStatus | null>(null);
  const [transfers, setTransfers] = useState<TransferStatus[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Poll transfer status
  const pollTransfer = useCallback(async (transferId: number) => {
    try {
      const transfer = await transferAPI.getTransfer(transferId);
      setCurrentTransfer(transfer);
    } catch (err: any) {
      console.error('Error polling transfer:', err);
      setError(err.message);
    }
  }, []);

  // Create transfer
  const createTransfer = useCallback(async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const result = await transferAPI.createTransfer(data);
      if (result.success) {
        // Immediately fetch the created transfer
        const transfer = await transferAPI.getTransfer(result.transfer_id);
        setCurrentTransfer(transfer);
      }
      return result;
    } catch (err: any) {
      setError(err.message);
      return { success: false, transfer_id: 0 };
    } finally {
      setLoading(false);
    }
  }, []);

  // Verify TAC
  const verifyTAC = useCallback(async (transferId: number, tacCode: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await transferAPI.verifyTAC(transferId, tacCode);
      if (result.success) {
        // Refresh transfer status
        const transfer = await transferAPI.getTransfer(transferId);
        setCurrentTransfer(transfer);
      }
      return result;
    } catch (err: any) {
      setError(err.message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  // Refresh transfers list
  const refreshTransfers = useCallback(async () => {
    setLoading(true);
    try {
      const history = await transferAPI.getTransfersHistory();
      setTransfers(history.results);
    } catch (err: any) {
      console.error('Error refreshing transfers:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const value: TransferContextType = {
    currentTransfer,
    transfers,
    loading,
    error,
    pollTransfer,
    createTransfer,
    verifyTAC,
    refreshTransfers,
  };

  return (
    <TransferContext.Provider value={value}>
      {children}
    </TransferContext.Provider>
  );
};