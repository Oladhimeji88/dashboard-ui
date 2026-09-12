import React from 'react';
import { motion } from 'framer-motion';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  as?: 'div' | 'li' | 'section' | 'article';
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
  once = true,
  as = 'div'
}: RevealProps) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-40px' }}
      transition={{ duration: 0.45, delay, ease: [0.23, 1, 0.32, 1] }}>

      {children}
    </MotionTag>);

}
