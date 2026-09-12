import React, { useState } from 'react';
import { ChevronDownIcon, MinusIcon, PlusIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { Panel } from '../ui/Panel';
import { ratingCard } from '../../data/pipeline';

export function RatingCard() {
  const [calls, setCalls] = useState(ratingCard.callsCompleted);
  const [goal, setGoal] = useState(ratingCard.callsGoal);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const max = Math.max(...ratingCard.spark);

  return (
    <section aria-labelledby="rating-heading" className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-4 pb-4">
        <div>
          <h2 id="rating-heading" className="text-[22px] font-semibold tracking-tight">
            Your Rating
          </h2>
          <p className="mt-0.5 text-sm text-muted">by Company Activity</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="rounded-full bg-panel px-4 py-2.5 text-sm text-inkSoft">
            This month
          </span>
          <div className="relative">
            <button
              type="button"
              aria-label="Rating settings"
              aria-expanded={settingsOpen}
              onClick={() => setSettingsOpen((value) => !value)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-panel text-inkSoft transition-colors duration-150 ease-soft hover:bg-line">

              <SlidersHorizontalIcon className="h-[18px] w-[18px]" strokeWidth={1.9} />
            </button>
            {settingsOpen ?
            <>
                <button
                type="button"
                aria-label="Close"
                onClick={() => setSettingsOpen(false)}
                className="fixed inset-0 z-30 cursor-default" />

                <div className="absolute right-0 top-12 z-40 w-64 rounded-2xl bg-white p-4 shadow-[0_12px_32px_rgba(0,0,0,0.12)] ring-1 ring-line">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Daily call goal</p>
                    <button
                    type="button"
                    aria-label="Close"
                    onClick={() => setSettingsOpen(false)}
                    className="flex h-6 w-6 items-center justify-center rounded-full text-muted hover:bg-panel">

                      <XIcon className="h-3.5 w-3.5" strokeWidth={2} />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-3">
                    <button
                    type="button"
                    aria-label="Decrease goal"
                    onClick={() => setGoal((value) => Math.max(1, value - 5))}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-panel text-inkSoft hover:bg-line">

                      <MinusIcon className="h-4 w-4" strokeWidth={2} />
                    </button>
                    <span className="w-12 text-center text-[19px] font-semibold tabular">
                      {goal}
                    </span>
                    <button
                    type="button"
                    aria-label="Increase goal"
                    onClick={() => setGoal((value) => value + 5)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-panel text-inkSoft hover:bg-line">

                      <PlusIcon className="h-4 w-4" strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </> :
            null}
          </div>
        </div>
      </div>

      <Panel className="flex flex-1 flex-col p-6">
        <div className="flex justify-center">
          <ChevronDownIcon className="h-5 w-5 text-muted" strokeWidth={2} />
        </div>

        <div className="flex items-baseline justify-center gap-6">
          <span className="text-[52px] font-semibold leading-none tracking-tight text-line tabular">
            {ratingCard.previous}
          </span>
          <span className="text-[76px] font-semibold leading-none tracking-tight tabular">
            {ratingCard.score}
          </span>
          <span className="text-[52px] font-semibold leading-none tracking-tight text-line tabular">
            {ratingCard.next}
          </span>
        </div>
        <p className="mt-3 text-center text-sm text-muted">
          Rank across 312 officers
        </p>

        <div className="mt-auto flex h-16 items-end justify-center gap-[3px] pt-8">
          {ratingCard.spark.map((value, index) =>
          <span
            key={index}
            className="w-[3px] rounded-full bg-accent"
            style={{ height: `${value / max * 100}%` }} />

          )}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
          <span className="text-[15px] font-medium">Phone Call's Completed</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Remove a completed call"
              onClick={() => setCalls((value) => Math.max(0, value - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-inkSoft transition-colors duration-150 ease-soft hover:bg-line">
              
              <MinusIcon className="h-4 w-4" strokeWidth={2} />
            </button>
            <span className="text-[19px] font-semibold tabular">
              {calls}
              <span className="text-sm text-muted">/{goal}</span>
            </span>
            <button
              type="button"
              aria-label="Add a completed call"
              onClick={() =>
              setCalls((value) => Math.min(goal, value + 1))
              }
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-inkSoft transition-colors duration-150 ease-soft hover:bg-line">
              
              <PlusIcon className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      </Panel>
    </section>);

}