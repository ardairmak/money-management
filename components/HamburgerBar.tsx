import React, { useState, Fragment, useRef, useEffect } from 'react'
import { Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { Colors } from '../constants/Colors'

let toggleHamburger: () => void
let closeHamburger: () => void

export default function HamburgerBar() {
  const [isHamburgerVisible, setIsHamburgerVisible] = useState(false)
  const slideAnim = useRef(new Animated.Value(-300)).current

  toggleHamburger = () => {
    setIsHamburgerVisible(!isHamburgerVisible)
  }

  closeHamburger = () => {
    setIsHamburgerVisible(false)
  }

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isHamburgerVisible ? 0 : -300,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start()
  }, [isHamburgerVisible])

  const onButtonPressSettings = () => {
    console.log('Pressed Ayarlar')
    closeHamburger()
  }

  const onButtonPressContacts = () => {
    console.log('Pressed İletişim')
    closeHamburger()
  }

  const onButtonPressSignout = () => {
    console.log('Pressed Çıkış Yap')
    closeHamburger()
  }

  return (
    <Fragment>
      <Animated.View style={[styles.hamburgerBar, { transform: [{ translateX: slideAnim }] }]}>
        <Ionicons
          name='close'
          size={50}
          color={Colors.primary}
          onPress={closeHamburger}
          style={{ marginLeft: 18, marginTop: 40 }}
        />
        <TouchableOpacity style={styles.barItem} onPress={onButtonPressSettings}>
          <Text style={styles.barItemText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.barItem} onPress={onButtonPressContacts}>
          <Text style={styles.barItemText}>Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.barItem, styles.signOut]} onPress={onButtonPressSignout}>
          <Text style={styles.barItemText}>Sign Out</Text>
        </TouchableOpacity>
      </Animated.View>
    </Fragment>
  )
}

export { toggleHamburger, closeHamburger }

const styles = StyleSheet.create({
  hamburgerBar: {
    backgroundColor: Colors.itemColor,
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
    color: Colors.buttonColor,
  },
})
