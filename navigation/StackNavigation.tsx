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
import SignInScreen from '../screens/SignInScreen'
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
            headerStyle: styles.headerStyle,
            headerTitleStyle: styles.headerTitle,
            cardStyle: styles.cardStyle,
            headerBackImage: () => <Ionicons name='close-sharp' size={36} color={Colors.white} />,
          }}
        />
        <Stack.Screen
          name='FPPS'
          component={FuturePaymentPopupScreen}
          options={{
            title: 'Add Future Payment',
            headerStyle: styles.headerStyle,
            cardStyle: styles.cardStyle,
            headerTitleAlign: 'center',
            headerTitleStyle: styles.headerTitle,
            headerBackImage: () => <Ionicons name='close-sharp' size={36} color={Colors.white} />,
          }}
        />
        <Stack.Screen
          name='APS'
          component={ActivityPopupScreen}
          options={{
            title: 'Add an Event',
            headerStyle: styles.headerStyle,
            headerTitleAlign: 'center',
            headerTitleStyle: styles.headerTitle,
            cardStyle: styles.cardStyle,
            headerBackImage: () => <Ionicons name='close-sharp' size={36} color={Colors.white} />,
          }}
        />
        <Stack.Screen
          name='SignIn'
          component={SignInScreen}
          options={{
            title: '',
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
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  headerStyle: {
    backgroundColor: Colors.primary,
    shadowColor: 'transparent',
    elevation: 0,
  },
  cardStyle: {
    backgroundColor: Colors.primary,
  },
})
