import { Fragment, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import FloatingActionButtonPopup from './FloatingActionButtonPopup'
import React from 'react'

let closeFABPopup: () => void

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
})
