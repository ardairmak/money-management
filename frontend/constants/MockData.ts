import { iconPaths } from './IconPaths'
import { Event,RenewalPeriod } from '../type.d'


export const MockData = [
  {
    id: '1',
    name: 'Netflix',
    date: 'June 15, 2024',
    price: '$15.99',
    icon: iconPaths['Netflix'],
  },
  {
    id: '2',
    name: 'Spotify',
    date: 'April 20, 2024',
    price: '$4.99',
    icon: iconPaths['Spotify'],
  },
  {
    id: '3',
    name: 'AmazonPrime',
    date: 'April 25, 2024',
    price: '$14.99',
    icon: iconPaths['AmazonPrime'],
  },
  {
    id: '4',
    name: 'Hulu',
    date: 'April 28, 2024',
    price: '$11.99',
    icon: iconPaths['Hulu'],
  },
  {
    id: '5',
    name: 'DisneyPlus',
    date: 'May 1, 2024',
    price: '$13.99',
    icon: iconPaths['DisneyPlus'],
  },
]

export const budgetData = [
  {
    month: 'April',
    data: [
      { id: '1', name: 'Rent',type:'expense', amount: '3200', icon: 'home' },
      { id: '2', name: 'Netflix',type:'expense', amount: '30', icon: 'netflix' },
      { id: '3', name: 'Loan',type: 'income', amount: '850', icon: 'money' },
      { id: '4', name: 'Market',type:'expense', amount: '80', icon: 'shopping-cart' },
    ],
  },
  {
    month: 'May',
    data: [
      { id: '5', name: 'Netflix',type:'expense', amount: '30', icon: 'netflix' },
      { id: '6', name: 'Loan',type: 'income', amount: '850', icon: 'money' },
    ],
  },
  {
    month: 'June',
    data: [
      { id: '7', name: 'Rent',type:'expense', amount: '3200', icon: 'home' },
      { id: '8', name: 'Netflix',type:'expense', amount: '30', icon: 'netflix' },
      { id: '9', name: 'Loan',type: 'income', amount: '850', icon: 'money' },
      { id: '10', name: 'Market',type:'expense', amount: '80', icon: 'shopping-cart' },
    ],
  },
];

export const mockEvents: {[date : string] : Event[] } = {
    '2024-04-20': [
        {
        name: 'Event 1',
        category: 'Expense',
        time: '8:00 AM',
        date: new Date(2024, 3, 20),
        timeStart: new Date(2024, 3, 20, 8, 0),
        timeEnd: new Date(2024, 3, 20, 9, 0),
        isAllDay: false,
        reminder: new Date(2024, 3, 19, 8, 0),
        renewalPeriod: RenewalPeriod.NONE,
        color: 'red',
        description: 'Description 1',
        }]
}
