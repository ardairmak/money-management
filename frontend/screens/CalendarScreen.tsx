import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { FontAwesome5 } from '@expo/vector-icons'
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import { Colors } from '../constants/Colors'
import { Event } from '../type.d'
import { IP } from '../constants/ip';

const CalendarScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [events, setEvents] = useState<{[key: string]: Event[]}>({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`http://${IP}:8080/event`);
        const data: Event[] = await response.json();
        if (data === null) {
          throw new Error('Fetched data is null');
        }
        const formattedEvents = data.reduce((acc: { [key: string]: Event[] }, event: Event) => {
          const dateString = new Date(event.date).toISOString().split('T')[0];

          if (!acc[dateString]) {
            acc[dateString] = [];
          }
          acc[dateString].push(event);
          return acc;
        }, {});
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
    const intervalId = setInterval(fetchEvents, 5000); // Poll every 10 seconds
    return () => clearInterval(intervalId);
  }, []);

  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString)
  }

  const getMarkedDates = () => {
    const marked: { [date: string]: any } = {}

    for (const date in events) {
      marked[date] = { marked: true, dotColor: 'white' }
    }

    if (selectedDate) {
      marked[selectedDate] = { ...marked[selectedDate], selected: true };
    }

    return marked
  }

  const renderEvents = () => {
    const dayEvents = events[selectedDate || ''];

    if (!dayEvents) return null

    return (
      <View style={styles.eventsContainer}>
        <View style={styles.eventListContainer}>
        {dayEvents.map((event: Event, index: number) => {
            const id = uuidv4();
            
            return (
              <View key={id} style={styles.eventItem}>
                <FontAwesome5 name='coins' size={30} color={Colors.white} />

                <View style={styles.eventDetails}>
                  <Text>{event.name}</Text>
                  {event.timeStart && event.timeEnd && (
                    <Text style={styles.eventTime}>{`${new Date(event.timeStart).toLocaleTimeString()} - ${new Date(event.timeEnd).toLocaleTimeString()}`}</Text>
                  )}
                </View>
              </View>
            )
        })}
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={getMarkedDates()}
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
