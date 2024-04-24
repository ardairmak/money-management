import { Fragment } from 'react'
import { StyleSheet, View } from 'react-native'

export default function ActivityPopupScreen() {
  return (
    <Fragment>
      <View style={styles.screen}></View>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
  },
})
