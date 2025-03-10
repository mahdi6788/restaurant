"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

export function ImageUploader() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      console.log("File selected:", file.name, file.type, file.size);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: 1,
  });
  return (
    <div className="mb-4">
      <label htmlFor="image" className="mb-2 block text-sm font-medium">
        Food Image
      </label>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
              ${
                isDragActive
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
      >
        <input {...getInputProps()} name="image" />
        {imagePreview ? (
          <div>
            <Image
              src={imagePreview}
              alt="Preview"
              width={300}
              height={200}
              className="max-h-40 mx-auto mb-2 rounded object-contain"
            />
            <p className="text-sm text-gray-600">
              Click or drag to change image
            </p>
          </div>
        ) : (
          <div>
            <p className="text-sm text-gray-600">
              {isDragActive
                ? "Drop the image here"
                : "Drag and drop an image here, or click to select"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Supports: JPG, JPEG, PNG, GIF
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
