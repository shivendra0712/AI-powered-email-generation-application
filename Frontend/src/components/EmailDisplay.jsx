import React, { useState } from 'react';

const EmailDisplay = ({ email }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const el = document.createElement('textarea');
      el.value = email;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!email) return null;

  return (
    <div className="w-full animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <label className="text-sm font-semibold text-slate-300 tracking-wide uppercase">
            Generated Email
          </label>
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          id="copy-email-btn"
          className={`
            flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold
            transition-all duration-300
            ${copied
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'glass text-slate-400 hover:text-white border border-white/8 hover:border-indigo-500/40 hover:text-indigo-400'
            }
          `}
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      {/* Email content card */}
      <div className="relative glass rounded-2xl p-6 border border-white/8 hover:border-indigo-500/20 transition-colors duration-300">
        {/* Top decorative line */}
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent rounded-full"></div>

        <pre className="whitespace-pre-wrap text-sm text-slate-200 leading-relaxed font-sans break-words">
          {email}
        </pre>
      </div>

      {/* Word count */}
      <p className="mt-2 text-right text-[11px] text-slate-600">
        {email.trim().split(/\s+/).filter(Boolean).length} words · {email.length} characters
      </p>
    </div>
  );
};

export default EmailDisplay;
