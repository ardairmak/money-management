import React, { useState, Fragment } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { Colors } from '../constants/Colors'

let toggleHamburger: () => void
let closeHamburger: () => void

export default function HamburgerBar() {
  const [isHamburgerVisible, setIsHamburgerVisible] = useState(false)

  toggleHamburger = () => {
    setIsHamburgerVisible(!isHamburgerVisible)
  }

  closeHamburger = () => {
    setIsHamburgerVisible(false)
  }

  const onButtonPressSettings = () => {
    console.log('Pressed Ayarlar')
  }

  const onButtonPressContacts = () => {
    console.log('Pressed İletişim')
  }

  const onButtonPressSignout = () => {
    console.log('Pressed Çıkış Yap')
  }

  return (
    <Fragment>
      {isHamburgerVisible && (
        <View style={styles.hamburgerBar}>
          <Ionicons
            name='close'
            size={50}
            color={Colors.primary}
            onPress={closeHamburger}
            style={{ marginLeft: 18, marginTop: 40 }}
          />
          <TouchableOpacity style={styles.barItem} onPress={onButtonPressSettings}>
            <Text style={styles.barItemText}>Ayarlar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.barItem} onPress={onButtonPressContacts}>
            <Text style={styles.barItemText}>İletişim</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.barItem, styles.signOut]} onPress={onButtonPressSignout}>
            <Text style={styles.barItemText}>Çıkış Yap</Text>
          </TouchableOpacity>
        </View>
      )}
    </Fragment>
  )
}

export { toggleHamburger, closeHamburger }

const styles = StyleSheet.create({
  hamburgerBar: {
    backgroundColor: Colors.secondary,
    position: 'absolute',
    left: 0,
    top: 0,
    width: '60%',
    height: '100%',
  },
  barItem: {
    flexDirection: 'row',
    margin: 5,
    marginTop: 20,
    marginLeft: 30,
    width: '70%',
  },
  signOut: {
    position: 'absolute',
    bottom: 100,
    borderTopWidth: 1,
    borderColor: 'white',
    paddingTop: 15,
  },
  barItemText: {
    flexDirection: 'row',
    fontSize: 30,
    color: Colors.primary,
  },
})
