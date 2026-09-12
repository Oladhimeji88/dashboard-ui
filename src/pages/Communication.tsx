import React, { useMemo, useState } from 'react';
import { PaperclipIcon, PhoneIcon, SendIcon } from 'lucide-react';
import { Panel } from '../components/ui/Panel';
import { Segmented } from '../components/ui/Segmented';
import { threads } from '../data/threads';

const channels = ['All', 'Email', 'SMS', 'Call'] as const;
type Channel = (typeof channels)[number];

export function Communication() {
  const [channel, setChannel] = useState<Channel>('All');
  const [activeId, setActiveId] = useState(threads[0].id);
  const [draft, setDraft] = useState('');

  const visible = useMemo(
    () =>
    threads.filter(
      (thread) => channel === 'All' || thread.channel === channel
    ),
    [channel]
  );
  const active = visible.find((thread) => thread.id === activeId) ?? visible[0];
  const unread = threads.filter((thread) => thread.unread).length;

  return (
    <div className="pt-6">
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="text-[40px] font-semibold leading-none tracking-tight">
            Communication
          </h1>
          <p className="mt-3 text-[15px] text-muted">
            {unread} unread · average reply time 14 min
          </p>
        </div>
        <Segmented
          label="Channel filter"
          options={channels}
          value={channel}
          onChange={setChannel} />
        
      </header>

      <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)]">
        <Panel as="section" className="overflow-hidden">
          <h2 className="sr-only">Conversations</h2>
          {visible.length === 0 ?
          <p className="p-8 text-center text-sm text-muted">
              Nothing in this channel yet.
            </p> :

          <ul className="divide-y divide-line">
              {visible.map((thread) => {
              const isActive = active?.id === thread.id;
              return (
                <li key={thread.id}>
                    <button
                    type="button"
                    onClick={() => setActiveId(thread.id)}
                    className={[
                    'flex w-full gap-3 p-5 text-left transition-colors duration-150 ease-soft',
                    isActive ? 'bg-white' : 'hover:bg-panelSoft'].
                    join(' ')}>
                    
                      <img
                      src={thread.avatar}
                      alt=""
                      className="h-11 w-11 shrink-0 rounded-full object-cover" />
                    
                      <span className="min-w-0 flex-1">
                        <span className="flex items-baseline justify-between gap-3">
                          <span className="truncate text-[15px] font-semibold">
                            {thread.name}
                          </span>
                          <span className="shrink-0 text-xs text-muted">
                            {thread.time}
                          </span>
                        </span>
                        <span className="mt-1 block truncate text-sm text-muted">
                          {thread.preview}
                        </span>
                        <span className="mt-2 flex items-center gap-2">
                          <span className="rounded-full bg-panelSoft px-2.5 py-0.5 text-[11px] font-medium text-inkSoft">
                            {thread.channel}
                          </span>
                          <span className="rounded-full bg-accentSoft px-2.5 py-0.5 text-[11px] font-medium text-inkSoft">
                            {thread.tag}
                          </span>
                          {thread.unread ?
                        <span className="ml-auto h-2 w-2 rounded-full bg-accent" /> :
                        null}
                        </span>
                      </span>
                    </button>
                  </li>);

            })}
            </ul>
          }
        </Panel>

        {active ?
        <Panel as="section" className="flex min-h-[560px] flex-col p-6">
            <div className="flex items-center justify-between gap-4 border-b border-line pb-5">
              <div className="flex items-center gap-3">
                <img
                src={active.avatar}
                alt=""
                className="h-12 w-12 rounded-full object-cover" />
              
                <div>
                  <h2 className="text-[19px] font-semibold tracking-tight">
                    {active.name}
                  </h2>
                  <p className="text-sm text-muted">
                    {active.tag} · {active.channel}
                  </p>
                </div>
              </div>
              <button
              type="button"
              className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium transition-colors duration-150 ease-soft hover:bg-line">
              
                <PhoneIcon className="h-4 w-4" strokeWidth={1.9} />
                Call
              </button>
            </div>

            <ol className="flex-1 space-y-4 overflow-y-auto py-6">
              {active.messages.map((message) => {
              const mine = message.from === 'me';
              return (
                <li
                  key={message.id}
                  className={mine ? 'flex justify-end' : 'flex justify-start'}>
                  
                    <div
                    className={[
                    'max-w-[75%] rounded-3xl px-5 py-3.5',
                    mine ?
                    'rounded-br-lg bg-ink text-white' :
                    'rounded-bl-lg bg-white text-ink'].
                    join(' ')}>
                    
                      <p className="text-[15px] leading-relaxed">{message.body}</p>
                      <p
                      className={`mt-1.5 text-xs ${mine ? 'text-white/60' : 'text-muted'}`}>
                      
                        {message.time}
                      </p>
                    </div>
                  </li>);

            })}
            </ol>

            <form
            className="flex items-center gap-3 rounded-full bg-white px-5 py-3"
            onSubmit={(event) => {
              event.preventDefault();
              setDraft('');
            }}>
            
              <button
              type="button"
              aria-label="Attach a document"
              className="text-muted transition-colors duration-150 ease-soft hover:text-ink">
              
                <PaperclipIcon className="h-[18px] w-[18px]" strokeWidth={1.9} />
              </button>
              <label className="sr-only" htmlFor="reply">
                Reply
              </label>
              <input
              id="reply"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder={`Reply to ${active.name.split(' ')[0]}…`}
              className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted" />
            
              <button
              type="submit"
              aria-label="Send reply"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-ink transition-colors duration-150 ease-soft hover:bg-[#F3C433]">
              
                <SendIcon className="h-4 w-4" strokeWidth={2} />
              </button>
            </form>
          </Panel> :
        null}
      </div>
    </div>);

}