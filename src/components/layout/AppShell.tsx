import React, { useEffect, useMemo, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  SearchIcon,
  UserPlusIcon,
  RadioIcon,
  WalletIcon,
  BellIcon,
  XIcon } from
'lucide-react';
import { navItems, currentUser } from '../../data/nav';
import { rateSummaries } from '../../data/rates';
import { notifications as initialNotifications } from '../../data/notifications';

const directionTone: Record<string, string> = {
  up: 'text-down',
  down: 'text-up'
};

type MenuKey = 'search' | 'alerts' | 'notifications' | null;

export function AppShell() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const [query, setQuery] = useState('');
  const [alertsOn, setAlertsOn] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter((item) => item.unread).length;

  useEffect(() => {
    setOpenMenu(null);
    setQuery('');
  }, [pathname]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return navItems.filter((item) => item.label.toLowerCase().includes(q));
  }, [query]);

  const toggleMenu = (key: MenuKey) => {
    setOpenMenu((current) => {
      const next = current === key ? null : key;
      if (next === 'notifications') {
        setNotifications((items) => items.map((item) => ({ ...item, unread: false })));
      }
      if (next !== 'search') {
        setQuery('');
      }
      return next;
    });
  };

  const closeMenu = () => setOpenMenu(null);

  const goToSearchResult = (to: string) => {
    navigate(to);
    closeMenu();
  };

  return (
    <div className="min-h-screen w-full bg-canvas font-sans text-ink">
      <header className="sticky top-0 z-30 bg-canvas/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 w-full max-w-[1600px] items-center gap-6 px-6 lg:px-10">
          <div className="flex shrink-0 items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent">
              <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" aria-hidden="true">
                <path
                  d="M4.25 5.25 12 18.5l7.75-13.25"
                  fill="none"
                  stroke="#17171A"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round" />

                <circle cx="19.75" cy="5.25" r="2" fill="#17171A" />
              </svg>
            </span>
            <span className="text-[22px] font-semibold tracking-tight">Vantra</span>
          </div>

          <div className="relative ml-auto flex items-center gap-2">
            <div className="relative z-40 hidden sm:block">
              <button
                type="button"
                aria-label="Search"
                aria-expanded={openMenu === 'search'}
                onClick={() => toggleMenu('search')}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-panel text-inkSoft transition-colors duration-150 ease-soft hover:bg-line">

                <SearchIcon className="h-[18px] w-[18px]" strokeWidth={1.9} />
              </button>

              {openMenu === 'search' ?
              <div className="absolute right-0 top-14 z-40 w-72 rounded-2xl bg-white p-3 shadow-[0_12px_32px_rgba(0,0,0,0.12)] ring-1 ring-line">
                  <div className="flex items-center gap-2 rounded-full bg-panel px-4 py-2.5">
                    <SearchIcon className="h-4 w-4 shrink-0 text-muted" strokeWidth={2} />
                    <input
                    autoFocus
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' && results[0]) {
                        goToSearchResult(results[0].to);
                      }
                      if (event.key === 'Escape') closeMenu();
                    }}
                    placeholder="Search pages…"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-muted" />

                  </div>
                  {query.trim() ?
                <ul className="mt-2 max-h-56 overflow-y-auto">
                      {results.length === 0 ?
                  <li className="px-3 py-2 text-sm text-muted">No pages match</li> :

                  results.map((item) =>
                  <li key={item.to}>
                            <button
                        type="button"
                        onClick={() => goToSearchResult(item.to)}
                        className="w-full rounded-xl px-3 py-2 text-left text-sm transition-colors duration-150 ease-soft hover:bg-panelSoft">

                              {item.label}
                            </button>
                          </li>
                  )
                  }
                    </ul> :
                null}
                </div> :
              null}
            </div>

            <button
              type="button"
              aria-label="Add contact"
              onClick={() => navigate('/contacts')}
              className="relative z-40 hidden h-11 w-11 items-center justify-center rounded-full bg-accentSoft text-ink transition-colors duration-150 ease-soft hover:bg-accent sm:flex">

              <UserPlusIcon className="h-[18px] w-[18px]" strokeWidth={1.9} />
            </button>

            <div className="relative z-40 hidden sm:block">
              <button
                type="button"
                aria-label="Live rate alerts"
                aria-expanded={openMenu === 'alerts'}
                onClick={() => toggleMenu('alerts')}
                className={[
                'flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-150 ease-soft',
                alertsOn ? 'bg-accent text-ink' : 'bg-panel text-inkSoft hover:bg-line'].
                join(' ')}>

                <RadioIcon className="h-[18px] w-[18px]" strokeWidth={1.9} />
              </button>

              {openMenu === 'alerts' ?
              <div className="absolute right-0 top-14 z-40 w-72 rounded-2xl bg-white p-4 shadow-[0_12px_32px_rgba(0,0,0,0.12)] ring-1 ring-line">
                  <div className="flex items-center justify-between">
                    <p className="text-[15px] font-semibold">Live rate alerts</p>
                    <button
                    type="button"
                    aria-label="Close"
                    onClick={closeMenu}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-muted hover:bg-panel">

                      <XIcon className="h-4 w-4" strokeWidth={2} />
                    </button>
                  </div>
                  <ul className="mt-3 space-y-2.5">
                    {rateSummaries.map((rate) =>
                  <li key={rate.key} className="flex items-center justify-between text-sm">
                        <span className="text-inkSoft">{rate.label}</span>
                        <span className="flex items-center gap-1.5 tabular">
                          <span className="font-semibold">{rate.value}%</span>
                          <span className={`text-xs ${directionTone[rate.direction]}`}>
                            {rate.direction === 'up' ? '+' : '-'}
                            {rate.change}
                          </span>
                        </span>
                      </li>
                  )}
                  </ul>
                  <button
                  type="button"
                  onClick={() => setAlertsOn((value) => !value)}
                  className={[
                  'mt-4 w-full rounded-full py-2.5 text-sm font-semibold transition-colors duration-150 ease-soft',
                  alertsOn ?
                  'bg-panel text-inkSoft hover:bg-line' :
                  'bg-ink text-white hover:bg-inkSoft'].
                  join(' ')}>

                    {alertsOn ? 'Turn off alerts' : 'Turn on alerts'}
                  </button>
                </div> :
              null}
            </div>

            <button
              type="button"
              aria-label="Payments"
              onClick={() => navigate('/payroll')}
              className="relative z-40 hidden h-11 w-11 items-center justify-center rounded-full bg-panel text-inkSoft transition-colors duration-150 ease-soft hover:bg-line sm:flex">

              <WalletIcon className="h-[18px] w-[18px]" strokeWidth={1.9} />
            </button>

            <div className="relative z-40 hidden sm:block">
              <button
                type="button"
                aria-label="Notifications"
                aria-expanded={openMenu === 'notifications'}
                onClick={() => toggleMenu('notifications')}
                className="relative flex h-11 w-11 items-center justify-center rounded-full bg-panel text-inkSoft transition-colors duration-150 ease-soft hover:bg-line">

                <BellIcon className="h-[18px] w-[18px]" strokeWidth={1.9} />
                {unreadCount > 0 ?
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-down ring-2 ring-panel" /> :
                null}
              </button>

              {openMenu === 'notifications' ?
              <div className="absolute right-0 top-14 z-40 w-80 rounded-2xl bg-white p-2 shadow-[0_12px_32px_rgba(0,0,0,0.12)] ring-1 ring-line">
                  <div className="flex items-center justify-between px-2 py-2">
                    <p className="text-[15px] font-semibold">Notifications</p>
                    <button
                    type="button"
                    aria-label="Close"
                    onClick={closeMenu}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-muted hover:bg-panel">

                      <XIcon className="h-4 w-4" strokeWidth={2} />
                    </button>
                  </div>
                  <ul className="max-h-72 space-y-1 overflow-y-auto">
                    {notifications.map((item) =>
                  <li key={item.id} className="rounded-xl px-3 py-2.5 hover:bg-panelSoft">
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="mt-0.5 text-xs text-muted">{item.detail}</p>
                        <p className="mt-1 text-xs text-muted">{item.time}</p>
                      </li>
                  )}
                  </ul>
                </div> :
              null}
            </div>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
              [
              'relative z-40 ml-1 flex h-11 w-11 overflow-hidden rounded-full ring-1 transition-shadow duration-150 ease-soft',
              isActive ? 'ring-2 ring-ink' : 'ring-line'].
              join(' ')
              }
              aria-label={`Account: ${currentUser.name}`}>

              <img
                src={currentUser.avatar}
                alt=""
                className="h-full w-full object-cover" />

            </NavLink>

            {openMenu ?
            <button
              type="button"
              aria-hidden="true"
              tabIndex={-1}
              onClick={closeMenu}
              className="fixed inset-0 z-30 cursor-default" /> :

            null}
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1600px] px-6 pb-32 pt-2 lg:px-10">
        <Outlet />
      </main>

      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-6 z-40 flex justify-center px-4">

        <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-white/40 bg-white/40 px-2 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.14)] backdrop-blur-xl">
          {navItems.map((item) => {
            const active =
            item.to === '/' ? pathname === '/' : pathname.startsWith(item.to);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={[
                'whitespace-nowrap rounded-full px-4 py-2.5 text-[15px] transition-colors duration-150 ease-soft',
                active ?
                'bg-ink font-semibold text-white' :
                'text-inkSoft hover:bg-white/60 hover:text-ink'].
                join(' ')}>

                {item.label}
              </NavLink>);

          })}
        </div>
      </nav>
    </div>);

}
