export type Message = {
  id: string;
  from: 'them' | 'me';
  body: string;
  time: string;
};

export type Thread = {
  id: string;
  name: string;
  avatar: string;
  channel: 'Email' | 'SMS' | 'Call';
  preview: string;
  time: string;
  unread: boolean;
  tag: string;
  messages: Message[];
};

const avatars = {
  carla: "/5d87de1a-782b-48ae-87e7-d36d713300c4.jpg",

  leo: "/c1df1f22-0f5a-4f96-8193-74da43c80d63.jpg",
  maya: "/aa29723a-3d7f-4197-b62c-c61897d9a59f.jpg",
  dev: "/acf287e1-466b-4cb3-9f01-c6573edbeb4b.jpg"
};

export const threads: Thread[] = [
{
  id: 't1',
  name: 'Carla Benson',
  avatar: avatars.carla,
  channel: 'SMS',
  preview: 'Does the 5.99 still hold if we close in March?',
  time: '12:41 PM',
  unread: true,
  tag: 'Pre-Approved',
  messages: [
  {
    id: 'm1',
    from: 'them',
    body: 'Hi Marcus — we found a place in Round Rock we love.',
    time: '12:32 PM'
  },
  {
    id: 'm2',
    from: 'me',
    body: 'Congrats! Send me the address and list price and I will re-run the numbers today.',
    time: '12:35 PM'
  },
  {
    id: 'm3',
    from: 'them',
    body: 'Does the 5.99 still hold if we close in March?',
    time: '12:41 PM'
  }]

},
{
  id: 't2',
  name: 'Leo Summers',
  avatar: avatars.leo,
  channel: 'Email',
  preview: 'Uploaded the last two pay stubs to the portal.',
  time: '11:20 AM',
  unread: true,
  tag: 'Application',
  messages: [
  {
    id: 'm1',
    from: 'them',
    body: 'Uploaded the last two pay stubs to the portal. Anything else you need from me?',
    time: '11:20 AM'
  }]

},
{
  id: 't3',
  name: 'Maya Iwasaki',
  avatar: avatars.maya,
  channel: 'Call',
  preview: 'Missed call — 4 min voicemail transcript ready',
  time: '9:58 AM',
  unread: false,
  tag: 'Closing',
  messages: [
  {
    id: 'm1',
    from: 'them',
    body: 'Voicemail: Just confirming the wire instructions came from your office. Call me back when you can.',
    time: '9:58 AM'
  }]

},
{
  id: 't4',
  name: 'Dev Anand',
  avatar: avatars.dev,
  channel: 'Email',
  preview: 'Thanks for the VA overview — reading through it.',
  time: 'Yesterday',
  unread: false,
  tag: 'Lead',
  messages: [
  {
    id: 'm1',
    from: 'me',
    body: 'Sending over a short VA loan overview — no entitlement paperwork needed yet.',
    time: 'Yesterday'
  },
  {
    id: 'm2',
    from: 'them',
    body: 'Thanks for the VA overview — reading through it.',
    time: 'Yesterday'
  }]

}];