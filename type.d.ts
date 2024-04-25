import type { NativeStackScreenProps } from '@react-navigation/native-stack'

export interface Event {
    name : string
    category : string
    time : string
    }

export type MainStackNavigatorParamList = {
  Main: undefined
  FPPS: undefined // FuturePaymentPopupScreen
  IEPS: undefined // IncomeExpensePopupScreen
  APS: undefined
}

export type NavigationProp = NativeStackScreenProps<MainStackNavigatorParamList, Main, FPPS, IEPS, APS>
