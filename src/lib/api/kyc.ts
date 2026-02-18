// KYC API client using existing endpoints
import { useAuthStore } from '../store/auth';

export class KYCService {
  static async checkRequirement(serviceType: string, amount: number) {
    try {
      // ✅ FIXED: Remove quotes outside template literal and add /api prefix
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/kyc/check-requirement/`, {
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
      
      // ✅ FIXED: Remove quotes outside template literal and add /api prefix
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/kyc/simple-status/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        return await response.json();
      }
      
      // Fallback to documents status - ✅ FIXED
      const docsResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/kyc/documents/status/`, {
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
      
      // ✅ FIXED: Remove quotes outside template literal and add /api prefix
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/kyc/documents/`, {
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
      
      // ✅ FIXED: Remove quotes outside template literal and add /api prefix
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/kyc/documents/`, {
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
      
      // ✅ FIXED: Remove quotes outside template literal and add /api prefix
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/kyc/documents/submissions/`, {
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