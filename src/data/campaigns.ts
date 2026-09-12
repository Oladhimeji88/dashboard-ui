export type Campaign = {
  id: string;
  name: string;
  channel: 'Email' | 'SMS' | 'Social';
  status: 'Live' | 'Scheduled' | 'Draft';
  audience: string;
  sent: number;
  openRate: number;
  replyRate: number;
  leads: number;
  updated: string;
};

export const campaigns: Campaign[] = [
{
  id: 'cm1',
  name: 'Rate Drop Alert — Conventional',
  channel: 'Email',
  status: 'Live',
  audience: 'Past clients · 1,240',
  sent: 1240,
  openRate: 48,
  replyRate: 9,
  leads: 31,
  updated: '2 hours ago'
},
{
  id: 'cm2',
  name: 'First-Time Buyer Workshop',
  channel: 'Social',
  status: 'Live',
  audience: 'Austin metro · 8,900',
  sent: 8900,
  openRate: 12,
  replyRate: 3,
  leads: 44,
  updated: 'Yesterday'
},
{
  id: 'cm3',
  name: 'Pre-Approval Reminder',
  channel: 'SMS',
  status: 'Scheduled',
  audience: 'Stale leads · 318',
  sent: 0,
  openRate: 0,
  replyRate: 0,
  leads: 0,
  updated: 'Sends Mon 9:00 AM'
},
{
  id: 'cm4',
  name: 'VA Loan Explainer Series',
  channel: 'Email',
  status: 'Draft',
  audience: 'Veteran list · 560',
  sent: 0,
  openRate: 0,
  replyRate: 0,
  leads: 0,
  updated: '3 days ago'
}];


export const marketingTotals = {
  leadsThisMonth: 128,
  leadsDelta: 22,
  costPerLead: 41,
  costDelta: 6,
  bestChannel: 'Email',
  funnel: [
  { label: 'Reached', value: 10460 },
  { label: 'Engaged', value: 3120 },
  { label: 'Leads', value: 128 },
  { label: 'Applications', value: 34 }]

};