import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { Burger } from '../pages/BurgersMenu'

interface BurgerItemProps {
    burger: Burger
}

export default function BurgerItem({ burger }: BurgerItemProps) {

    const navigation = useNavigation()

    function handleGoToBurgerDetail(id: number) {
        navigation.navigate('BurgerDetail', {
            id
        })
    }

    return (
        <TouchableOpacity
            style={styles.item}
            activeOpacity={0.8}
            onPress={() => handleGoToBurgerDetail(burger.id)}
        >
            <Image 
                style={styles.itemImg} 
                source={{ uri: burger.url_image }} 
                resizeMode="stretch" 
            />
            <View style={styles.itemPrice}>
                <Text style={styles.price}>R$ {burger.price}</Text>
            </View>
            <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>{burger.name}</Text>
                <Text style={styles.itemDesc}>{burger.ingredients}</Text>
            </View>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    item: {
        height: 250,
        marginTop: 20,
        marginHorizontal: 30,
        borderRadius: 8,
        flexDirection: 'row',

        backgroundColor: 'white'
    },
    itemImg: {
        height: '100%',
        width: '60%',

        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8
    },
    itemPrice: {
        position: 'absolute',
        left: 20,
        top: 20,

        borderRadius: 5,
        padding: 5,
        backgroundColor: '#86B404'

    },
    price: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    itemInfo: {
        marginLeft: 20,
        width: '35%',

        justifyContent: 'center'
    },
    itemTitle: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    itemDesc: {
        marginTop: 10,
        fontSize: 15,
        marginRight: 15,
        color: '#6E6E6E'
    }
})