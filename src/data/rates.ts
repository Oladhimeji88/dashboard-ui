export type RateKey = 'conv' | 'fha' | 'va';

export type RateSummary = {
  key: RateKey;
  label: string;
  value: string;
  change: string;
  direction: 'up' | 'down';
};

export const rateSummaries: RateSummary[] = [
{
  key: 'conv',
  label: 'Conventional',
  value: '5.99',
  change: '0.125',
  direction: 'up'
},
{ key: 'fha', label: 'FHA', value: '4.75', change: '0.125', direction: 'up' },
{ key: 'va', label: 'VA', value: '4.33', change: '0.125', direction: 'down' }];


export const timePeriods = ['1H', '1D', '1W', '1M', '1Y'] as const;
export type TimePeriod = (typeof timePeriods)[number];

export type RatePoint = {
  time: string;
  conv: number;
  fha: number;
  va: number;
  volume: number;
};

const hours = [
'4:00 AM',
'5:00 AM',
'6:00 AM',
'7:00 AM',
'8:00 AM',
'9:00 AM',
'10:00 AM',
'11:00 AM',
'12:00 PM',
'1:00 PM',
'2:00 PM',
'3:00 PM',
'4:00 PM'];


/** Deterministic pseudo-random so the chart is stable between renders. */
function noise(seed: number): number {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

export function buildSeries(period: TimePeriod): RatePoint[] {
  const density = { '1H': 60, '1D': 156, '1W': 120, '1M': 96, '1Y': 72 }[period];
  const amplitude = { '1H': 0.6, '1D': 1.4, '1W': 2.2, '1M': 3, '1Y': 4 }[period];

  return Array.from({ length: density }, (_, index) => {
    const t = index / density;
    const wave =
    Math.sin(t * Math.PI * 3.1) * 1.3 + Math.sin(t * Math.PI * 8.7) * 0.5;
    const hourIndex = Math.min(
      hours.length - 1,
      Math.round(t * (hours.length - 1))
    );
    return {
      time: hours[hourIndex],
      conv: Number((7 + wave * amplitude * 0.55 + noise(index) * 0.4).toFixed(2)),
      fha: Number(
        (8.4 + Math.sin(t * Math.PI * 5.4) * amplitude + noise(index + 7) * 1.9).toFixed(2)
      ),
      va: Number(
        (6.2 + Math.cos(t * Math.PI * 4.2) * amplitude * 1.1 + noise(index + 19) * 2.2).toFixed(2)
      ),
      volume: Number((5 + noise(index + 31) * 11).toFixed(2))
    };
  });
}

export const rateMeta = {
  avgMove: '0.042',
  advancing: 2,
  declining: 1,
  updatedAt: '9:00 AM 12/15/24'
};