export type NavItem = {
  label: string;
  to: string;
};

export const navItems: NavItem[] = [
{ label: 'Dashboard', to: '/' },
{ label: 'Contacts', to: '/contacts' },
{ label: 'Communication', to: '/communication' },
{ label: 'Marketing Center', to: '/marketing' },
{ label: 'Loan Center', to: '/loans' },
{ label: 'My Payroll', to: '/payroll' }];


export const currentUser = {
  name: 'Marcus Hale',
  role: 'Senior Loan Officer',
  avatar: "/f8718fec-8e12-470f-9911-40a6cb8f6a7b.jpg"

};