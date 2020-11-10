import React, { useState } from 'react'
import { Alert, BackHandler, StatusBar, StyleSheet, Text, View } from 'react-native'
import { TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'
import { connect, ConnectedProps, Provider } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import api from '../services/api'
import { RootState } from '../store/storeConfig'
import { login } from '../store/actions/actionUser'
import { User } from '../store/actions/actionTypes'

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    return {
        onLogin: (user: User) => dispatch(login(user))
    }
}

const connector = connect(null, mapDispatchToProps)

type Props = ConnectedProps<typeof connector>

function Login(props: Props) {
    const [hidePassword, setHidePassword] = useState(true)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [invalid, setInvalid] = useState(false)

    const navigation = useNavigation()

    function handleRemoveData() {
        setEmail("")
        setPassword("")
        setInvalid(false)
        setHidePassword(true)
    }

    const backPressed = () => {
        BackHandler.exitApp()
        return true;
    }

    async function handleLogin() {
        if (!email.trim() || !password.trim()) {
            setInvalid(true)
            return
        }

        try {
            const response = await api.post('signin', { email, password })
            
            props.onLogin(response.data)
            AsyncStorage.setItem('userData', JSON.stringify(response.data))
            api.defaults.headers.common['Authorization'] = `bearer ${response.data.token}`
            handleRemoveData()

            navigation.navigate("TabNavigator", response.data)
            
        } catch (err) {
            if (err.response && err.response.data) {
                Alert.alert('Error', err.response.data)
            } else {
                Alert.alert('Error', `Message: ${err}`)
            }
        }

    }

    useFocusEffect(() => {

        navigation.addListener("focus", () => {
            BackHandler.addEventListener("hardwareBackPress", backPressed)
        })

        navigation.addListener("blur", () => {
            BackHandler.removeEventListener("hardwareBackPress", backPressed)
        })

    })

    return (
        <View style={styles.container}>
            <Text style={styles.title}>GoBurger</Text>
            {
                invalid && (
                    <Text style={styles.invalid}>Email ou senha inválidos</Text>
                )
            }
            <TextInput 
                style={[styles.input, styles.inputText]} 
                placeholder="Email" 
                textContentType="emailAddress" 
                autoCapitalize="none"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <View style={[styles.passContainer, styles.input]}>
                <TextInput
                    style={[styles.inputText, { width: '90%' }]}
                    placeholder="Senha"
                    textContentType="password"
                    autoCapitalize="none"
                    passwordRules="required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8;"
                    secureTextEntry={hidePassword}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableWithoutFeedback onPress={() => setHidePassword(!hidePassword)}>
                    <Feather name={hidePassword ? "eye" : "eye-off"} size={20} />
                </TouchableWithoutFeedback>
            </View>
            <TouchableWithoutFeedback style={styles.forgetPass}>
                <Text style={styles.forgetPassText}>Esqueceu a senha?</Text>
            </TouchableWithoutFeedback>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity 
                    style={styles.button} 
                    activeOpacity={0.8} 
                    onPress={handleLogin}
                >
                    <Text style={styles.textButton}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button} 
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("Register")}
                >
                    <Text style={styles.textButton}>Registrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFBA00',
        paddingTop: StatusBar.currentHeight,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 40,
        color: 'white'
    },
    input: {
        backgroundColor: 'white',
        width: 300,
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    inputText: {
        fontFamily: 'Poppins_500Medium',
        color: '#686868'
    },
    passContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    forgetPass: {
        marginTop: 10,
    },
    forgetPassText: {
        fontFamily: 'Poppins_500Medium',
        color: 'white',
        fontSize: 18
    },
    buttonsContainer: {
        width: 300,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        backgroundColor: '#ffffff',
        width: 145,
        paddingVertical: 10,
        borderRadius: 8,

        justifyContent: 'center',
        alignItems: 'center'
    },
    textButton: {
        color: 'black',
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 17
    },
    invalid: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 15,
        color: 'red',
        marginTop: 20
    }
})

export default connector(Login)