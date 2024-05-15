import { Alert, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import TextInputComp from '@/components/login/TextInput'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FillButton from '@/components/ui/buttons/FillButton';
import { Link, router } from 'expo-router';
import GoogleIcon from '@/components/ui/icons/GoogleIcon';
import Apple from '@/components/ui/icons/Apple';
import axios, { AxiosError } from 'axios';

const { width, height } = Dimensions.get("screen");

const SignUp = () => {
  const [name, setName] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false)

  // Function to toggle the password visibility state 
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Function to toggle the confirm password visibility state
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Function to handle the sign up button click
  const handleRegister = async () => {
    try {
      setLoading(true)
      // check if all the fields are filled
      if (!name || !username || !email || !password || !confirmPassword) {
        setLoading(false)
        alert('Please fill all the fields')
        return
      }

      // check if the password and confirm password match
      if (password !== confirmPassword) {
        setLoading(false)
        alert('Passwords do not match')
        return
      }

      const userInfo = {
        name,
        username,
        email,
        password,
      }
      const res = await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/auth/signup`, userInfo)
      if (res.data.success === true) {
        setLoading(false)
        Alert.alert('Success',
          'User registered successfully. Go to the login page.',
          [{ text: 'OK', onPress: () => { router.dismissAll(); router.replace('/auth/login') } }],
          { cancelable: false }
        )
      }
    } catch (error: AxiosError | any) {
      if (error.response) {
        const status = error.response.status;
        if (status === 409) {
          setLoading(false)
          alert('Username or email already exists. Please choose another.');
        } else {
          setLoading(false)
          console.log('Unhandled server error:', error.response.data);
          alert('An error occurred. Please check your internet connection. Please try again later.');
        }
      } else {
        setLoading(false)
        console.log('Network error:', error.message);
        alert('Network error. Please check your internet connection.');
      }
    }
  }

  return (
    <ScrollView style={styles.container}>

      {/* Register Form  */}
      <View style={styles.container1}>
        <TextInputComp
          labelText='Enter your name'
          placeholder='Enter name'
          onChangeFunc={setName}
          value={name}
        />
        <TextInputComp
          labelText='Enter your username'
          placeholder='Username'
          onChangeFunc={setUsername}
          value={username}
          autoCapitalize='none'
        />
        <TextInputComp
          labelText='Enter your email'
          placeholder='Email'
          onChangeFunc={setEmail}
          value={email}
          autoCapitalize='none'
        />
        <TextInputComp
          labelText='Enter your password'
          placeholder='Password'
          onChangeFunc={setPassword}
          value={password}
          secureTextEntry={!showPassword}
          autoCapitalize='none'
          icon={
            <MaterialCommunityIcons
              name={!showPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#aaa"
              onPress={toggleShowPassword}
            />
          }
        />
        <TextInputComp
          labelText='Confirm your password'
          placeholder='Confirm password'
          onChangeFunc={setConfirmPassword}
          value={confirmPassword}
          secureTextEntry={!showConfirmPassword}
          autoCapitalize='none'
          icon={
            <MaterialCommunityIcons
              name={!showConfirmPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#aaa"
              onPress={toggleShowConfirmPassword}
            />
          }
        />
      </View>

      {/* Register button */}
      <View style={styles.container2}>
        <FillButton
          label='Sign Up'
          onPressFunc={handleRegister}
          fillColor='#000'
          textColor='#fff'
          state={loading ? 'loading' : 'active'}
        />
      </View>

      {/* Already have an account */}
      <View style={styles.container3}>
        <Text>
          Already have an account?{'  '}
          <Link push href={'/auth/login'}>
            <Text style={styles.text1}>Login</Text>
          </Link>
        </Text>
      </View>

      <Text style={styles.text2}>
        Or
      </Text>

      {/* Other login options like Google or Apple  */}
      <View style={styles.container5}>
        <TouchableOpacity style={styles.container4}>
          <GoogleIcon />
          <Text>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.container4}>
          <Apple />
          <Text>Continue with Apple</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default SignUp

const styles = StyleSheet.create({
  // ----------------- View Styles -----------------
  container: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 30,
    backgroundColor: '#fff'
  },
  container1: {
    gap: 20,
    marginTop: height * 0.02,
  },
  container2: {
    marginTop: 30,
  },
  container3: {
    marginTop: 15,
    alignItems: 'center',
  },
  container4: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D1D1D1',
    // paddingVertical: 10,
    borderRadius: 15,
    gap: 10,
  },
  container5: {
    // marginTop: 15,
    gap: 15,
  },
  // ----------------- Text Styles -----------------
  text1: {
    fontWeight: '600',
  },
  text2: {
    textAlign: 'center',
    fontWeight: '500',
    marginVertical: 15,
  }
})