import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'


import api from '../services/api'

interface UserParams {
    name: string
    phone: string
    email: string
    password: string
}

export default function RegisterAddress() {
    const [userInfo, setUserIfo] = useState<UserParams>()
    const [street, setStreet] = useState("")
    const [neighborhood, setNeighborhood] = useState("")
    const [number, setNumber] = useState("")
    const [city, setCity] = useState("")
    const [uf, setUf] = useState("")
    const [cep, setCEP] = useState("")

    const navigation = useNavigation()

    const route = useRoute()
    const params = route.params as UserParams

    useEffect(() => {
        setUserIfo(params)
    }, [])

    function handleRemoveData() {
        setUserIfo(undefined)
        setStreet("")
        setNeighborhood("")
        setNumber("")
        setCity("")
        setUf("")
        setCEP("")
    }

    async function handleRegister() {

        if (!street.trim() || !neighborhood.trim() || !number.trim() || !city.trim() || !uf.trim() || !cep.trim()) {
            return
        }
        
        try {
            await api.post('signup', {
                ...userInfo,
                street,
                cep,
                neighborhood,
                number,
                uf,
                city,
            })

            navigation.navigate("Login")
            handleRemoveData()

        } catch (err) {
            if (err.response && err.response.data) {
                Alert.alert('Error', err.response.data)
            } else {
                Alert.alert('Error', `Message: ${err}`)
            }
        }

        
    }

    function handleNavigateToLogin() {
        navigation.navigate("Login")
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
                <Text style={styles.subtitle}>Insira os dados do seu endereço</Text>
                <TextInputMask
                    style={[styles.input, styles.inputText]}
                    placeholder="CEP"
                    type={"zip-code"}
                    textContentType="postalCode"
                    keyboardType="numeric"
                    value={cep}
                    onChangeText={text => setCEP(text)}
                />
                <TextInput
                    style={[styles.input, styles.inputText]}
                    placeholder="Endereço"
                    textContentType="streetAddressLine1"
                    value={street}
                    onChangeText={text => setStreet(text)}
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.input, styles.inputText, { width: '73%' }]}
                        placeholder="Bairro"
                        textContentType="streetAddressLine2"
                        value={neighborhood}
                        onChangeText={text => setNeighborhood(text)}
                    />
                    <TextInput
                        style={[styles.input, styles.inputText, { width: '25%' }]}
                        placeholder="Nº"
                        keyboardType="number-pad"
                        value={number}
                        onChangeText={text => setNumber(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.input, styles.inputText, { width: '73%' }]}
                        placeholder="Cidade"
                        textContentType="addressCity"
                        value={city}
                        onChangeText={text => setCity(text)}
                    />

                    <TextInput
                        style={[styles.input, styles.inputText, { width: '25%' }]}
                        placeholder="Estado"
                        autoCapitalize="characters"
                        maxLength={2}
                        textContentType="addressState"
                        value={uf}
                        onChangeText={text => setUf(text)}
                    />
                </View>

                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress={handleRegister}
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
    },
    buttonBack: {
        marginLeft: 35,
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start'
    },
    content: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        width: 400,
        alignSelf: 'center'
    },
    subtitle: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 22,
        color: 'white'
    },
    input: {
        backgroundColor: 'white',
        width: '100%',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    inputText: {
        fontFamily: 'Poppins_500Medium',
        color: '#686868'
    },
    inputContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    passContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#ffffff',
        width: 145,
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 20,

        justifyContent: 'center',
        alignItems: 'center'
    },
    textButton: {
        color: 'black',
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 17
    }
})