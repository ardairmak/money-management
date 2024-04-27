import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { FontAwesome5 } from '@expo/vector-icons'

import { Colors } from '../constants/Colors'
import { mockEvents } from '../constants/MockData'

const CalendarScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString)
  }

  const getMarkedDates = () => {
    const marked: { [date: string]: any } = {}

    for (const date in mockEvents) {
      marked[date] = { marked: true, dotColor: 'red' }
    }

    return marked
  }

  const renderEvents = () => {
    const events = mockEvents[selectedDate || '']

    if (!events) return null

    return (
      <View style={styles.eventsContainer}>
        <View style={styles.eventListContainer}>
          {events.map((event, index) => (
            <View key={index} style={styles.eventItem}>
              <FontAwesome5 name='coins' size={30} color={Colors.white} />

              <View style={styles.eventDetails}>
                <Text style={event.category === 'Expense' ? styles.expenseText : styles.incomeText}>{event.name}</Text>
                <Text style={styles.eventTime}>{event.time}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          ...getMarkedDates(),
          [selectedDate || '']: { selected: true, marked: true },
        }}
        style={{ backgroundColor: Colors.primary, height: 370 }}
        theme={{
          monthTextColor: Colors.white,
          textMonthFontSize: 20,
          arrowColor: 'white',
          calendarBackground: Colors.primary,
          dayTextColor: 'white',
          textDisabledColor: Colors.secondary,
        }}
      />

      {renderEvents()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  eventsContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: Colors.primary,
  },
  eventItem: {
    flexDirection: 'row',
    backgroundColor: Colors.tertiary,
    padding: 10,
    borderBottomWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventTime: {
    fontSize: 14,
    color: Colors.white,
  },
  eventListContainer: {
    backgroundColor: Colors.tertiary,
    borderRadius: 20,
    padding: 10,
  },
  eventDetails: {
    flex: 1,
    marginLeft: 10,
  },
  expenseText: {
    color: 'red',
  },
  incomeText: {
    color: 'green',
  },
})

export default CalendarScreen
