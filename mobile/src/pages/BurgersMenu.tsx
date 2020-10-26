import React from 'react'
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import cheese from '../assets/burgers/cheese.jpg'
import bbq from '../assets/burgers/bbq.jpg'
import chicken from '../assets/burgers/chicken.jpg'

export default function BurgersMenu() {
    const navigation = useNavigation()

    function handleGoToBurgerDetail() {
        navigation.navigate('BurgerDetail')
    }
    return (
        <View style={styles.container}>
            <StatusBar translucent />

            <ScrollView style={styles.content}>
                <Text style={styles.offersTitle}>Ofertas Especiais</Text>
                <ScrollView horizontal>
                    <TouchableOpacity 
                        style={styles.offerItem} 
                        activeOpacity={0.8}
                        onPress={handleGoToBurgerDetail}
                    >
                        <Image style={styles.offerImg} source={chicken} resizeMode="stretch" />
                        <Text style={styles.offerTitle}>BBQ Burger</Text>
                        <View style={styles.offerPrice}>
                            <Text style={styles.price}>R$ 16,90</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>

                <TouchableOpacity 
                    style={styles.item} 
                    activeOpacity={0.8}
                    onPress={handleGoToBurgerDetail}
                >
                    <Image style={styles.itemImg} source={cheese} resizeMode="stretch" />
                    <View style={styles.itemPrice}>
                        <Text style={styles.price}>R$ 16,90</Text>
                    </View>
                    <View style={styles.itemInfo}>
                        <Text style={styles.itemTitle}>Cheese Burger</Text>
                        <Text style={styles.itemDesc}>Bife de hambúrguer, Queijo, Bun, Cheddar, Alface, Tomate, Cebola Roxa</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    content: {
        paddingTop: 20
    },
    offersTitle: {
        marginLeft: 30,
        marginBottom: 10,
        fontSize: 22,
        fontWeight: 'bold'
    },
    offerItem: {
        height: 250,
        width: 200,

        marginLeft: 20,
    },
    offerImg: {
        height: '100%',
        width: '100%',

        borderRadius: 8
    },
    offerTitle: {
        color: 'white',
        position: 'absolute',

        top: 10,
        left: 20,
        fontSize: 20,

    },
    offerPrice: {
        position: 'absolute',

        top: 40,
        left: 20,
        borderRadius: 5,
        padding: 5,
        backgroundColor: '#86B404'
    },
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
});
