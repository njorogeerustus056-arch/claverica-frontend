import { apiFetch } from './api';
import { useAuthStore } from '../lib/store/auth';

export interface TransferRequest {
  amount: number;
  recipient_name: string;
  destination_type: 'bank' | 'mobile_wallet' | 'crypto';
  destination_details: {
    bank_name?: string;
    account_number?: string;
    account_type?: string;
    mobile_provider?: string;
    mobile_number?: string;
    crypto_address?: string;
    crypto_type?: string;
  };
  narration?: string;
}

export interface TransferResponse {
  id: number;
  reference: string;
  amount: string;
  recipient_name: string;
  destination_type: string;
  status: string;
  created_at: string;
}

export interface TACVerificationRequest {
  tac_code: string;
}

export interface TransferStatus {
  id: number;
  reference: string;
  amount: string;
  status: string;
  recipient_name: string;
  destination_type: string;
  destination_details: any;
  narration: string;
  created_at: string;
  updated_at: string;
  external_reference?: string;
  balance_before?: string;
  balance_after?: string;
}

export interface TransfersHistory {
  count: number;
  next: string | null;
  previous: string | null;
  results: TransferStatus[];
}

export interface TransferStats {
  total_transfers: number;
  total_amount: string;
  pending_transfers: number;
  completed_transfers: number;
  failed_transfers: number;
}

export interface WalletBalance {
  balance: string;
  currency: string;
}

// Transaction History Interface
export interface TransactionRecord {
  id: string;
  transaction_type: 'credit' | 'debit' | 'fee' | 'refund';
  amount: string;
  reference: string;
  description: string;
  balance_before: string;
  balance_after: string;
  timestamp: string;
  metadata: any;
}

export interface TransactionHistory {
  account_number: string;
  transactions: TransactionRecord[];
  count: number;
}

// KYC Interfaces
export interface KYCRequest {
  document_type: string;
  full_name: string;
  date_of_birth: string;
  id_number?: string;
  amount?: number;
  service_type?: string;
}

export interface KYCResponse {
  success: boolean;
  message: string;
  verification_id?: string;
  estimated_time?: string;
}

export interface KYCStatus {
  status: 'pending' | 'approved' | 'rejected' | 'processing';
  verified: boolean;
  message?: string;
  verified_at?: string;
  next_review?: string;
}

export const transferAPI = {
  // ✅ FIXED: Create transfer - Now using correct compliance endpoint
  createTransfer: async (data: TransferRequest): Promise<{success: boolean; transfer_id: number; reference: string; message: string}> => {
    try {
      const { user } = useAuthStore.getState();
      
      if (!user?.account_number) {
        return {
          success: false,
          transfer_id: 0,
          reference: '',
          message: 'User not authenticated or account number not found'
        };
      }
      
      console.log('📌 User account:', user.account_number);
      
      const cleanedData = { ...data };
      
      // Map destination details based on type
      if (cleanedData.destination_type === 'bank') {
        cleanedData.destination_details = {
          bank_name: cleanedData.destination_details.bank_name || '',
          account_number: cleanedData.destination_details.account_number || '',
          account_type: cleanedData.destination_details.account_type || 'checking'
        };
        
      } else if (cleanedData.destination_type === 'mobile_wallet') {
        cleanedData.destination_details = {
          mobile_provider: cleanedData.destination_details.mobile_provider || '',
          mobile_number: cleanedData.destination_details.mobile_number || ''
        };
        
      } else if (cleanedData.destination_type === 'crypto') {
        cleanedData.destination_details = {
          crypto_type: cleanedData.destination_details.crypto_type || '',
          crypto_address: cleanedData.destination_details.crypto_address || ''
        };
      }
      
      console.log('📤 Sending to COMPLIANCE API:', cleanedData);
      
      // ✅ FIXED: Changed to correct compliance endpoint
      const response = await apiFetch('/api/compliance/transfers/', {
        method: 'POST',
        body: JSON.stringify(cleanedData)
      });
      
      console.log('📥 COMPLIANCE API Response:', response);
      
      // Debug logging to see exact response format
      console.log('🔍 [DEBUG] Full response:', response);
      console.log('🔍 [DEBUG] Response type:', typeof response);
      console.log('🔍 [DEBUG] Has id?', response?.id);
      console.log('🔍 [DEBUG] Has reference?', response?.reference);
      console.log('🔍 [DEBUG] Response keys:', Object.keys(response || {}));
      
      // Check multiple possible response formats
      if (response && response.id) {
        // Format 1: Direct TransferSerializer response
        console.log('✅ Format 1: Direct TransferSerializer response');
        return {
          success: true,
          transfer_id: response.id,
          reference: response.reference || `TF-${Date.now()}`,
          message: 'Transfer submitted successfully! Contact live agent for TAC code.'
        };
      } else if (response && response.data && response.data.id) {
        // Format 2: Nested response with data object
        console.log('✅ Format 2: Nested response with data object');
        return {
          success: true,
          transfer_id: response.data.id,
          reference: response.data.reference || `TF-${Date.now()}`,
          message: 'Transfer submitted successfully! Contact live agent for TAC code.'
        };
      } else if (response && response.transfer_id) {
        // Format 3: Alternative field name
        console.log('✅ Format 3: Alternative field name (transfer_id)');
        return {
          success: true,
          transfer_id: response.transfer_id,
          reference: response.reference || `TF-${Date.now()}`,
          message: 'Transfer submitted successfully! Contact live agent for TAC code.'
        };
      } else if (response && response.status === 201) {
        // Format 4: HTTP status in response
        console.log('✅ Format 4: HTTP status in response');
        // Try to extract from response data
        const transferData = response.data || response;
        return {
          success: true,
          transfer_id: transferData.id || 0,
          reference: transferData.reference || `TF-${Date.now()}`,
          message: 'Transfer submitted successfully! Contact live agent for TAC code.'
        };
      } else {
        console.error('❌ Unexpected response format:', response);
        return {
          success: false,
          transfer_id: 0,
          reference: '',
          message: 'Unexpected response format from server'
        };
      }
      
    } catch (error: any) {
      console.error('❌ Transfer creation error:', error);
      console.error('❌ Error details:', error.response?.data || error.message);
      
      return {
        success: false,
        transfer_id: 0,
        reference: '',
        message: error.response?.data?.message || 
                error.response?.data?.detail || 
                error.message || 
                'Failed to create transfer'
      };
    }
  },

  // Get wallet balance
  getWalletBalance: async (): Promise<WalletBalance> => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const { tokens } = useAuthStore.getState();
      const url = `${API_URL}/transactions/wallet/balance/`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(tokens?.access ? { 
            'Authorization': `Bearer ${tokens.access}` 
          } : {})
        }
      });

      if (!response.ok) {
        return {
          balance: '0.00',
          currency: 'USD'
        };
      }

      const rawData = await response.json();
      const balanceValue = typeof rawData.balance === 'number' ? rawData.balance : 
                          typeof rawData.balance === 'string' ? parseFloat(rawData.balance) : 0.00;
      
      const currency = rawData.currency || 'USD';
      
      return {
        balance: isNaN(balanceValue) ? '0.00' : balanceValue.toFixed(2),
        currency: currency
      };
      
    } catch (error: any) {
      return {
        balance: '0.00',
        currency: 'USD'
      };
    }
  },

  // ✅ FIXED: Get transfer status - Now using correct compliance endpoint
  getTransfer: async (transferId: number): Promise<TransferStatus> => {
    try {
      // ✅ FIXED: Changed to correct compliance endpoint
      const transferData = await apiFetch(`/api/compliance/transfers/${transferId}/`);
      return transferData;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch transfer status');
    }
  },

  // ✅ FIXED: Verify TAC - Now using correct compliance endpoint with hyphen
  verifyTAC: async (transferId: number, tacCode: string): Promise<{success: boolean; message: string}> => {
    try {
      console.log(`🔐 Verifying TAC ${tacCode} for transfer ${transferId}`);
      
      // ✅ FIXED: Changed to correct compliance endpoint with hyphen (verify-tac)
      const response = await apiFetch(`/api/compliance/transfers/${transferId}/verify-tac/`, {
        method: 'POST',
        body: JSON.stringify({ tac_code: tacCode })
      });
      
      console.log('📥 TAC Verification Response:', response);
      
      if (response && response.success !== false) {
        return {
          success: true,
          message: response.message || 'TAC verified successfully'
        };
      } else {
        return {
          success: false,
          message: response.error || 'Invalid TAC code'
        };
      }
    } catch (error: any) {
      console.error('❌ TAC verification error:', error);
      return {
        success: false,
        message: error.message || 'Failed to verify TAC'
      };
    }
  },

  // ✅ FIXED: Get user's transfer history - Now using correct compliance endpoint
  getTransfersHistory: async (page = 1, limit = 20): Promise<TransfersHistory> => {
    try {
      // ✅ FIXED: Changed to correct compliance endpoint
      const historyData = await apiFetch(`/api/compliance/transfers/?page=${page}`);
      return historyData;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch transfer history');
    }
  },

  // Get transaction history (CREDITS + DEBITS) via TRANSACTIONS API
  getTransactionHistory: async (limit = 20): Promise<TransactionHistory> => {
    try {
      const historyData = await apiFetch(`/api/transactions/recent/?limit=${limit}`);
      return historyData;
    } catch (error: any) {
      console.error('❌ Transaction history error:', error);
      // Return empty but valid structure
      const { user } = useAuthStore.getState();
      return {
        account_number: user?.account_number || 'unknown',
        transactions: [],
        count: 0
      };
    }
  },

  // Get transaction history by account number (if needed)
  getTransactionHistoryByAccount: async (accountNumber: string, limit = 50): Promise<TransactionHistory> => {
    try {
      const historyData = await apiFetch(`/api/transactions/history/${accountNumber}/?limit=${limit}`);
      return historyData;
    } catch (error: any) {
      console.error('❌ Account transaction history error:', error);
      return {
        account_number: accountNumber,
        transactions: [],
        count: 0
      };
    }
  },

  // ✅ FIXED: Get transfers needing TAC (for admin) - Now using correct compliance endpoint
  getPendingTransfers: async (): Promise<TransferStatus[]> => {
    try {
      // ✅ FIXED: Changed to correct compliance admin endpoint
      const pendingData = await apiFetch('/api/compliance/admin/transfers/need-tac/');
      return pendingData;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch pending transfers');
    }
  },

  // ✅ FIXED: Cancel transfer - Now using correct compliance endpoint
  cancelTransfer: async (transferId: number): Promise<{success: boolean; message: string}> => {
    try {
      // ✅ FIXED: Changed to correct compliance admin endpoint
      const response = await apiFetch(`/api/compliance/admin/transfers/${transferId}/cancel/`, {
        method: 'POST'
      });
      
      if (response && response.success !== false) {
        return {
          success: true,
          message: response.message || 'Transfer cancelled successfully'
        };
      } else {
        return {
          success: false,
          message: response.error || 'Failed to cancel transfer'
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to cancel transfer'
      };
    }
  },

  // Submit KYC documents
  submitKYC: async (formData: FormData): Promise<KYCResponse> => {
    try {
      console.log('📤 Submitting KYC documents...');
      
      const API_URL = import.meta.env.VITE_API_URL;
      const { tokens } = useAuthStore.getState();
      
      const response = await fetch(`${API_URL}/kyc/api/documents/`, {
        method: 'POST',
        headers: {
          ...(tokens?.access ? { 
            'Authorization': `Bearer ${tokens.access}` 
          } : {})
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'KYC submission failed');
      }

      const data = await response.json();
      
      return {
        success: true,
        message: data.message || 'KYC submitted successfully',
        verification_id: data.verification_id,
        estimated_time: data.estimated_time || '24-48 hours'
      };
      
    } catch (error: any) {
      console.error('❌ KYC submission error:', error);
      return {
        success: false,
        message: error.message || 'Failed to submit KYC'
      };
    }
  },

  // Check KYC status
  getKYCStatus: async (): Promise<KYCStatus> => {
    try {
      const response = await apiFetch('/kyc/api/documents/status/');
      
      if (response && response.status) {
        return response;
      } else {
        return {
          status: 'pending',
          verified: false,
          message: 'No KYC submission found'
        };
      }
    } catch (error) {
      return {
        status: 'pending',
        verified: false,
        message: 'Failed to fetch KYC status'
      };
    }
  },

  // Check if KYC is required for specific amount
  checkKYCRequirement: async (amount: number, serviceType: string = 'transfer'): Promise<{requires_kyc: boolean; threshold: number; message: string}> => {
    try {
      const response = await apiFetch(`/kyc/api/check-requirement/?amount=${amount}&service_type=${serviceType}`);
      
      if (response && response.requires_kyc !== undefined) {
        return {
          requires_kyc: response.requires_kyc,
          threshold: response.threshold || 1500,
          message: response.message || ''
        };
      } else {
        return {
          requires_kyc: amount >= 1500,
          threshold: 1500,
          message: amount >= 1500 ? 'KYC required for amounts $1,500 and above' : 'KYC not required'
        };
      }
    } catch (error) {
      return {
        requires_kyc: amount >= 1500,
        threshold: 1500,
        message: amount >= 1500 ? 'KYC required for amounts $1,500 and above' : 'KYC not required'
      };
    }
  },

  // Get user's KYC submissions
  getKYCSubmissions: async (): Promise<any[]> => {
    try {
      const response = await apiFetch('/kyc/api/documents/submissions/');
      return response || [];
    } catch (error) {
      return [];
    }
  },
};

export default transferAPI;