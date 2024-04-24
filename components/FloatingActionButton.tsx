import React, { Fragment, useState } from 'react'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { Colors } from '../constants/Colors'

let closeFABPopup: () => void

function FloatingActionButtonPopup() {
  const onButtonPressA = () => {
    console.log('Pressed gelir gider ekle')
    closeFABPopup()
  }

  const onButtonPressB = () => {
    console.log('Pressed gelecek odeme ekle')
    closeFABPopup()
  }

  const onButtonPressC = () => {
    console.log('Pressed etkinlik ekle')
    closeFABPopup()
  }

  return (
    <Fragment>
      <TouchableOpacity style={styles.button} onPress={onButtonPressA}>
        <Text style={styles.buttonText}>Gelir/Gider Ekle</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onButtonPressB}>
        <Text style={styles.buttonText}>Gelecek Ödeme Ekle</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onButtonPressC}>
        <Text style={styles.buttonText}>Etkinlik Ekle</Text>
      </TouchableOpacity>
    </Fragment>
  )
}

export default function FloatingActionButton() {
  const [showPopup, setShowPopup] = useState(false)

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
          <FloatingActionButtonPopup />
        </View>
      )}
      <TouchableOpacity style={styles.fab} onPress={onButtonPress}>
        <Ionicons name='add-circle' size={70} color={'#083c5c'} />
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
    backgroundColor: 'gray',
    position: 'absolute',
    right: 15,
    bottom: 160,
  },
  button: {
    flexDirection: 'row',
    padding: 5,
    paddingLeft: 10,
    height: 35,
    width: 200,
    borderBottomWidth: 1,
    borderColor: 'white',
    backgroundColor: Colors.secondary,
  },
  buttonText: {
    color: Colors.primary,
    fontSize: 17,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
})
