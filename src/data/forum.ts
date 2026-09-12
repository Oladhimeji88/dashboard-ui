export type ForumPost = {
  id: string;
  name: string;
  avatar: string;
  time: string;
  body: string;
  likes: number;
  replies: number;
};

export const forumPosts: ForumPost[] = [
{
  id: 'p1',
  name: 'Carla Benson',
  avatar: "/5d87de1a-782b-48ae-87e7-d36d713300c4.jpg",

  time: '12:13 PM',
  body: "I'm moving to Texas this summer. Any ideas what kind of home I can get around $400K?",
  likes: 1,
  replies: 2
},
{
  id: 'p2',
  name: 'Leo Summers',
  avatar: "/c1df1f22-0f5a-4f96-8193-74da43c80d63.jpg",

  time: '12:13 PM',
  body: "That's a solid budget! You could go for a modern ranch-style house or a cozy home near Austin.",
  likes: 4,
  replies: 1
},
{
  id: 'p3',
  name: 'Maya Iwasaki',
  avatar: "/aa29723a-3d7f-4197-b62c-c61897d9a59f.jpg",

  time: '11:48 AM',
  body: 'Reminder: FHA county limits update on the 1st. Worth re-running any pre-approvals near the cap.',
  likes: 12,
  replies: 5
}];