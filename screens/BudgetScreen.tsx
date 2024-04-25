import React from 'react'
import { useState } from 'react';
import {View, Text, StyleSheet,FlatList,TouchableOpacity} from 'react-native'
import {Ionicons,FontAwesome,MaterialCommunityIcons} from '@expo/vector-icons'

export default function BudgetScreen(){

  const [totalMoney, setTotalMoney] = useState(1650);
  
  const [budgetData] = useState([
    {
      month: 'Nisan',
      data: [
        { id: '1', name: 'Kira', amount: '-3200', icon: 'home' },
        { id: '2', name: 'Netflix', amount: '-30', icon: 'netflix' },
        { id: '3', name: 'KYK', amount: '+850', icon: 'money' },
        { id: '4', name: 'Market', amount: '-80', icon: 'shopping-cart' },
      ],
    },
    {
      month: 'Mayıs',
      data: [
        { id: '5', name: 'Netflix', amount: '-30', icon: 'netflix' },
        { id: '6', name: 'KYK', amount: '+850', icon: 'money' },
      ],
    },
  ]);

    const [filteredData, setFilteredData] = useState(budgetData);


    const renderItem = ({
      item
    }: {
      item: {
        id: string;
        name: string;
        amount: string;
        icon: string;
      }
    }) => (
      <View>
        <View style={styles.separator} /> 
        <View style={styles.budgetContainer}>
          <View style={styles.budgetItemContainer}>
            {renderIcon(item.icon)} 
            <Text style={styles.budgetItem}>{item.name}</Text>
            <Text style={[styles.amount, item.amount.startsWith('-') ? styles.negativeAmount : styles.positiveAmount]}>{item.amount}</Text>
          </View>
        </View>
      </View>
  );

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'home':
        return <FontAwesome name="home"  color="black" style={styles.budgetItem}  />;
      case 'money':
        return <FontAwesome name="money"  color="black" style={styles.budgetItem}  />;
      case 'netflix':
        return <MaterialCommunityIcons name="netflix"  color="black" style={styles.budgetItem}  />;
      case 'shopping-cart':
        return <FontAwesome name="shopping-cart"  color="black" style={styles.budgetItem}  />;
      default:
        return null; 
    }
  };

  const itemSeparator = () => (
    <View style={styles.separator} />
  );
  const handleTotalPress = (month: string) => {
    let totalAmount = 0;
    budgetData.forEach(item => {
      if (item.month === month) {
        item.data.forEach(item => {
          const amount = parseFloat(item.amount.replace(/[^0-9.-]+/g, ""));
          totalAmount += amount;
        });
      }
    });
    console.log('Total pressed');
    console.log('Total amount:', totalAmount);
    setTotalMoney(totalAmount);
    setFilteredData(budgetData);
  };

  const handleGelirPress = (month: string) => {
    let totalIncome = 0;
    const gelirData = budgetData.map(item => {
      let monthlyIncome = 0;
      if (item.month === month) {
        const incomeItems = item.data.filter(dataItem => {
          const amount = parseFloat(dataItem.amount.replace(/[^0-9.-]+/g, ""));
          if (amount > 0) {
            monthlyIncome += amount;
            totalIncome += amount;
            return true;
          }
          return false;
        });
        return {
          month: item.month,
          data: incomeItems,
          total: monthlyIncome.toFixed(2)
        };
      }
      return {
        month: item.month,
        data: item.data.filter(dataItem => parseFloat(dataItem.amount) > 0),
        total: "0.00"
      };
    });
  
    console.log('Total income:', totalIncome);
    setTotalMoney(totalIncome);
    setFilteredData(gelirData);
  };
  


  const handleGiderPress = (month: string) => {
    let totalExpenses = 0;
    const giderData = budgetData.map(item => {
      let monthlyExpenses = 0;
      let expenseItems: any[] = [];
  
      if (item.month === month) {
        expenseItems = item.data.filter(dataItem => {
          const amount = parseFloat(dataItem.amount.replace(/[^0-9.-]+/g, ""));
          if (amount < 0) {
            monthlyExpenses += amount;
            totalExpenses += amount;
            return true;
          }
          return false;
        });
      }
  
      return {
        month: item.month,
        data: expenseItems,
        total: monthlyExpenses.toFixed(2)
      };
    });
  
    console.log('Total expenses:', totalExpenses);
    setTotalMoney(totalExpenses);
    setFilteredData(giderData);
  };
  


    return (
      <View style={styles.container}>
        <View style={styles.paringRow}>
        <Text style={[styles.total, totalMoney < 0 ? styles.negativeAmount : styles.positiveAmount]}>{totalMoney}</Text>
        <FontAwesome style={styles.currencyIcon} name="turkish-lira" size={30} color="black" />
        </View>

      <View style={styles.paringRow}>
      <TouchableOpacity style={styles.pair} onPress={() => handleTotalPress('Nisan')}>
        <Text style={styles.title}>Toplam</Text>
        <MaterialCommunityIcons name="ellipse" size={15} color='#083c5c' />
      </TouchableOpacity>
      <TouchableOpacity style={styles.pair} onPress={() => handleGelirPress('Nisan')}>
        <Text style={styles.title}>Gelir</Text>
        <MaterialCommunityIcons name="ellipse" size={15} color= '#083c5c' />
      </TouchableOpacity>
      <TouchableOpacity style={styles.pair} onPress={() => handleGiderPress('Nisan')}>
        <Text style={styles.title}>Gider</Text>
        <MaterialCommunityIcons name="ellipse" size={15} color='#083c5c' />
      </TouchableOpacity>
      </View>

      <View>
      <FlatList
  data={filteredData}
  renderItem={({ item }) => {
    // Check if there are any data items for the month
    if (item.data.length > 0) {
      return (
        <View style={styles.monthBox}>
          <View style={styles.monthContainer}>
            <Text style={styles.monthTitle}>{item.month}</Text>
            <FlatList
              data={item.data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      );
    } else {
      return null; // Skip rendering the month box if there are no data items
    }
  }}
  keyExtractor={(_, index) => index.toString()}
/>

      </View>

    </View>
    );
};
  const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#bfc3cc',
    },

    budgetItem:{
      fontSize:15,
      fontWeight:'300',
      marginLeft:50,
      marginVertical:5,
      color:'white',
    },
    budgetContainer:{
      marginTop:10,
    },
    budgetItemContainer:{
      flexDirection: 'row',
    },
    amount: {
      fontSize: 20,
      fontWeight: 'bold',
      marginHorizontal:120, 
      marginVertical: 5,
    },
    negativeAmount: {
      color: '#b90e0a',
    },
    positiveAmount: {
      color: 'green',
    },
    separator:{
      height:1,
      marginHorizontal:40, // çizgilerin kenarlardan boşlukları
      backgroundColor: 'white',
    },
    total:{
      paddingLeft:10,
      fontSize:50,
      fontWeight:'bold',
      color:'black',
      marginTop:40,
      
    },
    paringRow:{
      flexDirection:'row',
      alignSelf:'center',
      marginVertical: 20,
    },
    currencyIcon:{
      paddingLeft:10,
      marginTop:60, // tl nin yukarıdan boşluğu
      color: '#083c5c',
    },
    title: {
      padding:10,
      fontSize: 18,
      fontWeight: '600',
      marginLeft: 10,
      marginRight:10, 
      color:'#083c5c',
      marginTop:5,
    },
    pair: {
      flexDirection: 'column', 
      alignItems: 'center',
      marginRight: 20, 
      marginTop:10,
    },

    monthContainer: {
      marginBottom: 10,
    },
    monthTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      marginLeft:165,
      marginRight:100,
      color: 'white',
    },
    monthBox: {
      backgroundColor: '#9094ac', 
      borderRadius: 15, // Add border radius to make it look like a box
      padding: 10, // Add padding to space content from the box edges
      marginBottom: 15, // Add margin bottom to space boxes from each other
      marginHorizontal:10,
      elevation: 3, // Add elevation to give it a shadow effect
    },
  })


