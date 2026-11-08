import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, Sparkles, Plus } from 'lucide-react';

interface DropzoneProps {
  onFilesSelected: (files: File[]) => void;
  onLoadSamples: () => void;
  multiple?: boolean;
  title?: string;
  subtitle?: string;
}

export const Dropzone: React.FC<DropzoneProps> = ({
  onFilesSelected,
  onLoadSamples,
  multiple = true,
  title = 'Drag & drop your PDF documents here',
  subtitle = 'Or browse from your computer. 100% private and client-side.',
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const items = Array.from(e.dataTransfer.files).filter((file) =>
      file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
    );

    if (items.length > 0) {
      onFilesSelected(multiple ? items : [items[0]]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const items = Array.from(e.target.files).filter((file) =>
        file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
      );
      if (items.length > 0) {
        onFilesSelected(multiple ? items : [items[0]]);
      }
      e.target.value = '';
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all cursor-pointer ${
        isDragOver
          ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20 scale-[1.005]'
          : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/40 hover:border-slate-400 dark:hover:border-slate-600'
      }`}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf,.pdf"
        multiple={multiple}
        onChange={handleFileInput}
        className="hidden"
      />

      <div className="flex flex-col items-center justify-center max-w-md mx-auto pointer-events-none">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 shadow-xs">
          <UploadCloud className="w-8 h-8" />
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 mb-6">
          {subtitle}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pointer-events-auto">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            className="px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Choose PDF {multiple ? 'Files' : 'File'}</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onLoadSamples();
            }}
            className="px-4 py-2.5 text-xs sm:text-sm font-medium rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors flex items-center gap-2 border border-slate-200 dark:border-slate-700"
          >
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>Try with Sample Docs</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 mt-6">
          <span>PDF documents only</span>
          <span>·</span>
          <span>No file size limits</span>
          <span>·</span>
          <span>Runs locally in browser</span>
        </div>
      </div>
    </div>
  );
};
