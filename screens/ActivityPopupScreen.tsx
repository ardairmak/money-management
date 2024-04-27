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
} from 'react-native'
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { Dropdown } from 'react-native-element-dropdown'
import ColorPicker, {
  LuminanceSlider,
  OpacitySlider,
  Panel3,
  Preview,
  Swatches,
  colorKit,
  returnedResults,
} from 'reanimated-color-picker'

import { Colors } from '../constants/Colors'
import { Event, NavigationProp, RenewalPeriod } from '../type.d'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

const renewalPeriodData = Object.keys(RenewalPeriod).map((key) => ({
  label: RenewalPeriod[key as keyof typeof RenewalPeriod],
  value: key,
}))

const reminderData = [
  { label: 'Yok', value: '0' },
  { label: '1 gün önce', value: '1' },
  { label: '2 gün önce', value: '2' },
]

export default function IncomeExpensePopupScreen({ navigation }: NavigationProp) {
  const [name, setName] = useState('')
  const [date, setDate] = useState(new Date())
  const [isAllDay, setIsAllDay] = useState(false)
  const [timeStart, setTimeStart] = useState(new Date())
  const [timeEnd, setTimeEnd] = useState(new Date())
  const [reminder, setReminder] = useState('')
  const [renewalPeriod, setRenewalPeriod] = useState('')
  const [description, setDescription] = useState('')

  const [isAnyTextInputFocused, setIsAnyTextInputFocused] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [isToggleEnabled, setIsToggleEnabled] = useState(false)
  const [showColorPicker, setShowColorPicker] = useState(false)

  const [isStartTimeSelected, setIsStartTimeSelected] = useState(false)

  const customSwatches = new Array(6).fill('#fff').map(() => colorKit.randomRgbColor().hex())
  const selectedColor = useSharedValue(customSwatches[0])

  const toggleSwitch = () => setIsToggleEnabled((previousState) => !previousState)

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const newDate = selectedDate || date
    setDate(newDate)
    setShowDatePicker(false)

    console.log(newDate.toLocaleDateString('tr-tr'))
  }

  const onTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    const newTimeStart = selectedTime || timeStart
    const newTimeEnd = selectedTime || timeEnd

    if (isStartTimeSelected && newTimeStart > timeEnd) {
      return alert('Başlangıç saati bitiş saatinden sonra olamaz.')
    }
    if (isStartTimeSelected && newTimeEnd > timeStart) {
      return alert('Bitiş saati başlangıç saatinden sonra olamaz.')
    }

    if (isStartTimeSelected) {
      setTimeStart(newTimeStart)
    } else {
      setTimeEnd(newTimeEnd)
    }
    setShowTimePicker(false)
  }

  const onColorSelect = (color: returnedResults) => {
    'worklet'
    selectedColor.value = color.hex
    console.log(color.hex)
  }

  const handleSave = () => {
    const payment: Event = {
      name: name,
      date: date,
      isAllDay: isAllDay,
      timeStart: timeStart,
      timeEnd: timeEnd,
      reminder: (reminder as unknown as Date) || undefined, //! calculate reminder day
      renewalPeriod: (renewalPeriod as RenewalPeriod) || RenewalPeriod.NONE,
      color: selectedColor.value,
      description: description,
    }
    console.log(payment)

    if (!payment.name || !payment.date) {
      return alert('Lütfen etkinlik adını ve tarihini girin!')
    }

    navigation.goBack()
  }

  return (
    <Fragment>
      <ScrollView style={styles.container} keyboardDismissMode='none'>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>İsim</Text>
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
          <Text style={styles.inputLabel}>Tarih</Text>
          <TouchableOpacity
            style={[styles.input, { flex: 1 }]}
            onPress={() => {
              setShowDatePicker(true)
            }}
          >
            <Text style={styles.dateText}>{date.toLocaleDateString('tr-tr')}</Text>
          </TouchableOpacity>
        </View>

        {/* //! saat secme */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Süre</Text>
          <View style={[styles.input, { flexDirection: 'column', alignItems: 'flex-end' }]}>
            {!isToggleEnabled && (
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
                <Text style={{ fontSize: 24 }}>-</Text>
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
              <Text style={{ marginRight: 10 }}>Gün boyu</Text>
              <Switch
                style={{ height: 20 }}
                trackColor={{ false: Colors.secondary, true: Colors.primary }}
                thumbColor={isToggleEnabled ? 'lightblue' : 'white'}
                onValueChange={toggleSwitch}
                value={isToggleEnabled}
              />
            </View>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Hatırlatıcı</Text>
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
            placeholder={'Hatırlatıcı seç'}
            value={reminder}
            onChange={(item) => {
              setReminder(item.value)
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Tekrarla</Text>
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
            placeholder={'Periyot seç'}
            value={renewalPeriod}
            onChange={(item) => {
              setRenewalPeriod(item.value)
            }}
          />
        </View>

        {/* //! renk secimi */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Renk</Text>
          <View style={styles.input}>
            <Button title='Color Picker' onPress={() => setShowColorPicker(true)} />
            <Modal onRequestClose={() => setShowColorPicker(false)} visible={showColorPicker} animationType='slide'>
              <Animated.View style={[styles.container, { backgroundColor: Colors.primary }]}>
                <View style={styles.pickerContainer}>
                  <ColorPicker
                    value={selectedColor.value}
                    sliderThickness={25}
                    thumbShape='circle'
                    thumbSize={25}
                    onChange={onColorSelect}
                    adaptSpectrum
                  >
                    <View style={styles.previewContainer}>
                      <Preview style={styles.previewStyle} />
                    </View>
                    <Panel3 style={styles.panelStyle} centerChannel='hsl-saturation' />
                    <LuminanceSlider style={styles.sliderStyle} />
                    <OpacitySlider style={styles.sliderStyle} />
                    <Swatches
                      style={styles.swatchesContainer}
                      swatchStyle={styles.swatchStyle}
                      colors={customSwatches}
                    />
                  </ColorPicker>
                </View>
                <Pressable style={styles.closeButton} onPress={() => setShowColorPicker(false)}>
                  <Text style={{ color: '#707070', fontWeight: 'bold' }}>Close</Text>
                </Pressable>
              </Animated.View>
            </Modal>
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.inputLabel}>Açıklama</Text>
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
          <Text style={styles.buttonText}>EKLE</Text>
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
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  inputContainer: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.secondary,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  inputLabel: {
    fontSize: 18,
    textAlignVertical: 'center',
    color: Colors.secondary,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingRight: 20,
  },
  switchContainer: {
    flexDirection: 'row',
  },
  input: {
    color: 'black',
    paddingHorizontal: 20,
    flex: 1,
    fontSize: 16,
  },
  hourInput: {},
  inputRightText: {
    fontSize: 18,
    color: Colors.secondary,
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
  },
  selectedTextStyle: {
    fontSize: 16,
    textAlign: 'right',
  },
  dateText: {
    paddingRight: 20,
    fontSize: 16,
    textAlign: 'right',
  },
  toggleButton: {
    justifyContent: 'flex-end',
    width: '20%',
  },
  timeText: {
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
    backgroundColor: Colors.secondary,
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
    backgroundColor: Colors.primary,
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
    alignSelf: 'center',
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  panelStyle: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sliderStyle: {
    borderRadius: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  previewContainer: {
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#bebdbe',
  },
  previewStyle: {
    height: 40,
    borderRadius: 14,
  },
  swatchesContainer: {
    borderTopWidth: 1,
    borderColor: '#bebdbe',
    marginTop: 20,
    paddingTop: 20,
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: 10,
  },
  swatchStyle: {
    borderRadius: 20,
    height: 30,
    width: 30,
    margin: 0,
    marginBottom: 0,
    marginHorizontal: 0,
    marginVertical: 0,
  },
  openButton: {
    width: '100%',
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    bottom: 10,
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    alignSelf: 'center',
    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
})
