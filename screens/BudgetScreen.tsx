import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
//import { FontAwesome6 } from '@expo/vector-icons'
import { Fontisto } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { useState } from 'react';

export default function BudgetScreen() {

  const [totalMoney, setTotalMoney] = useState(1650);

  const [budgetData] = useState([
    {
      id: '1',
      name: 'Kira',
      amount: '-3200',
      icon: 'home',
    },
    {
      id: '2',
      name: 'Netflix',
      amount: '-30',
      icon: 'netflix',
    },
    {
      id: '3',
      name: 'KYK',
      amount: '+850',
      icon: 'money',
    },
    {
      id: '4',
      name: 'Market',
      amount: '-80',
      icon: 'shopping-cart',
    },
  ]);

  const [filteredData, setFilteredData] = useState(budgetData);


  interface BudgetItem {
    id: string;
    name: string;
    amount: string;
    icon: string;
  }
  
  const renderItem = ({item}: { item: BudgetItem }) => (
    <View style={styles.budgetContainer}>
      <View style={styles.budgetItemContainer}>
      {renderIcon(item.icon)} 
      <Text style={styles.budgetItem}>{item.name}</Text>
      <Text style={[styles.amount, item.amount.startsWith('-') ? styles.negativeAmount : styles.positiveAmount]}>{item.amount}</Text>
      </View>
    </View>
  );
  
  // Function to render icon based on icon name
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
        return null; // Render nothing if icon name is not recognized
    }
  };

  const itemSeparator = () => (
    <View style={styles.separator} />
  );

  const handleTotalPress = () => {
    let totalAmount = 0;
    budgetData.forEach(item => {
      // Remove non-numeric characters and convert to number
      const amount = parseFloat(item.amount.replace(/[^0-9.-]+/g,""));
      totalAmount += amount;
    });
    console.log('Total pressed');
    console.log('Total amount:', totalAmount);
    setTotalMoney(totalAmount);
    setFilteredData(budgetData);
    // You can now use the totalAmount variable to update the total display or perform any other action
  };
  
  const handleGelirPress = () => {
    let totalIncome = 0;
    budgetData.forEach(item => {
      const amount = parseFloat(item.amount.replace(/[^0-9.-]+/g,""));
      if (amount > 0) {
        totalIncome += amount;
      }
    });
    console.log('Total income:', totalIncome);
    setTotalMoney(totalIncome);
    const gelirData = budgetData.filter(item => parseFloat(item.amount) > 0);
    setFilteredData(gelirData);
  };
  
  const handleGiderPress = () => {
    let totalExpenses = 0;
    budgetData.forEach(item => {
      const amount = parseFloat(item.amount.replace(/[^0-9.-]+/g,""));
      if (amount < 0) {
        totalExpenses += amount;
      }
    });
    console.log('Total expenses:', totalExpenses);
    setTotalMoney(totalExpenses);
    const giderData = budgetData.filter(item => parseFloat(item.amount) < 0);
    setFilteredData(giderData);
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.paringRow}>
      <Text style={[styles.total, totalMoney < 0 ? styles.negativeAmount : styles.positiveAmount]}>{totalMoney}</Text>
        <FontAwesome style={styles.currencyIcon} name="turkish-lira" size={30} color="black" />
      </View>

      <View style={styles.paringRow}>
      <TouchableOpacity style={styles.pair} onPress={handleTotalPress}>
          <Text style={styles.title}>Toplam</Text>
          <MaterialCommunityIcons name="ellipse" size={15} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.pair} onPress={handleGelirPress}>
          <Text style={styles.title}>Gelir</Text>
          <MaterialCommunityIcons name="ellipse" size={15} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.pair} onPress={handleGiderPress}>
          <Text style={styles.title}>Gider</Text>
          <MaterialCommunityIcons name="ellipse" size={15} color="black" />
        </TouchableOpacity>
      </View>
      <View>
        <FlatList data={filteredData} renderItem={renderItem} ItemSeparatorComponent={itemSeparator} keyExtractor={item => item.id} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{},
  
  total:{
    paddingLeft:10,
    fontSize:50,
    fontWeight:'bold',
    color:'black',
    marginTop:60,
    
  },
  paringRow:{
    //padding: 20, // ???????
    //backgroundColor:'gray', //??????
    flexDirection:'row',
    alignSelf:'center',
    marginVertical: 20,
  },
  currencyIcon:{
    paddingLeft:10,
    marginTop:80, // tl nin yukarıdan boşluğu

  },
  title: {
    padding:10,
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
    marginRight:10, 
  },
  pair: {
    flexDirection: 'column', 
    alignItems: 'center',
    marginRight: 20, 
    marginTop:30,
  },

  middleContainer:{
    padding:20,
    backgroundColor: 'gray',
    alignContent:'center',
  },
  separator:{
    height:1,
    marginHorizontal:40, // çizgilerin kenarlardan boşlukları
    backgroundColor: '#083c5c',
  },
  budgetItem:{
    fontSize:20,
    fontWeight:'bold',
    marginLeft:50,
    marginVertical:5,
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
    marginHorizontal:120, // Adjust as needed
    marginVertical: 5,
  },
  negativeAmount: {
    color: 'red',
  },
  positiveAmount: {
    color: 'green',
  },
 

})
