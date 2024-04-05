import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'

// Import the screens
import UpcomingPaymentScreen from '../screens/UpcomingPaymentScreen'
import BudgetScreen from '../screens/BudgetScreen'
import CalendarScreen from '../screens/CalendarScreen'

const BUDGET_SCREEN_NAME = 'Bütçe'
const UPCOMING_PAYMENT_SCREEN_NAME = 'Yaklaşan Ödemeler'
const CALENDAR_SCREEN_NAME = 'Takvim'

const BUDGET_SCREEN_ICON_NAME = 'wallet'
const UPCOMING_PAYMENT_SCREEN_ICON_NAME = 'home'
const CALENDAR_SCREEN_ICON_NAME = 'calendar'

const Tab = createBottomTabNavigator()

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={UPCOMING_PAYMENT_SCREEN_NAME}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName: string = ''
                        if (route.name === BUDGET_SCREEN_NAME) {
                            iconName = BUDGET_SCREEN_ICON_NAME
                        } else if (
                            route.name === UPCOMING_PAYMENT_SCREEN_NAME
                        ) {
                            iconName = UPCOMING_PAYMENT_SCREEN_ICON_NAME
                        } else if (route.name === CALENDAR_SCREEN_NAME) {
                            iconName = CALENDAR_SCREEN_ICON_NAME
                        }

                        return (
                            <Ionicons
                                name={iconName as any}
                                size={focused ? size + 5 : size}
                                color={color}
                                style={{ paddingBottom: focused ? 10 : 0 }}
                            />
                        )
                    },

                    tabBarLabel: ({ focused }) => {
                        return (
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontWeight: 'bold',
                                    marginBottom: 10,
                                }}
                            >
                                {focused ? route.name : ''}
                            </Text>
                        )
                    },

                    // main color #083c5c
                    tabBarActiveTintColor: '#083c5c',
                    tabBarStyle: {
                        borderTopWidth: 5,
                        borderTopColor: '#083c5c',
                        height: 70,
                    },

                    tabBarItemStyle: {
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                    headerShown: false,
                })}
            >
                <Tab.Screen
                    name={BUDGET_SCREEN_NAME}
                    component={BudgetScreen}
                />
                <Tab.Screen
                    name={UPCOMING_PAYMENT_SCREEN_NAME}
                    component={UpcomingPaymentScreen}
                />
                <Tab.Screen
                    name={CALENDAR_SCREEN_NAME}
                    component={CalendarScreen}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}