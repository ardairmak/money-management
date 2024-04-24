import React from 'react'
import { StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

import { MainStackNavigatorParamList } from '../type'
import MainComponent from '../components/MainComponent'
import FuturePaymentPopupScreen from '../screens/FuturePaymentPopupScreen'
import IncomeExpensePopupScreen from '../screens/IncomeExpensePopupScreen'
import ActivityPopupScreen from '../screens/ActivityPopupScreen'
import { Colors } from '../constants/Colors'

const Stack = createStackNavigator<MainStackNavigatorParamList>()

export default function StackNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Main' component={MainComponent} options={{ headerShown: false }} />
        <Stack.Screen
          name='IEPS'
          component={IncomeExpensePopupScreen}
          options={{
            title: '',
            headerTitleAlign: 'center',
            headerTitleStyle: styles.headerTitle,
            headerBackImage: () => <Ionicons name='close-sharp' size={36} color={Colors.primary} />,
          }}
        />
        <Stack.Screen
          name='FPPS'
          component={FuturePaymentPopupScreen}
          options={{
            title: 'Gelecek Ödeme Ekle',
            headerTitleAlign: 'center',
            headerTitleStyle: styles.headerTitle,
            headerBackImage: () => <Ionicons name='close-sharp' size={36} color={Colors.primary} />,
          }}
        />
        <Stack.Screen
          name='APS'
          component={ActivityPopupScreen}
          options={{
            title: 'Etkinlik Ekle',
            headerTitleAlign: 'center',
            headerTitleStyle: styles.headerTitle,
            headerBackImage: () => <Ionicons name='close-sharp' size={36} color={Colors.primary} />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  headerTitle: {
    color: Colors.primary,
    fontSize: 22,
    fontWeight: '600',
  },
})
