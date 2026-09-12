import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon } from 'lucide-react';
import { Panel } from '../components/ui/Panel';
import { Delta } from '../components/ui/Delta';
import { Modal } from '../components/ui/Modal';
import { CountUp } from '../components/ui/CountUp';
import { useToast } from '../components/ui/Toast';
import { campaigns as initialCampaigns, marketingTotals, Campaign } from '../data/campaigns';

const statusTone: Record<string, string> = {
  Live: 'bg-accent text-ink',
  Scheduled: 'bg-white text-inkSoft',
  Draft: 'bg-panelSoft text-muted'
};

const channels: Campaign['channel'][] = ['Email', 'SMS', 'Social'];

export function MarketingCenter() {
  const maxFunnel = marketingTotals.funnel[0].value;
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [channel, setChannel] = useState<Campaign['channel']>('Email');
  const [audience, setAudience] = useState('');
  const showToast = useToast();

  const createCampaign = () => {
    if (!name.trim()) return;
    const campaign: Campaign = {
      id: `cm-${Date.now()}`,
      name: name.trim(),
      channel,
      status: 'Draft',
      audience: audience.trim() || 'Not set',
      sent: 0,
      openRate: 0,
      replyRate: 0,
      leads: 0,
      updated: 'Just now'
    };
    setCampaigns((current) => [campaign, ...current]);
    showToast(`"${campaign.name}" created as a draft`);
    setName('');
    setAudience('');
    setChannel('Email');
    setModalOpen(false);
  };

  return (
    <div className="pt-6">
      <header className="flex flex-wrap items-end justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}>

          <h1 className="text-[40px] font-semibold leading-none tracking-tight">
            Marketing Center
          </h1>
          <p className="mt-3 text-[15px] text-muted">
            Two campaigns are live · next send Monday 9:00 AM
          </p>
        </motion.div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 ease-soft hover:bg-inkSoft">

          <PlusIcon className="h-4 w-4" strokeWidth={2.2} />
          New campaign
        </button>
      </header>

      {modalOpen ?
      <Modal title="New campaign" onClose={() => setModalOpen(false)}>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium" htmlFor="campaign-name">
                Campaign name
              </label>
              <input
              id="campaign-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Spring Rate Special"
              className="mt-1.5 w-full rounded-xl bg-white px-4 py-2.5 text-sm outline-none ring-1 ring-line focus:ring-ink" />

            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="campaign-channel">
                Channel
              </label>
              <select
              id="campaign-channel"
              value={channel}
              onChange={(event) => setChannel(event.target.value as Campaign['channel'])}
              className="mt-1.5 w-full rounded-xl bg-white px-4 py-2.5 text-sm outline-none ring-1 ring-line focus:ring-ink">

                {channels.map((option) =>
              <option key={option} value={option}>{option}</option>
              )}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="campaign-audience">
                Audience
              </label>
              <input
              id="campaign-audience"
              value={audience}
              onChange={(event) => setAudience(event.target.value)}
              placeholder="e.g. Past clients · 1,200"
              className="mt-1.5 w-full rounded-xl bg-white px-4 py-2.5 text-sm outline-none ring-1 ring-line focus:ring-ink" />

            </div>
            <button
            type="button"
            onClick={createCampaign}
            className="w-full rounded-full bg-ink py-3 text-sm font-semibold text-white transition-colors duration-150 ease-soft hover:bg-inkSoft">

              Create draft
            </button>
          </div>
        </Modal> :
      null}

      <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <Panel className="p-7">
          <p className="text-sm text-muted">Leads generated this month</p>
          <div className="mt-4 flex items-end gap-5">
            <p className="text-[72px] font-semibold leading-none tracking-tight tabular">
              <CountUp value={marketingTotals.leadsThisMonth} duration={1000} />
            </p>
            <div className="pb-3">
              <Delta direction="up" value={String(marketingTotals.leadsDelta)} suffix="%" />
              <p className="mt-1 text-sm text-muted">vs. last month</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white p-4">
              <p className="text-xs text-muted">Cost per lead</p>
              <p className="mt-1 text-[22px] font-semibold tabular">
                $<CountUp value={marketingTotals.costPerLead} />
              </p>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <p className="text-xs text-muted">Best channel</p>
              <p className="mt-1 text-[22px] font-semibold">
                {marketingTotals.bestChannel}
              </p>
            </div>
          </div>
        </Panel>

        <Panel className="p-7">
          <h2 className="text-[19px] font-semibold tracking-tight">
            Reach to application
          </h2>
          <p className="mt-0.5 text-sm text-muted">Last 30 days</p>
          <ul className="mt-6 space-y-4">
            {marketingTotals.funnel.map((step, index) =>
            <li key={step.label}>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="font-medium">{step.label}</span>
                  <span className="text-muted tabular">
                    {step.value.toLocaleString('en-US')}
                  </span>
                </div>
                <div className="mt-2 h-2.5 w-full rounded-full bg-white">
                  <motion.div
                  className={`h-full rounded-full ${index === marketingTotals.funnel.length - 1 ? 'bg-ink' : 'bg-accent'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(3, step.value / maxFunnel * 100)}%` }}
                  transition={{ duration: 0.7, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }} />

                </div>
              </li>
            )}
          </ul>
        </Panel>
      </div>

      <section aria-labelledby="campaign-heading" className="mt-10">
        <h2 id="campaign-heading" className="text-[22px] font-semibold tracking-tight">
          Campaigns
        </h2>
        <div className="mt-4 overflow-hidden rounded-[26px] bg-panel">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-muted">
                <th scope="col" className="px-6 py-4 font-medium">Campaign</th>
                <th scope="col" className="px-3 py-4 font-medium">Channel</th>
                <th scope="col" className="px-3 py-4 font-medium">Status</th>
                <th scope="col" className="px-3 py-4 text-right font-medium">Sent</th>
                <th scope="col" className="px-3 py-4 text-right font-medium">Open</th>
                <th scope="col" className="px-3 py-4 text-right font-medium">Leads</th>
                <th scope="col" className="px-6 py-4 text-right font-medium">Updated</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign, index) =>
              <motion.tr
                layout
                key={campaign.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
                className="border-t border-line transition-colors duration-150 ease-soft hover:bg-panelSoft">

                  <td className="px-6 py-4">
                    <p className="text-[15px] font-semibold">{campaign.name}</p>
                    <p className="text-xs text-muted">{campaign.audience}</p>
                  </td>
                  <td className="px-3 py-4 text-sm text-inkSoft">{campaign.channel}</td>
                  <td className="px-3 py-4">
                    <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${statusTone[campaign.status]}`}>
                    
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-3 py-4 text-right text-sm tabular">
                    {campaign.sent ? campaign.sent.toLocaleString('en-US') : '—'}
                  </td>
                  <td className="px-3 py-4 text-right text-sm tabular">
                    {campaign.sent ? `${campaign.openRate}%` : '—'}
                  </td>
                  <td className="px-3 py-4 text-right text-sm font-semibold tabular">
                    {campaign.sent ? campaign.leads : '—'}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-muted">
                    {campaign.updated}
                  </td>
                </motion.tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>);

}