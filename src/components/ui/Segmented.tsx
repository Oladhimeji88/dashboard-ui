import React from 'react';

type SegmentedProps<T extends string> = {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  size?: 'sm' | 'md';
  tone?: 'ink' | 'accent';
};

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
  size = 'md',
  tone = 'ink'
}: SegmentedProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={`inline-flex items-center rounded-full bg-panel ${
      size === 'sm' ? 'p-0.5' : 'p-1'}`
      }>
      
      {options.map((option) => {
        const active = option === value;
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option)}
            className={[
            'rounded-full transition-colors duration-150 ease-soft',
            size === 'sm' ?
            'px-3 py-1 text-xs font-medium' :
            'px-3.5 py-1.5 text-sm font-medium',
            active ?
            tone === 'accent' ?
            'bg-accent text-ink' :
            'bg-white text-ink shadow-[0_1px_2px_rgba(0,0,0,0.06)]' :
            'text-muted hover:text-ink'].
            join(' ')}>
            
            {option}
          </button>);

      })}
    </div>);

}