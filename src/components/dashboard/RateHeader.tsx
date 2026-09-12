import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpIcon, RefreshCwIcon } from 'lucide-react';
import { Segmented } from '../ui/Segmented';
import { Delta } from '../ui/Delta';
import { CountUp } from '../ui/CountUp';
import { Reveal } from '../ui/Reveal';
import { rateSummaries, rateMeta, timePeriods, TimePeriod } from '../../data/rates';
import { useToast } from '../ui/Toast';

type RateHeaderProps = {
  period: TimePeriod;
  onPeriodChange: (period: TimePeriod) => void;
};

export function RateHeader({ period, onPeriodChange }: RateHeaderProps) {
  const [updatedAt, setUpdatedAt] = useState(rateMeta.updatedAt);
  const [refreshing, setRefreshing] = useState(false);
  const showToast = useToast();

  const handleRefresh = () => {
    setRefreshing(true);
    setUpdatedAt('Just now');
    showToast('Rates refreshed');
    setTimeout(() => setRefreshing(false), 600);
  };

  return (
    <header className="flex flex-wrap items-start gap-x-10 gap-y-6">
      <motion.div
        className="min-w-[220px]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}>

        <h1 className="text-[40px] font-semibold leading-none tracking-tight">
          Loan Rates
        </h1>
        <div className="mt-6 flex items-center gap-3">
          <span className="text-sm text-muted">Time period:</span>
          <Segmented
            label="Time period"
            options={timePeriods}
            value={period}
            onChange={onPeriodChange}
            size="sm" />

        </div>
      </motion.div>

      <dl className="flex flex-wrap items-start gap-x-10 gap-y-6">
        {rateSummaries.map((rate, index) =>
        <motion.div
          key={rate.key}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 * index, ease: [0.23, 1, 0.32, 1] }}>

            <dd className="flex items-start text-[58px] font-semibold leading-none tracking-tight tabular">
              <CountUp value={Number(rate.value)} decimals={2} />
              <span className="mt-1 text-[22px] font-medium text-muted">%</span>
            </dd>
            <dt className="mt-3 text-[15px] text-muted">{rate.label}</dt>
            <div className="mt-1.5">
              <Delta
              direction={rate.direction}
              value={rate.change}
              suffix="%" />

            </div>
          </motion.div>
        )}
      </dl>

      <Reveal delay={0.2} className="rounded-[22px] bg-panel px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white">
            <ArrowUpIcon className="h-4 w-4" strokeWidth={2.2} />
          </span>
          <span className="rounded-full bg-accent px-2.5 py-1 text-sm font-semibold tabular">
            <CountUp value={Number(rateMeta.avgMove)} decimals={3} />
            <span className="align-super text-[0.65em]">%</span>
          </span>
        </div>
        <p className="mt-3 text-sm text-muted">AVG Rate Today:</p>
        <div className="mt-1 flex items-center gap-4">
          <Delta direction="up" value={String(rateMeta.advancing)} size="sm" />
          <Delta direction="down" value={String(rateMeta.declining)} size="sm" />
        </div>
      </Reveal>

      <div className="ml-auto flex items-center gap-3 self-center">
        <span className="hidden text-sm text-muted sm:inline">Updated at:</span>
        <span className="rounded-full bg-panel px-4 py-2 text-sm tabular">
          {updatedAt}
        </span>
        <button
          type="button"
          aria-label="Refresh rates"
          onClick={handleRefresh}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-panel text-inkSoft transition-colors duration-150 ease-soft hover:bg-line">

          <RefreshCwIcon
            className={`h-[18px] w-[18px] transition-transform duration-500 ${refreshing ? 'animate-spin' : ''}`}
            strokeWidth={1.9} />

        </button>
      </div>
    </header>);

}