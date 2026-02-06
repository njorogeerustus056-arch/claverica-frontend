export interface ValidationResult {
  valid: boolean;
  error?: string;
  warnings?: string[];
}

// Validate image files
export const validateImageFile = (file: File): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check file type
  if (!file.type.startsWith('image/')) {
    errors.push('Only image files are allowed');
  }

  // Check file size (5MB limit)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    errors.push(`File size must be less than 5MB. Current: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
  }

  // Check file name
  if (!file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
    warnings.push('File extension should be .jpg, .png, .gif, or .webp');
  }

  // Check dimensions (if image can be loaded)
  if (file.type.startsWith('image/')) {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    
    // Note: This is async, would need Promise for full implementation
    if (file.size < 50 * 1024) { // Less than 50KB
      warnings.push('Image quality might be low');
    }
  }

  return {
    valid: errors.length === 0,
    error: errors.length > 0 ? errors.join(', ') : undefined,
    warnings: warnings.length > 0 ? warnings : undefined
  };
};

// Validate document type specific requirements
export const validateDocumentRequirements = (
  docType: string,
  frontFile: File | null,
  backFile: File | null
): ValidationResult => {
  const errors: string[] = [];

  if (!frontFile) {
    errors.push('Front image is required');
  }

  // Require back image for certain document types
  if (['national_id', 'driver_license'].includes(docType) && !backFile) {
    errors.push('Back image is required for this document type');
  }

  return {
    valid: errors.length === 0,
    error: errors.length > 0 ? errors.join(', ') : undefined
  };
};

// Compress image if needed
export const compressImage = async (file: File, maxSizeMB = 1): Promise<File> => {
  return new Promise((resolve, reject) => {
    if (file.size <= maxSizeMB * 1024 * 1024) {
      resolve(file);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Calculate new dimensions
        const maxDimension = 1200;
        let width = img.width;
        let height = img.height;
        
        if (width > height && width > maxDimension) {
          height *= maxDimension / width;
          width = maxDimension;
        } else if (height > maxDimension) {
          width *= maxDimension / height;
          height = maxDimension;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        ctx?.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now()
              });
              resolve(compressedFile);
            } else {
              reject(new Error('Compression failed'));
            }
          },
          'image/jpeg',
          0.8 // Quality
        );
      };
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
  });
};