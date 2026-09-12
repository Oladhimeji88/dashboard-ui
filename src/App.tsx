import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { RequireAuth } from './components/auth/RequireAuth';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Contacts } from './pages/Contacts';
import { Communication } from './pages/Communication';
import { MarketingCenter } from './pages/MarketingCenter';
import { LoanCenter } from './pages/LoanCenter';
import { Payroll } from './pages/Payroll';
import { Profile } from './pages/Profile';
import { AIChat } from './pages/AIChat';
import { ToastProvider } from './components/ui/Toast';
import { AuthProvider } from './context/AuthContext';

export function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<RequireAuth />}>
              <Route element={<AppShell />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/communication" element={<Communication />} />
                <Route path="/marketing" element={<MarketingCenter />} />
                <Route path="/loans" element={<LoanCenter />} />
                <Route path="/payroll" element={<Payroll />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/assistant" element={<AIChat />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>);

}
