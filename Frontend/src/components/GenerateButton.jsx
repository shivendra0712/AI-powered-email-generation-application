import React from 'react';

const GenerateButton = ({ onClick, isLoading, disabled }) => {
  return (
    <button
      id="generate-btn"
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        relative w-full py-4 px-6 rounded-2xl font-semibold text-base
        transition-all duration-300 ease-out overflow-hidden
        flex items-center justify-center gap-3
        ${disabled || isLoading
          ? 'opacity-50 cursor-not-allowed bg-slate-800 text-slate-500'
          : 'cursor-pointer text-white hover:scale-[1.02] active:scale-[0.98]'
        }
      `}
      style={
        !(disabled || isLoading)
          ? {
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
              backgroundSize: '200% 200%',
              boxShadow: '0 8px 32px rgba(99,102,241,0.4), 0 0 0 1px rgba(255,255,255,0.08)',
            }
          : {}
      }
    >
      {/* Shimmer overlay (only when active) */}
      {!disabled && !isLoading && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 animate-shimmer"
        />
      )}

      {isLoading ? (
        <>
          {/* Spinner */}
          <svg
            className="animate-spin-slow w-5 h-5 text-slate-400"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12" cy="12" r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <span className="text-slate-400">Generating your email…</span>
        </>
      ) : (
        <>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path
              strokeLinecap="round" strokeLinejoin="round"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          Generate Email
        </>
      )}
    </button>
  );
};

export default GenerateButton;
