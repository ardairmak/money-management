import React from 'react'
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'

import Navigation from './navigation/Navigation'
import FloatingActionButton from './components/FloatingActionButton'
import { closeFABPopup } from './components/FloatingActionButton'
import HamburgerBar, { closeHamburger } from './components/HamburgerBar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const closePopups = () => {
  closeFABPopup()
  closeHamburger()
}

export default function App() {
  return (
    <TouchableWithoutFeedback onPress={closePopups}>
      <GestureHandlerRootView style={styles.container}>
        <Navigation />
        <FloatingActionButton />
        <HamburgerBar />
      </GestureHandlerRootView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
