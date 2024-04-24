import type { NativeStackScreenProps } from '@react-navigation/native-stack'

export type MainStackNavigatorParamList = {
  Main: undefined
  FPPS: undefined // FuturePaymentPopupScreen
  IEPS: undefined // IncomeExpensePopupScreen
  APS: undefined
}

export type NavigationProp = NativeStackScreenProps<MainStackNavigatorParamList, Main, FPPS, IEPS, APS>
