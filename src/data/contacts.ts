export type Contact = {
  id: string;
  name: string;
  avatar: string;
  stage: 'Lead' | 'Pre-Approved' | 'Application' | 'Closing';
  email: string;
  phone: string;
  location: string;
  loanType: 'Conventional' | 'FHA' | 'VA';
  amount: number;
  score: number;
  lastTouch: string;
  owner: string;
  nextStep: string;
};

const avatars = {
  carla: "/5d87de1a-782b-48ae-87e7-d36d713300c4.jpg",

  leo: "/c1df1f22-0f5a-4f96-8193-74da43c80d63.jpg",
  maya: "/aa29723a-3d7f-4197-b62c-c61897d9a59f.jpg",
  dev: "/acf287e1-466b-4cb3-9f01-c6573edbeb4b.jpg"
};

export const contacts: Contact[] = [
{
  id: 'c1',
  name: 'Carla Benson',
  avatar: avatars.carla,
  stage: 'Pre-Approved',
  email: 'carla.benson@mail.com',
  phone: '(512) 448-2210',
  location: 'Austin, TX',
  loanType: 'Conventional',
  amount: 412000,
  score: 92,
  lastTouch: '12 min ago',
  owner: 'Marcus Hale',
  nextStep: 'Send updated rate sheet'
},
{
  id: 'c2',
  name: 'Leo Summers',
  avatar: avatars.leo,
  stage: 'Application',
  email: 'leo.summers@mail.com',
  phone: '(214) 776-9081',
  location: 'Dallas, TX',
  loanType: 'FHA',
  amount: 288500,
  score: 78,
  lastTouch: '2 hours ago',
  owner: 'Marcus Hale',
  nextStep: 'Collect W-2s for 2023'
},
{
  id: 'c3',
  name: 'Maya Iwasaki',
  avatar: avatars.maya,
  stage: 'Closing',
  email: 'maya.iwasaki@mail.com',
  phone: '(415) 220-3311',
  location: 'San Jose, CA',
  loanType: 'Conventional',
  amount: 985000,
  score: 96,
  lastTouch: 'Yesterday',
  owner: 'Priya Raman',
  nextStep: 'Confirm closing disclosure'
},
{
  id: 'c4',
  name: 'Dev Anand',
  avatar: avatars.dev,
  stage: 'Lead',
  email: 'dev.anand@mail.com',
  phone: '(602) 559-1174',
  location: 'Phoenix, AZ',
  loanType: 'VA',
  amount: 340000,
  score: 61,
  lastTouch: '3 days ago',
  owner: 'Marcus Hale',
  nextStep: 'First discovery call'
},
{
  id: 'c5',
  name: 'Nora Whitfield',
  avatar: avatars.carla,
  stage: 'Lead',
  email: 'nora.whitfield@mail.com',
  phone: '(305) 881-4402',
  location: 'Miami, FL',
  loanType: 'Conventional',
  amount: 525000,
  score: 54,
  lastTouch: '5 days ago',
  owner: 'Marcus Hale',
  nextStep: 'Re-engage with market update'
},
{
  id: 'c6',
  name: 'Theo Marchetti',
  avatar: avatars.dev,
  stage: 'Application',
  email: 'theo.m@mail.com',
  phone: '(718) 330-0192',
  location: 'Brooklyn, NY',
  loanType: 'FHA',
  amount: 610000,
  score: 83,
  lastTouch: '4 hours ago',
  owner: 'Priya Raman',
  nextStep: 'Order appraisal'
}];


export const contactStages = [
'All',
'Lead',
'Pre-Approved',
'Application',
'Closing'] as
const;
export type ContactStageFilter = (typeof contactStages)[number];