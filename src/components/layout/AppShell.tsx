import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  SearchIcon,
  UserPlusIcon,
  RadioIcon,
  WalletIcon,
  BellIcon } from
'lucide-react';
import { navItems, currentUser } from '../../data/nav';

const actions = [
{ icon: SearchIcon, label: 'Search' },
{ icon: UserPlusIcon, label: 'Add contact', highlight: true },
{ icon: RadioIcon, label: 'Live rate alerts' },
{ icon: WalletIcon, label: 'Payments' },
{ icon: BellIcon, label: 'Notifications', dot: true }];


export function AppShell() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen w-full bg-canvas font-sans text-ink">
      <header className="sticky top-0 z-30 bg-canvas/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 w-full max-w-[1600px] items-center gap-6 px-6 lg:px-10">
          <div className="flex shrink-0 items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent">
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path d="M17 3.5 7 12l10 8.5V3.5Z" fill="#17171A" />
              </svg>
            </span>
            <span className="text-[22px] font-semibold tracking-tight">Finora</span>
          </div>

          <nav
            aria-label="Primary"
            className="hidden flex-1 items-center justify-center gap-1 xl:flex">
            
            {navItems.map((item) => {
              const active =
              item.to === '/' ? pathname === '/' : pathname.startsWith(item.to);
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={[
                  'rounded-full px-4 py-2.5 text-[15px] transition-colors duration-150 ease-soft',
                  active ?
                  'bg-ink font-semibold text-white' :
                  'text-muted hover:text-ink'].
                  join(' ')}>
                  
                  {item.label}
                </NavLink>);

            })}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            {actions.map(({ icon: Icon, label, highlight, dot }) =>
            <button
              key={label}
              type="button"
              aria-label={label}
              className={[
              'relative hidden h-11 w-11 items-center justify-center rounded-full transition-colors duration-150 ease-soft sm:flex',
              highlight ?
              'bg-accentSoft text-ink hover:bg-accent' :
              'bg-panel text-inkSoft hover:bg-line'].
              join(' ')}>
              
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
                {dot ?
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-down ring-2 ring-panel" /> :
              null}
              </button>
            )}
            <button
              type="button"
              className="ml-1 h-11 w-11 overflow-hidden rounded-full ring-1 ring-line"
              aria-label={`Account: ${currentUser.name}`}>
              
              <img
                src={currentUser.avatar}
                alt=""
                className="h-full w-full object-cover" />
              
            </button>
          </div>
        </div>

        <nav
          aria-label="Primary mobile"
          className="flex gap-1 overflow-x-auto px-6 pb-3 xl:hidden">
          
          {navItems.map((item) => {
            const active =
            item.to === '/' ? pathname === '/' : pathname.startsWith(item.to);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={[
                'whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors duration-150 ease-soft',
                active ? 'bg-ink font-semibold text-white' : 'text-muted'].
                join(' ')}>
                
                {item.label}
              </NavLink>);

          })}
        </nav>
      </header>

      <main className="mx-auto w-full max-w-[1600px] px-6 pb-16 pt-2 lg:px-10">
        <Outlet />
      </main>
    </div>);

}