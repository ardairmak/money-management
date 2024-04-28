import { useState } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native'

import { Colors } from '../constants/Colors'
import { NavigationProp } from '../type'

export default function LogInScreen({ navigation }: NavigationProp) {
  const [mail, setMail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSave = () => {
    navigation.goBack()
    console.log('Log In pressed')
  }

  const handleForgotPassword = () => {
    navigation.goBack()
    console.log('Forgot Password pressed')

    //Forgot Password sayfası yapılınca navigation düzenlenecek
  }

  const handleSignUp = () => {
    navigation.goBack()
    console.log('Sign Up pressed')

    //Sign Up sayfası yapılınca navigation düzenlenecek
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.welcomeText}>Welcome!</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder='Enter your username' />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder='Enter your password'
          secureTextEntry={true}
        />
      </View>

      <View style={styles.loginButton}>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.forgotPasswordButton}>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordButtonText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.forgotPasswordButton, { position: 'absolute', bottom: 10, alignSelf: 'center' }]}>
        <Text style={styles.forgotPasswordButtonText}>Don't have an account? </Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={[styles.forgotPasswordButtonText, { color: 'white', marginTop: 5 }]}>Sign Up</Text>
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
  },
  loginButton: {
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
  loginButtonText: {
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
  forgotPasswordButton: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 15,
    alignItems: 'center',
  },
  forgotPasswordButtonText: {
    color: Colors.tertiary,
    fontSize: 18,
    fontWeight: 'bold',
  },
})
