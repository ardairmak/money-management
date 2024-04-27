import React, { useState } from 'react'
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { ScrollView, Swipeable } from 'react-native-gesture-handler'

import { Colors } from '../constants/Colors'
import { getDaysDifference } from '../helpers/dateHelpers'
import { iconPaths } from '../constants/IconPaths'
import { MockData } from '../constants/MockData'

const UpcomingPaymentScreen = () => {
  let data = MockData

  const [searchItem, setSearchItem] = useState('')
  const [filteredData, setFilteredData] = useState(data)

  data.sort((a, b) => {
    const differenceInDaysA = getDaysDifference(a.date)
    const differenceInDaysB = getDaysDifference(b.date)
    return differenceInDaysA - differenceInDaysB
  })

  // Add more expense items here if needed

  const getItemBackgroundColor = (date: string) => {
    const differenceIndays = getDaysDifference(date)
    return differenceIndays <= 31 ? Colors.tertiary : Colors.upcomingPaymentColor
  }

  const handleSearch = (text: string) => {
    setSearchItem(text)
    const filteredData = data.filter((item) => item.name.toLowerCase().startsWith(searchItem.toLowerCase()))
    setFilteredData(filteredData)
  }

  const handleEdit = (id: string) => {
    console.log('Edit', id)
  }

  const handleDelete = (id: string) => {
    data = filteredData.filter((item) => item.id !== id)
    setFilteredData(data)
  }

  const renderItem = ({
    item,
    index,
  }: {
    item: {
      id: string
      name: string
      date: string
      price: string
      icon: string
    }
    index: number
  }) => {
    const backgroundColor = getItemBackgroundColor(item.date)
    const itemNameColor = backgroundColor === 'white' ? 'black' : 'white'

    const rightSwipe = () => {
      return (
        <View style={[styles.swipeActions, { backgroundColor: backgroundColor }]}>
          <TouchableOpacity
            onPress={() => handleEdit(item.id)}
            style={{
              width: 50,
              height: 50,
              backgroundColor: 'lightgrey',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
            }}
          >
            <Ionicons
              name='information-circle-outline'
              size={30}
              e
              style={{ justifyContent: 'center', alignItems: 'center', color: 'black' }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDelete(item.id)}
            style={{
              width: 50,
              height: 50,
              backgroundColor: 'rgb(175, 0, 0)',
              marginHorizontal: 5,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 40,
            }}
          >
            <Ionicons
              name='trash'
              size={30}
              style={{ justifyContent: 'center', alignItems: 'center', color: 'rgba(255, 255, 255, 0.9)' }}
            />
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <Swipeable renderRightActions={rightSwipe}>
        <View style={styles.itemContainer}>
          <Animated.View
            style={[
              styles.item,
              {
                backgroundColor: backgroundColor,
                borderBottomLeftRadius: index === filteredData.length - 1 ? 20 : 0,
                borderBottomRightRadius: index === filteredData.length - 1 ? 20 : 0,
              },
              index === data.length - 1 && styles.noBottomBorder,
            ]}
          >
            <Image source={iconPaths[item.name]} style={styles.itemIcon} />
            <View style={styles.itemDetails}>
              <Text style={(styles.itemName, { color: itemNameColor })}>{item.name}</Text>
              <Text style={styles.itemDate}>{item.date}</Text>
            </View>
            <Text style={styles.itemPrice}>{item.price}</Text>
          </Animated.View>
        </View>
      </Swipeable>
    )
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.primary }}>
      <View style={styles.container}>
        <View style={styles.middleSection}>
          <Text style={styles.middleTitle}>This months planned total</Text>
          <Text style={styles.amount}>$120.45</Text>
        </View>
        <View style={styles.upcomingSection}>
          <View style={styles.searchSection}>
            <Ionicons name='search-outline' size={24} color={Colors.primary} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder='Search Payment'
              placeholderTextColor={'black'}
              onChange={(e) => handleSearch(e.nativeEvent.text)}
            />
          </View>
          {/* Fourth Section (Upcoming Payments) */}

          <ScrollView style={[styles.upcomingContainer, { height: data.length * 70 > 350 ? 350 : data.length * 70 }]}>
            <Text style={styles.upcomingTitle}>Upcoming Payments</Text>
            {filteredData.map((item, index) => renderItem({ item, index }))}
            {filteredData.length === 0 && <Text style={styles.noPaymentText}>No upcoming payment!</Text>}
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default UpcomingPaymentScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    paddingTop: 20,
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40,
    overflow: 'hidden',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.secondary,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  itemDate: {
    fontSize: 14,
    color: '#ccc',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  itemIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  middleSection: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: Colors.primary,
    paddingBottom: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: 'hidden',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
    backgroundColor: Colors.tertiary,
    marginLeft: 60,
    marginRight: 60,
    marginBottom: 10,
    borderRadius: 30,
  },
  middleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: Colors.tertiary,
    color: 'white',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  upcomingSection: {
    backgroundColor: Colors.primary,
    paddingTop: 20,
  },
  upcomingTitle: {
    flexDirection: 'row',
    paddingLeft: 30,
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    paddingBottom: 5,
    borderBottomWidth: 1,
    color: 'white',
    borderBottomColor: Colors.secondary,
  },
  flatListContentContainer: {
    marginBottom: 20,
    // Adjust the padding as needed
  },
  upcomingContainer: {
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 20,
    paddingTop: 10,
    backgroundColor: Colors.tertiary,
  },
  noBottomBorder: {
    borderBottomWidth: 0,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  swipeActions: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.secondary,
  },
  noPaymentText: {
    margin: 20,
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
  },
})
