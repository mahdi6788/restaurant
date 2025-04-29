"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function ImageUploader({ prevImage }: { prevImage: string }) {
  const translate = useTranslations("ImageUploader")
  const [imagePreview, setImagePreview] = useState<string | null>(
    prevImage || null
  );
  const [newFile, setNewFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setNewFile(file);
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
      {/* <label htmlFor="image" className="mb-2 block text-sm font-medium">
        Menu Image
      </label> */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
              ${
                isDragActive
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
      >{/* Always include the file input */}
      <input {...getInputProps()} name="image" id="image" />
      {/* Include prevImage as a hidden input if no new file is selected */}
      {prevImage && !newFile && (
        <input type="hidden" name="prevImage" value={prevImage} />
      )}

      {imagePreview ? (
        <div>
          <Image
            src={imagePreview}
            alt="Preview"
            width={300}
            height={200}
            className="max-h-40 mx-auto mb-2 rounded object-contain"
            priority={!!prevImage}
          />
          <p className="text-sm text-gray-600">{translate("Click or drag to change image")}</p>
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