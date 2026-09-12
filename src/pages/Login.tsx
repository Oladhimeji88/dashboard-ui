import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon, Loader2Icon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/ui/Toast';

function Logo() {
  return (
    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent">
      <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" aria-hidden="true">
        <path
          d="M4.25 5.25 12 18.5l7.75-13.25"
          fill="none"
          stroke="#17171A"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round" />

        <circle cx="19.75" cy="5.25" r="2" fill="#17171A" />
      </svg>
    </span>);

}

export function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const showToast = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    const from = (location.state as {from?: {pathname: string;};})?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Enter your email and password to continue.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Enter a valid email address.');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      login(email.trim());
      showToast(`Welcome back, ${email.split('@')[0]}`);
      setLoading(false);
      const from = (location.state as {from?: {pathname: string;};})?.from?.pathname || '/';
      navigate(from, { replace: true });
    }, 600);
  };

  return (
    <div className="flex min-h-screen w-full bg-ink font-sans text-white">
      <div className="relative hidden w-[46%] flex-col justify-between border-r border-white/10 p-12 lg:flex">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="text-[22px] font-semibold tracking-tight">Vantra</span>
        </div>

        <div>
          <p className="text-[34px] font-semibold leading-tight tracking-tight">
            Every rate, file, and lead — in one place.
          </p>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/60">
            Vantra brings your pipeline, contacts, and payroll together so you
            can spend less time switching tabs and more time closing loans.
          </p>
        </div>

        <div className="rounded-[22px] bg-white/10 p-6 backdrop-blur">
          <p className="text-sm text-white/60">Closed volume YTD</p>
          <p className="mt-2 text-[40px] font-semibold leading-none tracking-tight tabular">
            $17.25M
          </p>
          <p className="mt-3 text-sm text-white/60">
            Across 38 funded loans this year
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <Logo />
            <span className="text-[22px] font-semibold tracking-tight">Vantra</span>
          </div>

          <h1 className="text-[32px] font-semibold leading-none tracking-tight">
            Welcome back
          </h1>
          <p className="mt-3 text-[15px] text-white/60">
            Sign in to get back to your pipeline.
          </p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit} noValidate>
            <div>
              <label className="text-sm font-medium" htmlFor="login-email">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="marcus.hale@vantra.com"
                className="mt-1.5 w-full rounded-xl bg-white/10 px-4 py-3 text-sm text-white outline-none ring-1 ring-white/10 transition-shadow duration-150 ease-soft placeholder:text-white/40 focus:bg-white/15 focus:ring-accent" />

            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium" htmlFor="login-password">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() =>
                  showToast(
                    email.trim() ?
                    `Password reset link sent to ${email.trim()}` :
                    'Enter your email first'
                  )
                  }
                  className="text-sm font-medium text-white/60 underline-offset-2 hover:text-white hover:underline">

                  Forgot password?
                </button>
              </div>
              <div className="relative mt-1.5">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl bg-white/10 px-4 py-3 pr-12 text-sm text-white outline-none ring-1 ring-white/10 transition-shadow duration-150 ease-soft placeholder:text-white/40 focus:bg-white/15 focus:ring-accent" />

                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white">

                  {showPassword ?
                  <EyeOffIcon className="h-4 w-4" strokeWidth={1.9} /> :

                  <EyeIcon className="h-4 w-4" strokeWidth={1.9} />
                  }
                </button>
              </div>
            </div>

            {error ?
            <p role="alert" className="text-sm font-medium text-down">
                {error}
              </p> :
            null}

            <label className="flex items-center gap-2.5 pt-1 text-sm text-white/60">
              <input
                type="checkbox"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
                className="h-4 w-4 rounded border-white/20 accent-accent" />

              Keep me signed in
            </label>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-accent py-3.5 text-sm font-semibold text-ink transition-colors duration-150 ease-soft hover:bg-[#2ECC76] disabled:opacity-70">

              {loading ?
              <Loader2Icon className="h-4 w-4 animate-spin" strokeWidth={2.2} /> :
              null}
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-white/50">
            New to Vantra?{' '}
            <button
              type="button"
              onClick={() => showToast('Ask your team admin for an invite')}
              className="font-medium text-white underline-offset-2 hover:underline">

              Request access
            </button>
          </p>
        </div>
      </div>
    </div>);

}
