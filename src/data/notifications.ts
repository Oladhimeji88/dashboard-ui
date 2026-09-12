export type Notification = {
  id: string;
  title: string;
  detail: string;
  time: string;
  unread: boolean;
};

export const notifications: Notification[] = [
{
  id: 'not1',
  title: 'Rate alert: Conventional up 0.125%',
  detail: '30-yr conventional moved to 5.99%',
  time: '12m ago',
  unread: true
},
{
  id: 'not2',
  title: 'Hannah Cole signed disclosures',
  detail: 'Loan L-2791 is ready for underwriting',
  time: '1h ago',
  unread: true
},
{
  id: 'not3',
  title: 'Payroll processed',
  detail: 'Your Feb 14 commission payout was sent',
  time: 'Yesterday',
  unread: false
}];
