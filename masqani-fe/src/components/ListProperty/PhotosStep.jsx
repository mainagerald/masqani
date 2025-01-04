/* eslint-disable react/prop-types */
export const PhotosStep= ({
    onFilesChange,
  }) => (
    <div className="space-y-4">
      <input
        type="file"
        multiple
        onChange={(e) => e.target.files && onFilesChange(e.target.files)}
        className="w-full p-2 border rounded"
        accept="image/*"
      />
    </div>
  );