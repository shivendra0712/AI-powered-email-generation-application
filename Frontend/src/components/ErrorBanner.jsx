import React from 'react';

const ErrorBanner = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <div
      id="error-banner"
      role="alert"
      className="animate-fade-in-up flex items-start gap-3 p-4 rounded-2xl
        bg-red-500/10 border border-red-500/25 text-red-400"
    >
      {/* Icon */}
      <div className="flex-shrink-0 mt-0.5">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>

      {/* Message */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-red-300">Something went wrong</p>
        <p className="text-xs text-red-400/80 mt-0.5 leading-relaxed">{message}</p>
      </div>

      {/* Dismiss */}
      <button
        onClick={onDismiss}
        id="dismiss-error-btn"
        aria-label="Dismiss error"
        className="flex-shrink-0 text-red-500/60 hover:text-red-400 transition-colors"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
};

export default ErrorBanner;
