import React, { Fragment, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import { Colors } from '../constants/Colors';
import { NavigationProp } from '../type'

export default function Settings({ navigation }: NavigationProp) {
  const [language, setLanguage] = useState('en');

  const languageData = [
    { label: 'English', value: 'en' },
  ];

  return (
    <Fragment>
      <ScrollView style={styles.container} keyboardDismissMode="none">
        <View style={styles.iconContainer}>
          <FontAwesome5 name="cog" style={styles.icon} size={40} color="white" />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Language</Text>
          <Dropdown
            style={styles.input}
            containerStyle={styles.dropdownContainer}
            itemContainerStyle={styles.dropdownItemContainer}
            itemTextStyle={styles.dropdownItemText}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={languageData}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={'Choose a language'}
            value={language}
            onChange={(item) => {
              setLanguage(item.value);
            }}
          />
        </View>
      </ScrollView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    marginBottom: 20,
    paddingTop: 50,
  },
  closeButtonContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: Colors.tertiary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginTop: 10,
    marginBottom: 30
  },
  icon: {
    backgroundColor: Colors.secondary,
    padding: 25,
    borderRadius: 50,
    position: 'absolute',
    elevation: 5,
  },
  inputContainer: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 5,
  },
  inputLabel: {
    fontSize: 18,
    textAlignVertical: 'center',
    color: Colors.white,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingRight: 20,
  },
  input: {
    color: 'white',
    paddingHorizontal: 20,
    flex: 1,
    fontSize: 16,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    maxHeight: 200,
  },
  dropdownItemContainer: {
    backgroundColor: 'lightgray',
    borderWidth: 0.2,
    borderColor: 'gray',
  },
  dropdownItemText: {
    textAlign: 'right',
    textAlignVertical: 'center',
    paddingRight: 20,
    margin: -5,
  },
  placeholderStyle: {
    fontSize: 16,
    textAlign: 'right',
    color: 'white',
  },
  selectedTextStyle: {
    fontSize: 16,
    textAlign: 'right',
    color: 'white',
  },
  nonFunctionalContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    elevation: 5,
  },
  nonFunctionalText: {
    fontSize: 18,
    color: Colors.white,
    marginBottom: 10,
    textAlign: 'center',
  },
});
