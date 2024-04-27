import { Fragment, useState } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { Colors } from '../constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { iconPaths } from '../constants/IconPaths'
import { NavigationProp } from '../type'

export default function SignInScreen({ navigation }: NavigationProp) {
  const [mail, setMail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSave = () => {
    console.warn('Sign In pressed');

    navigation.goBack()
  }

  const handleForgotPassword = () => {
    console.warn('Forgot Password pressed');

    //Forgot Password sayfası yapılınca navigation düzenlenecek
    navigation.goBack()
  }

  const handleSignUp = () => {
    console.warn('Sign Up pressed');

    //Forgot Password sayfası yapılınca navigation düzenlenecek
    navigation.goBack()
  }

  return (
    <Fragment>
      <ScrollView style={styles.container} keyboardDismissMode='none'>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input}
            value={mail}
            onChangeText={setMail}
            placeholder='Emailinizi girin'
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder='Parolanızı girin'
            secureTextEntry={true}
          />
        </View>

        <View style={styles.saveButton}>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveButtonText}>GİRİŞ YAP</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.forgotPasswordButton}>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordButtonText} >Şifremi Unuttum</Text> {/* type="TERTIARY" */}
          </TouchableOpacity>
        </View>

        <View style={styles.forgotPasswordButton}>
        <Text style={styles.forgotPasswordButtonText}>Hesabın yok mu? </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.forgotPasswordButtonText}>KAYDOL</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
    padding: 20,
    alignItems: 'center'
  },
  inputContainer: {
    backgroundColor: "#ffff",
    borderColor: Colors.secondary,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 7
  },
  input: {
    color: Colors.primary
  },
  saveButton: {
    backgroundColor: Colors.primary,
    bottom: 20,
    right: 20,
    paddingVertical: 15,
    paddingHorizontal: 70,
    borderRadius: 20,
    marginVertical: 7
  },
  saveButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  forgotPasswordButton: {
    bottom: 20,
    right: 20,
    paddingVertical: 15,
    paddingHorizontal: 70,
    marginVertical: 7
  },
  forgotPasswordButtonText: {
    color: Colors.itemColor,
    fontSize: 24,
    fontWeight: 'bold'
  },

})