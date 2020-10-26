import React, {  useEffect, useState } from 'react'
import { Image, Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import { Ionicons, FontAwesome } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';

import chicken from '../assets/burgers/chicken.jpg'

export default function BurgerDetail() {
    const [favorite, setFavorite] = useState(false)
    const [amount, setAmount] = useState(0)

    const navigation = useNavigation()
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="ios-arrow-back" size={35} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFavorite(!favorite)}>
                    <FontAwesome name={favorite ? "heart" : "heart-o"} size={30} color="black" />
                </TouchableOpacity>
            </View>
            <Image style={styles.image} source={chicken} resizeMode="stretch" />
            <View style={styles.infos}>
                <View>
                    <Text style={styles.title}>Chicken Burger</Text>
                    <Text style={styles.descIngrendients}>Bife de hambúrguer, Queijo, Bun, Cheddar, Alface, Tomate, Cebola Roxa</Text>
                </View>
                <View>
                    <Text style={styles.price}>R$16,90</Text>
                    <Text style={styles.weight}>325g</Text>
                </View>
            </View>
            <View style={styles.deliveryInfos}>
                <View style={{ flexDirection: 'row' }}>
                    <Ionicons name="md-time" color="#FFBA00" size={20} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.timeDeliveryText}>Delivery in</Text>
                        <Text style={styles.timeDelivery}>30 min</Text>
                    </View>
                </View>
                <View style={styles.amountContainer}>
                    <TouchableOpacity
                        style={styles.buttonAmount}
                        onPress={() => setAmount(amount + 1)}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonAmountText}>+</Text>
                    </TouchableOpacity>
                    <Text style={styles.amount}>{amount}</Text>
                    <TouchableOpacity
                        style={styles.buttonAmount}
                        onPress={() => amount > 0 && setAmount(amount - 1)}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonAmountText}>-</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.descButton} activeOpacity={0.8}>
                <Text style={styles.descButtonText}>Adicionar ao carrinho</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: '100%',
        paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight && StatusBar.currentHeight+10) : 10,
        paddingBottom: 15,
        paddingHorizontal: 30,
        backgroundColor: '#FFBA00',

        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    image: {
        width: '100%',
        height: 500,
    },
    infos: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        
        width: '100%',
        marginTop: 15,
        paddingHorizontal: 30
    },
    title: {
        color: '#292929',
        fontSize: 27,
        fontFamily: 'Poppins_500Medium',
        fontWeight: 'bold'
    },
    descIngrendients: {
        fontSize: 15,
        maxWidth: 250,
        marginTop: 10,
        color: '#a0a0a0',
        fontFamily: 'Poppins_400Regular',
    },
    infoContent: {
        justifyContent: 'space-around'
    },
    weight: {
        color: '#585858',
        textAlign: 'right',
        fontFamily: 'Poppins_500Medium',
        fontSize: 17
    },
    price: {
        color: '#292929',
        textAlign: 'right',
        fontSize: 22,
        fontFamily: 'Poppins_500Medium'
    },
    deliveryInfos: {
        paddingHorizontal: 30,
        marginTop: 15,

        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    timeDeliveryText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
        color: '#474747'
    },
    timeDelivery: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 16
    },
    amountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonAmount: {
        backgroundColor: '#FFBA00',
        height: 35,
        width: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    buttonAmountText: {
        color: 'white',
        fontWeight: 'bold'
    },
    amount: {
        marginHorizontal: 15,
        fontFamily: 'Poppins_500Medium',
        fontSize: 20
    },
    descButton: {
        backgroundColor: '#FFBA00',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 22,
        marginTop: 40,
        marginHorizontal: 45,
        borderRadius: 7,
    },
    descButtonText: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
        color: 'white'
    },
    
    
})