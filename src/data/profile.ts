export type ProfileDetails = {
  name: string;
  role: string;
  avatar: string;
  email: string;
  phone: string;
  location: string;
  branch: string;
  manager: string;
  joined: string;
  nmlsId: string;
  bio: string;
};

export const profile: ProfileDetails = {
  name: 'Marcus Hale',
  role: 'Senior Loan Officer',
  avatar: '/f8718fec-8e12-470f-9911-40a6cb8f6a7b.jpg',
  email: 'marcus.hale@vantra.com',
  phone: '(555) 214-7890',
  location: 'Denver, CO',
  branch: 'Denver Metro Branch',
  manager: 'Elena Ruiz',
  joined: 'March 2019',
  nmlsId: 'NMLS #482913',
  bio: 'Helping first-time buyers and growing families find the right loan since 2014. Focused on FHA and jumbo products.'
};

export type ProfileStat = {
  id: string;
  label: string;
  value: string;
  hint?: string;
};

export const profileStats: ProfileStat[] = [
{ id: 's1', label: 'Loans closed YTD', value: '38' },
{ id: 's2', label: 'Closed volume YTD', value: '$17.25M' },
{ id: 's3', label: 'Client rating', value: '4.9/5' },
{ id: 's4', label: 'Rank this month', value: '#4', hint: 'of 312 officers' }];


export type Achievement = {
  id: string;
  label: string;
  description: string;
  date: string;
};

export const achievements: Achievement[] = [
{
  id: 'a1',
  label: 'Top 5 Closer',
  description: 'Ranked top 5 loan officers company-wide',
  date: 'Jan 2025'
},
{
  id: 'a2',
  label: '$15M Club',
  description: 'Crossed $15M in annual closed volume',
  date: 'Nov 2024'
},
{
  id: 'a3',
  label: '5-Star Streak',
  description: '20 consecutive 5-star client reviews',
  date: 'Sep 2024'
},
{
  id: 'a4',
  label: 'Fast Closer',
  description: 'Average close time under 21 days',
  date: 'Jun 2024'
}];


export type ActivityItem = {
  id: string;
  label: string;
  time: string;
};

export const recentActivity: ActivityItem[] = [
{ id: 'r1', label: 'Closed loan L-2791 for Hannah Cole', time: '2h ago' },
{ id: 'r2', label: 'Logged a call with Owen Pratt', time: 'Yesterday' },
{ id: 'r3', label: 'Sent pre-approval to Nora Whitfield', time: '2 days ago' },
{ id: 'r4', label: 'Updated pipeline stage for Maya Iwasaki', time: '3 days ago' }];


export type NotificationSetting = {
  id: string;
  label: string;
  enabled: boolean;
};

export const notificationSettings: NotificationSetting[] = [
{ id: 'n1', label: 'Email me new lead alerts', enabled: true },
{ id: 'n2', label: 'SMS for rate alerts', enabled: true },
{ id: 'n3', label: 'Weekly performance digest', enabled: false }];
