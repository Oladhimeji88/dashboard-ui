import React, { useState } from 'react';
import { AlertTriangleIcon, PlusIcon } from 'lucide-react';
import { Panel } from '../components/ui/Panel';
import { Segmented } from '../components/ui/Segmented';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../components/ui/Toast';
import {
  loans as initialLoans,
  loanStages,
  loanTotals,
  LoanStage,
  Loan } from
'../data/loans';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
});

const views = ['Board', 'List'] as const;
type View = (typeof views)[number];

const summary = [
{ label: 'Pipeline volume', value: currency.format(loanTotals.volume), hint: '6 active files' },
{ label: 'Avg. days to close', value: `${loanTotals.avgDaysToClose}`, hint: '4 faster than target' },
{ label: 'Pull-through', value: `${loanTotals.pullThrough}%`, hint: 'Last 90 days' }];


const products: Loan['product'][] = ['Conventional', 'FHA', 'VA'];

export function LoanCenter() {
  const [view, setView] = useState<View>('Board');
  const [loans, setLoans] = useState(initialLoans);
  const [modalOpen, setModalOpen] = useState(false);
  const [borrower, setBorrower] = useState('');
  const [amount, setAmount] = useState('');
  const [product, setProduct] = useState<Loan['product']>('Conventional');
  const showToast = useToast();

  const stageTotal = (stage: LoanStage) =>
  loans.
  filter((loan) => loan.stage === stage).
  reduce((sum, loan) => sum + loan.amount, 0);

  const startFile = () => {
    if (!borrower.trim() || !amount.trim()) return;
    const loan: Loan = {
      id: `L-${Math.floor(3000 + Math.random() * 900)}`,
      borrower: borrower.trim(),
      avatar: '/acf287e1-466b-4cb3-9f01-c6573edbeb4b.jpg',
      stage: 'Application',
      amount: Number(amount) || 0,
      rate: '5.99',
      product,
      ltv: 80,
      closeDate: 'TBD',
      daysInStage: 0
    };
    setLoans((current) => [loan, ...current]);
    showToast(`Started file for ${loan.borrower}`);
    setBorrower('');
    setAmount('');
    setProduct('Conventional');
    setModalOpen(false);
  };

  return (
    <div className="pt-6">
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="text-[40px] font-semibold leading-none tracking-tight">
            Loan Center
          </h1>
          <p className="mt-3 text-[15px] text-muted">
            2 files are blocked and need action today
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Segmented label="View" options={views} value={view} onChange={setView} />
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 ease-soft hover:bg-inkSoft">

            <PlusIcon className="h-4 w-4" strokeWidth={2.2} />
            Start a file
          </button>
        </div>
      </header>

      {modalOpen ?
      <Modal title="Start a new file" onClose={() => setModalOpen(false)}>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium" htmlFor="loan-borrower">
                Borrower name
              </label>
              <input
              id="loan-borrower"
              value={borrower}
              onChange={(event) => setBorrower(event.target.value)}
              placeholder="e.g. Jordan Lee"
              className="mt-1.5 w-full rounded-xl bg-white px-4 py-2.5 text-sm outline-none ring-1 ring-line focus:ring-ink" />

            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="loan-amount">
                Loan amount
              </label>
              <input
              id="loan-amount"
              type="number"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="e.g. 450000"
              className="mt-1.5 w-full rounded-xl bg-white px-4 py-2.5 text-sm outline-none ring-1 ring-line focus:ring-ink" />

            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="loan-product">
                Product
              </label>
              <select
              id="loan-product"
              value={product}
              onChange={(event) => setProduct(event.target.value as Loan['product'])}
              className="mt-1.5 w-full rounded-xl bg-white px-4 py-2.5 text-sm outline-none ring-1 ring-line focus:ring-ink">

                {products.map((option) =>
              <option key={option} value={option}>{option}</option>
              )}
              </select>
            </div>
            <button
            type="button"
            onClick={startFile}
            className="w-full rounded-full bg-ink py-3 text-sm font-semibold text-white transition-colors duration-150 ease-soft hover:bg-inkSoft">

              Start file
            </button>
          </div>
        </Modal> :
      null}

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {summary.map((item, index) =>
        <Panel
          key={item.label}
          className={`p-6 ${index === 0 ? 'sm:col-span-1 bg-ink text-white' : ''}`}>
          
            <p className={`text-sm ${index === 0 ? 'text-white/60' : 'text-muted'}`}>
              {item.label}
            </p>
            <p className="mt-3 text-[34px] font-semibold leading-none tracking-tight tabular">
              {item.value}
            </p>
            <p className={`mt-2 text-sm ${index === 0 ? 'text-white/60' : 'text-muted'}`}>
              {item.hint}
            </p>
          </Panel>
        )}
      </div>

      {view === 'Board' ?
      <div className="mt-6 grid gap-4 lg:grid-cols-4">
          {loanStages.map((stage) => {
          const stageLoans = loans.filter((loan) => loan.stage === stage);
          return (
            <section key={stage} aria-label={stage} className="flex flex-col">
                <div className="flex items-baseline justify-between px-1 pb-3">
                  <h2 className="text-[15px] font-semibold">{stage}</h2>
                  <span className="text-xs text-muted tabular">
                    {stageLoans.length} · {currency.format(stageTotal(stage))}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-3">
                  {stageLoans.map((loan) =>
                <Panel key={loan.id} as="article" className="flex flex-col p-5">
                      <div className="flex items-center gap-3">
                        <img
                      src={loan.avatar}
                      alt=""
                      className="h-9 w-9 rounded-full object-cover" />
                    
                        <div className="min-w-0">
                          <p className="truncate text-[15px] font-semibold">
                            {loan.borrower}
                          </p>
                          <p className="text-xs text-muted tabular">{loan.id}</p>
                        </div>
                      </div>

                      <p className="mt-4 text-[24px] font-semibold leading-none tracking-tight tabular">
                        {currency.format(loan.amount)}
                      </p>

                      <dl className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
                        <div className="flex gap-1">
                          <dt>Rate</dt>
                          <dd className="font-medium text-inkSoft tabular">{loan.rate}%</dd>
                        </div>
                        <div className="flex gap-1">
                          <dt>LTV</dt>
                          <dd className="font-medium text-inkSoft tabular">{loan.ltv}%</dd>
                        </div>
                        <div className="flex gap-1">
                          <dt>Close</dt>
                          <dd className="font-medium text-inkSoft">{loan.closeDate}</dd>
                        </div>
                      </dl>

                      <div className="mt-auto pt-4">
                        {loan.blocked ?
                    <p className="flex items-center gap-2 rounded-xl bg-down/10 px-3 py-2 text-xs font-medium text-down">
                            <AlertTriangleIcon className="h-3.5 w-3.5" strokeWidth={2} />
                            {loan.blocked}
                          </p> :

                    <p className="text-xs text-muted">
                            {loan.daysInStage} days in stage
                          </p>
                    }
                      </div>
                    </Panel>
                )}
                  {stageLoans.length === 0 ?
                <div className="rounded-[26px] border border-dashed border-line py-10 text-center text-xs text-muted">
                      Nothing here
                    </div> :
                null}
                </div>
              </section>);

        })}
        </div> :

      <div className="mt-6 overflow-hidden rounded-[26px] bg-panel">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-muted">
                <th scope="col" className="px-6 py-4 font-medium">Borrower</th>
                <th scope="col" className="px-3 py-4 font-medium">Stage</th>
                <th scope="col" className="px-3 py-4 font-medium">Product</th>
                <th scope="col" className="px-3 py-4 text-right font-medium">Amount</th>
                <th scope="col" className="px-3 py-4 text-right font-medium">Rate</th>
                <th scope="col" className="px-6 py-4 text-right font-medium">Close</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) =>
            <tr key={loan.id} className="border-t border-line hover:bg-panelSoft">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={loan.avatar} alt="" className="h-9 w-9 rounded-full object-cover" />
                      <div>
                        <p className="text-[15px] font-semibold">{loan.borrower}</p>
                        <p className="text-xs text-muted tabular">{loan.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-sm text-inkSoft">{loan.stage}</td>
                  <td className="px-3 py-4 text-sm text-inkSoft">{loan.product}</td>
                  <td className="px-3 py-4 text-right text-sm font-medium tabular">
                    {currency.format(loan.amount)}
                  </td>
                  <td className="px-3 py-4 text-right text-sm tabular">{loan.rate}%</td>
                  <td className="px-6 py-4 text-right text-sm text-muted">{loan.closeDate}</td>
                </tr>
            )}
            </tbody>
          </table>
        </div>
      }
    </div>);

}