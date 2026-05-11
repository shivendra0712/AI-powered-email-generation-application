import React from 'react';

const tones = [
  {
    id: 'professional',
    label: 'Professional',
    description: 'Polished & credible',
    gradient: 'from-blue-500 to-indigo-600',
    glow: 'rgba(99,102,241,0.4)',
  },
  {
    id: 'friendly',
    label: 'Friendly',
    description: 'Warm & approachable',
    gradient: 'from-emerald-400 to-teal-500',
    glow: 'rgba(52,211,153,0.4)',
  },
  {
    id: 'formal',
    label: 'Formal',
    description: 'Strict & authoritative',
    gradient: 'from-slate-400 to-slate-600',
    glow: 'rgba(148,163,184,0.4)',
  },
  {
    id: 'casual',
    label: 'Casual',
    description: 'Relaxed & natural',
    gradient: 'from-orange-400 to-pink-500',
    glow: 'rgba(251,146,60,0.4)',
  },
];

const ToneSelector = ({ selectedTone, onSelect }) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-slate-300 mb-3 tracking-wide uppercase">
        Select Tone
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {tones.map((tone) => {
          const isSelected = selectedTone === tone.id;
          return (
            <button
              key={tone.id}
              onClick={() => onSelect(tone.id)}
              className={`
                relative group flex flex-col items-center justify-center gap-1.5
                p-4 rounded-2xl border cursor-pointer
                transition-all duration-300 ease-out
                ${isSelected
                  ? `bg-gradient-to-br ${tone.gradient} border-transparent text-white shadow-lg scale-[1.03]`
                  : 'glass border-white/8 text-slate-400 hover:text-white hover:border-white/20 hover:scale-[1.02]'
                }
              `}
              style={isSelected ? { boxShadow: `0 8px 32px ${tone.glow}` } : {}}
            >
              <span className="text-2xl">{tone.icon}</span>
              <span className="text-sm font-600 font-semibold leading-none">{tone.label}</span>
              <span className={`text-[10px] leading-tight text-center ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>
                {tone.description}
              </span>
              {isSelected && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white/80"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ToneSelector;
