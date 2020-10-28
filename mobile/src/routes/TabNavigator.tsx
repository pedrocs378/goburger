import React, { useEffect } from 'react'
import { Feather } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import BurgersMenu from '../pages/BurgersMenu'
import Favorites from '../pages/Favorites'
import Cart from '../pages/Cart'
import Profile from '../pages/Profile'
import { useRoute } from '@react-navigation/native'

const { Navigator, Screen } = createBottomTabNavigator()

export default function TabNavigator() {

    const route = useRoute()
    const params = route.params

    return (
        <Navigator 
            initialRouteName="Profile"
            tabBarOptions={{
                activeTintColor: '#FFBA00',
                inactiveTintColor: '#BCBCBC',
                showLabel: false,
                style: {
                    backgroundColor: 'white',
                    height: 60
                }
            }}
        >
            <Screen 
                name="BurgersMenu" 
                component={BurgersMenu} 
                options={{ 
                    title: "Menu",
                    tabBarIcon: ({ color, size }) => 
                        <Feather name="clipboard" size={size} color={color} />
                }} 
            />
            <Screen 
                name="Favorites" 
                component={Favorites} 
                options={{ 
                    title: "Favoritos" ,
                    tabBarIcon: ({ color, size }) =>
                        <Feather name="heart" size={size} color={color} />
                }} 
            />
            <Screen 
                name="Cart" 
                component={Cart}
                options={{ 
                    title: "Carrinho" ,
                    tabBarIcon: ({ color, size }) =>
                        <Feather name="shopping-cart" size={size} color={color} />
                }} 
            />
            <Screen 
                name="Profile" 
                component={Profile} 
                initialParams={params}
                options={{ 
                    title: "Perfil",
                    tabBarIcon: ({ color, size }) =>
                        <Feather name="user" size={size} color={color} />
                }} 
            />
        </Navigator>
    )
}