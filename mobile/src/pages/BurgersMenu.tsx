import React, { useEffect, useState } from 'react'
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
import api from '../services/api';

export interface Burger {
    id: number
    url_image: string
    name: string
    price: string
    offer: number
    available: number
    ingredients: string
}

export default function BurgersMenu() {
    const [burgersWithOrfer, setBurgersWithOrfer] = useState<Burger[]>()
    const [burgers, setBurgers] = useState<Burger[]>()

    const navigation = useNavigation()

    useEffect(() => {
        api.get('burgers').then(response => {
            const orferBurgers = response.data.filter((burger: Burger) => {
                return (burger.offer === 1) && (burger.available === 1)
            })
            setBurgersWithOrfer(orferBurgers)

            const resBurgers = response.data.filter((burger: Burger) => {
                return (burger.available === 1)
            })

            setBurgers(resBurgers)
        })
    }, [])

    function handleGoToBurgerDetail(id: number) {
        navigation.navigate('BurgerDetail', {
            id
        })
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent />

            <ScrollView style={styles.content}>
                <Text style={styles.offersTitle}>Ofertas Especiais</Text>
                <ScrollView horizontal>
                    {
                        burgersWithOrfer?.map(burger => {
                            return (
                                <TouchableOpacity
                                    key={burger.id}
                                    style={styles.offerItem}
                                    activeOpacity={0.8}
                                    onPress={() => handleGoToBurgerDetail(burger.id)}
                                >
                                    <Image 
                                        style={styles.offerImg} 
                                        source={{ uri: burger.url_image }} 
                                        resizeMode="stretch" 
                                    />
                                    <Text style={styles.offerTitle}>{burger.name}</Text>
                                    <View style={styles.offerPrice}>
                                        <Text style={styles.price}>R$ {burger.price}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>

                {
                    burgers?.map(burger => {
                        return (
                            <TouchableOpacity
                                key={burger.id}
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
                    })
                }
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

        borderRadius: 10
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
        marginVertical: 10,
        marginHorizontal: 30,
        borderRadius: 10,
        flexDirection: 'row',

        backgroundColor: 'white'
    },
    itemImg: {
        height: '100%',
        width: '60%',

        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
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
