import React, { useState } from 'react';
import { HeartIcon, SendIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { forumPosts as initialForumPosts } from '../../data/forum';
import { useToast } from '../ui/Toast';

export function ForumCard() {
  const [posts, setPosts] = useState(
    initialForumPosts.map((post) => ({ ...post, liked: false }))
  );
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'liked'>('newest');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyDraft, setReplyDraft] = useState('');
  const showToast = useToast();

  const toggleLike = (id: string) => {
    setPosts((current) =>
    current.map((post) =>
    post.id === id ?
    {
      ...post,
      liked: !post.liked,
      likes: post.liked ? post.likes - 1 : post.likes + 1
    } :
    post
    )
    );
  };

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === 'liked') return b.likes - a.likes;
    return 0;
  });

  const sendReply = (id: string, name: string) => {
    if (!replyDraft.trim()) return;
    setPosts((current) =>
    current.map((post) =>
    post.id === id ? { ...post, replies: post.replies + 1 } : post
    )
    );
    showToast(`Reply sent to ${name}`);
    setReplyingTo(null);
    setReplyDraft('');
  };

  return (
    <section aria-labelledby="forum-heading" className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-4 pb-4">
        <div>
          <h2 id="forum-heading" className="text-[22px] font-semibold tracking-tight">
            Community Forum
          </h2>
          <p className="mt-0.5 text-sm text-muted">Updated 12/15/24 at 9:00 AM</p>
        </div>
        <div className="relative">
          <button
            type="button"
            aria-label="Forum settings"
            aria-expanded={sortOpen}
            onClick={() => setSortOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-panel text-inkSoft transition-colors duration-150 ease-soft hover:bg-line">

            <SlidersHorizontalIcon className="h-[18px] w-[18px]" strokeWidth={1.9} />
          </button>
          {sortOpen ?
          <>
              <button
              type="button"
              aria-label="Close"
              onClick={() => setSortOpen(false)}
              className="fixed inset-0 z-30 cursor-default" />

              <div className="absolute right-0 top-12 z-40 w-48 rounded-2xl bg-white p-2 shadow-[0_12px_32px_rgba(0,0,0,0.12)] ring-1 ring-line">
                <button
                type="button"
                onClick={() => {
                  setSortBy('newest');
                  setSortOpen(false);
                }}
                className={`w-full rounded-xl px-3 py-2 text-left text-sm ${sortBy === 'newest' ? 'bg-panel font-semibold' : 'hover:bg-panelSoft'}`}>

                  Newest first
                </button>
                <button
                type="button"
                onClick={() => {
                  setSortBy('liked');
                  setSortOpen(false);
                }}
                className={`w-full rounded-xl px-3 py-2 text-left text-sm ${sortBy === 'liked' ? 'bg-panel font-semibold' : 'hover:bg-panelSoft'}`}>

                  Most liked
                </button>
              </div>
            </> :
          null}
        </div>
      </div>

      <ul className="flex-1 divide-y divide-line">
        {sortedPosts.map((post) =>
        <li key={post.id} className="flex gap-4 py-5 first:pt-0">
            <img
            src={post.avatar}
            alt=""
            className="h-11 w-11 shrink-0 rounded-full object-cover" />

            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <p className="truncate text-[16px] font-semibold">{post.name}</p>
                <span className="shrink-0 text-sm text-muted tabular">
                  {post.time}
                </span>
              </div>
              <p className="mt-1 text-[15px] leading-relaxed text-inkSoft">
                {post.body}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                  type="button"
                  aria-label={post.liked ? `Unlike post from ${post.name}` : `Like post from ${post.name}`}
                  onClick={() => toggleLike(post.id)}
                  className={[
                  'transition-transform duration-150 ease-soft hover:scale-110',
                  post.liked ? 'text-down' : 'text-muted'].
                  join(' ')}>

                    <HeartIcon
                    className="h-[18px] w-[18px]"
                    fill={post.liked ? 'currentColor' : 'none'}
                    strokeWidth={1.8} />

                  </button>
                  <button
                  type="button"
                  aria-label={`Reply to ${post.name}`}
                  onClick={() =>
                  setReplyingTo((current) => current === post.id ? null : post.id)
                  }
                  className="text-inkSoft transition-colors duration-150 ease-soft hover:text-ink">

                    <SendIcon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                  </button>
                </div>
                <span className="text-sm text-muted tabular">
                  {post.likes}D/{post.replies}C
                </span>
              </div>

              {replyingTo === post.id ?
            <div className="mt-3 flex items-center gap-2 rounded-full bg-panel px-4 py-2">
                  <label className="sr-only" htmlFor={`reply-${post.id}`}>
                    Reply to {post.name}
                  </label>
                  <input
                id={`reply-${post.id}`}
                autoFocus
                value={replyDraft}
                onChange={(event) => setReplyDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') sendReply(post.id, post.name);
                  if (event.key === 'Escape') setReplyingTo(null);
                }}
                placeholder={`Reply to ${post.name.split(' ')[0]}…`}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted" />

                  <button
                type="button"
                aria-label="Cancel reply"
                onClick={() => setReplyingTo(null)}
                className="flex h-7 w-7 items-center justify-center rounded-full text-muted hover:bg-line">

                    <XIcon className="h-3.5 w-3.5" strokeWidth={2} />
                  </button>
                  <button
                type="button"
                aria-label="Send reply"
                onClick={() => sendReply(post.id, post.name)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-ink hover:bg-[#2ECC76]">

                    <SendIcon className="h-3.5 w-3.5" strokeWidth={2} />
                  </button>
                </div> :
            null}
            </div>
          </li>
        )}
      </ul>
    </section>);

}