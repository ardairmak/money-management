import { useState } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import { auth } from "../helpers/firebaseConfig";
import { createUserWithEmailAndPassword } from 'firebase/auth'

import { Colors } from '../constants/Colors'
import { NavigationProp } from '../type'

export default function SignUpScreen({ navigation }: NavigationProp) {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User signed up");

        navigation.goBack()
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        Alert.alert('Error', 'Invalid email or password format')
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.welcomeText}>Sign Up!</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder='Email' />
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder='Password'
          secureTextEntry={true}
        />
      </View>

      <View style={styles.signupButton}>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  topContainer: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    paddingTop: 180,
    paddingBottom: 80,
  },
  inputContainer: {
    backgroundColor: '#ffff',
    borderColor: Colors.secondary,
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginTop: 25,
    marginHorizontal: 40,
  },
  input: {
    color: Colors.primary,
    fontSize: 18,
    paddingHorizontal: 10,
  },
  signupButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 100,
    marginTop: 40,
    alignItems: 'center',
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'white',
  },
  signupButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  welcomeText: {
    color: 'white',
    fontSize: 64,
    fontWeight: 'bold',
    letterSpacing: 3,
  },
})
