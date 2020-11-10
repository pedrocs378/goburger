import React, {  useEffect, useState } from 'react'
import { Image, Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import { Ionicons, FontAwesome } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation, useRoute } from '@react-navigation/native';
import { connect, ConnectedProps } from 'react-redux';

import { Burger } from './BurgersMenu'
import api from '../services/api';
import { AppState } from '../store/actions/actionTypes';

const mapStateToProps = ({ user }: AppState) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        uf: user.uf,
        cep: user.cep,
        city: user.city,
        street: user.street,
        number: user.number,
        neighborhood: user.neighborhood,
    }
}

const connector = connect(mapStateToProps)

type Props = ConnectedProps<typeof connector>

interface BurgerDetailRouteParams {
    id: number
}

function BurgerDetail(props: Props) {
    const [favorite, setFavorite] = useState(false)
    const [amount, setAmount] = useState(0)
    const [burger, setBurger] = useState<Burger>()

    const route = useRoute()
    const navigation = useNavigation()

    const params = route.params as BurgerDetailRouteParams

    useEffect(() => {
        api.get(`burgers/${params.id}`).then(response => {
            setBurger(response.data[0])
        })

        api.get(`users/${props.id}/favorites/${params.id}`).then(response => {
            setFavorite(response.data.favorite)
        })
    }, [params.id])

    async function handleAddOrRemoveFavoriteBurger(id: number) {
        if (favorite) {
            await api
                .delete(`users/${props.id}/favorites`, {
                    data: {
                        burger_id: id
                    }
                })

            setFavorite(!favorite)
        } else {
            await api
                .post(`users/${props.id}/favorites`, {
                    burger_id: id
                })

            setFavorite(!favorite)
        }
    }

    if (!burger) {
        return (
            <View>
                <Text>Carregando....</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="ios-arrow-back" size={35} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleAddOrRemoveFavoriteBurger(params.id)}>
                    <FontAwesome name={favorite ? "heart" : "heart-o"} size={30} color="black" />
                </TouchableOpacity>
            </View>
            <Image
                style={styles.image}
                source={{ uri: burger.url_image }}
                resizeMode="stretch"
            />
            <View style={styles.infos}>
                <View>
                    <Text style={styles.title}>{burger.name}</Text>
                    <Text style={styles.descIngrendients}>{burger?.ingredients}</Text>
                </View>
                <View>
                    <Text style={styles.price}>R$ {burger.price}</Text>
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

export default connector(BurgerDetail)