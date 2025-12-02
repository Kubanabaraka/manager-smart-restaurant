import React, { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

function ImageUpload({
  label,
  hint,
  value,
  onChange,
  accept = "image/*",
  maxSizeMB = 5,
  className = "",
}) {
  const [preview, setPreview] = useState(value || null);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    setError(null);

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
      onChange?.(e.target.result, file);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => {
    handleFile(e.target.files?.[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const handleRemove = () => {
    setPreview(null);
    setError(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    onChange?.(null, null);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className={className}>
      {label && (
        <label className="mb-1.5 block text-xs font-medium text-slate-700">
          {label}
        </label>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
      />

      {preview ? (
        <div className="relative rounded-xl border border-slate-200 bg-slate-50 p-2">
          <img
            src={preview}
            alt="Preview"
            className="h-32 w-full rounded-lg object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900/70 text-white transition-colors hover:bg-slate-900"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-colors ${
            isDragging
              ? "border-brand-500 bg-brand-50"
              : "border-slate-200 bg-slate-50 hover:border-brand-400 hover:bg-slate-100"
          }`}
        >
          <div
            className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full ${
              isDragging ? "bg-brand-100" : "bg-slate-200"
            }`}
          >
            {isDragging ? (
              <ImageIcon className="h-5 w-5 text-brand-600" />
            ) : (
              <Upload className="h-5 w-5 text-slate-500" />
            )}
          </div>
          <p className="text-xs font-medium text-slate-700">
            {isDragging ? "Drop image here" : "Click or drag to upload"}
          </p>
          <p className="mt-1 text-[11px] text-slate-400">
            PNG, JPG up to {maxSizeMB}MB
          </p>
        </div>
      )}

      {error && <p className="mt-1.5 text-xs text-rose-500">{error}</p>}
      {hint && !error && (
        <p className="mt-1.5 text-[11px] text-slate-400">{hint}</p>
      )}
    </div>
  );
}

export default ImageUpload;
