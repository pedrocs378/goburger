import React, { useEffect } from 'react'
import { ActivityIndicator, Alert, BackHandler, Image, Modal, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { connect, ConnectedProps } from 'react-redux'

import { AppState } from '../store/actions/actionTypes'
import { logout } from '../store/actions/actionUser'
import { RootState } from '../store/storeConfig'
import api from '../services/api'

import userImg from '../assets/user.png'

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
            
            <View>
                <View style={styles.userContainer}>
                    <Image 
                        style={styles.profileImg}
                        source={userImg}
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
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}
                >
                    <Feather name="edit" size={25} />
                    <Text style={styles.buttonText}>Editar perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress={handleLogout}
                >
                    <Feather name="log-out" size={25} />
                    <Text style={styles.buttonText}>Sair</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
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
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#FFBA00',
        paddingVertical: 15,
        paddingHorizontal: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    buttonText: {
        fontFamily: 'Poppins_600SemiBold',
        marginLeft: 6,
        fontSize: 17
    }
})

export default connector(Profile)