import moment from 'moment'
import React, { useState } from 'react'
import { Text, View, TextInput, Button, StyleSheet, ScrollView } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { TimeDatePicker, Modes } from 'react-native-time-date-picker'

const reiterationData = [
  { label: 'Hiçbir Zaman', value: '0' },
  { label: 'Haftalık', value: '1' },
  { label: 'Aylık', value: '2' },
  { label: 'Yıllık', value: '3' },
]

const reminderData = [
  { label: 'Hiçbir Zaman', value: '0' },
  { label: '1 gün önce', value: '1' },
  { label: '2 gün önce', value: '2' },
]

const categoryData = [
  { label: 'my category', value: '0' },
  { label: 'your category', value: '1' },
  { label: 'our category', value: '2' },
]

export default function FuturePaymentPopupScreen() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [period, setPeriod] = useState('')
  const [reiteration, setReiteration] = useState('')
  const [isReiterationDropdownFocus, setIsReiterationDropdownFocus] = useState(false)
  const [date, setDate] = useState()
  const [reminder, setReminder] = useState('')
  const [isReminderDropdownFocus, setIsReminderDropdownFocus] = useState(false)
  const [category, setCategory] = useState('')
  const [isCategoryDropdownFocus, setIsCategoryDropdownFocus] = useState(false)
  const [description, setDescription] = useState('')

  const handleSave = () => {
    console.log('Input Values:', {
      textInputValue: name,
      numericInputValue: price,
      dropdownValue: period,
      reiteration: reiteration,
      date: date,
      reminder: reminder,
      category: categoryData.find((item) => item.value === category)?.label,
      description: description,
    })
  }

  return (
    <ScrollView style={styles.container} keyboardDismissMode='none'>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>İsim</Text>
        <TextInput style={styles.input} placeholder='Gider' textAlign='right' value={name} onChangeText={setName} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Ücret</Text>
        <TextInput
          style={styles.input}
          placeholder='TL'
          textAlign='right'
          keyboardType='numeric'
          value={price}
          onChangeText={setPrice}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Ödeme Periyodu</Text>
        <Dropdown
          style={[styles.input, isReiterationDropdownFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={reiterationData}
          maxHeight={300}
          labelField='label'
          valueField='value'
          placeholder={'Periyot seç'}
          value={period}
          onFocus={() => setIsReiterationDropdownFocus(true)}
          onBlur={() => setIsReiterationDropdownFocus(false)}
          onChange={(item) => {
            setPeriod(item.value)
            setIsReiterationDropdownFocus(false)
          }}
        />
      </View>
      {!['', 'None'].includes(period) && (
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Yineleme</Text>
          <TextInput
            style={styles.input}
            placeholder={reiterationData.find((item) => item.value === period)?.label}
            textAlign='right'
            keyboardType='numeric'
            value={reiteration}
            onChangeText={setReiteration}
          />
        </View>
      )}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Ödeneceği Tarih</Text>

        {/* //! fix here !// */}

        <Text style={styles.input}>placeholder go brr</Text>
        {false && (
          <TimeDatePicker
            selectedDate={moment().valueOf()}
            mode={Modes.calendar}
            style={styles.datePicker}
            onMonthYearChange={() => {}}
            onTimeChange={() => {}}
            onSelectedChange={(selected: number) => {
              console.log(moment(selected))

              //? how to set to date
            }}
            disableTimeCloseButton={true}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Hatırlatıcı</Text>
        <Dropdown
          style={[styles.input, isReminderDropdownFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={reminderData}
          maxHeight={300}
          labelField='label'
          valueField='value'
          placeholder={'Hatırlatıcı seç'}
          value={reminder}
          onFocus={() => setIsReminderDropdownFocus(true)}
          onBlur={() => setIsReminderDropdownFocus(false)}
          onChange={(item) => {
            setReminder(item.value)
            setIsReminderDropdownFocus(false)
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Kategori</Text>
        <Dropdown
          style={[styles.input, isCategoryDropdownFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={categoryData}
          maxHeight={300}
          labelField='label'
          valueField='value'
          placeholder={'Kategori seç'}
          value={category}
          onFocus={() => setIsCategoryDropdownFocus(true)}
          onBlur={() => setIsCategoryDropdownFocus(false)}
          onChange={(item) => {
            setCategory(item.value)
            setIsCategoryDropdownFocus(false)
          }}
        />
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.inputLabel}>Açıklama</Text>
        <TextInput
          style={styles.description}
          placeholder='Açıklama'
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title='Save' onPress={handleSave} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  inputContainer: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.5)',
  },
  descriptionContainer: {
    width: '100%',
  },
  inputLabel: {
    fontSize: 20,
    width: '50%',
    textAlignVertical: 'center',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    paddingHorizontal: 10,
    flex: 1,
  },
  description: {
    height: 150,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    padding: 10,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
  },
  placeholderStyle: {
    fontSize: 16,
    textAlign: 'right',
  },
  selectedTextStyle: {
    fontSize: 16,
    textAlign: 'right',
  },
  datePicker: {
    position: 'absolute',
  },
  buttonContainer: {
    padding: 50,
  },
})
