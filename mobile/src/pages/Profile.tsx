import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AppLoading } from 'expo'
import AsyncStorage from '@react-native-community/async-storage'

import api from '../services/api'

interface User {
    name: string
    email: string
    phone: string
    uf: string
    city: string
    street: string
    number: string
    neighborhood: string
    token: string
}

export default function Profile() {
    const [user, setUser] = useState<User>()

    const navigation = useNavigation()
    const route = useRoute()
    const params = route.params as User

    useEffect(() => {
        setUser(params)
    }, [])

    function handleLogout() {
        delete api.defaults.headers['Authorization']
        AsyncStorage.removeItem('userData')
        navigation.navigate('Login')
    }

    if (!user) {
        return <AppLoading />
    }

    return (
        <View style={styles.container}>
            <View style={styles.userContainer}>
                <Image 
                    style={styles.profileImg}
                    source={{
                        uri: 'https://avatars1.githubusercontent.com/u/53832604?s=460&u=c7f5ef19cc8de6de885a928cd96ced29b19461f3&v=4'
                    }}
                />
                <Text style={styles.username}>{user.name}</Text>
                <View style={styles.phoneContainer}>
                    <Feather name="phone" size={25} color="#757575" />
                    <Text style={styles.phone}>{user.phone}</Text>
                </View>
            </View>
            <View style={styles.addressContainer}>
                <Text style={styles.addressText}><Text style={styles.strong}>Endereço:</Text> {user.street}, {user.number}</Text>
                <Text style={styles.addressText}><Text style={styles.strong}>Bairro:</Text> {user.neighborhood}</Text>
                <Text style={styles.addressText}>16880-000</Text>
                <Text style={styles.addressText}>{user.city} / {user.uf}</Text>
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
        marginTop: 10,
        borderRadius: 8
    },
    logoutText: {
        fontFamily: 'Poppins_600SemiBold',
        marginLeft: 6,
        fontSize: 17
    }
})