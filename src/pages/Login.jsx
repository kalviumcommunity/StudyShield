import React, { useState } from 'react';

export default function LoginPage({ onLoginSuccess }) {
  // Empty initial inputs as requested: it will be entered by the user
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Valid credentials mapping
  const VALID_CREDENTIALS = [
    { email: 'anurag@institution.edu', password: 'password123', name: 'Anurag' },
    { email: 'anurag@institution.edu', password: 'password', name: 'Anurag' },
    { email: 'anurag@institution.edu', password: 'admin', name: 'Anurag' },
    { email: 'educator@studyshield.com', password: 'password123', name: 'Educator' },
    { email: 'admin@studyshield.com', password: 'password123', name: 'Administrator' }
  ];

  function handleSubmit(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    setErrorMessage('');

    if (!email.trim()) {
      setErrorMessage('Please enter your work email.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      const trimmedEmail = email.trim().toLowerCase();
      
      // Check for matching credentials
      const matched = VALID_CREDENTIALS.find(
        (c) => c.email.toLowerCase() === trimmedEmail && c.password === password
      );

      // Also accept any valid .edu email with standard password123 or password
      const isEduMatch = trimmedEmail.endsWith('.edu') && (password === 'password123' || password === 'password' || password.length >= 6);

      if (matched || isEduMatch) {
        const derivedName = matched ? matched.name : (trimmedEmail.split('@')[0].split('.')[0] || 'Anurag');
        const formattedName = derivedName.charAt(0).toUpperCase() + derivedName.slice(1);

        onLoginSuccess && onLoginSuccess({
          name: formattedName || 'Anurag',
          email: trimmedEmail,
          role: 'Lead Educator'
        });
      } else {
        setErrorMessage('Invalid email or password. Hint: Use anurag@institution.edu with password123');
      }
    }, 450);
  }

  const fillDemoCredentials = () => {
    setEmail('anurag@institution.edu');
    setPassword('password123');
    setErrorMessage('');
  };

  return (
    <main className="login-shell">
      <div className="ambient-grid" aria-hidden="true" />
      
      {/* Left Brand Panel */}
      <section className="brand-panel">
        <header className="brand-header">
          <div className="brand-mark">S</div>
          <span className="brand-name">StudyShield</span>
        </header>

        <div className="brand-copy">
          <p className="eyebrow">
            <span className="pulse-dot" /> Learning intelligence platform
          </p>
          <h1>
            Keep every learner
            <br />
            <em>moving forward.</em>
          </h1>
          <p className="intro">
            Spot the quiet signals, support students sooner, and turn
            uncertainty into a clear next step.
          </p>
        </div>

        <div className="signal-card" aria-label="Live learning signals preview">
          <div className="signal-card-top">
            <div>
              <p className="mini-label">Live learning signals</p>
              <p className="signal-status">
                <span className="status-dot" /> System healthy
              </p>
            </div>
            <span className="signal-time">updated just now</span>
          </div>
          <div className="signal-chart" aria-hidden="true">
            <div className="chart-line" />
            <span className="chart-point point-one" />
            <span className="chart-point point-two" />
            <span className="chart-point point-three" />
            <span className="chart-point point-four" />
          </div>
          <div className="signal-footer">
            <div>
              <strong>94.2%</strong>
              <span>learners on track</span>
            </div>
            <div>
              <strong className="green">+12.8%</strong>
              <span>engagement this week</span>
            </div>
          </div>
        </div>

        <footer className="brand-footer">
          <span>Built for thoughtful intervention.</span>
          <span>v2.4</span>
        </footer>
      </section>

      {/* Right Form Panel */}
      <section className="form-panel">
        <div className="form-wrap">
          <div className="mobile-brand">
            <div className="brand-mark">S</div>
            <span className="brand-name">StudyShield</span>
          </div>
          <div className="form-heading">
            <p className="form-kicker">Welcome back</p>
            <h2>Sign in to your workspace</h2>
            <p>Access your learner insights and support queue.</p>
          </div>

          {/* Error message banner */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center justify-between">
              <span>{errorMessage}</span>
              <button 
                type="button" 
                onClick={fillDemoCredentials}
                className="underline hover:text-rose-900 ml-2 shrink-0"
              >
                Auto-fill
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form-element">
            <label htmlFor="email">Work email</label>
            <div className="input-wrap">
              <span className="input-icon">@</span>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="you@institution.edu"
                autoComplete="email"
                required
              />
            </div>

            <div className="label-row">
              <label htmlFor="password">Password</label>
              <a href="#forgot" onClick={(e) => e.preventDefault()}>Forgot password?</a>
            </div>
            <div className="input-wrap">
              <span className="input-icon lock-icon">*</span>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="visibility-button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowPassword((prev) => !prev);
                }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
              />
              <span className="custom-checkbox" />
              Keep me signed in
            </label>
            
            <button 
              className="submit-button" 
              type="submit"
              disabled={isLoading}
            >
              <span>{isLoading ? "Validating credentials..." : "Sign in"}</span> 
              <span>{"->"}</span>
            </button>
          </form>

          {/* Credentials helper pill */}
          <div className="mt-3 p-2.5 rounded-lg bg-emerald-50/80 border border-emerald-200/60 text-[11px] text-emerald-800 flex items-center justify-between">
            <div>
              <strong>Demo Login:</strong> <span className="font-mono">anurag@institution.edu</span> / <span className="font-mono">password123</span>
            </div>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="text-emerald-700 font-bold hover:underline ml-2 shrink-0"
            >
              Fill
            </button>
          </div>

          <div className="divider">
            <span>or continue with</span>
          </div>
          <button 
            className="sso-button" 
            type="button"
            onClick={() => {
              fillDemoCredentials();
              onLoginSuccess && onLoginSuccess({
                name: 'Anurag',
                email: 'anurag@institution.edu',
                role: 'Lead Educator'
              });
            }}
          >
            <span className="sso-icon">G</span> Continue with Google
          </button>
          <p className="form-note">
            New to StudyShield? <a href="#request-access" onClick={(e) => { e.preventDefault(); fillDemoCredentials(); }}>Request access</a>
          </p>
          <p className="secure-note">
            <span className="shield-icon">+</span> Your workspace is protected
            with enterprise-grade security.
          </p>
        </div>
      </section>
    </main>
  );
}
