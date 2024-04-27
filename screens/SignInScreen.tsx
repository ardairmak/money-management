import { Fragment, useState } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native'

import { Colors } from '../constants/Colors'
import { NavigationProp } from '../type'

export default function SignInScreen({ navigation }: NavigationProp) {
  const [mail, setMail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSave = () => {
    console.warn('Sign In pressed')

    navigation.goBack()
  }

  const handleForgotPassword = () => {
    console.warn('Forgot Password pressed')

    //Forgot Password sayfası yapılınca navigation düzenlenecek
    //navigation.goBack()
  }

  const handleSignUp = () => {
    console.warn('Sign Up pressed')

    //Sign Up sayfası yapılınca navigation düzenlenecek
    //navigation.goBack()
  }

  return (
    <Fragment>
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

      <View style={styles.saveButton}>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveButtonText}>SIGN IN</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.forgotPasswordButton}>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordButtonText}>Forgot My Password</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.forgotPasswordButton}>
        <Text style={styles.forgotPasswordButtonText}>Don't you have an account? </Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={[styles.forgotPasswordButtonText, { color: Colors.primary }]}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    //flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 120,
    marginBottom: 25,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
    padding: 20,
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: '#ffff',
    borderColor: Colors.secondary,
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginTop: 25,
    marginHorizontal: 20,
  },
  input: {
    color: Colors.primary,
    fontSize: 18,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 120,
    marginVertical: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  welcomeText: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
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
