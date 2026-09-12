import React from 'react';
import { useCountUp } from '../../hooks/useCountUp';

type CountUpProps = {
  value: number;
  format?: (value: number) => string;
  decimals?: number;
  duration?: number;
  className?: string;
};

export function CountUp({
  value,
  format,
  decimals = 0,
  duration = 900,
  className
}: CountUpProps) {
  const animated = useCountUp(value, duration);
  const rounded = Number(animated.toFixed(decimals));
  const display = format ? format(rounded) : rounded.toLocaleString('en-US');

  return <span className={className}>{display}</span>;
}
