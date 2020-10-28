import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Header from '../components/Header'
import BurgerDetail from '../pages/BurgerDetail'
import TabNavigator from './TabNavigator'
import Login from '../pages/Login'
import Register from '../pages/Register'
import RegisterAddress from '../pages/RegisterAddress'

const { Navigator, Screen } = createStackNavigator()

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen component={Login} name="Login" />
                <Screen 
                    component={TabNavigator} 
                    name="TabNavigator" 
                    options={{
                        headerShown: true,
                        header: () => <Header />
                    }}
                />
                <Screen component={BurgerDetail} name="BurgerDetail" />
                <Screen 
                    component={Register} 
                    name="Register" 
                    options={{
                        headerShown: true,
                        header: () => <Header />
                    }}
                />
                <Screen 
                    component={RegisterAddress} 
                    name="RegisterAddress" 
                    options={{
                        headerShown: true,
                        header: () => <Header />
                    }}
                />
            </Navigator>
        </NavigationContainer>
    )
}