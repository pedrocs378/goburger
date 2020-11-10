import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, BackHandler, Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { AppState, User } from '../store/actions/actionTypes'
import { logout } from '../store/actions/actionUser'
import api from '../services/api'
import { RootState } from '../store/storeConfig'
import { connect, ConnectedProps } from 'react-redux'

const mapStateToProps = ({ user }: AppState) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        uf: user.uf,
        cep: user.cep,
        city: user.city,
        street: user.street,
        number: user.number,
        neighborhood: user.neighborhood,
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    return {
        onLogout: () => dispatch(logout())
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type Props = ConnectedProps<typeof connector>

function Profile(props: Props) {

    const navigation = useNavigation()

    const backPressed = () => {
        Alert.alert(
            'Sair da conta',
            'Tem certeza que deseja sair?',
            [
                { text: 'Não', style: 'cancel' },
                { text: 'Sim', onPress: () => handleLogout() },
            ],
            { cancelable: false });
        return true;
    }

    useEffect(() => {

        navigation.addListener("focus", () => {
            BackHandler.addEventListener("hardwareBackPress", backPressed)
        })

        navigation.addListener("blur", () => {
            BackHandler.removeEventListener("hardwareBackPress", backPressed)
        })
    }, [])


    async function handleLogout() {
        
        delete api.defaults.headers['Authorization']
        await AsyncStorage.removeItem('userData')
        props.onLogout()
        navigation.navigate('Login')
    }

    if (!props.email) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size={50} color="black" />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.userContainer}>
                    <Image 
                        style={styles.profileImg}
                        source={{
                            uri: 'https://avatars1.githubusercontent.com/u/53832604?s=460&u=c7f5ef19cc8de6de885a928cd96ced29b19461f3&v=4'
                        }}
                    />
                    <Text style={styles.username}>{props.name}</Text>
                    <View style={styles.phoneContainer}>
                        <Feather name="phone" size={25} color="#757575" />
                        <Text style={styles.phone}>{props.phone}</Text>
                    </View>
                </View>
                <View style={styles.addressContainer}>
                    <Text style={styles.addressText}><Text style={styles.strong}>Endereço:</Text> {props.street}, {props.number}</Text>
                    <Text style={styles.addressText}><Text style={styles.strong}>Bairro:</Text> {props.neighborhood}</Text>
                    <Text style={styles.addressText}>{props.cep}</Text>
                    <Text style={styles.addressText}>{props.city} / {props.uf}</Text>
                </View>
            </View>
            <TouchableOpacity
                style={styles.logoutButton}
                activeOpacity={0.8}
                onPress={handleLogout}
            >
                <Feather name="log-out" size={25} />
                <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    content: {
        
    },
    userContainer: {
        marginTop: 20,
        alignItems: 'center'
    },
    profileImg: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    username: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 25,
        color: '#757575',
        marginTop: 10
    },
    phoneContainer: {
        flexDirection: 'row'
    },
    phone: {
        fontFamily: 'Poppins_500Medium',
        color: '#757575',
        fontSize: 17,
        marginLeft: 5
    },
    addressContainer: {
        marginHorizontal: 20,
        marginTop: 20
    },
    addressText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 16  
    },
    strong: {
        fontFamily: 'Poppins_600SemiBold',
    },
    logoutButton: {
        flexDirection: 'row',
        backgroundColor: '#FFBA00',
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginBottom: 10,
        borderRadius: 8
    },
    logoutText: {
        fontFamily: 'Poppins_600SemiBold',
        marginLeft: 6,
        fontSize: 17
    }
})

export default connector(Profile)