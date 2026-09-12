import React from 'react';
import { DownloadIcon } from 'lucide-react';
import { Panel } from '../components/ui/Panel';
import { Delta } from '../components/ui/Delta';
import { commissions, monthlyEarnings, payrollSummary } from '../data/payroll';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
});

const statusTone: Record<string, string> = {
  Paid: 'bg-up/15 text-up',
  Processing: 'bg-accent text-ink',
  Pending: 'bg-white text-muted'
};

export function Payroll() {
  const maxEarning = Math.max(...monthlyEarnings.map((month) => month.value));

  return (
    <div className="pt-6">
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="text-[40px] font-semibold leading-none tracking-tight">
            My Payroll
          </h1>
          <p className="mt-3 text-[15px] text-muted">
            Commission period closes Feb 24 · paid Feb 28
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full bg-panel px-5 py-2.5 text-sm font-medium text-inkSoft transition-colors duration-150 ease-soft hover:bg-line">
          
          <DownloadIcon className="h-4 w-4" strokeWidth={2} />
          Download statement
        </button>
      </header>

      <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)]">
        <Panel className="bg-ink p-8 text-white">
          <p className="text-sm text-white/60">Next payout</p>
          <p className="mt-4 text-[64px] font-semibold leading-none tracking-tight tabular">
            {currency.format(payrollSummary.nextPayout)}
          </p>
          <p className="mt-4 text-sm text-white/60">
            Deposits {payrollSummary.nextPayoutDate}
          </p>

          <div className="mt-8 border-t border-white/15 pt-6">
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-white/60">{payrollSummary.tierLabel}</span>
              <span className="tabular text-white/60">
                {payrollSummary.tierProgress}% to next tier
              </span>
            </div>
            <div className="mt-3 h-2.5 w-full rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-accent"
                style={{ width: `${payrollSummary.tierProgress}%` }} />
              
            </div>
            <p className="mt-3 text-sm text-white/60">
              {currency.format(payrollSummary.nextTierAt)} closed volume unlocks
              95 bps
            </p>
          </div>
        </Panel>

        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Panel className="p-6">
              <p className="text-sm text-muted">YTD earnings</p>
              <p className="mt-3 text-[32px] font-semibold leading-none tracking-tight tabular">
                {currency.format(payrollSummary.ytdEarnings)}
              </p>
              <div className="mt-3">
                <Delta
                  direction="up"
                  value={String(payrollSummary.ytdDelta)}
                  suffix="%"
                  size="sm" />
                
              </div>
            </Panel>
            <Panel className="p-6">
              <p className="text-sm text-muted">Closed volume YTD</p>
              <p className="mt-3 text-[32px] font-semibold leading-none tracking-tight tabular">
                {currency.format(payrollSummary.closedVolumeYtd)}
              </p>
              <p className="mt-3 text-sm text-muted">38 funded loans</p>
            </Panel>
          </div>

          <Panel className="p-6">
            <h2 className="text-[17px] font-semibold tracking-tight">
              Earnings by month
            </h2>
            <div className="mt-6 flex h-32 items-end gap-3">
              {monthlyEarnings.map((month, index) => {
                const last = index === monthlyEarnings.length - 1;
                return (
                  <div key={month.month} className="flex flex-1 flex-col items-center gap-2">
                    <span className="text-xs text-muted tabular">
                      {Math.round(month.value / 1000)}k
                    </span>
                    <div
                      className={`w-full rounded-lg ${last ? 'bg-ink' : 'bg-accent'}`}
                      style={{ height: `${month.value / maxEarning * 100}%` }} />
                    
                    <span className="text-xs text-muted">{month.month}</span>
                  </div>);

              })}
            </div>
          </Panel>
        </div>
      </div>

      <section aria-labelledby="commission-heading" className="mt-10">
        <h2 id="commission-heading" className="text-[22px] font-semibold tracking-tight">
          Commission detail
        </h2>
        <div className="mt-4 overflow-hidden rounded-[26px] bg-panel">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-muted">
                <th scope="col" className="px-6 py-4 font-medium">Loan</th>
                <th scope="col" className="px-3 py-4 font-medium">Closed</th>
                <th scope="col" className="px-3 py-4 text-right font-medium">Volume</th>
                <th scope="col" className="px-3 py-4 text-right font-medium">BPS</th>
                <th scope="col" className="px-3 py-4 text-right font-medium">Payout</th>
                <th scope="col" className="px-6 py-4 text-right font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {commissions.map((row) =>
              <tr
                key={row.id}
                className="border-t border-line transition-colors duration-150 ease-soft hover:bg-panelSoft">
                
                  <td className="px-6 py-4">
                    <p className="text-[15px] font-semibold">{row.borrower}</p>
                    <p className="text-xs text-muted tabular">{row.loanId}</p>
                  </td>
                  <td className="px-3 py-4 text-sm text-muted">{row.closedOn}</td>
                  <td className="px-3 py-4 text-right text-sm tabular">
                    {currency.format(row.volume)}
                  </td>
                  <td className="px-3 py-4 text-right text-sm tabular">{row.bps}</td>
                  <td className="px-3 py-4 text-right text-[15px] font-semibold tabular">
                    {currency.format(row.payout)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${statusTone[row.status]}`}>
                    
                      {row.status}
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>);

}