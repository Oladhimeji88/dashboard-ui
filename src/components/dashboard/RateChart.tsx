import React, { useMemo, useState } from 'react';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis } from
'recharts';
import { Delta } from '../ui/Delta';
import { buildSeries, RateKey, TimePeriod } from '../../data/rates';

const seriesMeta: {key: RateKey;label: string;short: string;color: string;}[] =
[
{ key: 'conv', label: 'Conventional', short: 'Conv.', color: '#3DDC84' },
{ key: 'fha', label: 'FHA', short: 'FHA', color: '#C9C7C0' },
{ key: 'va', label: 'VA', short: 'VA', color: '#D6D4CD' }];


type TooltipPayload = {
  payload?: {conv: number;fha: number;va: number;};
};

function RateTooltip({ active, payload }: {active?: boolean;payload?: TooltipPayload[];}) {
  if (!active || !payload || payload.length === 0) return null;
  const point = payload[0].payload;
  if (!point) return null;

  return (
    <div className="rounded-2xl bg-white/95 px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur">
      {seriesMeta.map((series) => {
        const value = point[series.key];
        return (
          <div key={series.key} className="flex items-center gap-3 py-0.5">
            <Delta
              direction={series.key === 'va' ? 'down' : 'up'}
              value={value.toFixed(2)}
              suffix="%"
              size="sm" />
            
            <span className="text-sm text-muted">{series.label}</span>
          </div>);

      })}
    </div>);

}

type RateChartProps = {
  period: TimePeriod;
};

export function RateChart({ period }: RateChartProps) {
  const [visible, setVisible] = useState<Record<RateKey, boolean>>({
    conv: true,
    fha: true,
    va: true
  });
  const data = useMemo(() => buildSeries(period), [period]);

  const toggle = (key: RateKey) =>
  setVisible((prev) => {
    const next = { ...prev, [key]: !prev[key] };
    return Object.values(next).some(Boolean) ? next : prev;
  });

  const ticks = useMemo(() => {
    const seen = new Set<string>();
    return data.
    map((point) => point.time).
    filter((time) => {
      if (seen.has(time)) return false;
      seen.add(time);
      return true;
    });
  }, [data]);

  return (
    <section aria-label="Rate history" className="relative mt-8">
      <div className="h-[340px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
            
            <CartesianGrid
              stroke="#E4E2DC"
              strokeDasharray="0"
              vertical={false} />
            
            <XAxis
              dataKey="time"
              ticks={ticks}
              interval={0}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#8B8B85', fontSize: 12 }}
              tickMargin={14} />
            
            <YAxis
              domain={[1, 16]}
              ticks={[1, 4, 8, 12, 16]}
              tickLine={false}
              axisLine={false}
              width={62}
              tick={{ fill: '#8B8B85', fontSize: 12 }}
              tickFormatter={(value: number) => `${value.toFixed(2)}%`} />
            
            <Tooltip
              content={<RateTooltip />}
              cursor={{ fill: 'rgba(61, 220, 132, 0.14)' }} />
            
            <Bar dataKey="volume" fill="#E4E2DC" barSize={2} isAnimationActive={false} />
            {visible.fha ?
            <Line
              type="monotone"
              dataKey="fha"
              stroke="#C9C7C0"
              strokeWidth={1.2}
              dot={false}
              isAnimationActive={false} /> :

            null}
            {visible.va ?
            <Line
              type="monotone"
              dataKey="va"
              stroke="#D6D4CD"
              strokeWidth={1.2}
              dot={false}
              isAnimationActive={false} /> :

            null}
            {visible.conv ?
            <Line
              type="monotone"
              dataKey="conv"
              stroke="#3DDC84"
              strokeWidth={2.6}
              dot={false}
              isAnimationActive={false} /> :

            null}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="pointer-events-auto absolute bottom-[64px] right-4 flex items-center rounded-full bg-canvas/80 p-1 backdrop-blur">
        {seriesMeta.map((series) => {
          const active = visible[series.key];
          return (
            <button
              key={series.key}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(series.key)}
              className={[
              'rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-150 ease-soft',
              active ? 'bg-accent text-ink' : 'text-muted hover:text-ink'].
              join(' ')}>
              
              {series.short}
            </button>);

        })}
      </div>

      <div className="mt-2 h-1.5 w-full rounded-full bg-panel">
        <div className="relative mx-auto h-full w-1/4 rounded-full bg-line">
          <span className="absolute -top-[3px] left-0 h-3 w-3 rounded-full bg-white ring-1 ring-line" />
          <span className="absolute -top-[3px] right-0 h-3 w-3 rounded-full bg-white ring-1 ring-line" />
        </div>
      </div>
    </section>);

}