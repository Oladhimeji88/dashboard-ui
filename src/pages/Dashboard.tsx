import React, { useState } from 'react';
import { RateHeader } from '../components/dashboard/RateHeader';
import { RateChart } from '../components/dashboard/RateChart';
import { PipelineSection } from '../components/dashboard/PipelineSection';
import { RatingCard } from '../components/dashboard/RatingCard';
import { ForumCard } from '../components/dashboard/ForumCard';
import { TimePeriod } from '../data/rates';

export function Dashboard() {
  const [period, setPeriod] = useState<TimePeriod>('1D');
  const [range, setRange] = useState('This month');

  return (
    <div className="pt-6">
      <RateHeader period={period} onPeriodChange={setPeriod} />
      <RateChart period={period} />

      <div className="mt-12 grid gap-x-10 gap-y-10 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,0.7fr)_minmax(0,1fr)]">
        <PipelineSection range={range} onRangeChange={setRange} />
        <RatingCard />
        <ForumCard />
      </div>
    </div>);

}