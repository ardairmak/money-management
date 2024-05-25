import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'

import { budgetData } from '../constants/MockData'
import { Colors } from '../constants/Colors'

export default function BudgetScreen() {
  let Data = budgetData

  const [totalMoney, setTotalMoney] = useState(1.65)
  const [filteredData, setFilteredData] = useState(Data)


  const parseNegativeAmount = (amount: number) => {
    if (amount < 0) {
        return amount * -1
        }
    return amount
  }

  const renderItem = ({ item }: { item: { id: string; name: string; amount: string; icon: string; type: string } }) => (
    <View>
      <View style={styles.separator} />
      <View style={styles.budgetContainer}>
        <View style={styles.budgetItemContainer}>
          {renderIcon(item.icon)}
          <Text style={styles.budgetItem}>{item.name}</Text>
          <Text style={[styles.amount, item.type === 'expense' ? styles.negativeAmount : styles.positiveAmount]}>
            {item.type === 'income' ? '+' : '-'}
            {item.amount}
          </Text>
        </View>
      </View>
    </View>
  )

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'home':
        return <FontAwesome name='home' color={Colors.primary} style={styles.budgetItem} />
      case 'money':
        return <FontAwesome name='money' color={Colors.primary} style={styles.budgetItem} />
      case 'netflix':
        return <MaterialCommunityIcons name='netflix' color={Colors.primary} style={styles.budgetItem} />
      case 'shopping-cart':
        return <FontAwesome name='shopping-cart' color={Colors.primary} style={styles.budgetItem} />
      default:
        return null
    }
  }

  const handleTotalPress = (month: string) => {
    let totalAmount = 0

    Data.forEach((item) => {
      if (item.month === month) {
        item.data.forEach((item) => {
          const amount = parseFloat(item.amount)

          if (item.type === 'expense') {
            totalAmount -= amount
          } else if (item.type === 'income') {
            totalAmount += amount
          }
        })
      }
    })

    console.log('Total pressed')
    console.log('Total amount:', totalAmount)
    setTotalMoney(totalAmount)
    setFilteredData(Data)
  }

  const handleGelirPress = (month: string) => {
    let totalIncome = 0
    const gelirData = Data.map((item) => {
      let monthlyIncome = 0
      let incomeItems: any[] = []

      // First iteration to calculate total income for the specific month
      if (item.month === month) {
        item.data.forEach((dataItem) => {
          const amount = parseFloat(dataItem.amount) * (dataItem.type === 'income' ? 1 : -1)
          if (amount > 0) {
            monthlyIncome += amount
          }
        })
      }

      // Second iteration to filter and process income items for the specific month
      item.data.forEach((dataItem) => {
        const amount = parseFloat(dataItem.amount) * (dataItem.type === 'income' ? 1 : -1)
        if (amount > 0) {
          incomeItems.push({ ...dataItem })
        }
      })

      // Update totalIncome for the specific month
      if (item.month === month) {
        totalIncome = monthlyIncome
      }
      return {
        month: item.month,
        data: incomeItems,
        total: monthlyIncome.toFixed(2),
      }
    })

    console.log('Total income:', totalIncome)
    setTotalMoney(totalIncome)
    setFilteredData(gelirData)
  }

  const handleGiderPress = (month: string) => {
    let totalExpense = 0
    const giderData = Data.map((item) => {
      let monthlyExpense = 0
      let expenseItems: any[] = []

      // First iteration to calculate total income for the specific month
      if (item.month === month) {
        item.data.forEach((dataItem) => {
          const amount = parseFloat(dataItem.amount) * (dataItem.type === 'income' ? 1 : -1)
          if (amount < 0) {
            monthlyExpense += amount
          }
        })
      }
      // Second iteration to filter and process income items for the specific month
      item.data.forEach((dataItem) => {
        const amount = parseFloat(dataItem.amount) * (dataItem.type === 'income' ? 1 : -1)
        if (amount < 0) {
          expenseItems.push({ ...dataItem })
        }
      })
      // Update totalIncome for the specific month
      if (item.month === month) {
        totalExpense = monthlyExpense
      }
      return {
        month: item.month,
        data: expenseItems,
        total: monthlyExpense.toFixed(2),
      }
    })

    console.log('Total expense:', totalExpense)
    setTotalMoney(totalExpense)
    setFilteredData(giderData)
  }

  return (
    <View style={styles.container}>
      <View style={styles.paringRow}>
        <FontAwesome
          name='dollar'
          size={45}
          style={[styles.currencyIcon, { color: totalMoney < 0 ? '#cc0000' : '#06c258' }]}
        />

        <Text style={[styles.total, totalMoney < 0 ? styles.negativeAmount : styles.positiveAmount]}>{parseNegativeAmount(totalMoney)}</Text>
      </View>

      <View style={[styles.paringRow, { marginLeft: 35 }]}>
        <TouchableOpacity style={styles.pair} onPress={() => handleTotalPress('April')}>
          <Text style={styles.title}>Total</Text>
          <MaterialCommunityIcons name='ellipse' size={15} color={Colors.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.pair} onPress={() => handleGelirPress('April')}>
          <Text style={styles.title}>Income</Text>
          <MaterialCommunityIcons name='ellipse' size={15} color={Colors.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.pair} onPress={() => handleGiderPress('April')}>
          <Text style={styles.title}>Expense</Text>
          <MaterialCommunityIcons name='ellipse' size={15} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredData}
        renderItem={({ item }) => {
          // Check if there are any data items for the month
          if (item.data.length > 0) {
            return (
              <View style={styles.monthBox}>
                <Text style={styles.monthTitle}>{item.month}</Text>
                <FlatList data={item.data} renderItem={renderItem} keyExtractor={(item) => item.id} />
              </View>
            )
          } else {
            return null // Skip rendering the month box if there are no data items
          }
        }}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },

  budgetItem: {
    fontSize: 15,
    fontWeight: '300',
    marginLeft: 50,
    marginVertical: 5,
    color: 'white',
  },
  budgetContainer: {
    marginTop: 10,
  },
  budgetItemContainer: {
    flexDirection: 'row',
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 120,
    marginVertical: 5,
  },
  negativeAmount: {
    color: '#cc0000',
  },
  positiveAmount: {
    color: '#06c258',
  },
  separator: {
    height: 1,
    marginHorizontal: 40, // çizgilerin kenarlardan boşlukları
    backgroundColor: 'white',
  },
  total: {
    alignSelf: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    color: Colors.primary,
    marginTop: 40,
  },
  paringRow: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 20,
  },
  currencyIcon: {
    paddingLeft: 10,
    marginTop: 56, // tl nin yukarıdan boşluğu
    marginRight: 5,
  },
  title: {
    padding: 10,
    fontSize: 18,
    fontWeight: '600',
    alignSelf: 'baseline',
    color: Colors.white,
    marginTop: 5,
  },
  pair: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 20,
    marginTop: 10,
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
    textAlign: 'center',
  },
  monthBox: {
    backgroundColor: Colors.tertiary, //itemColor
    borderRadius: 15, // Add border radius to make it look like a box
    padding: 5, // Add padding to space content from the box edges
    marginTop: 5,
    marginHorizontal: 15,
    marginBottom: 15, // Add margin bottom to space boxes from each other
    elevation: 3, // Add elevation to give it a shadow effect
  },
  /* outerBox: {
      flex: 1, // Make the outerBox take up all remaining space after the top sections
      backgroundColor: '#9094ac', // Light background color for the box
      borderRadius: 10, // Add some rounded corners for a nicer look
      marginTop: 20, // Add some margin from the top section
      marginBottom: 20, // Add some margin from the bottom
      marginHorizontal: 10, // Add horizontal margin for spacing
    },*/
})
