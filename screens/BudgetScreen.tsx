import React from 'react'
import { useState } from 'react';
import {View, Text, StyleSheet,FlatList,TouchableOpacity, SectionList} from 'react-native'
import {Ionicons,FontAwesome,MaterialCommunityIcons} from '@expo/vector-icons'
import { budgetData } from '../constants/MockData'


export default function BudgetScreen(){

  let Data = budgetData

  const [totalMoney, setTotalMoney] = useState(1650);
  const [filteredData, setFilteredData] = useState(Data);


  const renderItem = ({ item }: { item: { id: string; name: string; amount: string; icon: string; type: string } }) => (
    <View>
      <View style={styles.separator} /> 
      <View style={styles.budgetContainer}>
        <View style={styles.budgetItemContainer}>
          {renderIcon(item.icon)} 
          <Text style={styles.budgetItem}>{item.name}</Text>
          <Text style={[styles.amount, item.type === 'expense' ? styles.negativeAmount : styles.positiveAmount]}>
            {item.type === 'income' ? '+' : '-'}{item.amount}
          </Text>
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

  
  const handleTotalPress = (month: string) => {
    let totalAmount = 0;
  
    Data.forEach(item => {
      if (item.month === month) {
        item.data.forEach(item => {
          const amount = parseFloat(item.amount);
          
          if (item.type === 'expense') {
            totalAmount -= amount; 
          } else if (item.type === 'income') {
            totalAmount += amount; 
          }
        });
      }
    });
  
    console.log('Total pressed');
    console.log('Total amount:', totalAmount);
    setTotalMoney(totalAmount);
    setFilteredData(Data);
  };

  const handleGelirPress = (month: string) => {
    let totalIncome = 0;
    const gelirData = Data.map(item => {
      let monthlyIncome = 0;
      let incomeItems: any[] = [];
  
      // First iteration to calculate total income for the specific month
      if (item.month === month) {
        item.data.forEach(dataItem => {
          const amount = parseFloat(dataItem.amount) * (dataItem.type === 'income' ? 1 : -1);
          if (amount > 0) {
            monthlyIncome += amount;
          }
        });
      }
  
      // Second iteration to filter and process income items for the specific month
      item.data.forEach(dataItem => {
        const amount = parseFloat(dataItem.amount) * (dataItem.type === 'income' ? 1 : -1);
        if ( amount > 0) {
          incomeItems.push({ ...dataItem });
        }
      });
  
      // Update totalIncome for the specific month
      if (item.month === month) {
        totalIncome = monthlyIncome;
      }
      return {
        month: item.month,
        data: incomeItems,
        total: monthlyIncome.toFixed(2)
      };
    });
  
    console.log('Total income:', totalIncome);
    setTotalMoney(totalIncome);
    setFilteredData(gelirData);
  };

  const handleGiderPress = (month: string) => {
    let totalExpense = 0;
    const giderData = Data.map(item => {
      let monthlyExpense = 0;
      let expenseItems: any[] = [];
  
      // First iteration to calculate total income for the specific month
      if (item.month === month) {
        item.data.forEach(dataItem => {
          const amount = parseFloat(dataItem.amount) * (dataItem.type === 'income' ? 1 : -1);
          if (amount < 0) {
            monthlyExpense += amount;
          }
        });
      }
      // Second iteration to filter and process income items for the specific month
      item.data.forEach(dataItem => {
        const amount = parseFloat(dataItem.amount) * (dataItem.type === 'income' ? 1 : -1);
        if ( amount < 0) {
          expenseItems.push({ ...dataItem});
        }
      });
      // Update totalIncome for the specific month
      if (item.month === month) {
        totalExpense = monthlyExpense;
      }
      return {
        month: item.month,
        data: expenseItems,
        total: monthlyExpense.toFixed(2)
      };
    });
  
    console.log('Total income:', totalExpense);
    setTotalMoney(totalExpense);
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

      <View style={styles.outerBox}>
        <SectionList
          sections={filteredData} 
           
          renderSectionHeader={({ section }) => (
            <View style={styles.monthBox}>
              <Text style={styles.monthTitle}>{section.month}</Text>
            </View>
          )} 
          renderItem={renderItem}
          keyExtractor={(item) => item.id} 
          
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
      alignSelf:'center',
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
      alignSelf:'baseline',
      color:'#083c5c',
      marginTop:5,
    },
    pair: {
      flexDirection: 'column', 
      alignItems: 'center',
      marginRight: 20, 
      marginTop:10,
    },
    monthTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color: 'white',
      textAlign:'center',
    },
    monthBox: {
      backgroundColor: '#9094ac', //itemColor
      borderRadius: 15, // Add border radius to make it look like a box
      padding: 5, // Add padding to space content from the box edges
      marginTop:5,
      marginHorizontal:15,
      marginBottom: 15, // Add margin bottom to space boxes from each other
      elevation: 0, // Add elevation to give it a shadow effect
    },
    outerBox: {
      flex: 1, // Make the outerBox take up all remaining space after the top sections
      backgroundColor: '#9094ac', // Light background color for the box
      borderRadius: 10, // Add some rounded corners for a nicer look
      marginTop: 20, // Add some margin from the top section
      marginBottom: 20, // Add some margin from the bottom
      marginHorizontal: 10, // Add horizontal margin for spacing
    },
  })


