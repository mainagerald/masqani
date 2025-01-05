import { useState, useCallback, useEffect } from 'react';

export const PhotosStep = ({ onFilesChange, initialFiles = [] }) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState(initialFiles);
  const [previewUrls, setPreviewUrls] = useState(() => 
    // Initialize preview URLs during state initialization
    initialFiles.map(file => URL.createObjectURL(file))
  );

  // Cleanup preview URLs when component unmounts
  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const handleFiles = useCallback((newFiles) => {
    const validFiles = Array.from(newFiles).filter(file => 
      file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024 // 10MB limit
    );
    
    // Create preview URLs for new files
    const newPreviewUrls = validFiles.map(file => URL.createObjectURL(file));
    
    setFiles(prevFiles => {
      const updatedFiles = [...prevFiles, ...validFiles];
      // Notify parent component
      onFilesChange({
        files: updatedFiles
      });
      return updatedFiles;
    });

    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
  }, [onFilesChange]);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const handleChange = useCallback((e) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  }, [handleFiles]);

  const removeFile = useCallback((indexToRemove) => {
    // Revoke the URL being removed
    URL.revokeObjectURL(previewUrls[indexToRemove]);
    
    setFiles(prevFiles => {
      const newFiles = prevFiles.filter((_, index) => index !== indexToRemove);
      onFilesChange({
        files: newFiles
      });
      return newFiles;
    });

    setPreviewUrls(prev => prev.filter((_, index) => index !== indexToRemove));
  }, [onFilesChange, previewUrls]);

  return (
    <div className="space-y-6">
      <div 
        className={`relative p-8 border-2 border-dashed rounded-lg text-center ${
          dragActive ? 'border-black bg-gray-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          onChange={handleChange}
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-4 bg-gray-100 rounded-full">
            <svg 
              className="w-8 h-8 text-gray-500"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          <div>
            <p className="text-lg font-medium">Drop your images here</p>
            <p className="text-sm text-gray-500">or click to browse</p>
          </div>
          <p className="text-xs text-gray-400">
            Supports: JPG, PNG, GIF (Max 10MB each)
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file, index) => (
            <div key={index} className="relative group aspect-square">
              <img
                src={previewUrls[index]}
                alt={`Upload ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
              >
                <svg 
                  className="w-4 h-4 text-gray-600"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};