import { Fragment } from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Colors } from '../constants/Colors'
import React from 'react'

export default function FloatingActionButtonPopup() {
  const onButtonPressA = () => {
    console.log('Pressed A')
  }

  const onButtonPressB = () => {
    console.log('Pressed B')
  }

  const onButtonPressC = () => {
    console.log('Pressed C')
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

const styles = StyleSheet.create({
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
