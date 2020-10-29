import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import api from '../services/api'

export default function LoginOrProfile() {

    const navigation = useNavigation()

    useFocusEffect(() => {
        authenticate()
    })

    async function authenticate() {
        const userDataJson = await AsyncStorage.getItem('userData') as string
        let userData = null

        try {
            userData = JSON.parse(userDataJson)
        } catch (err) {

        }

        if (userData && userData.token) {
            api.defaults.headers.common['Authorization'] = `bearer ${userData.token}`
            navigation.navigate("TabNavigator", userData)
        } else {
            navigation.navigate("Login")
        }

    }

    return (
        <View style={styles.container}>
            <ActivityIndicator size={60} color="white" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFBA00',
    }
})