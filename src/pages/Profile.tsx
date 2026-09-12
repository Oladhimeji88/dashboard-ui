import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AwardIcon,
  CameraIcon,
  CheckIcon,
  CopyIcon,
  LogOutIcon,
  MailIcon,
  MapPinIcon,
  PencilIcon,
  PhoneIcon,
  ShieldCheckIcon,
  XIcon } from
'lucide-react';
import { Panel, SectionHeader } from '../components/ui/Panel';
import { useAuth } from '../context/AuthContext';
import {
  achievements,
  notificationSettings as initialNotificationSettings,
  profile as initialProfile,
  profileStats,
  recentActivity } from
'../data/profile';

function Toggle({
  enabled,
  onToggle,
  label



}: {enabled: boolean;onToggle: () => void;label: string;}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      onClick={onToggle}
      className={[
      'relative h-7 w-12 shrink-0 rounded-full transition-colors duration-150 ease-soft',
      enabled ? 'bg-ink' : 'bg-line'].
      join(' ')}>

      <span
        className={[
        'absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-150 ease-soft',
        enabled ? 'translate-x-6' : 'translate-x-1'].
        join(' ')} />

    </button>);

}

export function Profile() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [profile, setProfile] = useState(initialProfile);
  const [draft, setDraft] = useState(initialProfile);
  const [editing, setEditing] = useState(false);
  const [notifications, setNotifications] = useState(initialNotificationSettings);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const startEditing = () => {
    setDraft(profile);
    setEditing(true);
  };

  const saveEditing = () => {
    setProfile(draft);
    setEditing(false);
  };

  const cancelEditing = () => {
    setDraft(profile);
    setEditing(false);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setProfile((current) => ({ ...current, avatar: url }));
    setDraft((current) => ({ ...current, avatar: url }));
  };

  const toggleNotification = (id: string) => {
    setNotifications((current) =>
    current.map((item) =>
    item.id === id ? { ...item, enabled: !item.enabled } : item
    )
    );
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="pt-6">
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="text-[40px] font-semibold leading-none tracking-tight">
            Profile
          </h1>
          <p className="mt-3 text-[15px] text-muted">
            Manage your account, performance, and preferences
          </p>
        </div>
        {editing ?
        <div className="flex items-center gap-2">
            <button
            type="button"
            onClick={cancelEditing}
            className="flex items-center gap-2 rounded-full bg-panel px-5 py-2.5 text-sm font-medium text-inkSoft transition-colors duration-150 ease-soft hover:bg-line">

              <XIcon className="h-4 w-4" strokeWidth={2} />
              Cancel
            </button>
            <button
            type="button"
            onClick={saveEditing}
            className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 ease-soft hover:bg-inkSoft">

              <CheckIcon className="h-4 w-4" strokeWidth={2.2} />
              Save changes
            </button>
          </div> :

        <button
          type="button"
          onClick={startEditing}
          className="flex items-center gap-2 rounded-full bg-panel px-5 py-2.5 text-sm font-medium text-inkSoft transition-colors duration-150 ease-soft hover:bg-line">

            <PencilIcon className="h-4 w-4" strokeWidth={2} />
            Edit profile
          </button>
        }
      </header>

      <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
        <Panel className="h-fit p-7">
          <div className="flex flex-col items-center text-center">
            <div className="group relative">
              <img
                src={profile.avatar}
                alt=""
                className="h-24 w-24 rounded-full object-cover ring-1 ring-line" />

              <button
                type="button"
                onClick={handleAvatarClick}
                aria-label="Change profile photo"
                className="absolute inset-0 flex items-center justify-center rounded-full bg-ink/0 text-white opacity-0 transition-all duration-150 ease-soft group-hover:bg-ink/50 group-hover:opacity-100">

                <CameraIcon className="h-5 w-5" strokeWidth={2} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden" />

            </div>

            {editing ?
            <input
              value={draft.name}
              onChange={(event) =>
              setDraft((current) => ({ ...current, name: event.target.value }))
              }
              className="mt-4 w-full rounded-xl bg-white px-3 py-2 text-center text-[22px] font-semibold tracking-tight outline-none ring-1 ring-line focus:ring-ink" /> :


            <h2 className="mt-4 text-[22px] font-semibold tracking-tight">
                {profile.name}
              </h2>
            }

            {editing ?
            <input
              value={draft.role}
              onChange={(event) =>
              setDraft((current) => ({ ...current, role: event.target.value }))
              }
              className="mt-2 w-full rounded-xl bg-white px-3 py-1.5 text-center text-sm outline-none ring-1 ring-line focus:ring-ink" /> :


            <span className="mt-1.5 inline-block rounded-full bg-accentSoft px-3 py-1 text-xs font-medium text-inkSoft">
                {profile.role}
              </span>
            }

            <div className="mt-3 flex items-center gap-1.5 text-xs text-muted">
              <ShieldCheckIcon className="h-3.5 w-3.5" strokeWidth={2} />
              {profile.nmlsId}
            </div>
          </div>

          {editing ?
          <textarea
            value={draft.bio}
            onChange={(event) =>
            setDraft((current) => ({ ...current, bio: event.target.value }))
            }
            rows={3}
            className="mt-6 w-full resize-none rounded-2xl bg-white p-4 text-sm text-inkSoft outline-none ring-1 ring-line focus:ring-ink" /> :


          <p className="mt-6 text-sm leading-relaxed text-inkSoft">
              {profile.bio}
            </p>
          }

          <dl className="mt-7 space-y-4 border-t border-line pt-6 text-[15px]">
            <div className="flex items-center gap-3">
              <MailIcon className="h-4 w-4 shrink-0 text-muted" strokeWidth={1.9} />
              <dt className="sr-only">Email</dt>
              {editing ?
              <input
                value={draft.email}
                onChange={(event) =>
                setDraft((current) => ({ ...current, email: event.target.value }))
                }
                className="w-full rounded-xl bg-white px-3 py-1.5 text-sm outline-none ring-1 ring-line focus:ring-ink" /> :


              <dd className="flex flex-1 items-center justify-between gap-2 truncate">
                  {profile.email}
                  <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-panel text-inkSoft transition-colors duration-150 ease-soft hover:bg-line">

                    {copied ?
                  <CheckIcon className="h-3.5 w-3.5 text-up" strokeWidth={2.2} /> :

                  <CopyIcon className="h-3.5 w-3.5" strokeWidth={1.9} />
                  }
                  </button>
                </dd>
              }
            </div>
            <div className="flex items-center gap-3">
              <PhoneIcon className="h-4 w-4 shrink-0 text-muted" strokeWidth={1.9} />
              <dt className="sr-only">Phone</dt>
              {editing ?
              <input
                value={draft.phone}
                onChange={(event) =>
                setDraft((current) => ({ ...current, phone: event.target.value }))
                }
                className="w-full rounded-xl bg-white px-3 py-1.5 text-sm tabular outline-none ring-1 ring-line focus:ring-ink" /> :

              <dd className="tabular">{profile.phone}</dd>
              }
            </div>
            <div className="flex items-center gap-3">
              <MapPinIcon className="h-4 w-4 shrink-0 text-muted" strokeWidth={1.9} />
              <dt className="sr-only">Location</dt>
              {editing ?
              <input
                value={draft.location}
                onChange={(event) =>
                setDraft((current) => ({ ...current, location: event.target.value }))
                }
                className="w-full rounded-xl bg-white px-3 py-1.5 text-sm outline-none ring-1 ring-line focus:ring-ink" /> :

              <dd>{profile.location}</dd>
              }
            </div>
          </dl>

          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-line pt-6 text-sm">
            <div>
              <p className="text-xs text-muted">Branch</p>
              <p className="mt-1 font-medium">{profile.branch}</p>
            </div>
            <div>
              <p className="text-xs text-muted">Manager</p>
              <p className="mt-1 font-medium">{profile.manager}</p>
            </div>
            <div>
              <p className="text-xs text-muted">Joined</p>
              <p className="mt-1 font-medium">{profile.joined}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-panel py-3 text-sm font-semibold text-inkSoft transition-colors duration-150 ease-soft hover:bg-line">

            <LogOutIcon className="h-4 w-4" strokeWidth={2} />
            Log out
          </button>
        </Panel>

        <div className="grid gap-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {profileStats.map((stat) =>
            <Panel key={stat.id} className="p-6">
                <p className="text-sm text-muted">{stat.label}</p>
                <p className="mt-3 text-[28px] font-semibold leading-none tracking-tight tabular">
                  {stat.value}
                </p>
                {stat.hint ?
              <p className="mt-2 text-xs text-muted">{stat.hint}</p> :
              null}
              </Panel>
            )}
          </div>

          <Panel className="p-6">
            <SectionHeader
              title="Achievements"
              subtitle="Milestones earned this year" />

            <div className="grid gap-3 sm:grid-cols-2">
              {achievements.map((achievement) =>
              <div
                key={achievement.id}
                className="flex items-start gap-3 rounded-2xl bg-white p-4">

                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accentSoft text-inkSoft">
                    <AwardIcon className="h-[18px] w-[18px]" strokeWidth={1.9} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold">{achievement.label}</p>
                    <p className="mt-0.5 text-xs text-muted">
                      {achievement.description}
                    </p>
                    <p className="mt-1.5 text-xs text-muted">{achievement.date}</p>
                  </div>
                </div>
              )}
            </div>
          </Panel>

          <div className="grid gap-6 lg:grid-cols-2">
            <Panel className="p-6">
              <SectionHeader title="Recent activity" />
              <ul className="space-y-4">
                {recentActivity.map((item) =>
                <li key={item.id} className="flex items-start justify-between gap-4">
                    <p className="text-[15px] text-inkSoft">{item.label}</p>
                    <p className="shrink-0 text-xs text-muted">{item.time}</p>
                  </li>
                )}
              </ul>
            </Panel>

            <Panel className="p-6">
              <SectionHeader title="Notification preferences" />
              <ul className="space-y-4">
                {notifications.map((setting) =>
                <li key={setting.id} className="flex items-center justify-between gap-4">
                    <p className="text-[15px]">{setting.label}</p>
                    <Toggle
                    enabled={setting.enabled}
                    onToggle={() => toggleNotification(setting.id)}
                    label={setting.label} />

                  </li>
                )}
              </ul>
            </Panel>
          </div>
        </div>
      </div>
    </div>);

}
