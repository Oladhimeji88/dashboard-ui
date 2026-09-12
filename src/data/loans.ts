export type LoanStage =
'Application' |
'Processing' |
'Underwriting' |
'Clear to Close';

export type Loan = {
  id: string;
  borrower: string;
  avatar: string;
  stage: LoanStage;
  amount: number;
  rate: string;
  product: 'Conventional' | 'FHA' | 'VA';
  ltv: number;
  closeDate: string;
  daysInStage: number;
  blocked?: string;
};

const avatars = {
  carla: "/5d87de1a-782b-48ae-87e7-d36d713300c4.jpg",

  leo: "/c1df1f22-0f5a-4f96-8193-74da43c80d63.jpg",
  maya: "/aa29723a-3d7f-4197-b62c-c61897d9a59f.jpg",
  dev: "/acf287e1-466b-4cb3-9f01-c6573edbeb4b.jpg"
};

export const loanStages: LoanStage[] = [
'Application',
'Processing',
'Underwriting',
'Clear to Close'];


export const loans: Loan[] = [
{
  id: 'L-2841',
  borrower: 'Carla Benson',
  avatar: avatars.carla,
  stage: 'Application',
  amount: 412000,
  rate: '5.99',
  product: 'Conventional',
  ltv: 80,
  closeDate: 'Mar 14',
  daysInStage: 2
},
{
  id: 'L-2839',
  borrower: 'Theo Marchetti',
  avatar: avatars.dev,
  stage: 'Application',
  amount: 610000,
  rate: '6.12',
  product: 'FHA',
  ltv: 92,
  closeDate: 'Mar 28',
  daysInStage: 5,
  blocked: 'Missing gift letter'
},
{
  id: 'L-2830',
  borrower: 'Leo Summers',
  avatar: avatars.leo,
  stage: 'Processing',
  amount: 288500,
  rate: '4.75',
  product: 'FHA',
  ltv: 96,
  closeDate: 'Feb 27',
  daysInStage: 8
},
{
  id: 'L-2822',
  borrower: 'Dev Anand',
  avatar: avatars.dev,
  stage: 'Processing',
  amount: 340000,
  rate: '4.33',
  product: 'VA',
  ltv: 100,
  closeDate: 'Mar 06',
  daysInStage: 3
},
{
  id: 'L-2814',
  borrower: 'Nora Whitfield',
  avatar: avatars.carla,
  stage: 'Underwriting',
  amount: 525000,
  rate: '5.88',
  product: 'Conventional',
  ltv: 75,
  closeDate: 'Feb 21',
  daysInStage: 11,
  blocked: 'Appraisal came in low'
},
{
  id: 'L-2808',
  borrower: 'Maya Iwasaki',
  avatar: avatars.maya,
  stage: 'Clear to Close',
  amount: 985000,
  rate: '5.62',
  product: 'Conventional',
  ltv: 70,
  closeDate: 'Feb 18',
  daysInStage: 1
}];


export const loanTotals = {
  volume: 3160500,
  units: 6,
  avgDaysToClose: 24,
  pullThrough: 87
};