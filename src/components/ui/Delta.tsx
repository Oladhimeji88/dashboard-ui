import React from 'react';

type DeltaProps = {
  direction: 'up' | 'down';
  value: string;
  suffix?: string;
  size?: 'sm' | 'md';
};

export function Delta({ direction, value, suffix, size = 'md' }: DeltaProps) {
  const up = direction === 'up';
  return (
    <span
      className={`inline-flex items-center gap-1.5 tabular ${
      size === 'sm' ? 'text-xs' : 'text-[15px]'}`
      }>
      
      <span
        aria-hidden="true"
        className={[
        'inline-block h-0 w-0 border-x-[5px] border-x-transparent',
        up ?
        'border-b-[7px] border-b-up' :
        'border-t-[7px] border-t-down'].
        join(' ')} />
      
      <span className="font-medium text-inkSoft">
        {value}
        {suffix ?
        <span className="align-super text-[0.7em] text-muted">{suffix}</span> :
        null}
      </span>
      <span className="sr-only">{up ? 'increase' : 'decrease'}</span>
    </span>);

}