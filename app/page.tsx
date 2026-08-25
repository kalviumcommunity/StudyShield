"use client";

import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <main className="login-shell">
      <div className="ambient-grid" aria-hidden="true" />
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

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Work email</label>
            <div className="input-wrap">
              <span className="input-icon">@</span>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@institution.edu"
                autoComplete="email"
                required
              />
            </div>

            <div className="label-row">
              <label htmlFor="password">Password</label>
              <a href="#forgot">Forgot password?</a>
            </div>
            <div className="input-wrap">
              <span className="input-icon lock-icon">*</span>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="visibility-button"
                onClick={() => setShowPassword(!showPassword)}
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
            <button className="submit-button" type="submit">
              Sign in <span>{"->"}</span>
            </button>
          </form>

          <div className="divider">
            <span>or continue with</span>
          </div>
          <button className="sso-button" type="button">
            <span className="sso-icon">G</span> Continue with Google
          </button>
          <p className="form-note">
            New to StudyShield? <a href="#request-access">Request access</a>
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
