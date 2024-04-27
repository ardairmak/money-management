import React from 'react'
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import StackNavigation from './navigation/StackNavigation'
import FloatingActionButton, { closeFABPopup } from './components/FloatingActionButton'
import HamburgerBar, { closeHamburger } from './components/HamburgerBar'

const closePopups = () => {
  Keyboard.dismiss()
  closeFABPopup()
  closeHamburger()
}

export default function App() {
  return (
    <TouchableWithoutFeedback onPress={closePopups}>
      <GestureHandlerRootView style={styles.container}>
        <StackNavigation />
      </GestureHandlerRootView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
