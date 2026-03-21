"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, FileImage } from "lucide-react";

interface FileUploaderProps {
  onFileSelect: (file: File, preview: string) => void;
  currentPreview?: string | null;
  onClear?: () => void;
}

export default function FileUploader({ onFileSelect, currentPreview, onClear }: FileUploaderProps) {
  const [preview, setPreview] = useState<string | null>(currentPreview || null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      onFileSelect(file, url);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    maxSize: 20 * 1024 * 1024,
  });

  const handleClear = () => {
    setPreview(null);
    onClear?.();
  };

  if (preview) {
    return (
      <div className="relative rounded-xl border-2 border-[#2E86C1] bg-white overflow-hidden">
        <button
          onClick={handleClear}
          className="absolute top-3 right-3 z-10 bg-white/90 rounded-full p-1.5 shadow-md hover:bg-red-50 transition-colors"
        >
          <X className="w-5 h-5 text-red-500" />
        </button>
        <div className="flex items-center justify-center p-4">
          <img
            src={preview}
            alt="アップロード済み図面"
            className="max-h-[400px] object-contain rounded-lg"
          />
        </div>
        <div className="bg-[#2E86C1]/5 px-4 py-2 flex items-center gap-2 text-sm text-[#2E86C1]">
          <FileImage className="w-4 h-4" />
          図面がアップロードされました
        </div>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200
        ${isDragActive
          ? "border-[#2E86C1] bg-[#2E86C1]/5 scale-[1.02]"
          : "border-gray-300 bg-white hover:border-[#2E86C1] hover:bg-[#2E86C1]/5"
        }
      `}
    >
      <input {...getInputProps()} />
      <Upload className="w-12 h-12 mx-auto mb-4 text-[#7F8C8D]" />
      <p className="text-lg font-medium text-[#2C3E50] mb-2">
        図面をドラッグ＆ドロップ
      </p>
      <p className="text-sm text-[#7F8C8D]">
        またはクリックしてファイルを選択
      </p>
      <p className="text-xs text-[#7F8C8D] mt-2">
        対応形式: JPG, PNG, PDF（最大20MB）
      </p>
    </div>
  );
}
