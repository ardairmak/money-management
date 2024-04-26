import React, { useState } from 'react'
import { Fragment } from 'react'
import {Text, StyleSheet, View, TextInput, Button, TouchableOpacity, KeyboardAvoidingView, ScrollView} from 'react-native';
import { Colors } from '../constants/Colors'
import { Ionicons } from '@expo/vector-icons';
import {StackActions} from "@react-navigation/native";
import RNPickerSelect from 'react-native-picker-select';
//import DateTimePickerModal from '@react-native-modal/datetime-picker';


export default function IncomeExpensePopupScreen() {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  //const [date, setDate] = useState(new Date());
  const [date, setDate] = useState("")
  const [description, setDescription] = useState('');
  const [isIncome, setIsIncome] = useState(true);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  /*
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (selectedDate: Date | null) => {
    const currentDate = selectedDate || new Date(); // If no date is selected, default to today's date
    setDate(currentDate);
    hideDatePicker(); 
  };
  */

  const onPop = () => {
    const popAction = StackActions.pop(1) //pops a particular screen
    //navigation.dispatch(popAction);
  };

  const onSubmit = () => {
    const transaction = { name, price, category, date, description, isIncome }
    if (!name || !price) return alert("Lütfen harcama adını ve miktarını girin!")

    //dispatch(addTransaction(transaction)) //addTransaction değişecek
    //resetting variables
    setName('')
    setPrice('') 
    setCategory('')
    setCategory('');
    //setDate(new Date());
    setDate('');
    setDescription('');
    //navigation.navigate("BudgetScreen");
    onPop();
};
  
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView>
        {/* Name Input Area */}
        <View style={[styles.inputContainer, {flex: 1, borderWidth: 1, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 10, marginLeft: 20, marginRight: 20, marginBottom: 10, marginTop: 25,}]}>
          <TextInput style={[styles.input, { fontSize: 25, borderBottomWidth: 0, color: Colors.primary }]}
            placeholder="Harcama Adı"
            value={name}
            onChangeText={setName}
            placeholderTextColor={Colors.secondary}
          />
        </View>

        {/* Income/Expense Buttons */}
        <View style={[styles.formItem, {justifyContent: 'center'}]}>
          <TouchableOpacity onPress={() => setIsIncome(true)} style={[styles.button, { marginRight: 40 }, { backgroundColor: isIncome ? Colors.primary : Colors.secondary }]}>
            <Text style={[styles.buttonText, { color: isIncome ? "white" : "green" }]}>
              GELİR
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsIncome(false)} style={[styles.button, { backgroundColor: isIncome ? Colors.secondary : Colors.primary }]}>
            <Text style={[styles.buttonText, { color: !isIncome ? "white" : "red" }]}>
              GİDER
            </Text>
          </TouchableOpacity>
        </View>

        {/* Input areas */}
        <View style={styles.inputContainer}>
          <Text style={styles.formItem}>Kategori</Text>
          <RNPickerSelect
            placeholder={{
              label: 'Kategori Seçmek İçin Tıklayın',
              value: null,
              color: Colors.primary
            }}
            onValueChange={(value) => setCategory(value)}
            items={[
              { label: 'Alışveriş', value: 'Alışveriş' },
              { label: 'Seyahat', value: 'Seyahat' },
              { label: 'Fatura', value: 'Fatura' },
            ]}
            style={{
              inputIOS: styles.input,
              inputAndroid: styles.input,
            }}
            useNativeAndroidPickerStyle={false} // Ensure native Android picker style is not used
          />                    
        </View>

        {/* Gelir gidere göre renkli +, -ekle */}
        <View style={styles.inputContainer}>
          <Text style={styles.formItem}>Ücret</Text>
          <TextInput
            style={[styles.input, { color: price.trim() ? Colors.primary : Colors.secondary }]}
            placeholder={"100 TL"}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
          
        </View>
          
        <View style={styles.inputContainer}>  
          <Text style={styles.formItem}>Tarih</Text>
          {/*
            <TouchableOpacity onPress={showDatePicker}>
              <Text>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          */}
          <TextInput
            style={[styles.input, { color: date.trim() ? Colors.primary : Colors.secondary }]}
            placeholder={"28.05.2024"}
            value={date}
            onChangeText={setDate}
            keyboardType="numeric"
          />
        </View>

        <View style={[styles.inputContainer, {borderBottomWidth: 0}]}> 
          <Text style={styles.formItem}>Açıklama</Text>
        </View>
        <View style={[styles.inputContainer, {backgroundColor: Colors.secondary, borderRadius: 20, paddingVertical: 40, paddingHorizontal: 10, marginLeft: 20, marginRight: 20, marginBottom: 10}]}>
          <TextInput
            style={[styles.input, {borderBottomWidth: 0, height: 50,  paddingTop: 15, paddingBottom: 15 }, { color: description !== "" ? Colors.primary : "white" }]}
            placeholder="File market harcaması"
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
          />
        </View>
      </ScrollView>

        {/* Save button */}
        <TouchableOpacity style={[styles.button, { backgroundColor: Colors.primary }, {position: 'absolute'}, {bottom: 40}, {right: 30}]} onPress={onSubmit}>
          <Text style={[styles.buttonText, { color: "white" }]}>EKLE</Text>
        </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  topScreen: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Colors.secondary,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.secondary,
    paddingVertical: 10,
  },
  input: {
    alignItems: 'center',
    paddingHorizontal: 10,
    marginLeft: 10, 
    fontSize: 18,
    color: Colors.primary,
  },
  formItem: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 18,
    color: "gray",
    paddingVertical: 10,
  },
  inputAndroid: {
    height: 40,
    borderWidth: 1,
    borderColor: Colors.secondary,
    fontSize: 18,
    color: Colors.primary,
    paddingHorizontal: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: Colors.secondary,
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 10,
    elevation: 7
  },
  buttonText: {
    fontSize: 20,
  },

})