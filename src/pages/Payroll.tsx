import React from 'react';
import { motion } from 'framer-motion';
import { DownloadIcon } from 'lucide-react';
import { Panel } from '../components/ui/Panel';
import { Delta } from '../components/ui/Delta';
import { CountUp } from '../components/ui/CountUp';
import { Reveal } from '../components/ui/Reveal';
import { useToast } from '../components/ui/Toast';
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
  const showToast = useToast();

  const downloadStatement = () => {
    const header = ['Loan', 'Borrower', 'Closed On', 'Volume', 'BPS', 'Payout', 'Status'];
    const rows = commissions.map((row) => [
    row.loanId,
    row.borrower,
    row.closedOn,
    row.volume,
    row.bps,
    row.payout,
    row.status]
    );
    const csv = [header, ...rows].map((line) => line.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'commission-statement.csv';
    link.click();
    URL.revokeObjectURL(url);
    showToast('Statement downloaded');
  };

  return (
    <div className="pt-6">
      <header className="flex flex-wrap items-end justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}>

          <h1 className="text-[40px] font-semibold leading-none tracking-tight">
            My Payroll
          </h1>
          <p className="mt-3 text-[15px] text-muted">
            Commission period closes Feb 24 · paid Feb 28
          </p>
        </motion.div>
        <button
          type="button"
          onClick={downloadStatement}
          className="flex items-center gap-2 rounded-full bg-panel px-5 py-2.5 text-sm font-medium text-inkSoft transition-colors duration-150 ease-soft hover:bg-line">

          <DownloadIcon className="h-4 w-4" strokeWidth={2} />
          Download statement
        </button>
      </header>

      <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)]">
        <Reveal>
        <Panel className="bg-ink p-8 text-white">
          <p className="text-sm text-white/60">Next payout</p>
          <p className="mt-4 text-[64px] font-semibold leading-none tracking-tight tabular">
            <CountUp value={payrollSummary.nextPayout} format={(n) => currency.format(n)} duration={1100} />
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
              <motion.div
                className="h-full rounded-full bg-accent"
                initial={{ width: 0 }}
                animate={{ width: `${payrollSummary.tierProgress}%` }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }} />

            </div>
            <p className="mt-3 text-sm text-white/60">
              {currency.format(payrollSummary.nextTierAt)} closed volume unlocks
              95 bps
            </p>
          </div>
        </Panel>
        </Reveal>

        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Reveal delay={0.1}>
            <Panel className="p-6">
              <p className="text-sm text-muted">YTD earnings</p>
              <p className="mt-3 text-[32px] font-semibold leading-none tracking-tight tabular">
                <CountUp value={payrollSummary.ytdEarnings} format={(n) => currency.format(n)} />
              </p>
              <div className="mt-3">
                <Delta
                  direction="up"
                  value={String(payrollSummary.ytdDelta)}
                  suffix="%"
                  size="sm" />

              </div>
            </Panel>
            </Reveal>
            <Reveal delay={0.15}>
            <Panel className="p-6">
              <p className="text-sm text-muted">Closed volume YTD</p>
              <p className="mt-3 text-[32px] font-semibold leading-none tracking-tight tabular">
                <CountUp value={payrollSummary.closedVolumeYtd} format={(n) => currency.format(n)} />
              </p>
              <p className="mt-3 text-sm text-muted">38 funded loans</p>
            </Panel>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
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
                    <motion.div
                      className={`w-full rounded-lg ${last ? 'bg-ink' : 'bg-accent'}`}
                      initial={{ height: '0%' }}
                      animate={{ height: `${month.value / maxEarning * 100}%` }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.06, ease: [0.23, 1, 0.32, 1] }} />

                    <span className="text-xs text-muted">{month.month}</span>
                  </div>);

              })}
            </div>
          </Panel>
          </Reveal>
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
              {commissions.map((row, index) =>
              <motion.tr
                key={row.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
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
                </motion.tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>);

}