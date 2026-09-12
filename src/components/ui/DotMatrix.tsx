import React from 'react';

type DotMatrixProps = {
  total: number;
  filled: number;
  highlighted: number;
  columns?: number;
  label: string;
};

/**
 * Waffle chart: each dot is one loan unit. Filled dots are booked,
 * highlighted dots are the portion that closed this period.
 */
export function DotMatrix({
  total,
  filled,
  highlighted,
  columns = 12,
  label
}: DotMatrixProps) {
  const dots = Array.from({ length: total }, (_, index) => {
    if (index >= total - highlighted) return 'highlight';
    if (index < filled) return 'filled';
    return 'empty';
  });

  return (
    <div
      role="img"
      aria-label={label}
      className="grid gap-[3px]"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
      
      {dots.map((state, index) =>
      <span
        key={index}
        className={[
        'h-[5px] w-[5px] rounded-[1px]',
        state === 'highlight' ?
        'bg-up' :
        state === 'filled' ?
        'bg-accent' :
        'bg-line'].
        join(' ')} />

      )}
    </div>);

}