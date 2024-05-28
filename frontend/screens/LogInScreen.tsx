import { useState } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import { useAuth } from '../context/AuthContext'
import { Colors } from '../constants/Colors'
import { NavigationProp } from '../type'

export default function LogInScreen({ navigation }: NavigationProp) {
  const { logIn } = useAuth();
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleLogin = async () => {
    try {
      await logIn(email, password); // Call the signIn function from the authentication context
      navigation.navigate('Main')
    } catch (error) {
      Alert.alert('Error', 'Failed to sign in. Please check your email and password.'); // Handle sign in errors
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgetPassword')
    console.log('Forgot Password pressed')
  }

  const handleSignUp = () => {
    navigation.navigate('SignUp')
    console.log('Sign Up pressed')
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.welcomeText}>Welcome!</Text>
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

      <View style={styles.loginButton}>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomButton}>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={[styles.buttomText, { color: 'white' }]}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomButton}>
        <Text style={styles.buttomText}>Don't have an account? </Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={[styles.buttomText, { color: 'white', marginTop: 5 }]}>Sign Up</Text>
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
  bottomButton: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 15,
    alignItems: 'center',
  },
  buttomText: {
    color: Colors.tertiary,
    fontSize: 18,
    fontWeight: 'bold',
  },
})
