import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import api from '../services/api'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../store/storeConfig'
import { Action } from 'redux'
import { login } from '../store/actions/actionUser'
import { User } from '../store/actions/actionTypes'
import { connect, ConnectedProps } from 'react-redux'

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, unknown, Action<string>>) => {
    return {
        onLogin: (user: User) => dispatch(login(user))
    }
}

const connector = connect(null, mapDispatchToProps)

type Props = ConnectedProps<typeof connector>

function LoginOrProfile(props: Props) {

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
            props.onLogin(userData)
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

export default connector(LoginOrProfile)