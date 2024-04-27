import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ColorValue } from 'react-native'

export interface Event {
    name : string
    category : string
    time : string
    }

export type MainStackNavigatorParamList = {
  Main: undefined
  FPPS: undefined // FuturePaymentPopupScreen
  IEPS: undefined // IncomeExpensePopupScreen
  APS: undefined // ActivityPopupScreen
}
export type NavigationProp = NativeStackScreenProps<MainStackNavigatorParamList, Main, FPPS, IEPS, APS>

export interface IncomeExpense {
  isIncome: boolean
  name: string
  category: Category
  price: int
  date: Date
  description: string
}

export interface FuturePayment {
  name: string
  price: int
  renewalPeriod: RenewalPeriod
  repetition: int
  date: Date
  reminder: Date | undefined
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
  NONE = 'Yok',
  WEEKLY = 'Haftalık',
  MONTHLY = 'Aylık',
  ANNUALLY = 'Yıllık',
}

export enum Category {
  NONE = 'Yok',
  FOOD = 'Yiyecek',
  TRANSPORTATION = 'Ulaşım',
  ENTERTAINMENT = 'Eğlence',
  UTILITIES = 'Fatura',
  SHOPPING = 'Alışveriş',
  HEALTH = 'Sağlık',
  EDUCATION = 'Eğitim',
  OTHER = 'Diğer',
}
