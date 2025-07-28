import { NavItem } from '@/types';

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: []
  },
  {
    title: 'My Jobs',
    url: '/dashboard/my-jobs',
    icon: 'request', 
    isActive: false,
    shortcut: ['j', 'j'],
    items: []
  },
  {
    title: 'Proposals',
    url: '/dashboard/proposals',
    icon: 'proposals', 
    isActive: false,
    shortcut: ['p', 'p'],
    items: []
  },
  {
    title: 'Task Management',
    url: '/dashboard/task-management',
    icon: 'todo', 
    isActive: false,
    shortcut: ['e', 'e'],
    items: []
  },
  {
    title: 'Messages',
    url: '/dashboard/messages',
    icon: 'connect', 
    isActive: false,
    shortcut: ['m', 'm'],
    items: []
  },
  {
    title: 'Payments Oversight',
    url: '/dashboard/payments',
    icon: 'payments', 
    shortcut: ['p', 'p'],
    isActive: false,
    items: []
  },
  {
    title: 'Profile',
    url: '/dashboard/profile',
    icon: 'userPen', 
    shortcut: ['b', 'b'],
    isActive: false,
    items: []
  },
];


export interface SaleUser {
  id: number;
  name: string;
  email: string;
  amount: string;
  image: string;
  initials: string;
}

export const recentSalesData: SaleUser[] = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    image: 'https://api.slingacademy.com/public/sample-users/1.png',
    initials: 'OM'
  },
  {
    id: 2,
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/2.png',
    initials: 'JL'
  },
  {
    id: 3,
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
    image: 'https://api.slingacademy.com/public/sample-users/3.png',
    initials: 'IN'
  },
  {
    id: 4,
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
    image: 'https://api.slingacademy.com/public/sample-users/4.png',
    initials: 'WK'
  },
  {
    id: 5,
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/5.png',
    initials: 'SD'
  }
];
