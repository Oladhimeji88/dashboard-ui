import { rateSummaries, rateMeta } from './rates';
import { loans, loanStages, loanTotals } from './loans';
import { contacts } from './contacts';
import { payrollSummary } from './payroll';
import { marketingTotals, campaigns } from './campaigns';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
});

export type SuggestedPrompt = {
  id: string;
  label: string;
};

export const suggestedPrompts: SuggestedPrompt[] = [
{ id: 's1', label: "What are today's rates?" },
{ id: 's2', label: 'How is my pipeline looking?' },
{ id: 's3', label: 'Which leads need follow-up?' },
{ id: 's4', label: "What's my next payout?" },
{ id: 's5', label: 'Any blocked loan files?' },
{ id: 's6', label: 'How are my campaigns performing?' }];


function has(message: string, ...keywords: string[]) {
  return keywords.some((keyword) => message.includes(keyword));
}

export function getAssistantReply(rawMessage: string): string {
  const message = rawMessage.toLowerCase().trim();

  if (has(message, 'rate', 'rates')) {
    const lines = rateSummaries.
    map(
      (rate) =>
      `${rate.label} is at ${rate.value}% (${rate.direction === 'up' ? '+' : '-'}${rate.change}% today)`
    ).
    join(', ');
    return `Here's where rates stand right now: ${lines}. Average move today is ${rateMeta.avgMove}%, with ${rateMeta.advancing} products advancing and ${rateMeta.declining} declining.`;
  }

  if (has(message, 'pipeline', 'loans in progress', 'active loans')) {
    const stageCounts = loanStages.
    map((stage) => {
      const count = loans.filter((loan) => loan.stage === stage).length;
      return `${count} in ${stage}`;
    }).
    join(', ');
    return `Your pipeline holds ${currency.format(loanTotals.volume)} across ${loans.length} files — ${stageCounts}. Average time to close is ${loanTotals.avgDaysToClose} days with an ${loanTotals.pullThrough}% pull-through rate.`;
  }

  if (has(message, 'blocked', 'stuck', 'issue')) {
    const blocked = loans.filter((loan) => loan.blocked);
    if (blocked.length === 0) {
      return 'Good news — nothing in your pipeline is currently blocked.';
    }
    const details = blocked.
    map((loan) => `${loan.borrower} (${loan.id}): ${loan.blocked}`).
    join('; ');
    return `${blocked.length} file${blocked.length > 1 ? 's are' : ' is'} blocked right now — ${details}.`;
  }

  if (has(message, 'lead', 'follow-up', 'follow up', 'contact')) {
    const stale = contacts.
    filter((contact) => contact.stage === 'Lead').
    sort((a, b) => a.score - b.score);
    if (stale.length === 0) {
      return "You're all caught up — no leads are waiting on a follow-up.";
    }
    const names = stale.map((contact) => `${contact.name} (fit score ${contact.score})`).join(', ');
    return `${stale.length} lead${stale.length > 1 ? 's' : ''} could use a follow-up: ${names}.`;
  }

  if (has(message, 'payout', 'payroll', 'commission', 'earnings', 'paid')) {
    return `Your next payout is ${currency.format(payrollSummary.nextPayout)}, deposits ${payrollSummary.nextPayoutDate}. YTD earnings are ${currency.format(payrollSummary.ytdEarnings)} (+${payrollSummary.ytdDelta}%), and you're ${payrollSummary.tierProgress}% of the way to your next commission tier.`;
  }

  if (has(message, 'campaign', 'marketing')) {
    const live = campaigns.filter((campaign) => campaign.status === 'Live');
    return `You have ${live.length} live campaign${live.length === 1 ? '' : 's'}. This month you've generated ${marketingTotals.leadsThisMonth} leads (+${marketingTotals.leadsDelta}%) at ${currency.format(marketingTotals.costPerLead)} per lead — ${marketingTotals.bestChannel} is your best channel.`;
  }

  if (has(message, 'hello', 'hi', 'hey')) {
    return "Hey! I'm your Vantra assistant. Ask me about rates, your pipeline, leads, payroll, or campaigns and I'll pull the numbers for you.";
  }

  if (has(message, 'thank')) {
    return "You're welcome! Let me know if there's anything else you'd like me to check.";
  }

  return "I can help with rates, pipeline status, leads that need follow-up, payroll, or campaign performance — try asking about one of those, or tap a suggestion below.";
}
