import TextInputComp from '@/components/login/TextInput';
import FillButton from '@/components/ui/buttons/FillButton';
import Apple from '@/components/ui/icons/Apple';
import GoogleIcon from '@/components/ui/icons/GoogleIcon';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get("screen");
const Login = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    // Function to toggle the password visibility state 
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // Function to handle the login process
    const handleLogin = async () => {
        try {
            // check if all fields are filled
            if (username === '' || password === '') {
                alert('Please fill all fields');
                return;
            }

            const loginInfo = {
                username,
                password
            }
            // send the loginInfo to the server
            const res = await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/auth/login`, loginInfo);
            if (res.data.success) {
                // Add a snack here
                console.log(res.data)
                // console.log(res.data.message);

                // save the token in the local storage
                await AsyncStorage.setItem('Me-token', res.data.access_token);

                // clear the router stack
                if (router.canDismiss())
                    router.dismissAll();

                // redirect to the home screen
                router.replace('/home');
            }
            return;
        } catch (error: any) {
            if (error.response) {
                const status = error.response.status;
                if (status === 401) {
                    alert('Invalid credentials');
                } else if (status === 404) {
                    alert('User not registered. Please register first');
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
            <View style={styles.container1}>
                <TextInputComp
                    labelText='Enter your username'
                    placeholder='Username'
                    onChangeFunc={setUsername}
                    value={username}
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
            </View>

            {/* Forget Password  */}
            <View style={styles.container2}>
                <Link href={'/auth/forget-password'} >
                    <Text style={styles.text1}>Forget Password?</Text>
                </Link>
            </View>

            {/* Login button */}
            <View style={styles.container3}>
                <FillButton
                    label='Login'
                    onPressFunc={handleLogin}
                    fillColor='#000'
                    textColor='#fff'
                />
            </View>

            {/* Don't have an account */}
            <View style={styles.container4}>
                <Text>
                    Don't have an account?{'  '}
                    <Link push href={'/auth/register'}>
                        <Text style={styles.text1}>Register</Text>
                    </Link>
                </Text>
            </View>

            <Text style={styles.text2}>
                Or
            </Text>

            {/* Other login options like Google or Apple  */}
            <View style={styles.container6}>
                <TouchableOpacity style={styles.container5}>
                    <GoogleIcon />
                    <Text>Continue with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.container5}>
                    <Apple />
                    <Text>Continue with Apple</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Login

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
        marginTop: height * 0.1,
    },
    container2: {
        alignItems: 'flex-end',
        marginTop: 15,
    },
    container3: {
        marginTop: 15,
    },
    container4: {
        marginTop: 15,
        alignItems: 'center',
    },
    container5: {
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
    container6: {
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