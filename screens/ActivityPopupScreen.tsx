import React, { useState } from 'react'
import { Fragment } from 'react'
import {Text, StyleSheet, View, TextInput, Button, TouchableOpacity, KeyboardAvoidingView, ScrollView} from 'react-native';
import { Colors } from '../constants/Colors'
import { Ionicons } from '@expo/vector-icons';
import {StackActions} from "@react-navigation/native";
import RNPickerSelect from 'react-native-picker-select';


export default function IncomeExpensePopupScreen() {
  const [name, setName] = useState("")
  const [date, setDate] = useState("")
  const [hour, setHour] = useState("")
  const [reminder, setReminder] = useState("")
  const [repeat, setRepeat] = useState("")
  const [color, setColor] = useState("")
  const [description, setDescription] = useState('');

  const onPop = () => {
    const popAction = StackActions.pop(1) //pops a particular screen
    //navigation.dispatch(popAction);
  };

  const onSubmit = () => {
    const transaction = { name, date, hour, reminder, repeat, color, description }
    if (!name || !date) return alert("Lütfen etkinlik adını ve tarihini girin!")

    //dispatch(addTransaction(transaction)) //addTransaction değişecek
    //resetting variables
    setName('')
    setDate('') 
    setHour('')
    setReminder('')
    setRepeat('')
    setColor('')
    setDate('');
    setDescription('');
    //navigation.navigate("CalenderScreen");
    onPop();
};
  
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView>
        {/* Name Input Area */}
        <View style={[styles.inputContainer, {flex: 1, borderWidth: 1, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 10, marginLeft: 20, marginRight: 20, marginBottom: 10, marginTop: 25,}]}>
          <TextInput style={[styles.input, { fontSize: 25, borderBottomWidth: 0, color: Colors.primary }]}
            placeholder="Etkinlik Adı"
            value={name}
            onChangeText={setName}
            placeholderTextColor={Colors.secondary}
          />
        </View>

        {/* Input areas */}
        <View style={styles.inputContainer}>  
          <Text style={styles.formItem}>Tarih</Text>
          <TextInput
            style={[styles.input]}
            placeholder={"28.05.2024"}
            value={date}
            onChangeText={setDate}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>  
          <Text style={styles.formItem}>Süre</Text>
          <TextInput
            style={[styles.input]}
            placeholder={"16.00"}
            value={hour}
            onChangeText={setHour}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.formItem}>Hatırlatıcı</Text>
          <RNPickerSelect
            placeholder={{
              label: 'Hatırlatıcı Eklemek İçin Tıklayın',
              value: null,
              color: Colors.primary
            }}
            onValueChange={(value) => setReminder(value)}
            items={[
              { label: '1 saat önce', value: 1 }, //value'lar düzenlenmeli
              { label: '1 gün önce', value: 24 },
              { label: '3 gün önce', value: 72 },
            ]}
            style={{
              inputIOS: styles.input,
              inputAndroid: styles.input,
            }}
            useNativeAndroidPickerStyle={false} // Ensure native Android picker style is not used
          />                    
        </View>

        
        <View style={styles.inputContainer}>
          <Text style={styles.formItem}>Tekrarla</Text>
          <RNPickerSelect
            placeholder={{
              label: 'Tekrarlamak İçin Tıklayın',
              value: null,
              color: Colors.primary
            }}
            onValueChange={(value) => setRepeat(value)}
            items={[
              { label: 'Asla', value: 0 }, //value'lar düzenlenmeli
              { label: 'Ayda 1 kere', value: 0 },
              { label: 'Yılda 1 kere', value: 0 },
            ]}
            style={{
              inputIOS: styles.input,
              inputAndroid: styles.input,
            }}
            useNativeAndroidPickerStyle={false} // Ensure native Android picker style is not used
          />                    
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.formItem}>Renk</Text>
          <RNPickerSelect
            placeholder={{
              label: 'Renk Seçmek İçin Tıklayın',
              value: null,
              color: Colors.primary
            }}
            onValueChange={(value) => setColor(value)}
            items={[
              { label: 'Pembe', value: 'Pink' }, //label'lar ve value'lar düzenlenmeli
              { label: 'Mavi', value: 'Blue' },
              { label: 'Yeşil', value: 'Green' },
            ]}
            style={{
              inputIOS: styles.input,
              inputAndroid: styles.input,
            }}
            useNativeAndroidPickerStyle={false} // Ensure native Android picker style is not used
          />                    
        </View>

        <View style={[styles.inputContainer, {borderBottomWidth: 0}]}> 
          <Text style={styles.formItem}>Açıklama</Text>
        </View>
        <View style={[styles.inputContainer, {backgroundColor: Colors.secondary, borderRadius: 20, paddingVertical: 40, paddingHorizontal: 10, marginLeft: 20, marginRight: 20, marginBottom: 10}]}>
          <TextInput
            style={[styles.input, {borderBottomWidth: 0, height: 50,  paddingTop: 15, paddingBottom: 15 }, { color: description.trim() ? Colors.primary : "white" }]}
            placeholder="..."
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
          />
        </View>
      </ScrollView>

        {/* Save button */}
        <TouchableOpacity style={[styles.button, { backgroundColor: Colors.primary }, {position: 'absolute'}, {bottom: 40}, {right: 30}]} onPress={onSubmit}>
          <Text style={[styles.buttonText, { color: "white" }]}>KAYDET</Text>
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