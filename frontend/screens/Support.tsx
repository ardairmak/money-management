import React, { Fragment } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { NavigationProp } from '../type'

export default function Support({ navigation }: NavigationProp) {
  return (
    <Fragment>
      <ScrollView style={styles.container} keyboardDismissMode="none">

        <View style={styles.iconContainer}>
          <FontAwesome5 name="headset" style={styles.icon} size={40} color="white" />
        </View>

        <View style={styles.contactContainer}>
          <Text style={styles.contactLabel}>Support Contact</Text>
          <Text style={styles.contactText}>Name: Fevzi Babaoglu</Text>
          <Text style={styles.contactText}>Phone: +90 xxxxxxxxxx</Text>
          <Text style={styles.contactText}>Email: x@example.com</Text>
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
  contactContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    elevation: 5,
  },
  contactLabel: {
    fontSize: 22,
    color: Colors.white,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  contactText: {
    fontSize: 18,
    color: Colors.white,
    marginBottom: 5,
    textAlign: 'center',
  },
});