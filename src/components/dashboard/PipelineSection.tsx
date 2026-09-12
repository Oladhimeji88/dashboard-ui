import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { Panel, SectionHeader } from '../ui/Panel';
import { Delta } from '../ui/Delta';
import { DotMatrix } from '../ui/DotMatrix';
import { pipelineCards } from '../../data/pipeline';

type PipelineSectionProps = {
  range: string;
  onRangeChange: (range: string) => void;
};

const ranges = ['This month', 'Last month', 'This quarter'];

export function PipelineSection({ range, onRangeChange }: PipelineSectionProps) {
  const navigate = useNavigate();

  return (
    <section aria-labelledby="pipeline-heading">
      <div className="flex items-start justify-between gap-4 pb-4">
        <div>
          <h2 id="pipeline-heading" className="text-[22px] font-semibold tracking-tight">
            Pipeline
          </h2>
          <p className="mt-0.5 text-sm text-muted">Performance for this Month</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <label className="sr-only" htmlFor="pipeline-range">
            Pipeline range
          </label>
          <select
            id="pipeline-range"
            value={range}
            onChange={(event) => onRangeChange(event.target.value)}
            className="appearance-none rounded-full bg-panel px-4 py-2.5 text-sm text-inkSoft outline-none transition-colors duration-150 ease-soft hover:bg-line">
            
            {ranges.map((option) =>
            <option key={option}>{option}</option>
            )}
          </select>
          <button
            type="button"
            aria-label="Open full pipeline"
            onClick={() => navigate('/loans')}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-panel text-inkSoft transition-colors duration-150 ease-soft hover:bg-line">

            <ArrowRightIcon className="h-[18px] w-[18px]" strokeWidth={1.9} />
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {pipelineCards.map((card) =>
        <Panel key={card.id} as="article" className="flex flex-col p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-[19px] font-semibold tracking-tight">
                  {card.title}
                </h3>
                <p className="mt-0.5 text-sm text-muted">{card.caption}</p>
              </div>
              <button
              type="button"
              aria-label={`Open ${card.title}`}
              onClick={() => navigate('/loans')}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-inkSoft transition-colors duration-150 ease-soft hover:bg-white">

                <ArrowRightIcon className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>

            <div className="mt-auto flex items-end justify-between gap-4 pt-8">
              <div>
                <p className="text-[56px] font-semibold leading-none tracking-tight tabular">
                  {card.value}
                </p>
                <div className="mt-3">
                  <Delta
                  direction={card.deltaDirection}
                  value={String(card.delta)}
                  size="sm" />
                
                </div>
                <p className="mt-1 text-sm text-muted">{card.unit}</p>
              </div>

              <div className="relative pt-6">
                <span className="absolute -top-0 right-0 rounded-full bg-accent px-2 py-0.5 text-xs font-semibold tabular">
                  {card.share}
                </span>
                <DotMatrix
                total={card.matrix.total}
                filled={card.matrix.filled}
                highlighted={card.matrix.highlighted}
                label={`${card.share} of ${card.title.toLowerCase()} complete`} />
              
              </div>
            </div>
          </Panel>
        )}
      </div>
    </section>);

}