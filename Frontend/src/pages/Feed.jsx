import React, { useState } from 'react';
import PromptInput from '../components/PromptInput';
import ToneSelector from '../components/ToneSelector';
import GenerateButton from '../components/GenerateButton';
import EmailDisplay from '../components/EmailDisplay';
import ErrorBanner from '../components/ErrorBanner';
import axiosInstance from '../api/axios';

const Feed = () => {
  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState('professional');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please describe your email before generating.');
      return;
    }

    setError('');
    setIsLoading(true);
    setGeneratedEmail('');

    try {
      const response = await axiosInstance.post('/ai/email-generator', {
        prompt: prompt.trim(),
        tone,
      });

      const email =
        response.data?.email ||
        response.data?.result ||
        response.data?.data ||
        response.data;

      if (typeof email === 'string') {
        setGeneratedEmail(email);
      } else {
        setGeneratedEmail(JSON.stringify(email, null, 2));
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Failed to generate email. Please try again.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] overflow-x-hidden">
      {/* ── Ambient background blobs ── */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #6366f1, transparent 70%)' }}
        />
        <div
          className="absolute top-1/2 -right-60 w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-40 left-1/3 w-[400px] h-[400px] rounded-full opacity-10 blur-[90px]"
          style={{ background: 'radial-gradient(circle, #a855f7, transparent 70%)' }}
        />
      </div>

      {/* ── Header ── */}
      <header className="relative z-10 border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          {/* Logo / brand */}
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shadow-lg animate-pulse-glow"
              style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
            >
              ✉️
            </div>
            <div>
              <h1 className="text-base font-bold text-white leading-none">MailCraft AI</h1>
              <p className="text-[11px] text-slate-500 mt-0.5">Powered by Gemini</p>
            </div>
          </div>

          {/* Badge */}
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
            bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
            AI Ready
          </span>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero text */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text
            leading-tight mb-3"
            style={{ backgroundImage: 'linear-gradient(135deg, #e2e8f0 0%, #a5b4fc 50%, #c084fc 100%)' }}
          >
            Generate Perfect Emails
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Describe what you need and pick a tone. Our AI will craft a professional email in seconds.
          </p>
        </div>

        {/* Card layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

          {/* ── Left: Input Panel ── */}
          <section
            aria-label="Email configuration"
            className="glass rounded-3xl p-6 sm:p-8 border border-white/8 flex flex-col gap-6
              hover:border-indigo-500/20 transition-colors duration-500"
          >
            {/* Step 1 */}
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-bold
                bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                1
              </span>
              <span className="text-xs text-slate-500 font-medium">Describe your email</span>
            </div>
            <PromptInput
              value={prompt}
              onChange={setPrompt}
              disabled={isLoading}
            />

            {/* Step 2 */}
            <div className="flex items-center gap-2 -mb-1">
              <span className="flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-bold
                bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                2
              </span>
              <span className="text-xs text-slate-500 font-medium">Choose a tone</span>
            </div>
            <ToneSelector selectedTone={tone} onSelect={setTone} />

            {/* Error banner */}
            <ErrorBanner message={error} onDismiss={() => setError('')} />

            {/* Generate CTA */}
            <GenerateButton
              onClick={handleGenerate}
              isLoading={isLoading}
              disabled={!prompt.trim()}
            />
          </section>

          {/* ── Right: Output Panel ── */}
          <section
            aria-label="Generated email output"
            className="min-h-[200px]"
          >
            {isLoading && (
              <div className="glass rounded-3xl p-8 border border-white/8 flex flex-col items-center justify-center gap-5 min-h-[280px]">
                {/* Animated dots */}
                <div className="flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2.5 h-2.5 rounded-full bg-indigo-500"
                      style={{
                        animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
                <div className="text-center">
                  <p className="text-slate-300 font-semibold text-sm">Crafting your email…</p>
                  <p className="text-slate-600 text-xs mt-1">This usually takes a few seconds</p>
                </div>

                {/* Skeleton lines */}
                <div className="w-full space-y-2.5 mt-2">
                  {[100, 85, 92, 70, 80, 55].map((w, i) => (
                    <div
                      key={i}
                      className="h-3 rounded-full animate-shimmer"
                      style={{
                        width: `${w}%`,
                        background: 'rgba(255,255,255,0.06)',
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {!isLoading && !generatedEmail && (
              <div className="glass rounded-3xl p-8 border border-white/8 border-dashed flex flex-col
                items-center justify-center gap-4 min-h-[280px] text-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl
                  bg-slate-800/80 border border-white/5 animate-float">
                  📧
                </div>
                <div>
                  <p className="text-slate-400 font-medium text-sm">Your email will appear here</p>
                  <p className="text-slate-600 text-xs mt-1">Fill in the details on the left to get started</p>
                </div>
              </div>
            )}

            {!isLoading && generatedEmail && (
              <div className="glass rounded-3xl p-6 sm:p-8 border border-white/8
                hover:border-emerald-500/20 transition-colors duration-500">
                <EmailDisplay email={generatedEmail} />
              </div>
            )}
          </section>
        </div>


      </main>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-white/5 mt-10 py-6 text-center">
        <p className="text-xs text-slate-600">
          Built with ❤️ using <span className="text-indigo-400">React</span> &amp;{' '}
          <span className="text-purple-400">Gemini AI</span>
        </p>
      </footer>
    </div>
  );
};

export default Feed;