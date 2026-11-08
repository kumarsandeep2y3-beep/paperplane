import React from 'react';
import { FileText, Sun, Moon, Shield, Sparkles, Share2 } from 'lucide-react';
import { ToolMode } from '../types/pdf';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  currentMode: ToolMode;
  onSelectMode: (mode: ToolMode) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onLoadSamples: () => void;
  onOpenShare?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onSelectMode,
  isDark,
  onToggleTheme,
  onLoadSamples,
  onOpenShare,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 md:gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20">
              <svg
                className="w-5 h-5 -rotate-12 translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m2 22 1-1h3l9-9" />
                <path d="M3 21v-3l9-9" />
                <path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9" />
                <path d="m17.5 7.5-6.5 6.5" />
                <path d="m22 2-7 20-4-9-9-4Z" />
              </svg>
            </div>
            <button
              onClick={() => onSelectMode('merge')}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <div className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap flex items-center gap-1.5">
                <span>PaperPlane</span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400">PDF</span>
              </div>
            </button>
          </div>

          {/* Zone 2: Single-line navigation links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
            <button
              onClick={() => onSelectMode('merge')}
              className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                currentMode === 'merge'
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50/70 dark:bg-indigo-950/50'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Merge
            </button>
            <button
              onClick={() => onSelectMode('split')}
              className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                currentMode === 'split'
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50/70 dark:bg-indigo-950/50'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Split
            </button>
            <button
              onClick={() => onSelectMode('compress')}
              className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                currentMode === 'compress'
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50/70 dark:bg-indigo-950/50'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Compress
            </button>
            <button
              onClick={() => onSelectMode('convert')}
              className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                currentMode === 'convert'
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50/70 dark:bg-indigo-950/50'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Convert
            </button>
            <button
              onClick={() => onSelectMode('annotate')}
              className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                currentMode === 'annotate'
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50/70 dark:bg-indigo-950/50'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Annotate & Draw
            </button>
            <button
              onClick={() => onSelectMode('watermark')}
              className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                currentMode === 'watermark'
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50/70 dark:bg-indigo-950/50'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Watermark
            </button>
            <button
              onClick={() => onSelectMode('pagenumber')}
              className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                currentMode === 'pagenumber'
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50/70 dark:bg-indigo-950/50'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Page Numbers
            </button>
            <button
              onClick={() => onSelectMode('ocr')}
              className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                currentMode === 'ocr'
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50/70 dark:bg-indigo-950/50'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              OCR Scan
            </button>
            <button
              onClick={() => onSelectMode('security')}
              className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                currentMode === 'security'
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50/70 dark:bg-indigo-950/50'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Security
            </button>
            <button
              onClick={() => onSelectMode('rotate')}
              className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                currentMode === 'rotate'
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50/70 dark:bg-indigo-950/50'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Rotate
            </button>
            <button
              onClick={() => onSelectMode('organize')}
              className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                currentMode === 'organize'
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50/70 dark:bg-indigo-950/50'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Organize
            </button>
            <button
              onClick={() => onSelectMode('info')}
              className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                currentMode === 'info'
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50/70 dark:bg-indigo-950/50'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              PDF Info
            </button>
          </nav>

          {/* Zone 3: 1 primary action & theme controls */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <PWAInstallButton />

            <button
              onClick={onOpenShare}
              title="Share PaperPlane PDF with friends or colleagues"
              aria-label="Share PaperPlane PDF"
              className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={onToggleTheme}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
              className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={onLoadSamples}
              className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white shadow-sm hover:shadow transition-all whitespace-nowrap flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Try Sample Docs</span>
            </button>
          </div>
        </div>

        {/* Mobile quick scroll sub-navigation */}
        <div className="flex lg:hidden overflow-x-auto py-2.5 gap-2 scrollbar-none border-t border-slate-100 dark:border-slate-800/60">
          {(
            [
              { id: 'merge', label: 'Merge' },
              { id: 'split', label: 'Split' },
              { id: 'compress', label: 'Compress' },
              { id: 'convert', label: 'Convert' },
              { id: 'rotate', label: 'Rotate' },
              { id: 'annotate', label: 'Annotate' },
              { id: 'watermark', label: 'Watermark' },
              { id: 'pagenumber', label: 'Page Numbers' },
              { id: 'ocr', label: 'OCR' },
              { id: 'security', label: 'Security' },
              { id: 'organize', label: 'Organize' },
              { id: 'info', label: 'PDF Info' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => onSelectMode(tab.id)}
              className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                currentMode === tab.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
