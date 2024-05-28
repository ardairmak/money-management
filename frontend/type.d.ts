import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ColorValue } from 'react-native'

export type MainStackNavigatorParamList = {
  Main: undefined
  FPPS: { payment?: FuturePayment } // FuturePaymentPopupScreen
  IEPS: undefined // IncomeExpensePopupScreen
  APS: undefined // ActivityPopupScreen
  LogIn: undefined // LogInScreen
  SignUp: undefined // SignUpScreen
  ForgetPassword: undefined // SignUpScreen
}
export type NavigationProp = NativeStackScreenProps<MainStackNavigatorParamList>

export interface IncomeExpense {
  isIncome: boolean
  name: string
  category: Category
  price: int
  date: Date
  description: string
}

export interface FuturePayment {
  id: string
  name: string
  price: int
  renewalPeriod: RenewalPeriod
  repetition: int
  date: string
  reminder: string | undefined
  category: Category
  description: string
}

export interface Event {
  name: string
  date: Date
  isAllDay: boolean
  timeStart: Date
  timeEnd: Date
  reminder: Date | undefined
  renewalPeriod: RenewalPeriod
  color: string
  description: string
}

export enum RenewalPeriod {
  NONE = 'None',
  WEEKLY = 'Weekly',
  MONTHLY = 'Monthly',
  ANNUALLY = 'Annually',
}

export enum Category {
  NONE = 'None',
  FOOD = 'Food',
  TRANSPORTATION = 'Transportation',
  ENTERTAINMENT = 'Entertainment',
  UTILITIES = 'Utilities',
  SHOPPING = 'Shopping',
  HEALTH = 'Health',
  EDUCATION = 'Education',
  OTHER = 'Other',
}
