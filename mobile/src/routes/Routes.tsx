import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Header from '../components/Header'
import BurgerDetail from '../pages/BurgerDetail'
import TabNavigator from './TabNavigator'

const { Navigator, Screen } = createStackNavigator()

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen 
                    component={TabNavigator} 
                    name="TabNavigator" 
                    options={{
                        headerShown: true,
                        header: () => <Header />
                    }}
                />
                <Screen component={BurgerDetail} name="BurgerDetail" />
            </Navigator>
        </NavigationContainer>
    )
}