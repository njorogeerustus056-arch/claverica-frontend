import { useState, useCallback } from 'react';
import { apiFetch, uploadFormData } from '@/api';
import { KYC_CREATIVES } from '@/lib/utils/kycCreatives';

export interface KYCStatus {
  hasApprovedKYC: boolean;
  latestSubmission?: {
    status: string;
    submittedAt: string;
    reviewedAt?: string;
    adminNotes?: string;
  };
  pendingRequests: Array<{
    serviceType: string;
    requestedFor: string;
    createdAt: string;
  }>;
}

export const useKYC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [kycStatus, setKycStatus] = useState<KYCStatus | null>(null);

  // Add creative context helper ✅
  const getCreativeContext = useCallback((action: string, amount: number, asset?: string) => {
    return {
      action,
      amount,
      asset,
      benefits: KYC_CREATIVES.getActionBenefits(action, amount, asset),
      unlockableFeature: KYC_CREATIVES.getUnlockableFeature(action),
      estimatedReward: KYC_CREATIVES.getEstimatedReward(amount, action),
      icon: KYC_CREATIVES.getIconForAction(action),
      ctaText: KYC_CREATIVES.getCreativeCTAText(action, asset),
      tier: KYC_CREATIVES.getVerificationTier(amount),
      timeToVerify: KYC_CREATIVES.getTimeToVerify()
    };
  }, []);

  // ✅ MOVE checkKYCRequirement FIRST (before it's used)
  const checkKYCRequirement = useCallback(async (
    serviceType: string,
    amount: number = 0
  ): Promise<{ requiresKYC: boolean; message: string; redirectUrl?: string }> => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiFetch('/kyc/check-requirement/', {
        method: 'POST',
        body: JSON.stringify({ service_type: serviceType, amount }),
      });

      if (response.success) {
        return {
          requiresKYC: response.data.requires_kyc || false,
          message: response.data.message || '',
          redirectUrl: response.data.redirect_url,
        };
      }

      throw new Error(response.error);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Check failed');
      return { requiresKYC: false, message: 'Unable to verify KYC requirement' };
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ THEN checkKYCRequirementWithContext (depends on checkKYCRequirement)
  const checkKYCRequirementWithContext = useCallback(async (
    serviceType: string,
    amount: number = 0,
    action?: string,
    asset?: string
  ) => {
    const basicCheck = await checkKYCRequirement(serviceType, amount);
    
    if (basicCheck.requiresKYC && action) {
      return {
        ...basicCheck,
        creativeContext: getCreativeContext(action, amount, asset)
      };
    }
    
    return basicCheck;
  }, [checkKYCRequirement, getCreativeContext]);

  // Submit KYC documents
  const submitDocuments = useCallback(async (
    formData: FormData
  ): Promise<{ success: boolean; message: string }> => {
    setLoading(true);
    setError(null);

    try {
      const response = await uploadFormData('/kyc/submit/', formData);

      if (response.success) {
        return {
          success: true,
          message: 'Documents submitted successfully',
        };
      }

      throw new Error(response.error);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Submission failed';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Get KYC status
  const getKYCStatus = useCallback(async (): Promise<KYCStatus | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiFetch('/kyc/status/');

      if (response.success) {
        // Transform backend response to our interface
        const status = {
          hasApprovedKYC: response.data.latest_kyc?.status === 'approved',
          latestSubmission: response.data.latest_kyc,
          pendingRequests: response.data.pending_submissions || [],
        };
        setKycStatus(status);
        return status;
      }

      throw new Error(response.error);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get status');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Refresh status - alias for getKYCStatus
  const refreshStatus = useCallback(async () => {
    return await getKYCStatus();
  }, [getKYCStatus]);

  return {
    loading,
    error,
    kycStatus,
    isVerified: kycStatus?.hasApprovedKYC || false,
    checkKYCRequirement, // Original
    checkRequirement: checkKYCRequirement, // Alias for Crypto.tsx
    checkKYCRequirementWithContext, // ✅ New enhanced version
    submitDocuments,
    getKYCStatus,
    refreshStatus, // Alias for getKYCStatus
    getCreativeContext, // ✅ Expose for direct use
    clearError: () => setError(null),
  };
};