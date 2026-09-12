import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { Dashboard } from './pages/Dashboard';
import { Contacts } from './pages/Contacts';
import { Communication } from './pages/Communication';
import { MarketingCenter } from './pages/MarketingCenter';
import { LoanCenter } from './pages/LoanCenter';
import { Payroll } from './pages/Payroll';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/communication" element={<Communication />} />
          <Route path="/marketing" element={<MarketingCenter />} />
          <Route path="/loans" element={<LoanCenter />} />
          <Route path="/payroll" element={<Payroll />} />
        </Route>
      </Routes>
    </BrowserRouter>);

}