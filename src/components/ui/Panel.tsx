import React from 'react';
import { twMerge } from 'tailwind-merge';

type PanelProps = {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'aside';
};

export function Panel({ children, className = '', as = 'div' }: PanelProps) {
  const Tag = as;
  return (
    <Tag className={twMerge('rounded-[26px] bg-panel', className)}>
      {children}
    </Tag>);

}

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
};

export function SectionHeader({ title, subtitle, children }: SectionHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 pb-4">
      <div>
        <h2 className="text-[22px] font-semibold tracking-tight">{title}</h2>
        {subtitle ?
        <p className="mt-0.5 text-sm text-muted">{subtitle}</p> :
        null}
      </div>
      {children ?
      <div className="flex shrink-0 items-center gap-2">{children}</div> :
      null}
    </div>);

}

type IconButtonProps = {
  label: string;
  onClick?: () => void;
  children: React.ReactNode;
  tone?: 'default' | 'accent';
};

export function IconButton({
  label,
  onClick,
  children,
  tone = 'default'
}: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={[
      'flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-150 ease-soft',
      tone === 'accent' ?
      'bg-accent text-ink hover:bg-[#F3C433]' :
      'bg-panel text-inkSoft hover:bg-line'].
      join(' ')}>
      
      {children}
    </button>);

}