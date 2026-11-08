import React, { useState, useEffect } from 'react';
import {
  FileText,
  Layers,
  Scissors,
  Minimize2,
  Highlighter,
  Stamp,
  ScanText,
  RotateCw,
  Sparkles,
  ShieldCheck,
  Zap,
  Lock,
  FileType,
  Hash,
  Share2,
  Info,
} from 'lucide-react';
import { ToolMode, UploadedFileItem } from './types/pdf';
import { Header } from './components/Header';
import { PrivacyBanner } from './components/PrivacyBanner';
import { MergeTool } from './components/MergeTool';
import { SplitTool } from './components/SplitTool';
import { CompressTool } from './components/CompressTool';
import { ConverterTool } from './components/ConverterTool';
import { AnnotateTool } from './components/AnnotateTool';
import { WatermarkTool } from './components/WatermarkTool';
import { PageNumberTool } from './components/PageNumberTool';
import { OcrTool } from './components/OcrTool';
import { SecurityTool } from './components/SecurityTool';
import { RotateTool } from './components/RotateTool';
import { OrganizeTool } from './components/OrganizeTool';
import { PdfInfoTool } from './components/PdfInfoTool';
import { PdfViewerModal } from './components/PdfViewerModal';
import { OfflineBanner } from './components/OfflineBanner';
import { ShareModal } from './components/ShareModal';
import { createSamplePdf } from './utils/samplePdfs';

export default function App() {
  const [currentMode, setCurrentMode] = useState<ToolMode>('merge');
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('paperplane_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Global files queue for merge tool
  const [mergeFiles, setMergeFiles] = useState<UploadedFileItem[]>([]);

  // Preview modal state
  const [previewModal, setPreviewModal] = useState<{
    isOpen: boolean;
    file?: File;
    bytes?: Uint8Array;
    filename: string;
  }>({
    isOpen: false,
    filename: '',
  });

  // Toast / notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Share modal state
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Sync dark theme with document.documentElement
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('paperplane_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('paperplane_theme', 'light');
    }
  }, [isDark]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleOpenPreview = (file?: File, bytes?: Uint8Array, name?: string) => {
    setPreviewModal({
      isOpen: true,
      file,
      bytes,
      filename: name || file?.name || 'document_preview.pdf',
    });
  };

  // Sample Documents Generator - Loads real pre-built PDFs for immediate testing
  const handleLoadSamples = async () => {
    showToast('Generating demo documents: Strategic Report, Contract & Invoice...');
    try {
      const [report, contract, invoice] = await Promise.all([
        createSamplePdf('report'),
        createSamplePdf('contract'),
        createSamplePdf('invoice'),
      ]);

      const items: UploadedFileItem[] = [
        {
          id: 'sample-1',
          file: report,
          name: report.name,
          size: report.size,
          pageCount: 3,
        },
        {
          id: 'sample-2',
          file: contract,
          name: contract.name,
          size: contract.size,
          pageCount: 4,
        },
        {
          id: 'sample-3',
          file: invoice,
          name: invoice.name,
          size: invoice.size,
          pageCount: 2,
        },
      ];

      setMergeFiles(items);
      showToast('Loaded 3 sample PDFs! Ready to merge, split, compress, or annotate.');
    } catch (e) {
      console.error(e);
      showToast('Failed to load sample documents.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors font-sans">
      {/* Top Bar Navigation */}
      <Header
        currentMode={currentMode}
        onSelectMode={(mode) => setCurrentMode(mode)}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        onLoadSamples={handleLoadSamples}
        onOpenShare={() => setIsShareModalOpen(true)}
      />

      {/* Main Workspace Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Privacy & Speed Trust Banner */}
        <PrivacyBanner />

        {/* Workspace Mode Subheader Tabs */}
        <div className="mb-6 flex items-center justify-between overflow-x-auto pb-1 scrollbar-none gap-2">
          <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            {(
              [
                { id: 'merge', label: 'Merge PDFs', icon: Layers },
                { id: 'split', label: 'Split & Extract', icon: Scissors },
                { id: 'compress', label: 'Compress PDF', icon: Minimize2 },
                { id: 'convert', label: 'Convert PDF', icon: FileType },
                { id: 'rotate', label: 'Rotate Pages', icon: RotateCw },
                { id: 'annotate', label: 'Annotate & Draw', icon: Highlighter },
                { id: 'watermark', label: 'Watermark', icon: Stamp },
                { id: 'pagenumber', label: 'Page Numbers', icon: Hash },
                { id: 'ocr', label: 'OCR Scans', icon: ScanText },
                { id: 'security', label: 'Protect & Encrypt', icon: Lock },
                { id: 'organize', label: 'Organize Pages', icon: RotateCw },
                { id: 'info', label: 'PDF Info', icon: Info },
              ] as const
            ).map((tool) => {
              const IconComp = tool.icon;
              const isActive = currentMode === tool.id;
              return (
                <button
                  key={tool.id}
                  onClick={() => setCurrentMode(tool.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span>{tool.label}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Browser Engine Ready</span>
          </div>
        </div>

        {/* Active Tool View */}
        <div className="animate-in fade-in-50 duration-200">
          {currentMode === 'merge' && (
            <MergeTool
              files={mergeFiles}
              setFiles={setMergeFiles}
              onLoadSamples={handleLoadSamples}
              onPreviewPdf={handleOpenPreview}
            />
          )}

          {currentMode === 'split' && (
            <SplitTool
              onLoadSamples={handleLoadSamples}
              onPreviewPdf={handleOpenPreview}
            />
          )}

          {currentMode === 'compress' && (
            <CompressTool
              onLoadSamples={handleLoadSamples}
              onPreviewPdf={handleOpenPreview}
            />
          )}

          {currentMode === 'convert' && (
            <ConverterTool
              onLoadSamples={handleLoadSamples}
              onPreviewPdf={handleOpenPreview}
            />
          )}

          {currentMode === 'rotate' && (
            <RotateTool
              onLoadSamples={handleLoadSamples}
              onPreviewPdf={handleOpenPreview}
            />
          )}

          {currentMode === 'annotate' && (
            <AnnotateTool
              onLoadSamples={handleLoadSamples}
              onPreviewPdf={handleOpenPreview}
            />
          )}

          {currentMode === 'watermark' && (
            <WatermarkTool
              onLoadSamples={handleLoadSamples}
              onPreviewPdf={handleOpenPreview}
            />
          )}

          {currentMode === 'pagenumber' && (
            <PageNumberTool
              onLoadSamples={handleLoadSamples}
              onPreviewPdf={handleOpenPreview}
            />
          )}

          {currentMode === 'ocr' && (
            <OcrTool
              onLoadSamples={handleLoadSamples}
              onPreviewPdf={handleOpenPreview}
            />
          )}

          {currentMode === 'security' && (
            <SecurityTool
              onLoadSamples={handleLoadSamples}
              onPreviewPdf={handleOpenPreview}
            />
          )}

          {currentMode === 'organize' && (
            <OrganizeTool
              onLoadSamples={handleLoadSamples}
              onPreviewPdf={handleOpenPreview}
            />
          )}

          {currentMode === 'info' && (
            <PdfInfoTool
              onLoadSamples={handleLoadSamples}
              onPreviewPdf={handleOpenPreview}
            />
          )}
        </div>
      </main>

      {/* Reassuring Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 py-8 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2 font-medium">
            <span className="font-bold text-slate-900 dark:text-white">PaperPlane PDF</span>
            <span>·</span>
            <span>Free & Friendly Document Suite</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentMode('merge')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Merge
            </button>
            <button
              onClick={() => setCurrentMode('split')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Split
            </button>
            <button
              onClick={() => setCurrentMode('compress')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Compress
            </button>
            <button
              onClick={() => setCurrentMode('convert')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Convert
            </button>
            <button
              onClick={() => setCurrentMode('rotate')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Rotate
            </button>
            <button
              onClick={() => setCurrentMode('annotate')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Annotate
            </button>
            <button
              onClick={() => setCurrentMode('watermark')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Watermark
            </button>
            <button
              onClick={() => setCurrentMode('pagenumber')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Page Numbers
            </button>
            <button
              onClick={() => setCurrentMode('ocr')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              OCR
            </button>
            <button
              onClick={() => setCurrentMode('security')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Security
            </button>
            <button
              onClick={() => setCurrentMode('info')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              PDF Info
            </button>
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-medium text-indigo-600 dark:text-indigo-400"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>

          <div>
            <span>100% Client-Side Privacy Guaranteed</span>
          </div>
        </div>
      </footer>

      {/* In-app Fullscreen PDF Preview Modal */}
      <PdfViewerModal
        isOpen={previewModal.isOpen}
        onClose={() => setPreviewModal((prev) => ({ ...prev, isOpen: false }))}
        file={previewModal.file}
        bytes={previewModal.bytes}
        filename={previewModal.filename}
      />

      {/* Share with Greeting Message Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      {/* Floating Action Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-bottom-3 duration-200">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 dark:text-indigo-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Offline Connectivity Status Banner */}
      <OfflineBanner />
    </div>
  );
}
