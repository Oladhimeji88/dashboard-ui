import React from 'react';
import { HeartIcon, SendIcon, SlidersHorizontalIcon } from 'lucide-react';
import { forumPosts } from '../../data/forum';

export function ForumCard() {
  return (
    <section aria-labelledby="forum-heading" className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-4 pb-4">
        <div>
          <h2 id="forum-heading" className="text-[22px] font-semibold tracking-tight">
            Community Forum
          </h2>
          <p className="mt-0.5 text-sm text-muted">Updated 12/15/24 at 9:00 AM</p>
        </div>
        <button
          type="button"
          aria-label="Forum settings"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-panel text-inkSoft transition-colors duration-150 ease-soft hover:bg-line">
          
          <SlidersHorizontalIcon className="h-[18px] w-[18px]" strokeWidth={1.9} />
        </button>
      </div>

      <ul className="flex-1 divide-y divide-line">
        {forumPosts.map((post) =>
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
                  aria-label={`Like post from ${post.name}`}
                  className="text-down transition-transform duration-150 ease-soft hover:scale-110">
                  
                    <HeartIcon className="h-[18px] w-[18px]" fill="currentColor" />
                  </button>
                  <button
                  type="button"
                  aria-label={`Reply to ${post.name}`}
                  className="text-inkSoft transition-colors duration-150 ease-soft hover:text-ink">
                  
                    <SendIcon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                  </button>
                </div>
                <span className="text-sm text-muted tabular">
                  {post.likes}D/{post.replies}C
                </span>
              </div>
            </div>
          </li>
        )}
      </ul>
    </section>);

}