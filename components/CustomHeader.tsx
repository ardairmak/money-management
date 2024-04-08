import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../constants/Colors'
import { toggleHamburger } from './HamburgerBar'

interface CustomHeaderProps {
  title: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title }) => {
  const onPressOnHamburgerMenuIcon = () => {
    console.log('Hamburger')
    toggleHamburger()
  }

  const onPressOnPersonIcon = () => {
    console.log('User thingy')
  }

  return (
    <SafeAreaView>
      <View style={styles.headerSection}>
        <TouchableOpacity>
          <Ionicons name='menu-outline' size={50} color='white' style={styles.icon} onPress={onPressOnHamburgerMenuIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity>
          <Ionicons name='person-circle-outline' size={50} color='white' style={styles.icon} onPress={onPressOnPersonIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 30,
    backgroundColor: Colors.primary,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
  },
  icon: {
    padding: 10,
  },
})

export default CustomHeader
