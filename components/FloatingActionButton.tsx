import React, { Fragment, useState } from 'react'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

import { Colors } from '../constants/Colors'
import { NavigationProp } from '../type'

let closeFABPopup: () => void

function FloatingActionButtonPopup({ navigation }: NavigationProp) {
  const onButtonPressA = () => {
    console.log('Pressed gelir gider ekle')
    closeFABPopup()
    navigation.navigate('IEPS')
  }

  const onButtonPressB = () => {
    console.log('Pressed gelecek odeme ekle')
    closeFABPopup()
    navigation.navigate('FPPS')
  }

  const onButtonPressC = () => {
    console.log('Pressed etkinlik ekle')
    closeFABPopup()
    navigation.navigate('APS')
  }

  return (
    <Fragment>
      <TouchableOpacity style={styles.button} onPress={onButtonPressA}>
        <Text style={styles.buttonText}>Add Income/Expense</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onButtonPressB}>
        <Text style={styles.buttonText}>Add Future Payment</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button,{borderBottomWidth: 0}]} onPress={onButtonPressC}>
        <Text style={styles.buttonText}>Add Event</Text>
      </TouchableOpacity>
    </Fragment>
  )
}

export default function FloatingActionButton() {
  const [showPopup, setShowPopup] = useState(false)
  const navigation = useNavigation<NavigationProp>()

  const toggleFABPopup = () => {
    setShowPopup(!showPopup)
  }

  closeFABPopup = () => {
    setShowPopup(false)
  }

  const onButtonPress = () => {
    toggleFABPopup()
    console.log('FAB pressed')
  }

  return (
    <Fragment>
      {showPopup && (
        <View style={styles.fabPopup}>
          <FloatingActionButtonPopup navigation={navigation} />
        </View>
      )}
      <TouchableOpacity style={styles.fab} onPress={onButtonPress}>
        <View
          style={{
            position: 'absolute',
            width: 58,
            height: 58,
            top: 9,
            left: 5,
            borderRadius: 35,
            backgroundColor: 'white',
          }}
        />
        <Ionicons name='add-circle' style={{}} size={72} color={Colors.primary} />
      </TouchableOpacity>
    </Fragment>
  )
}

export { closeFABPopup }

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 15,
    bottom: 80,

  },
  fabPopup: {
    backgroundColor: Colors.secondary,
    position: 'absolute',
    right: 15,
    bottom: 160,
    borderWidth: 2,
  },
  button: {
    flexDirection: 'row',
    padding: 5,
    paddingLeft: 10,
    height: 35,
    width: 200,
    borderBottomWidth: 1,
    borderColor: 'white',
    backgroundColor: Colors.primary,

  },
  buttonText: {
    color: Colors.buttonColor,
    fontSize: 17,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
})
