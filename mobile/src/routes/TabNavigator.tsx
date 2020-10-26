import React from 'react'
import { Feather } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import BurgersMenu from '../pages/BurgersMenu'
import Favorites from '../pages/Favorites'
import Cart from '../pages/Cart'
import Profile from '../pages/Profile'

const { Navigator, Screen } = createBottomTabNavigator()

export default function TabNavigator() {
    return (
        <Navigator 
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
                options={{ 
                    title: "Perfil",
                    tabBarIcon: ({ color, size }) =>
                        <Feather name="user" size={size} color={color} />
                }} 
            />
        </Navigator>
    )
}