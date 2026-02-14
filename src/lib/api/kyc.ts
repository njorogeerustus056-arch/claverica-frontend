// KYC API client using existing endpoints
import { useAuthStore } from '../store/auth';

export class KYCService {
  static async checkRequirement(serviceType: string, amount: number) {
    try {
      const response = await fetch('`${import.meta.env.VITE_API_URL}`/kyc/api/check-requirement/', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify({ 
          service_type: serviceType, 
          amount: amount 
        })
      });
      
      if (!response.ok) {
        // Return default if API fails
        return {
          kyc_required: amount > 1500,
          threshold: 1500,
          current_tier: 'unverified'
        };
      }
      
      return await response.json();
    } catch (error) {
      console.warn('KYC check API failed, using defaults:', error);
      return {
        kyc_required: amount > 1500,
        threshold: 1500,
        current_tier: 'unverified'
      };
    }
  }

  static async getStatus() {
    try {
      const token = localStorage.getItem('token');
      if (!token) return { is_verified: false, verification_level: 'unverified' };
      
      // Try simple status first
      const response = await fetch('`${import.meta.env.VITE_API_URL}`/kyc/api/simple-status/', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        return await response.json();
      }
      
      // Fallback to documents status
      const docsResponse = await fetch('`${import.meta.env.VITE_API_URL}`/kyc/api/documents/status/', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (docsResponse.ok) {
        const data = await docsResponse.json();
        return {
          is_verified: data.status === 'approved',
          verification_level: data.status === 'approved' ? 'verified' : 'unverified'
        };
      }
      
      return { is_verified: false, verification_level: 'unverified' };
    } catch (error) {
      console.warn('KYC status API failed:', error);
      return { is_verified: false, verification_level: 'unverified' };
    }
  }

  static async getUserDocuments() {
    try {
      const token = localStorage.getItem('token');
      if (!token) return { documents: [] };
      
      const response = await fetch('`${import.meta.env.VITE_API_URL}`/kyc/api/documents/', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        return await response.json();
      }
      
      return { documents: [] };
    } catch (error) {
      console.warn('Failed to fetch KYC documents:', error);
      return { documents: [] };
    }
  }

  static async submitDocuments(formData: FormData) {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication required');
      
      const response = await fetch('`${import.meta.env.VITE_API_URL}`/kyc/api/documents/', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || errorData.message || 'Submission failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('KYC submission error:', error);
      throw error;
    }
  }

  static async getSubmissionHistory() {
    try {
      const token = localStorage.getItem('token');
      if (!token) return { submissions: [] };
      
      const response = await fetch('`${import.meta.env.VITE_API_URL}`/kyc/api/documents/submissions/', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        return await response.json();
      }
      
      return { submissions: [] };
    } catch (error) {
      console.warn('Failed to fetch submission history:', error);
      return { submissions: [] };
    }
  }
}
