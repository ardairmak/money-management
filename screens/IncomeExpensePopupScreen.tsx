import React, { Fragment, useState } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { Dropdown } from 'react-native-element-dropdown'

import { Colors } from '../constants/Colors'
import { Category, IncomeExpense, NavigationProp } from '../type.d'

const categoryData = Object.keys(Category).map((key) => ({
  label: Category[key as keyof typeof Category],
  value: key,
}))

export default function IncomeExpensePopupScreen({ navigation }: NavigationProp) {
  const [isIncome, setIsIncome] = useState(true)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [date, setDate] = useState(new Date())
  const [description, setDescription] = useState('')

  const [isAnyTextInputFocused, setIsAnyTextInputFocused] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const newDate = selectedDate || date
    setDate(newDate)
    setShowDatePicker(false)

    console.log(newDate.toLocaleDateString('tr-tr'))
  }

  const handleSave = () => {
    const incomeExpense: IncomeExpense = {
      isIncome: isIncome,
      name: name,
      category: category as Category,
      price: price as unknown as number,
      date: date,
      description: description,
    }
    console.log(incomeExpense)

    if (!incomeExpense.name || !incomeExpense.price) {
      return alert(`Lütfen ${incomeExpense.isIncome ? 'gelir' : 'gider'} adını ve miktarını girin!`)
    }

    navigation.goBack()
  }

  return (
    <Fragment>
      <ScrollView style={styles.container} keyboardDismissMode='none'>
        <View style={styles.nameInputContainer}>
          <TextInput
            style={styles.nameInput}
            textAlign='center'
            placeholder={isIncome ? 'Gelir adı' : 'Gider adı'}
            value={name}
            onChangeText={setName}
            onFocus={() => setIsAnyTextInputFocused(true)}
            onBlur={() => setIsAnyTextInputFocused(false)}
          />
        </View>
        <View style={styles.formItem}>
          <TouchableOpacity
            onPress={() => setIsIncome(true)}
            style={[styles.settingButton, { backgroundColor: isIncome ? Colors.primary : Colors.secondary }]}
          >
            <Text style={[styles.settingButtonText, { color: isIncome ? 'white' : Colors.primary }]}>GELİR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsIncome(false)}
            style={[styles.settingButton, { backgroundColor: isIncome ? Colors.secondary : Colors.primary }]}
          >
            <Text style={[styles.settingButtonText, { color: !isIncome ? 'white' : Colors.primary }]}>GİDER</Text>
          </TouchableOpacity>
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
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>EKLE</Text>
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
  nameInputContainer: {
    borderWidth: 3,
    borderRadius: 10,
    borderColor: Colors.secondary,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginTop: 25,
    marginHorizontal: 20,
  },
  nameInput: {
    fontSize: 24,
  },
  formItem: {
    flexDirection: 'row',
  },
  settingButton: {
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginVertical: 30,
    marginHorizontal: 20,
  },
  settingButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
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
  saveButton: {
    backgroundColor: Colors.primary,
    position: 'absolute',
    bottom: 20,
    right: 20,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 24,
  },
})
