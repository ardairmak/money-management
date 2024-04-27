import React from 'react'
import { Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'

import CustomHeader from '../components/CustomHeader'
import UpcomingPaymentScreen from '../screens/UpcomingPaymentScreen'
import BudgetScreen from '../screens/BudgetScreen'
import CalendarScreen from '../screens/CalendarScreen'
import { NavigationProp } from '../type'
import { Colors } from '../constants/Colors'

const BUDGET_SCREEN_NAME = 'Budget'
const UPCOMING_PAYMENT_SCREEN_NAME = 'Upcoming Payments'
const CALENDAR_SCREEN_NAME = 'Calendar'

const BUDGET_SCREEN_ICON_NAME = 'wallet'
const UPCOMING_PAYMENT_SCREEN_ICON_NAME = 'home'
const CALENDAR_SCREEN_ICON_NAME = 'calendar'

const Tab = createBottomTabNavigator()

export default function Navigation({ navigation }: NavigationProp) {
  return (
    <Tab.Navigator
      initialRouteName={UPCOMING_PAYMENT_SCREEN_NAME}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = ''
          if (route.name === BUDGET_SCREEN_NAME) {
            iconName = BUDGET_SCREEN_ICON_NAME
          } else if (route.name === UPCOMING_PAYMENT_SCREEN_NAME) {
            iconName = UPCOMING_PAYMENT_SCREEN_ICON_NAME
          } else if (route.name === CALENDAR_SCREEN_NAME) {
            iconName = CALENDAR_SCREEN_ICON_NAME
          }

          return (
            <Ionicons
              name={iconName as any}
              size={focused ? size + 5 : size}
              color={color}
              style={{
                paddingBottom: focused ? 10 : 0,
              }}
            />
          )
        },
        tabBarLabel: ({ focused }) => {
          return (
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                marginBottom: 12,
                color: 'white',
              }}
            >
              {focused ? route.name : ''}
            </Text>
          )
        },
        tabBarHideOnKeyboard: true,

        // main color Colors.primary
        tabBarActiveTintColor: 'white',
        tabBarStyle: {
          borderTopWidth: 5,
          backgroundColor: Colors.primary,
          borderTopColor: Colors.secondary,
          height: 70,
        },

        tabBarItemStyle: {
          alignItems: 'center',
          justifyContent: 'center',
        },
      })}
    >
      <Tab.Screen
        name={BUDGET_SCREEN_NAME}
        component={BudgetScreen}
        options={{
          header: () => <CustomHeader navigation={navigation} title={'My Budget'} />,
        }}
      />
      <Tab.Screen
        name={UPCOMING_PAYMENT_SCREEN_NAME}
        component={UpcomingPaymentScreen}
        options={{
          header: () => <CustomHeader navigation={navigation} title={'Upcoming Payments'} />,
        }}
      />
      <Tab.Screen
        name={CALENDAR_SCREEN_NAME}
        component={CalendarScreen}
        options={{
          header: () => <CustomHeader navigation={navigation} title={'Calendar'} />,
        }}
      />
    </Tab.Navigator>
  )
}
