import React, { useMemo, useState } from 'react';
import {
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  PlusIcon,
  SearchIcon } from
'lucide-react';
import { Panel } from '../components/ui/Panel';
import { Segmented } from '../components/ui/Segmented';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../components/ui/Toast';
import {
  contacts as initialContacts,
  contactStages,
  ContactStageFilter,
  Contact } from
'../data/contacts';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
});

const stageTone: Record<string, string> = {
  Lead: 'bg-white text-muted',
  'Pre-Approved': 'bg-accent text-ink',
  Application: 'bg-ink text-white',
  Closing: 'bg-up/15 text-up'
};

export function Contacts() {
  const [contacts, setContacts] = useState(initialContacts);
  const [stage, setStage] = useState<ContactStageFilter>('All');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(initialContacts[0].id);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const showToast = useToast();

  const filtered = useMemo(
    () =>
    contacts.filter((contact) => {
      const matchesStage = stage === 'All' || contact.stage === stage;
      const matchesQuery = contact.name.
      toLowerCase().
      includes(query.trim().toLowerCase());
      return matchesStage && matchesQuery;
    }),
    [stage, query, contacts]
  );

  const selected =
  filtered.find((contact) => contact.id === selectedId) ?? filtered[0];

  const createContact = () => {
    if (!name.trim()) return;
    const contact: Contact = {
      id: `c-${Date.now()}`,
      name: name.trim(),
      avatar: '/acf287e1-466b-4cb3-9f01-c6573edbeb4b.jpg',
      stage: 'Lead',
      email: email.trim() || 'unknown@mail.com',
      phone: phone.trim() || '—',
      location: 'Unknown',
      loanType: 'Conventional',
      amount: 0,
      score: 50,
      lastTouch: 'Just now',
      owner: 'Marcus Hale',
      nextStep: 'First discovery call'
    };
    setContacts((current) => [contact, ...current]);
    setSelectedId(contact.id);
    showToast(`Added ${contact.name} as a new lead`);
    setName('');
    setEmail('');
    setPhone('');
    setModalOpen(false);
  };

  const logActivity = () => {
    if (!selected) return;
    setContacts((current) =>
    current.map((contact) =>
    contact.id === selected.id ?
    { ...contact, lastTouch: 'Just now' } :
    contact
    )
    );
    showToast(`Activity logged for ${selected.name}`);
  };

  return (
    <div className="pt-6">
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="text-[40px] font-semibold leading-none tracking-tight">
            Contacts
          </h1>
          <p className="mt-3 text-[15px] text-muted">
            {contacts.length} people · 4 need a follow-up this week
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-panel px-4 py-2.5">
            <SearchIcon className="h-4 w-4 text-muted" strokeWidth={2} />
            <label className="sr-only" htmlFor="contact-search">
              Search contacts
            </label>
            <input
              id="contact-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name"
              className="w-44 bg-transparent text-sm outline-none placeholder:text-muted" />
            
          </div>
          <Segmented
            label="Stage filter"
            options={contactStages}
            value={stage}
            onChange={setStage}
            size="sm" />
          
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 ease-soft hover:bg-inkSoft">

            <PlusIcon className="h-4 w-4" strokeWidth={2.2} />
            New contact
          </button>
        </div>
      </header>

      {modalOpen ?
      <Modal title="New contact" onClose={() => setModalOpen(false)}>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium" htmlFor="contact-name">
                Name
              </label>
              <input
              id="contact-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Jordan Lee"
              className="mt-1.5 w-full rounded-xl bg-white px-4 py-2.5 text-sm outline-none ring-1 ring-line focus:ring-ink" />

            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="contact-email">
                Email
              </label>
              <input
              id="contact-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="jordan@mail.com"
              className="mt-1.5 w-full rounded-xl bg-white px-4 py-2.5 text-sm outline-none ring-1 ring-line focus:ring-ink" />

            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="contact-phone">
                Phone
              </label>
              <input
              id="contact-phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="(555) 000-0000"
              className="mt-1.5 w-full rounded-xl bg-white px-4 py-2.5 text-sm outline-none ring-1 ring-line focus:ring-ink" />

            </div>
            <button
            type="button"
            onClick={createContact}
            className="w-full rounded-full bg-ink py-3 text-sm font-semibold text-white transition-colors duration-150 ease-soft hover:bg-inkSoft">

              Add contact
            </button>
          </div>
        </Modal> :
      null}

      <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)]">
        <section aria-label="Contact list">
          {filtered.length === 0 ?
          <Panel className="flex h-64 flex-col items-center justify-center text-center">
              <p className="text-[17px] font-semibold">No contacts match</p>
              <p className="mt-1 text-sm text-muted">
                Try a different stage or clear the search.
              </p>
            </Panel> :

          <div className="overflow-hidden rounded-[26px] bg-panel">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs uppercase tracking-wide text-muted">
                    <th scope="col" className="px-6 py-4 font-medium">Name</th>
                    <th scope="col" className="px-3 py-4 font-medium">Stage</th>
                    <th scope="col" className="px-3 py-4 font-medium">Product</th>
                    <th scope="col" className="px-3 py-4 text-right font-medium">Amount</th>
                    <th scope="col" className="px-3 py-4 text-right font-medium">Score</th>
                    <th scope="col" className="px-6 py-4 text-right font-medium">Last touch</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((contact) => {
                  const active = selected?.id === contact.id;
                  return (
                    <tr
                      key={contact.id}
                      onClick={() => setSelectedId(contact.id)}
                      className={[
                      'cursor-pointer border-t border-line transition-colors duration-150 ease-soft',
                      active ? 'bg-white' : 'hover:bg-panelSoft'].
                      join(' ')}>
                      
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                            src={contact.avatar}
                            alt=""
                            className="h-9 w-9 rounded-full object-cover" />
                          
                            <div>
                              <p className="text-[15px] font-semibold">{contact.name}</p>
                              <p className="text-xs text-muted">{contact.location}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-4">
                          <span
                          className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${stageTone[contact.stage]}`}>
                          
                            {contact.stage}
                          </span>
                        </td>
                        <td className="px-3 py-4 text-sm text-inkSoft">{contact.loanType}</td>
                        <td className="px-3 py-4 text-right text-sm font-medium tabular">
                          {currency.format(contact.amount)}
                        </td>
                        <td className="px-3 py-4 text-right">
                          <span className="text-sm font-semibold tabular">{contact.score}</span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-muted">
                          {contact.lastTouch}
                        </td>
                      </tr>);

                })}
                </tbody>
              </table>
            </div>
          }
        </section>

        {selected ?
        <Panel as="aside" className="h-fit p-7">
            <div className="flex items-center gap-4">
              <img
              src={selected.avatar}
              alt=""
              className="h-16 w-16 rounded-full object-cover" />
            
              <div>
                <h2 className="text-[22px] font-semibold tracking-tight">
                  {selected.name}
                </h2>
                <span
                className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium ${stageTone[selected.stage]}`}>
                
                  {selected.stage}
                </span>
              </div>
            </div>

            <dl className="mt-7 space-y-4 text-[15px]">
              <div className="flex items-center gap-3">
                <MailIcon className="h-4 w-4 text-muted" strokeWidth={1.9} />
                <dt className="sr-only">Email</dt>
                <dd className="truncate">{selected.email}</dd>
              </div>
              <div className="flex items-center gap-3">
                <PhoneIcon className="h-4 w-4 text-muted" strokeWidth={1.9} />
                <dt className="sr-only">Phone</dt>
                <dd className="tabular">{selected.phone}</dd>
              </div>
              <div className="flex items-center gap-3">
                <MapPinIcon className="h-4 w-4 text-muted" strokeWidth={1.9} />
                <dt className="sr-only">Location</dt>
                <dd>{selected.location}</dd>
              </div>
            </dl>

            <div className="mt-7 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white p-4">
                <p className="text-xs text-muted">Loan amount</p>
                <p className="mt-1 text-[20px] font-semibold tabular">
                  {currency.format(selected.amount)}
                </p>
              </div>
              <div className="rounded-2xl bg-white p-4">
                <p className="text-xs text-muted">Fit score</p>
                <p className="mt-1 text-[20px] font-semibold tabular">{selected.score}</p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-accentSoft p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-inkSoft">
                Next step
              </p>
              <p className="mt-1 text-[15px] font-medium">{selected.nextStep}</p>
            </div>

            <button
            type="button"
            onClick={logActivity}
            className="mt-6 w-full rounded-full bg-ink py-3 text-sm font-semibold text-white transition-colors duration-150 ease-soft hover:bg-inkSoft">

              Log an activity
            </button>
          </Panel> :
        null}
      </div>
    </div>);

}