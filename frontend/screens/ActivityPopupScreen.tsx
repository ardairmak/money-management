import React, { Fragment, useState } from 'react'
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  Modal,
  Button,
  Pressable,
  Alert
} from 'react-native'
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { Dropdown } from 'react-native-element-dropdown'
import ColorPicker, { LuminanceSlider, Panel3, Preview, colorKit, returnedResults } from 'reanimated-color-picker'
import Animated, { useSharedValue } from 'react-native-reanimated'

import { Colors } from '../constants/Colors'
import { Event, NavigationProp, RenewalPeriod } from '../type.d'
import { IP } from '../constants/ip'

const renewalPeriodData = Object.keys(RenewalPeriod).map((key) => ({
  label: RenewalPeriod[key as keyof typeof RenewalPeriod],
  value: key,
}))

const reminderData = [
  { label: 'None', value: '0' },
  { label: '1 day before', value: '1' },
  { label: '2 day before', value: '2' },
]

export default function ActivityPopupScreen({ navigation }: NavigationProp) {
  const [name, setName] = useState('')
  const [date, setDate] = useState(new Date())
  const [isAllDay, setIsAllDay] = useState(false)
  const [timeStart, setTimeStart] = useState(new Date())
  const [timeEnd, setTimeEnd] = useState(new Date())
  const [reminder, setReminder] = useState<string>('0');
  const [renewalPeriod, setRenewalPeriod] = useState('')
  const [description, setDescription] = useState('')

  const [isAnyTextInputFocused, setIsAnyTextInputFocused] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [isStartTimeSelected, setIsStartTimeSelected] = useState(false)

  const customSwatches = new Array(6).fill('#fff').map(() => colorKit.randomRgbColor().hex())
  const selectedColor = useSharedValue(customSwatches[0])

  const toggleSwitch = () => setIsAllDay((previousState) => !previousState)

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false)

    const newDate = selectedDate || date
    setDate(newDate)
  }

  const onTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    setShowTimePicker(false)

    const newTime = selectedTime || (isStartTimeSelected ? timeStart : timeEnd)

    //hatalı çalışıyor - saat seçiminde mantık hataları var takvimde gösterirken de yanlış saatleri gösteriyor
    if ((isStartTimeSelected && newTime) > timeEnd) {
      return alert('Start time cannot be after end time.')
    }
    if ((!isStartTimeSelected && newTime) < timeStart) {
      return alert('End time cannot be before start time.')
    }

    if (isStartTimeSelected) {
      setTimeStart(newTime)
    } else {
      setTimeEnd(newTime)
    }

    console.log(newTime.toLocaleTimeString('tr-tr', { hour: '2-digit', minute: '2-digit' }))
  }

  const onColorSelect = (color: returnedResults) => {
    'worklet'
    selectedColor.value = color.hex
    console.log(color.hex)
  }

  const convertToISODateString = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };
  
  const convertToISOTimeString = (date: Date): string => {
    return date.toISOString().split('T')[1].slice(0, 5);
  };

  const handleSave = async () => {
    const event: Event = {
      name: name,
      date: new Date(convertToISODateString(date)),
      isAllDay: isAllDay,
      timeStart: new Date(convertToISOTimeString(timeStart)),
      timeEnd: new Date(convertToISOTimeString(timeEnd)),
      reminder: reminder !== '0' ? new Date(date.getTime() - Number(reminder) * 24 * 60 * 60 * 1000) : undefined,
      renewalPeriod: RenewalPeriod[renewalPeriod as keyof typeof RenewalPeriod] || RenewalPeriod.NONE,
      color: selectedColor.value,
      description: description,
    }
    console.log(event)

    if (!event.name || !event.date) {
      return alert('Please provide event name or date.')
    }

    try {
      const response = await fetch(`http://${IP}:8080/event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
      console.log(response)

      if (!response.ok) {
        throw new Error('Failed to add event');
      }

      Alert.alert('Success', 'Event added successfully');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'There was a problem adding the event');
    }
  }

  return (
    <Fragment>
      <ScrollView style={styles.container} keyboardDismissMode='none'>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={styles.input}
            textAlign='right'
            value={name}
            onChangeText={setName}
            onFocus={() => setIsAnyTextInputFocused(true)}
            onBlur={() => setIsAnyTextInputFocused(false)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Date</Text>
          <TouchableOpacity
            style={[styles.input, { flex: 1 }]}
            onPress={() => {
              setShowDatePicker(true)
            }}
          >
            <Text style={styles.dateText}>{date.toLocaleDateString('tr-tr')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Time</Text>
          <View style={[styles.input, { marginRight: 7, flexDirection: 'column', alignItems: 'flex-end' }]}>
            {!isAllDay && (
              <View style={styles.timeContainer}>
                <TouchableOpacity
                  style={styles.timeButton}
                  onPress={() => {
                    setIsStartTimeSelected(true)
                    setShowTimePicker(true)
                  }}
                >
                  <Text style={styles.timeText}>
                    {timeStart.toLocaleTimeString('tr-tr', { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </TouchableOpacity>

                <Text style={{ fontSize: 24, color: 'white' }}>-</Text>

                <TouchableOpacity
                  style={styles.timeButton}
                  onPress={() => {
                    setIsStartTimeSelected(false)
                    setShowTimePicker(true)
                  }}
                >
                  <Text style={styles.timeText}>
                    {timeEnd.toLocaleTimeString('tr-tr', { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.switchContainer}>
              <Text style={{ marginRight: 10, color: 'white' }}>All day</Text>
              <Switch
                style={{ height: 20 }}
                trackColor={{ false: Colors.secondary, true: Colors.primary }}
                thumbColor={isAllDay ? 'lightblue' : 'white'}
                onValueChange={toggleSwitch}
                value={isAllDay}
              />
            </View>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Reminder</Text>
          <Dropdown
            style={styles.input}
            containerStyle={styles.dropdownContainer}
            itemContainerStyle={styles.dropdownItemContainer}
            itemTextStyle={styles.dropdownItemText}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={reminderData}
            maxHeight={300}
            labelField='label'
            valueField='value'
            placeholder={'Choose Reminder'}
            value={reminder}
            onChange={(item) => {
              setReminder(item.value)
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Repetition</Text>
          <Dropdown
            style={styles.input}
            containerStyle={styles.dropdownContainer}
            itemContainerStyle={styles.dropdownItemContainer}
            itemTextStyle={styles.dropdownItemText}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={renewalPeriodData}
            maxHeight={300}
            labelField='label'
            valueField='value'
            placeholder={'Choose Repetition'}
            value={renewalPeriod}
            onChange={(item) => {
              setRenewalPeriod(item.value)
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Color</Text>
          <View style={[styles.input, { marginLeft: 120 }]}>
            <Button title='Pick Color' color={Colors.tertiary} onPress={() => setShowColorPicker(true)} />
            <Modal
              onRequestClose={() => setShowColorPicker(false)}
              visible={showColorPicker}
              animationType='slide'
              presentationStyle='fullScreen'
            >
              <Animated.View style={styles.container}>
                <View style={styles.pickerContainer}>
                  <ColorPicker
                    value={selectedColor.value}
                    sliderThickness={25}
                    thumbShape='circle'
                    thumbSize={25}
                    onChange={onColorSelect}
                    boundedThumb
                    adaptSpectrum
                  >
                    <View style={styles.previewContainer}>
                      <Preview style={styles.previewStyle} />
                    </View>
                    <Panel3 centerChannel='hsl-saturation' />
                    <LuminanceSlider style={styles.sliderStyle} />
                  </ColorPicker>
                </View>

                <Pressable style={styles.chooseButton} onPress={() => setShowColorPicker(false)}>
                  <Text style={{ color: Colors.tertiary, fontWeight: 'bold' }}>Choose</Text>
                </Pressable>
              </Animated.View>
            </Modal>
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.inputLabel}>Description</Text>
          <TextInput
            style={styles.description}
            value={description}
            onChangeText={setDescription}
            onFocus={() => setIsAnyTextInputFocused(true)}
            onBlur={() => setIsAnyTextInputFocused(false)}
          />
        </View>
      </ScrollView>

      {!isAnyTextInputFocused && (
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>ADD</Text>
        </TouchableOpacity>
      )}

      {showDatePicker && (
        <RNDateTimePicker value={date} minimumDate={new Date()} display='default' onChange={onDateChange} />
      )}

      {showTimePicker && <RNDateTimePicker mode='time' value={date} display='default' onChange={onTimeChange} />}
    </Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: Colors.primary,
  },
  inputContainer: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.white,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  inputLabel: {
    fontSize: 18,
    textAlignVertical: 'center',
    color: Colors.white,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingRight: 20,
  },
  switchContainer: {
    flexDirection: 'row',
  },
  input: {
    color: 'white',
    paddingHorizontal: 20,
    flex: 1,
    fontSize: 16,
  },
  inputRightText: {
    fontSize: 18,
    color: '#8f8f8f',
    marginBottom: 1,
    marginRight: 5,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    maxHeight: 200,
  },
  dropdownItemContainer: {
    backgroundColor: 'lightgray',
    borderWidth: 0.2,
    borderColor: 'gray',
  },
  dropdownItemText: {
    textAlign: 'right',
    textAlignVertical: 'center',
    paddingRight: 20,
    margin: -5,
  },
  placeholderStyle: {
    fontSize: 16,
    textAlign: 'right',
    color: 'white',
  },
  selectedTextStyle: {
    fontSize: 16,
    textAlign: 'right',
    color: 'white',
  },
  dateText: {
    color: 'white',
    paddingRight: 20,
    fontSize: 16,
    textAlign: 'right',
  },
  toggleButton: {
    justifyContent: 'flex-end',
    width: '20%',
  },
  timeText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  descriptionContainer: {
    width: '100%',
    paddingBottom: 10,
  },
  description: {
    height: 150,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    padding: 10,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
    backgroundColor: Colors.tertiary,
    color: 'white',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
  },
  timeButton: {
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: Colors.tertiary,
    position: 'absolute',
    bottom: 20,
    right: 20,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
  },
  pickerContainer: {
    backgroundColor: Colors.upcomingPaymentColor,
    alignSelf: 'center',
    marginTop: 100,
    width: 300,
    padding: 20,
    borderRadius: 20,
  },
  sliderStyle: {
    borderRadius: 20,
    marginTop: 20,
    elevation: 5,
  },
  previewContainer: {
    marginBottom: 40,
  },
  previewStyle: {
    height: 40,
    borderRadius: 14,
  },
  chooseButton: {
    position: 'absolute',
    bottom: 30,
    borderRadius: 20,
    paddingHorizontal: 60,
    paddingVertical: 10,
    alignSelf: 'center',
    backgroundColor: Colors.white,
  },
})
