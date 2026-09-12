export type PipelineCard = {
  id: string;
  title: string;
  caption: string;
  value: number;
  delta: number;
  deltaDirection: 'up' | 'down';
  share: string;
  unit: string;
  matrix: {total: number;filled: number;highlighted: number;};
};

export const pipelineCards: PipelineCard[] = [
{
  id: 'applications',
  title: 'Applications',
  caption: 'This month',
  value: 100,
  delta: 42,
  deltaDirection: 'up',
  share: '84%',
  unit: 'Loan Units',
  matrix: { total: 120, filled: 84, highlighted: 18 }
},
{
  id: 'in-process',
  title: 'In Process',
  caption: 'Currently',
  value: 25,
  delta: 2,
  deltaDirection: 'up',
  share: '14%',
  unit: 'Loan Units',
  matrix: { total: 120, filled: 42, highlighted: 6 }
}];


export const ratingCard = {
  score: 25,
  previous: 24,
  next: 26,
  callsCompleted: 6,
  callsGoal: 40,
  spark: [3, 5, 4, 7, 9, 12, 16, 21, 25, 22, 18, 14, 11, 8, 6, 4, 3]
};