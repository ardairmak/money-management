import React, { Fragment, useState } from 'react'
import { Text, View, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { Dropdown } from 'react-native-element-dropdown'
import { FontAwesome5 } from '@expo/vector-icons'

import { Colors } from '../constants/Colors'
import { Category, FuturePayment, NavigationProp, RenewalPeriod } from '../type.d'

const renewalPeriodData = Object.keys(RenewalPeriod).map((key) => ({
  label: RenewalPeriod[key as keyof typeof RenewalPeriod],
  value: key,
}))

const reminderData = [
  { label: 'Yok', value: '0' },
  { label: '1 gün önce', value: '1' },
  { label: '2 gün önce', value: '2' },
]

const categoryData = Object.keys(Category).map((key) => ({
  label: Category[key as keyof typeof Category],
  value: key,
}))

export default function FuturePaymentPopupScreen({ navigation }: NavigationProp) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [period, setPeriod] = useState('')
  const [repetition, setRepetition] = useState('')
  const [date, setDate] = useState(new Date())
  const [reminder, setReminder] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')

  const [isAnyTextInputFocused, setIsAnyTextInputFocused] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date
    setDate(currentDate)
    setShowDatePicker(false)

    console.log(currentDate.toLocaleDateString('tr-tr'))
  }

  const handleSave = () => {
    const payment: FuturePayment = {
      name: name,
      price: price as unknown as number,
      renewalPeriod: (period as RenewalPeriod) || RenewalPeriod.NONE,
      repetition: (repetition as unknown as number) || 0,
      date: date,
      reminder: (reminder as unknown as Date) || undefined, //! calculate reminder day
      category: category as Category,
      description: description,
    }
    console.log(payment)

    if (!payment.name || !payment.price) {
      return alert('Lütfen ödeme adını ve miktarını girin!')
    }

    navigation.goBack()
  }

  return (
    <Fragment>
      <ScrollView style={styles.container} keyboardDismissMode='none'>
        <View style={styles.iconContainer}>
          <FontAwesome5 name='money-bill' style={styles.icon} size={40} color='white' />
        </View>
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
          <Text style={styles.inputLabel}>Ücret</Text>
          <TextInput
            style={styles.input}
            textAlign='right'
            keyboardType='numeric'
            value={price}
            onChangeText={setPrice}
            onFocus={() => setIsAnyTextInputFocused(true)}
            onBlur={() => setIsAnyTextInputFocused(false)}
          />
          <Text style={styles.inputRightText}>TL</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Ödeme Periyodu</Text>
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
            value={period}
            onChange={(item) => {
              setPeriod(item.value)
            }}
          />
        </View>
        {!['', '0'].includes(period) && (
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Yineleme</Text>
            <TextInput
              style={styles.input}
              textAlign='right'
              keyboardType='numeric'
              value={repetition}
              onChangeText={setRepetition}
              onFocus={() => setIsAnyTextInputFocused(true)}
              onBlur={() => setIsAnyTextInputFocused(false)}
            />
            <Text style={styles.inputRightText}>{renewalPeriodData.find((item) => item.value === period)?.label}</Text>
          </View>
        )}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Ödeneceği Tarih</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => {
              setShowDatePicker(true)
            }}
          >
            <Text style={styles.dateText}>{date.toLocaleDateString('tr-tr')}</Text>
          </TouchableOpacity>
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
          <Text style={styles.inputLabel}>Kategori</Text>
          <Dropdown
            style={styles.input}
            containerStyle={styles.dropdownContainer}
            itemContainerStyle={styles.dropdownItemContainer}
            itemTextStyle={styles.dropdownItemText}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={categoryData}
            maxHeight={300}
            labelField='label'
            valueField='value'
            placeholder={'Kategori seç'}
            value={category}
            onChange={(item) => {
              setCategory(item.value ? item.value : '')
            }}
          />
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
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginTop: 10,
  },
  icon: {
    backgroundColor: Colors.secondary,
    padding: 25,
    borderRadius: 50,
    position: 'absolute',
    elevation: 5,
  },
  inputContainer: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'flex-end',
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
  input: {
    color: 'black',
    paddingHorizontal: 20,
    flex: 1,
    fontSize: 16,
  },
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
})
