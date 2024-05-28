import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import { Colors } from '../constants/Colors';
import { Category, IncomeExpense } from '../type.d';

interface displayData {
  month: number;
  data: displayEntry[];
  total: string;
}

interface displayEntry {
  id: number;
  name: string;
  isIncome: boolean;
  price: number;
  icon: Category;
}

export default function BudgetScreen() {
  const [totalMoney, setTotalMoney] = useState(1.65);
  const [filteredData, setFilteredData] = useState<displayData[]>([]);
  const [unfilteredData, setUnfilteredData] = useState<IncomeExpense[]>([]);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  function getMonthName(monthIndex: number): string {
    if (monthIndex < 0 || monthIndex > 11) {
      throw new Error("Invalid month index");
    }
    return monthNames[monthIndex];
  }

  useEffect(() => {
    fetchIncomeExpense()
      .then((data) => {
        console.log('test');
        setUnfilteredData(data);
        setData();
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const fetchIncomeExpense = async () => {
    try {
      const response = await fetch(`http://172.20.10.2:8080/income-expense`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    } catch (error) {
      console.error('Failed to fetch income expense:', error);
      throw error;
    }
  };

  const parseNegativeAmount = (amount: number) => {
    return amount < 0 ? amount * -1 : amount;
  };

  const renderItem = ({ item }: { item: displayEntry }) => (
    <View>
      <View style={styles.separator} />
      <View style={styles.budgetContainer}>
        <View style={styles.budgetItemContainer}>
          
          {renderIcon(item.icon)}
          <Text style={styles.budgetText}>{item.name}</Text>
          <View style={styles.test}>
          <Text style={[styles.amount, item.isIncome ? styles.positiveAmount : styles.negativeAmount]}>
            {item.isIncome ? '+' : '-'}
            {item.price}
            
          </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderIcon = (category: Category) => {
    switch (category) {
      case Category.NONE:
        return <FontAwesome name='dot-circle-o' color={Colors.primary} style={styles.budgetItem} />;
      case Category.FOOD:
        return <MaterialCommunityIcons name='food' color={Colors.primary} style={styles.budgetItem} />;
      case Category.TRANSPORTATION:
        return <FontAwesome name='car' color={Colors.primary} style={styles.budgetItem} />;
      case Category.ENTERTAINMENT:
        return <FontAwesome name='gamepad' color={Colors.primary} style={styles.budgetItem} />;
      case Category.UTILITIES:
        return <MaterialCommunityIcons name='toolbox-outline' color={Colors.primary} style={styles.budgetItem} />;
      case Category.SHOPPING:
        return <FontAwesome name='shopping-cart' color={Colors.primary} style={styles.budgetItem} />;
      case Category.HEALTH:
        return <FontAwesome name='heartbeat' color={Colors.primary} style={styles.budgetItem} />;
      case Category.EDUCATION:
        return <FontAwesome name='book' color={Colors.primary} style={styles.budgetItem} />;
      case Category.OTHER:
        return <FontAwesome name='th-large' color={Colors.primary} style={styles.budgetItem} />;
      default:
        return null;
    }
  };

  const handleTotalPress = (month: number) => {
    let totalAmount = 0;

    unfilteredData.reduce((acc, item) => {
      const itemDate = new Date(item.date); // Convert the date string to a Date object
      if (itemDate.getMonth() === month) {
        const amount = parseFloat(item.price);
        totalAmount += (item.isIncome) ? amount : -amount;
      }
    });

    console.log('Total expense:', totalAmount);
    setTotalMoney(totalAmount);
    setData()
    //setFilteredData([{ month, data: giderData, total: totalAmount.toFixed(2) }]);
  };
  const setData = () => {
    if (unfilteredData.length > 0) {
      const formattedData: displayData[] = Array.from({ length: 12 }, (_, month) => {
        const monthData = unfilteredData.filter(item => new Date(item.date).getMonth() === month)
          .map(item => ({
            id: Math.random(),
            name: item.name,
            isIncome: item.isIncome,
            price: parseFloat(item.price),
            icon: item.category
          }));
        const total = monthData.reduce((acc, item) => acc + (item.isIncome ? item.price : -item.price), 0);
        return { month, data: monthData, total: total.toFixed(2) };
      }).filter(month => month.data.length > 0); // Filter out empty months
      setFilteredData(formattedData);
    }
  };

  const handleGelirPress = (month: number) => {
    let totalIncome = 0;

    const gelirData = unfilteredData.reduce((acc, item) => {
      const itemDate = new Date(item.date); // Convert the date string to a Date object
      if (itemDate.getMonth()  === month && item.isIncome) {
        const amount = parseFloat(item.price);
        totalIncome += amount;
        acc.push({
          id: Math.random(),
          name: item.name,
          isIncome: item.isIncome,
          price: amount,
          icon: item.category
        });
      }
      return acc;
    }, [] as displayEntry[]);


    console.log('Total income:', totalIncome);
    setTotalMoney(totalIncome);
    setData()
    //setFilteredData([{ month, data: gelirData, total: totalIncome.toFixed(2) }]);
  };

  const handleGiderPress = (month: number) => {
    let totalExpense = 0;

    const giderData = unfilteredData.reduce((acc, item) => {
      const itemDate = new Date(item.date); // Convert the date string to a Date object
      if (itemDate.getMonth() === month && !item.isIncome) {
        const amount = parseFloat(item.price);
        totalExpense += amount;
        acc.push({
          id: Math.random(),
          name: item.name,
          isIncome: item.isIncome,
          price: amount,
          icon: item.category
        });
      }
      return acc;
    }, [] as displayEntry[]);

    console.log('Total expense:', totalExpense);
    setTotalMoney(totalExpense);
    setData()
    //setFilteredData([{ month, data: giderData, total: totalExpense.toFixed(2) }]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.paringRow}>
        <FontAwesome
          name='dollar'
          size={45}
          style={[styles.currencyIcon, { color: totalMoney < 0 ? '#cc0000' : '#06c258' }]}
        />
        <Text style={[styles.total, totalMoney < 0 ? styles.negativeAmount : styles.positiveAmount]}>
          {parseNegativeAmount(totalMoney)}
        </Text>
      </View>

      <View style={[styles.paringRow, { marginLeft: 35 }]}>
        <TouchableOpacity style={styles.pair} onPress={() => handleTotalPress(4)}>
          <Text style={styles.title}>Total</Text>
          <MaterialCommunityIcons name='ellipse' size={15} color={Colors.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.pair} onPress={() => handleGelirPress(4)}>
          <Text style={styles.title}>Income</Text>
          <MaterialCommunityIcons name='ellipse' size={15} color={Colors.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.pair} onPress={() => handleGiderPress(4)}>
          <Text style={styles.title}>Expense</Text>
          <MaterialCommunityIcons name='ellipse' size={15} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <FlatList
  data={filteredData}
  renderItem={({ item }) => (
    <View style={styles.monthBox}>
      <Text style={styles.monthTitle}>{getMonthName(item.month)}</Text>
      <FlatList
        data={item.data}
        renderItem={renderItem}
        keyExtractor={(entry) => entry.id.toString()}  // Corrected key extraction for nested FlatList
      />
    </View>
  )}
  keyExtractor={(item) => item.month.toString()}  // Ensure top-level FlatList has unique keys
/>
    </View>
  );
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
    // backgroundColor: 'red',
    // width: '50%'
  },
  budgetText: {
    fontSize: 15,
    fontWeight: '300',
    marginLeft: 50,
    marginVertical: 5,
    color: 'white',
    width: '25%',
    // backgroundColor: 'red',
  },
  budgetContainer: {
    marginTop: 10,
    // backgroundColor: 'red'
  },
  budgetItemContainer: {
    flexDirection: 'row',
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 80,
    marginVertical: 5,
    // backgroundColor: 'red'
  },
  test: {
    // backgroundColor: 'red'

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
  },
  monthBox2:{
    backgroundColor: Colors.tertiary, //itemColor
    borderRadius: 15, // Add border radius to make it look like a box
    padding: 10, // Add padding to space content from the box edges
    marginTop: 1,
    // Add margin bottom to space boxes from each other
  }
  
  
})
