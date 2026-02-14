import React, { useRef } from 'react';
import { Upload, X, Eye, RotateCw } from 'lucide-react';

interface FileUploadCardProps {
  title: string;
  description: string;
  required?: boolean;
  accept?: string;
  file: File | null;
  onFileSelect: (file: File | null) => void;
  onPreview?: () => void;
  onRemove?: () => void;
  onRetake?: () => void;
  className?: string;
}

export const FileUploadCard: React.FC<FileUploadCardProps> = ({
  title,
  description,
  required = false,
  accept = 'image/*',
  file,
  onFileSelect,
  onPreview,
  onRemove,
  onRetake,
  className = '',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };

  const handleRemove = () => {
    onFileSelect(null);
    onRemove?.();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title} {required && <span className="text-red-500">*</span>}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {description}
          </p>
        </div>
        
        <div className="flex gap-2">
          {file && onPreview && (
            <button
              onClick={onPreview}
              className="p-2 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              aria-label="Preview image"
            >
              <Eye className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          )}
          
          {file && onRetake && (
            <button
              onClick={onRetake}
              className="p-2 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              aria-label="Retake photo"
            >
              <RotateCw className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          )}
        </div>
      </div>

      {file ? (
        <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
              <Upload className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{file.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            onClick={handleRemove}
            className="p-2 text-gray-500 hover:text-red-500 transition-colors"
            aria-label="Remove file"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 hover:border-primary-400 dark:hover:border-primary-500 transition-colors flex flex-col items-center justify-center gap-3"
        >
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <Upload className="w-8 h-8 text-gray-400 dark:text-gray-500" />
          </div>
          <div className="text-center">
            <p className="font-medium text-gray-700 dark:text-gray-300">
              Click to upload
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              or drag and drop
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              PNG, JPG, GIF up to 5MB
            </p>
          </div>
        </button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        aria-label={`Upload ${title.toLowerCase()}`}
      />
    </div>
  );
};
