// src/pages/Dashboard/EditProfile.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../lib/store/auth";
import { api } from "../../api";
import { 
  User, Mail, Phone, MapPin, Briefcase, 
  Calendar, Globe, Save, ArrowLeft, Loader2,
  AlertCircle, CheckCircle2, CreditCard
} from "lucide-react";
import styles from './EditProfile.module.css';

interface ProfileFormData {
  first_name: string;
  last_name: string;
  phone: string;
  date_of_birth: string;
  gender: string;
  nationality: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state_province: string;
  postal_code: string;
  country: string;
  country_of_residence: string;
  occupation: string;
  employer: string;
  income_range: string;
}

export default function EditProfile() {
  const navigate = useNavigate();
  const { tokens, user, updateUser } = useAuthStore(); // ✅ Added updateUser
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProfileFormData>({
    first_name: "",
    last_name: "",
    phone: "",
    date_of_birth: "",
    gender: "",
    nationality: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state_province: "",
    postal_code: "",
    country: "",
    country_of_residence: "",
    occupation: "",
    employer: "",
    income_range: ""
  });

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    if (!tokens?.access) {
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      const userData = await api.auth.getProfile();
      
      setFormData({
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        phone: userData.phone || "",
        date_of_birth: userData.date_of_birth ? userData.date_of_birth.split('T')[0] : "",
        gender: userData.gender || "",
        nationality: userData.nationality || "",
        address_line1: userData.address_line1 || "",
        address_line2: userData.address_line2 || "",
        city: userData.city || "",
        state_province: userData.state_province || "",
        postal_code: userData.postal_code || "",
        country: userData.country || "",
        country_of_residence: userData.country_of_residence || "",
        occupation: userData.occupation || "",
        employer: userData.employer || "",
        income_range: userData.income_range || ""
      });
    } catch (err: any) {
      console.error("Error fetching profile:", err);
      setError(err.message || "Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await api.auth.updateProfile(formData);
      
      // ✅ Update the auth store with new data
      updateUser(formData);
      
      setSuccess("Profile updated successfully!");
      
      // Redirect back to profile after 2 seconds
      setTimeout(() => {
        navigate('/dashboard/profile');
      }, 2000);
    } catch (err: any) {
      console.error("Error updating profile:", err);
      setError(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard/profile');
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <div className={styles.spinner}></div>
          <p className={styles.loadingText}>Loading profile data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Header */}
        <div className={styles.header}>
          <button onClick={handleCancel} className={styles.backButton}>
            <ArrowLeft className={styles.backIcon} />
            Back to Profile
          </button>
          <h1 className={styles.title}>Edit Profile</h1>
          <p className={styles.subtitle}>
            Update your personal information and account details
          </p>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className={styles.errorMessage}>
            <AlertCircle className={styles.messageIcon} />
            <span>{error}</span>
          </div>
        )}
        
        {success && (
          <div className={styles.successMessage}>
            <CheckCircle2 className={styles.messageIcon} />
            <span>{success}</span>
          </div>
        )}

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Personal Information */}
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>
              <User className={styles.sectionIcon} />
              Personal Information
            </h2>
            
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="first_name" className={styles.label}>
                  First Name <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder="Enter your first name"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="last_name" className={styles.label}>
                  Last Name <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder="Enter your last name"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.label}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="date_of_birth" className={styles.label}>
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="date_of_birth"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="gender" className={styles.label}>
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="nationality" className={styles.label}>
                  Nationality
                </label>
                <input
                  type="text"
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Enter your nationality"
                />
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>
              <MapPin className={styles.sectionIcon} />
              Address Information
            </h2>
            
            <div className={styles.formGrid}>
              <div className={styles.formGroupFull}>
                <label htmlFor="address_line1" className={styles.label}>
                  Address Line 1
                </label>
                <input
                  type="text"
                  id="address_line1"
                  name="address_line1"
                  value={formData.address_line1}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Street address, P.O. box"
                />
              </div>

              <div className={styles.formGroupFull}>
                <label htmlFor="address_line2" className={styles.label}>
                  Address Line 2
                </label>
                <input
                  type="text"
                  id="address_line2"
                  name="address_line2"
                  value={formData.address_line2}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Apartment, suite, unit, building, floor"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="city" className={styles.label}>
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="City"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="state_province" className={styles.label}>
                  State/Province
                </label>
                <input
                  type="text"
                  id="state_province"
                  name="state_province"
                  value={formData.state_province}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="State or province"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="postal_code" className={styles.label}>
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postal_code"
                  name="postal_code"
                  value={formData.postal_code}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Postal code"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="country" className={styles.label}>
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Country"
                />
              </div>

              <div className={styles.formGroupFull}>
                <label htmlFor="country_of_residence" className={styles.label}>
                  Country of Residence
                </label>
                <input
                  type="text"
                  id="country_of_residence"
                  name="country_of_residence"
                  value={formData.country_of_residence}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Country of residence"
                />
              </div>
            </div>
          </div>

          {/* Employment Information */}
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>
              <Briefcase className={styles.sectionIcon} />
              Employment Information
            </h2>
            
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="occupation" className={styles.label}>
                  Occupation
                </label>
                <input
                  type="text"
                  id="occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Your occupation"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="employer" className={styles.label}>
                  Employer
                </label>
                <input
                  type="text"
                  id="employer"
                  name="employer"
                  value={formData.employer}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Your employer"
                />
              </div>

              <div className={styles.formGroupFull}>
                <label htmlFor="income_range" className={styles.label}>
                  Annual Income Range
                </label>
                <select
                  id="income_range"
                  name="income_range"
                  value={formData.income_range}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="">Select income range</option>
                  <option value="0-25000">$0 - $25,000</option>
                  <option value="25001-50000">$25,001 - $50,000</option>
                  <option value="50001-75000">$50,001 - $75,000</option>
                  <option value="75001-100000">$75,001 - $100,000</option>
                  <option value="100001-150000">$100,001 - $150,000</option>
                  <option value="150001-200000">$150,001 - $200,000</option>
                  <option value="200001+">$200,001+</option>
                </select>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className={styles.formActions}>
            <button
              type="button"
              onClick={handleCancel}
              className={styles.cancelButton}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.saveButton}
              disabled={saving}
            >
              {saving ? (
                <>
                  <Loader2 className={styles.buttonIcon + ' ' + styles.spinning} />
                  Saving...
                </>
              ) : (
                <>
                  <Save className={styles.buttonIcon} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}