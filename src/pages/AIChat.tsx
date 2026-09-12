import React, { useEffect, useRef, useState } from 'react';
import { SendIcon, SparklesIcon } from 'lucide-react';
import { Panel } from '../components/ui/Panel';
import { getAssistantReply, suggestedPrompts } from '../data/assistant';

type ChatMessage = {
  id: string;
  from: 'user' | 'assistant';
  body: string;
  time: string;
};

function now() {
  return new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function AssistantAvatar() {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent">
      <SparklesIcon className="h-4 w-4 text-ink" strokeWidth={2} />
    </span>);

}

export function AIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
  {
    id: 'welcome',
    from: 'assistant',
    body: "Hey Marcus, I'm your Vantra assistant. Ask me about rates, your pipeline, leads, payroll, or campaigns.",
    time: now()
  }]
  );
  const [draft, setDraft] = useState('');
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, thinking]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || thinking) return;

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      from: 'user',
      body: trimmed,
      time: now()
    };
    setMessages((current) => [...current, userMessage]);
    setDraft('');
    setThinking(true);

    setTimeout(() => {
      const reply: ChatMessage = {
        id: `a-${Date.now()}`,
        from: 'assistant',
        body: getAssistantReply(trimmed),
        time: now()
      };
      setMessages((current) => [...current, reply]);
      setThinking(false);
    }, 700 + Math.random() * 500);
  };

  return (
    <div className="pt-6">
      <header>
        <h1 className="text-[40px] font-semibold leading-none tracking-tight">
          AI Assistant
        </h1>
        <p className="mt-3 text-[15px] text-muted">
          Ask about rates, pipeline, leads, payroll, or campaigns
        </p>
      </header>

      <Panel as="section" className="mt-8 flex min-h-[560px] flex-col p-6">
        <ol className="max-h-[440px] flex-1 space-y-5 overflow-y-auto pr-1">
          {messages.map((message) => {
            const mine = message.from === 'user';
            return (
              <li
                key={message.id}
                className={mine ? 'flex justify-end' : 'flex items-start gap-3'}>

                {mine ? null : <AssistantAvatar />}
                <div
                  className={[
                  'max-w-[75%] rounded-3xl px-5 py-3.5',
                  mine ?
                  'rounded-br-lg bg-ink text-white' :
                  'rounded-bl-lg bg-white text-ink'].
                  join(' ')}>

                  <p className="text-[15px] leading-relaxed">{message.body}</p>
                  <p className={`mt-1.5 text-xs ${mine ? 'text-white/60' : 'text-muted'}`}>
                    {message.time}
                  </p>
                </div>
              </li>);

          })}
          {thinking ?
          <li className="flex items-start gap-3">
              <AssistantAvatar />
              <div className="flex items-center gap-1.5 rounded-3xl rounded-bl-lg bg-white px-5 py-4">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.2s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.1s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted" />
              </div>
            </li> :
          null}
          <div ref={endRef} />
        </ol>

        {messages.length <= 1 ?
        <div className="flex flex-wrap gap-2 border-t border-line pt-5">
            {suggestedPrompts.map((prompt) =>
          <button
            key={prompt.id}
            type="button"
            onClick={() => sendMessage(prompt.label)}
            className="rounded-full bg-panel px-4 py-2 text-sm text-inkSoft transition-colors duration-150 ease-soft hover:bg-line">

                {prompt.label}
              </button>
          )}
          </div> :
        null}

        <form
          className="mt-5 flex items-center gap-3 rounded-full bg-white px-5 py-3"
          onSubmit={(event) => {
            event.preventDefault();
            sendMessage(draft);
          }}>

          <label className="sr-only" htmlFor="ai-chat-input">
            Message the assistant
          </label>
          <input
            id="ai-chat-input"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Ask about rates, pipeline, leads…"
            className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted" />

          <button
            type="submit"
            aria-label="Send message"
            disabled={!draft.trim() || thinking}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-ink transition-colors duration-150 ease-soft hover:bg-[#2ECC76] disabled:opacity-50">

            <SendIcon className="h-4 w-4" strokeWidth={2} />
          </button>
        </form>
      </Panel>
    </div>);

}
