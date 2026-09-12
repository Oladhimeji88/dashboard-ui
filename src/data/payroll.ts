export type Commission = {
  id: string;
  loanId: string;
  borrower: string;
  closedOn: string;
  volume: number;
  bps: number;
  payout: number;
  status: 'Paid' | 'Pending' | 'Processing';
};

export const commissions: Commission[] = [
{
  id: 'pc1',
  loanId: 'L-2808',
  borrower: 'Maya Iwasaki',
  closedOn: 'Feb 18',
  volume: 985000,
  bps: 85,
  payout: 8372,
  status: 'Processing'
},
{
  id: 'pc2',
  loanId: 'L-2791',
  borrower: 'Hannah Cole',
  closedOn: 'Feb 04',
  volume: 445000,
  bps: 90,
  payout: 4005,
  status: 'Paid'
},
{
  id: 'pc3',
  loanId: 'L-2784',
  borrower: 'Owen Pratt',
  closedOn: 'Jan 29',
  volume: 312000,
  bps: 90,
  payout: 2808,
  status: 'Paid'
},
{
  id: 'pc4',
  loanId: 'L-2814',
  borrower: 'Nora Whitfield',
  closedOn: 'Est. Feb 21',
  volume: 525000,
  bps: 85,
  payout: 4462,
  status: 'Pending'
}];


export const payrollSummary = {
  nextPayout: 12377,
  nextPayoutDate: 'Feb 28, 2025',
  ytdEarnings: 148920,
  ytdDelta: 18,
  closedVolumeYtd: 17250000,
  tierProgress: 68,
  tierLabel: 'Tier 3 · 90 bps',
  nextTierAt: 20000000
};

export const monthlyEarnings = [
{ month: 'Sep', value: 14200 },
{ month: 'Oct', value: 11800 },
{ month: 'Nov', value: 16400 },
{ month: 'Dec', value: 21050 },
{ month: 'Jan', value: 18900 },
{ month: 'Feb', value: 12377 }];