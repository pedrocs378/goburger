import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function Register() {
    const [hidePassword, setHidePassword] = useState(true)
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true)

    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const navigation = useNavigation()

    function handleRemoveData() {
        setName("")
        setPhone("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
    }

    function handleGoToRegisterAddress() {
        if (!name.trim() || !phone.trim() || !email.trim() || !password.trim()) {
            return
        }

        if (password !== confirmPassword) {
            Alert.alert("Erro", "As senhas não coicidem.")
            return
        }

        if (password.length < 6) {
            Alert.alert("Erro", "Senha muito pequena.")
            return
        }

        if (!email.includes("@")) {
            Alert.alert("Erro", "Email inválido")
            return
        }

        navigation.navigate("RegisterAddress", {
            name,
            phone,
            email,
            password
        })
        handleRemoveData()
    }

    function handleNavigateToLogin() {
        handleRemoveData()
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.buttonBack}
                onPress={handleNavigateToLogin}
            >
                <Ionicons name="ios-arrow-back" size={40} color="black" />
            </TouchableOpacity>
            <View style={styles.content}>
                <Text style={styles.subtitle}>Insira seus dados</Text>

                <TextInput
                    style={[styles.input, styles.inputText]}
                    placeholder="Nome"
                    textContentType="name"
                    value={name}
                    onChangeText={text => setName(text)}
                />
                <TextInput
                    style={[styles.input, styles.inputText]}
                    placeholder="Celular"
                    textContentType="telephoneNumber"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={text => setPhone(text)}
                />
                <TextInput
                    style={[styles.input, styles.inputText]}
                    placeholder="Email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={text => setEmail(text)}
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
                        onChangeText={text => setPassword(text)}
                    />
                    <TouchableWithoutFeedback onPress={() => setHidePassword(!hidePassword)}>
                        <Feather name={hidePassword ? "eye" : "eye-off"} size={20} />
                    </TouchableWithoutFeedback>
                </View>
                <View style={[styles.passContainer, styles.input]}>
                    <TextInput
                        style={[styles.inputText, { width: '90%' }]}
                        placeholder="Confirme sua senha"
                        textContentType="password"
                        autoCapitalize="none"
                        passwordRules="required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8;"
                        secureTextEntry={hideConfirmPassword}
                        value={confirmPassword}
                        onChangeText={text => setConfirmPassword(text)}
                    />
                    <TouchableWithoutFeedback onPress={() => setHideConfirmPassword(!hideConfirmPassword)}>
                        <Feather name={hideConfirmPassword ? "eye" : "eye-off"} size={20} />
                    </TouchableWithoutFeedback>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress={handleGoToRegisterAddress}
                >
                    <Ionicons name="ios-arrow-forward" size={30} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFBA00',
    },
    buttonBack: {
        marginLeft: 35,
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    subtitle: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 22,
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
    button: {
        backgroundColor: '#ffffff',
        width: 60,
        height: 60,
        borderRadius: 30,
        marginTop: 20,

        justifyContent: 'center',
        alignItems: 'center'
    }
})