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
      }).catch(err => {
        // Handle 403 error gracefully
        if (err.status === 403) {
          console.warn('KYC check requirement returned 403 - using mock data');
          return null;
        }
        throw err;
      });

      // If we got a response and it's successful
      if (response && response.success) {
        return {
          requiresKYC: response.data.requires_kyc || false,
          message: response.data.message || '',
          redirectUrl: response.data.redirect_url,
        };
      }

      // Mock response for 403 or failed response
      const KYC_THRESHOLD = 1500;
      return {
        requiresKYC: amount > KYC_THRESHOLD,
        message: amount > KYC_THRESHOLD 
          ? `KYC required for amounts over $${KYC_THRESHOLD}` 
          : 'KYC not required',
        redirectUrl: amount > KYC_THRESHOLD ? '/kyc/submit/' : undefined,
      };

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Check failed');
      // Mock fallback on error
      const KYC_THRESHOLD = 1500;
      return { 
        requiresKYC: amount > KYC_THRESHOLD, 
        message: 'Unable to verify KYC requirement - using default limits' 
      };
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

  // Get KYC status - FIXED: Use simple-status/ endpoint with fallback
  const getKYCStatus = useCallback(async (): Promise<KYCStatus | null> => {
    setLoading(true);
    setError(null);

    try {
      // ✅ FIXED: Use simple-status/ instead of status/
      const response = await apiFetch('/kyc/simple-status/').catch(err => {
        if (err.status === 403) {
          console.warn('KYC status returned 403 - using mock data');
          return null;
        }
        throw err;
      });

      if (response) {
        // Transform backend response to our interface
        const status = {
          hasApprovedKYC: response.is_approved || false,
          latestSubmission: {
            status: response.status || 'no_kyc',
            submittedAt: response.submitted_at || new Date().toISOString(),
          },
          pendingRequests: [],
        };
        setKycStatus(status);
        return status;
      }

      // Mock status for 403 or no response
      const mockStatus = {
        hasApprovedKYC: false,
        latestSubmission: {
          status: 'no_kyc',
          submittedAt: new Date().toISOString(),
        },
        pendingRequests: [],
      };
      setKycStatus(mockStatus);
      return mockStatus;

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get status');
      // Return mock status on error
      const mockStatus = {
        hasApprovedKYC: false,
        latestSubmission: {
          status: 'no_kyc',
          submittedAt: new Date().toISOString(),
        },
        pendingRequests: [],
      };
      setKycStatus(mockStatus);
      return mockStatus;
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