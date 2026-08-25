import React, { useState } from 'react';
import { ArrowRight, Eye, EyeOff, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('anurag@institution.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess && onLoginSuccess({
        name: 'Anurag',
        email: email || 'anurag@institution.edu',
        role: 'Lead Educator'
      });
    }, 400);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F8FAFC]">
      
      {/* Left Panel: Deep-teal Branded Intelligence Hero */}
      <div className="lg:w-1/2 min-h-[480px] lg:min-h-screen bg-[#071C19] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden studyshield-dark-mesh">
        
        {/* Subtle contour rings for visual depth */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-emerald-500/10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[840px] h-[840px] rounded-full border border-emerald-500/5 pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Logo and Brand Header */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <span className="text-white font-bold text-xl tracking-tight font-sans">S</span>
            </div>
            <span className="font-bold text-xl text-white tracking-tight">
              StudyShield
            </span>
          </div>
        </div>

        {/* Hero Narrative */}
        <div className="relative z-10 my-10 lg:my-0 max-w-xl">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 text-xs font-bold tracking-wider uppercase border border-emerald-800/60 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Learning Intelligence Platform
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white font-sans">
            Keep every <br />
            learner <br />
            <span className="text-emerald-400">moving forward.</span>
          </h1>

          {/* Subtext */}
          <p className="mt-6 text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-md">
            Spot the quiet signals, support students sooner, and turn uncertainty into a clear next step.
          </p>
        </div>

        {/* Live Learning Signals Glassmorphism Card */}
        <div className="relative z-10 max-w-md w-full">
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 backdrop-blur-md shadow-2xl">
            <div className="flex items-center justify-between text-xs pb-3 border-b border-emerald-800/30">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-bold tracking-wider uppercase text-slate-200 text-[11px]">
                  Live Learning Signals
                </span>
                <span className="text-emerald-400 text-[11px] font-semibold">● System healthy</span>
              </div>
              <span className="text-slate-400 text-[10px]">updated just now</span>
            </div>

            {/* Sparkline Visual Simulation */}
            <div className="h-12 mt-3 flex items-center justify-between px-2 relative">
              <svg className="w-full h-8 overflow-visible opacity-70" viewBox="0 0 300 40">
                <path
                  d="M0 25 Q 50 10, 100 28 T 200 12 T 300 18"
                  fill="none"
                  stroke="#34D399"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="280" cy="16" r="4" fill="#34D399" className="animate-pulse" />
              </svg>
            </div>
          </div>
        </div>

      </div>

      {/* Right Panel: Clean White Workspace Sign-In */}
      <div className="lg:w-1/2 min-h-screen bg-white p-8 sm:p-12 lg:p-20 flex items-center justify-center">
        <div className="max-w-md w-full space-y-6">
          
          {/* Header */}
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
              Welcome Back
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight mt-1">
              Sign in to your workspace
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Access your learner insights and support queue.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            
            {/* Work Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Work email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-sm">
                  @
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@institution.edu"
                  className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-xs"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-xs font-semibold text-emerald-600 hover:text-emerald-700">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-sm">
                  *
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-9 pr-14 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Keep me signed in */}
            <div className="flex items-center">
              <input
                id="keep-signed-in"
                type="checkbox"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
              />
              <label htmlFor="keep-signed-in" className="ml-2 text-xs font-medium text-slate-600 select-none cursor-pointer">
                Keep me signed in
              </label>
            </div>

            {/* Sign in Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all duration-150 flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              <span>{isLoading ? 'Signing in...' : 'Sign in'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-slate-400 font-medium">
                  or continue with
                </span>
              </div>
            </div>

            {/* Google Sign In */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Request Access Footer */}
            <p className="text-center text-xs text-slate-500 pt-3">
              New to StudyShield?{' '}
              <a href="#request-access" onClick={(e) => { e.preventDefault(); handleSubmit(e); }} className="font-bold text-emerald-600 hover:text-emerald-700">
                Request access
              </a>
            </p>

          </form>

        </div>
      </div>

    </div>
  );
}
