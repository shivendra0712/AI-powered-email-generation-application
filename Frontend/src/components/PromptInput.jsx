import React from 'react';

const PromptInput = ({ value, onChange, disabled }) => {
  const charCount = value.length;
  const maxChars = 1000;
  const pct = Math.min((charCount / maxChars) * 100, 100);

  return (
    <div className="w-full">
      <label
        htmlFor="prompt-input"
        className="block text-sm font-semibold text-slate-300 mb-3 tracking-wide uppercase"
      >
        Describe Your Email
      </label>

      <div className={`relative rounded-2xl transition-all duration-300 ${!disabled ? 'focus-within:ring-2 focus-within:ring-indigo-500/60 focus-within:shadow-[0_0_30px_rgba(99,102,241,0.2)]' : ''}`}>
        <textarea
          id="prompt-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          maxLength={maxChars}
          placeholder="e.g. Write a follow-up email to a client after our meeting yesterday, reminding them about the proposal deadline..."
          rows={5}
          className={`
            w-full glass rounded-2xl px-5 py-4 text-sm text-slate-100
            placeholder:text-slate-600 resize-none outline-none
            transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed
            leading-relaxed
          `}
          style={{ background: 'rgba(255,255,255,0.03)' }}
        />

        {/* Character counter */}
        <div className="absolute bottom-3 right-4 flex items-center gap-2">
          <span className={`text-[11px] font-medium ${charCount > maxChars * 0.9 ? 'text-orange-400' : 'text-slate-600'}`}>
            {charCount}/{maxChars}
          </span>
          <svg className="w-4 h-4 -rotate-90" viewBox="0 0 20 20">
            <circle
              cx="10" cy="10" r="8"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="2"
            />
            <circle
              cx="10" cy="10" r="8"
              fill="none"
              stroke={charCount > maxChars * 0.9 ? '#f97316' : '#6366f1'}
              strokeWidth="2"
              strokeDasharray={`${2 * Math.PI * 8}`}
              strokeDashoffset={`${2 * Math.PI * 8 * (1 - pct / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PromptInput;
