export type TransferStatusType = 
  | 'pending_tac'
  | 'tac_generated'
  | 'tac_sent'
  | 'tac_verified'
  | 'funds_deducted'
  | 'pending_settlement'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'expired';

export type DestinationType = 'bank' | 'mobile_wallet' | 'crypto';

export interface DestinationDetails {
  bank_name?: string;
  account_number?: string;
  branch?: string;
  mobile_provider?: string;
  mobile_number?: string;
  crypto_address?: string;
  crypto_type?: string;
}

export interface Transfer {
  id: number;
  reference: string;
  account_number: string;
  amount: string;
  recipient_name: string;
  destination_type: DestinationType;
  destination_details: DestinationDetails;
  status: TransferStatusType;
  narration: string;
  tac_code?: string;
  tac_expires_at?: string;
  external_reference?: string;
  balance_before?: string;
  balance_after?: string;
  created_at: string;
  updated_at: string;
}

export interface TransferLog {
  id: number;
  transfer: number;
  log_type: string;
  message: string;
  created_at: string;
}

export interface TransferLimit {
  limit_type: 'daily' | 'weekly' | 'monthly' | 'per_transaction';
  amount: string;
  used_amount: string;
  remaining_amount: string;
  reset_at: string;
}

export interface TransferContextType {
  currentTransfer: Transfer | null;
  transfers: Transfer[];
  loading: boolean;
  error: string | null;
  pollTransfer: (transferId: number) => Promise<void>;
  createTransfer: (data: any) => Promise<{success: boolean; transfer_id: number}>;
  verifyTAC: (transferId: number, tacCode: string) => Promise<{success: boolean}>;
  refreshTransfers: () => Promise<void>;
}

// Filter types
export interface TransferFilters {
  searchTerm: string;
  statusFilter: string;
  typeFilter: string;
  dateFrom: Date | null;
  dateTo: Date | null;
}

// Stats types
export interface TransferStats {
  total_transfers: number;
  total_amount: number;
  pending_count: number;
  completed_count: number;
  failed_count: number;
}

// TAC verification types
export interface TACVerification {
  transfer_id: number;
  tac_code: string;
  expires_at: string;
  verified: boolean;
}

// Export all types
export type {
  TransferStatus,
  TransferRequest,
  TACVerificationRequest,
  TransfersHistory,
} from '../services/transfer-api';
