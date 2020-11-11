import React, { useCallback, useState } from 'react'
import { Linking, StyleSheet, Text, View, RefreshControl } from 'react-native'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Feather, FontAwesome5, Ionicons } from '@expo/vector-icons'; 
import RNPickerSelect from 'react-native-picker-select';
import { connect, ConnectedProps } from 'react-redux';

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

interface Cart {
    id: number,
    name: string
    ingredients: string
    amount: number
    price: string
}

interface Order {
    id: number
    discount: number
    delivery_fee: number
    subtotal: number
    total: number
}

const wait = (timeout: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const initialStateOrder: Order = {
    id: -1,
    delivery_fee: 0,
    discount: 0,
    subtotal: 0,
    total: 0
}

function Cart(props: Props) {
    const [paymentType, setPaymentType] = useState('')
    const [address, setAddress] = useState('')
    const [products, setProducts] = useState<Cart[]>([])
    const [order, setOrder] = useState<Order>(initialStateOrder)
    const [moneyBack, setMoneyBack] = useState("")
    const [refreshing, setRefreshing] = useState(false)

    const handleGetItensCart = useCallback(() => {
        api.get(`users/${props.id}/cart`).then(response => {
            if (response.data.cart.length > 0 && response.data.order.length > 0) {
                setProducts(response.data.cart)
                setOrder(response.data.order[0])
            } else {
                setProducts([])
                setOrder(initialStateOrder)
            }
        })
    }, [])

    function handleWhatsApp() {
        let message = `Meu pedido *${order.id}*`

        products.forEach(product => {
            message += `\n\n*${product.name}*\n`
            message += `Ingredientes: ${product.ingredients}\n`
            message += `Quantidade: ${product.amount}\n\n`
            message += `Valor: R$ ${product.price}\n\n`
            message += `-------------------------\n`
        })

        message += `*Forma de pagamento:* ${paymentType}\n`
        message += `-------------------------\n`
        message += `*Entregar em:* ${address}\n`
        message += `-------------------------\n`
        message += `*Subtotal:* R$ ${handleConvertToBRL(order.subtotal)}\n`
        message += `*Desconto:* R$ ${handleConvertToBRL(order.discount)}\n`
        message += `*Taxa de entrega:* ${handleConvertToBRL(order.delivery_fee)}\n`
        message += `*Valor Total:* R$ ${handleConvertToBRL(order.total)}\n`
        message += `*Troco para:* R$ ${handleConvertToBRL(Number(moneyBack))}\n\n`
        message += 'Obrigado!'

        Linking.openURL(`whatsapp://send?phone=${"+5518991618592"}&text=${message}`)
    }

    function handleConvertToBRL(value: number) {
        return value.toFixed(2).replace('.', ',')
    }

    async function handleRemoveBurgerCart(id: number) {
        await api.delete(`users/${props.id}/cart`, {
            data: {
                cart_id: id
            }
        })

        handleGetItensCart()
    }

    function handleRefresh() {
        setRefreshing(true)

        handleGetItensCart()
        wait(1000).then(() => setRefreshing(false));

    }

    if (products.length === 0 && order.id === -1) {
        return (
            <ScrollView 
                style={styles.container}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            >
                <View style={styles.cartEmptyContent}> 
                    <Ionicons name="ios-arrow-down" size={30} color="#d6d5d5" />
                    <Text style={styles.cartEmpty}>
                        Não há produtos dentro do carrinho.
                    </Text>
                </View>
            </ScrollView>
        )
    }

    return (
        <ScrollView 
            style={styles.container}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        >
            
            <Text style={styles.subtitle}>Resumo dos pedidos</Text>
            {
                products.map(product => {
                    return (
                        <View key={product.id} style={styles.cardOrder}>
                            <View>
                                <Text style={[styles.cardText, styles.cardTitle]}>
                                    {product.name}
                                </Text>
                                <Text style={[styles.cardText, styles.cardIngredients]}>
                                    {product.ingredients}
                                </Text>
                                <Text style={styles.cardText}>Quantidade:
                                    <Text style={styles.strong}> {product.amount}</Text>
                                </Text>
                                <Text style={styles.cardText}>Valor:
                                    <Text style={styles.strong}> R$ {product.price}</Text>
                                </Text>
                            </View>
                            <TouchableOpacity 
                                style={styles.trashButton} 
                                onPress={() => handleRemoveBurgerCart(product.id)}
                            >
                                <Feather name="trash-2" size={25} />
                            </TouchableOpacity>
                        </View>
                    )
                })
            }
            <Text style={styles.subtitle}>Local de entrega</Text>
            <RNPickerSelect
                placeholder={{ label: "Selecione", value: "" }}
                Icon={() =>
                    <Ionicons
                        style={{ marginRight: 10, marginTop: 10 }}
                        name="ios-arrow-down"
                        size={25}
                        color="#818181"
                    />
                }
                pickerProps={{
                    mode: "dropdown",
                    style: {
                        color: 'black',
                        backgroundColor: 'white',
                    }
                }}
                onValueChange={value => setAddress(value)}
                value={address}
                items={[
                    { 
                        label: `${props.street}, ${props.number}, ${props.neighborhood} - ${props.city}/${props.uf}`,
                        value: `${props.street}, ${props.number}, ${props.neighborhood} - ${props.city}/${props.uf}` 
                    }
                ]}
            />
            <Text style={styles.subtitle}>Forma de pagamento</Text> 
            <RNPickerSelect
                placeholder={{ label: "Selecione", value: "" }}
                Icon={() => 
                    <Ionicons 
                        style={{ marginRight: 10, marginTop: 10 }} 
                        name="ios-arrow-down" 
                        size={25} 
                        color="#818181" 
                    />
                }
                pickerProps={{
                    mode: "dropdown", 
                    style: {
                        color: 'black',
                        backgroundColor: 'white',
                    }
                }}
                onValueChange={value => setPaymentType(value)}
                value={paymentType}
                items={[
                    { label: 'Dinheiro', value: 'Dinheiro' },
                    { label: 'Crédito', value: 'Crédito' },
                    { label: 'Débito', value: 'Débito' },
                    { label: 'Ticket', value: 'Ticket' },
                ]}
            />
            <View style={paymentType === "Dinheiro" ? {display: 'flex'} : {display: 'none'}}>
                <Text style={styles.subtitle}>Troco para?</Text> 
                <TextInput 
                    style={styles.input}
                    keyboardType="numeric" 
                    value={moneyBack}
                    onChangeText={(text) => setMoneyBack(text)}
                />
            </View>
            <View style={styles.infoPrices}>
                <Text style={styles.priceText}>Subtotal: <Text style={styles.price}>R$ {handleConvertToBRL(order.subtotal)}</Text></Text>
                <Text style={styles.priceText}>Desconto: <Text style={styles.price}>R$ {handleConvertToBRL(order.discount)}</Text></Text>
                <Text style={styles.priceText}>Taxa de Entrega: <Text style={styles.price}>R$ {handleConvertToBRL(order.delivery_fee)}</Text></Text>
                <Text style={styles.priceText}>Total: <Text style={styles.price}>R$ {handleConvertToBRL(order.total)}</Text></Text>
            </View>
            <TouchableOpacity
                style={styles.button} 
                onPress={handleWhatsApp}
            >
                <FontAwesome5 name="whatsapp" size={25} color="white" />
                <Text style={styles.buttonText}>Enviar pedido</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    cartEmptyContent: {
        height: 100,
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cartEmpty: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 18,
    
    },
    subtitle: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 18,
        marginTop: 15,
        color: '#292929'
    },
    cardOrder: {
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardText: {
        fontFamily: 'Poppins_400Regular'  
    },
    cardTitle: {
        fontSize: 18,

    },
    cardIngredients: {
        maxWidth: 150
    },
    strong: {
        fontWeight: 'bold'
    },
    trashButton: {
        backgroundColor: '#e9e9e9',
        borderRadius: 15,
        padding: 5
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 10,
        paddingLeft: 10,
        fontFamily: 'Poppins_500Medium'
    },
    infoPrices: {
        marginTop: 15,
        alignItems: 'flex-end'
    },
    priceText: {
        fontFamily: 'Poppins_400Regular',
    },
    price: {
        fontFamily: 'Poppins_600SemiBold'  
    },
    button: {
        backgroundColor: '#00b809',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 8,
        marginVertical: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 17,
        fontFamily: 'Poppins_600SemiBold',
        marginLeft: 5
    }
})

export default connector(Cart)