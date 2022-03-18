import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
    ImageBackground,
    StatusBar,
    Pressable,
    ToastAndroid,
    ActivityIndicator
} from 'react-native'

import { Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import Constant from './../../controller/Constant'

const validateEmail = (email) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
}

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessageEmail, setErrorMessageEmail] = useState('')
    const [errorMessagePassword, setErrorMessagePassword] = useState('')
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    const [loading, setLoading] = useState(false)

    function handleOnPressLogin() {
        if (!validateEmail(email.trim())) setErrorMessageEmail('Email must be a valid email')
        if (password.trim()?.length < 6)
            setErrorMessagePassword('Password must be at least 6 characters')
        if (validateEmail(email.trim()) && password.trim()?.length >= 6)
            loginUser(email.trim(), password.trim())
    }
    function loginUser(email, password) {
        // setLoading(true)
        // auth()
        //     .signInWithEmailAndPassword(email, password)
        //     .then((res) => {
        //         ToastAndroid.show('Đăng nhập thành công!', ToastAndroid.SHORT)
        //         setLoading(false)
        //     })
        //     .catch((error) => {
        //         switch (error.code) {
        //             case 'auth/wrong-password':
        //                 setErrorMessagePassword('Mật khẩu không đúng')
        //                 break
        //             case 'auth/user-not-found':
        //                 setErrorMessageEmail('Tài khoản không tồn tại')
        //                 break
        //             case 'auth/user-disabled':
        //                 setErrorMessageEmail('Tài khoản đã bị khoá')
        //                 break
        //             case 'auth/network-request-failed':
        //                 ToastAndroid.show(
        //                     'Đăng nhập thất bại! Kiểm tra kết nối Internet',
        //                     ToastAndroid.SHORT
        //                 )
        //                 break
        //             default:
        //                 ToastAndroid.show('Lỗi', ToastAndroid.SHORT)
        //                 break
        //         }
        //         setLoading(false)
        //     })
    }
    return (
        <ImageBackground style={styles.loginContainer} source={Constant.icons.backgroundHotel}>
            <StatusBar backgroundColor='transparent' barStyle='light-content' translucent={true} />
            <View style={{ flex: 3 }}></View>
            <View style={styles.main}>
                <View style={styles.title}>
                    <Text style={styles.footerTitle}>Phòng trọ Đằ Nẵng</Text>
                    <Text style={styles.footerTitle2}>Đăng nhập tài khoản</Text>
                </View>
                <View style={styles.action}>
                    <Input
                        value={email}
                        label='Email'
                        labelStyle={{ fontWeight: '500', fontSize: 16 }}
                        placeholder='Nhập Email vào....'
                        leftIcon={<Icon name='mail' size={20} color='gray' />}
                        style={styles.input}
                        inputContainerStyle={{ borderBottomWidth: 0.5 }}
                        errorStyle={{ color: 'red', marginLeft: 0 }}
                        errorMessage={errorMessageEmail}
                        onChangeText={(text) => {
                            setEmail(text)
                            setErrorMessageEmail('')
                        }}
                    />
                    <Input
                        value={password}
                        label='Password'
                        secureTextEntry={secureTextEntry}
                        labelStyle={{ fontWeight: '500', fontSize: 16 }}
                        placeholder='Nhập Password vào....'
                        leftIcon={<Icon name='lock-closed' size={20} color='gray' />}
                        rightIcon={
                            <Pressable onPress={() => setSecureTextEntry(!secureTextEntry)}>
                                <Icon
                                    name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
                                    size={20}
                                    color='gray'
                                />
                            </Pressable>
                        }
                        style={styles.input}
                        inputContainerStyle={{ borderBottomWidth: 0.5 }}
                        errorStyle={{ color: 'red', marginLeft: 0 }}
                        errorMessage={errorMessagePassword}
                        onChangeText={(text) => {
                            setPassword(text)
                            setErrorMessagePassword('')
                        }}
                    />
                </View>
                <TouchableOpacity
                    style={styles.button}
                    disabled={loading ? true : false}
                    onPress={handleOnPressLogin}
                >
                    <Text style={styles.textButton}>Đăng nhập</Text>
                </TouchableOpacity>
                <View>
                    <View style={styles.signup}>
                        <Text style={{ fontSize: 14 }}>Bạn chưa có tài khoản?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Text style={styles.signupNow}>Đăng ký ngay</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.textForgotPassword}>Quên mật khẩu</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}

export default Login

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    main: {
        flex: 5,
        backgroundColor: 'white',
        padding: 20,
        paddingBottom: 40,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        elevation: 1,
        justifyContent: 'space-between'
    },
    title: {
        marginTop: 20
    },
    footerTitle: {
        marginLeft: 10,
        fontSize: 24,
        fontWeight: 'bold'
    },
    footerTitle2: {
        paddingVertical: 10,
        marginLeft: 10,
        color: 'gray'
    },
    loginUsingMedia: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    input: {
        fontSize: 16,
        borderWidth: 0,
        borderBottomColor: 'transparent'
    },
    signup: {
        padding: 10,
        paddingBottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    signupNow: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Constant.color.blue,
        textDecorationLine: 'underline',
        paddingHorizontal: 10
    },
    button: {
        backgroundColor: Constant.color.blue,
        padding: 10,
        borderRadius: 23
    },
    textButton: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    forgotPassword: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textForgotPassword: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Constant.color.blue,
        textDecorationLine: 'underline'
    }
})
