import { iconPaths } from './IconPaths'

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
    price: '$9.99',
    icon: iconPaths['Spotify'],
  },
  {
    id: '3',
    name: 'AmazonPrime',
    date: 'April 25, 2024',
    price: '$12.99',
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
    price: '$7.99',
    icon: iconPaths['DisneyPlus'],
  },
]

export const budgetData = [
  {
    month: 'Nisan',
    data: [
      { id: '1', name: 'Kira',type:'expense', amount: '3200', icon: 'home' },
      { id: '2', name: 'Netflix',type:'expense', amount: '30', icon: 'netflix' },
      { id: '3', name: 'KYK',type: 'income', amount: '850', icon: 'money' },
      { id: '4', name: 'Market',type:'expense', amount: '80', icon: 'shopping-cart' },
    ],
  },
  {
    month: 'Mayıs',
    data: [
      { id: '5', name: 'Netflix',type:'expense', amount: '30', icon: 'netflix' },
      { id: '6', name: 'KYK',type: 'income', amount: '850', icon: 'money' },
    ],
  },
  {
    month: 'Haziran',
    data: [
      { id: '7', name: 'Kira',type:'expense', amount: '3200', icon: 'home' },
      { id: '8', name: 'Netflix',type:'expense', amount: '30', icon: 'netflix' },
      { id: '9', name: 'KYK',type: 'income', amount: '850', icon: 'money' },
      { id: '10', name: 'Market',type:'expense', amount: '80', icon: 'shopping-cart' },
    ],
  },
];