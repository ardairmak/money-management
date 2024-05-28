import React, { Fragment, useState } from 'react'
import { Text, View, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native'
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { Dropdown } from 'react-native-element-dropdown'
import { FontAwesome5 } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'
import { Colors } from '../constants/Colors'
import { Category, FuturePayment, MainStackNavigatorParamList, NavigationProp, RenewalPeriod } from '../type.d'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { IP } from '../constants/ip'

type FuturePaymentPopupScreenProps = NativeStackScreenProps<MainStackNavigatorParamList, 'FPPS'>

const renewalPeriodData = Object.keys(RenewalPeriod).map((key) => ({
  label: RenewalPeriod[key as keyof typeof RenewalPeriod],
  value: RenewalPeriod[key as keyof typeof RenewalPeriod],
}))

const reminderData = [
  { label: 'None', value: '0' },
  { label: '1 day before', value: '1' },
  { label: '2 day before', value: '2' },
]

const categoryData = Object.keys(Category).map((key) => ({
  label: Category[key as keyof typeof Category],
  value: Category[key as keyof typeof Category],
}))

export default function FuturePaymentPopupScreen({ navigation }: FuturePaymentPopupScreenProps) {
  const route = useRoute()
  const routeParams = route.params as { payment?: FuturePayment }
  const paymentToEdit = routeParams?.payment

  const initialDate = paymentToEdit?.date ? new Date(paymentToEdit.date) : new Date()
  console.log(initialDate)
  const [name, setName] = useState(paymentToEdit?.name || '')
  const [price, setPrice] = useState(paymentToEdit?.price.toString() || '')
  const [renewalPeriod, setRenewalPeriod] = useState<RenewalPeriod>(paymentToEdit?.renewalPeriod || RenewalPeriod.NONE)
  const [repetition, setRepetition] = useState(paymentToEdit?.repetition?.toString() || '')
  const [date, setDate] = useState(initialDate)
  const [reminder, setReminder] = useState(paymentToEdit?.reminder || '0')
  const [category, setCategory] = useState(paymentToEdit?.category || '')
  const [description, setDescription] = useState(paymentToEdit?.description || '')

  const [isAnyTextInputFocused, setIsAnyTextInputFocused] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false)

    const newDate = selectedDate || date
    setDate(newDate)

    console.log(newDate.toLocaleDateString('tr-tr'))
  }

  const calculateReminderDate = () => {
    const reminderDate = new Date(date)
    reminderDate.setDate(reminderDate.getDate() - parseInt(reminder))
    return reminderDate
  }
  const handleSave = async () => {
    const payment: FuturePayment = {
      id: paymentToEdit?.id || '',
      name: name,
      price: parseFloat(price),
      renewalPeriod: renewalPeriod,
      repetition: parseInt(repetition) || 0,
      date: date.toISOString(),
      reminder: calculateReminderDate().toISOString(),
      category: category as Category,
      description: description,
    }
    console.log(payment)

    if (!payment.name || !payment.price) {
      return alert('Please provide payment name or price.')
    }

    try {
      const url = paymentToEdit
        ? `http://${IP}:8080/upcoming-payment/${paymentToEdit.id}`
        : `http://${IP}:8080/upcoming-payment`
      const method = paymentToEdit ? 'PUT' : 'POST'
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payment),
      })
      console.log(response)

      if (!response.ok) {
        throw new Error('Failed to add upcoming payment')
      }

      Alert.alert(
        'Success',
        paymentToEdit ? 'Upcoming payment updated successfully' : 'Upcoming payment added successfully',
      )
      navigation.goBack()
    } catch (error) {
      console.error(error)
      Alert.alert('Error', 'There was a problem adding the upcoming payment')
    }
  }

  return (
    <Fragment>
      <ScrollView style={styles.container} keyboardDismissMode='none'>
        <View style={styles.iconContainer}>
          <FontAwesome5 name='money-bill' style={styles.icon} size={40} color='white' />
        </View>

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
          <Text style={styles.inputLabel}>Amount</Text>
          <TextInput
            style={styles.input}
            textAlign='right'
            keyboardType='numeric'
            value={price}
            onChangeText={setPrice}
            onFocus={() => setIsAnyTextInputFocused(true)}
            onBlur={() => setIsAnyTextInputFocused(false)}
          />
          <Text style={styles.inputRightText}>$</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Renewal Period</Text>
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
            placeholder={'Choose a period'}
            value={renewalPeriod}
            onChange={(item) => {
              setRenewalPeriod(item.value as RenewalPeriod)
            }}
          />
        </View>

        {!['', 'NONE'].includes(renewalPeriod) && (
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Repetition</Text>
            <TextInput
              style={styles.input}
              textAlign='right'
              keyboardType='numeric'
              value={repetition}
              onChangeText={setRepetition}
              onFocus={() => setIsAnyTextInputFocused(true)}
              onBlur={() => setIsAnyTextInputFocused(false)}
            />
            <Text style={styles.inputRightText}>
              {renewalPeriodData.find((item) => item.value === renewalPeriod)?.label}
            </Text>
          </View>
        )}

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Due Date</Text>
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
          <Text style={styles.inputLabel}>Category</Text>
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
            placeholder={'Choose a category'}
            value={category}
            onChange={(item) => {
              setCategory(item.value as Category)
            }}
          />
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
    </Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
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
    borderBottomColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'flex-end',
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
    paddingRight: 20,
    fontSize: 16,
    textAlign: 'right',
    color: 'white',
  },
  descriptionContainer: {
    width: '100%',
    paddingBottom: 10,
  },
  description: {
    color: 'white',
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
})
