import React, { useEffect, useState } from 'react'
import { Linking, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Feather, FontAwesome5, Ionicons } from '@expo/vector-icons'; 
import RNPickerSelect from 'react-native-picker-select';

interface Cart {
    id: number,
    title: string
    ingredients: string
    amount: number
    value: string
}

export default function Cart() {
    const [paymentType, setPaymentType] = useState('')
    const [address, setAddress] = useState('')
    const [products, setProducts] = useState<Cart[]>([])
    const [moneyBack, setMoneyBack] = useState("")

    useEffect(() => {
        setProducts([
            {
                id: Math.random(),
                title: 'BBQ Burger',
                ingredients: 'Hamburger, Alface, Tomate, Queijo',
                amount: 2,
                value: '16.90'
            },
            {
                id: Math.random(),
                title: 'BBQ Burger',
                ingredients: 'Hamburger, Alface, Tomate, Queijo',
                amount: 1,
                value: '18.90'
            },
            {
                id: Math.random(),
                title: 'BBQ Burger',
                ingredients: 'Hamburger, Alface, Tomate, Queijo',
                amount: 3,
                value: '12.90'
            },
        ])
    }, [])

    function handleWhatsApp() {
        let message = "Meu pedido *2378*"

        products.forEach(product => {
            message += `\n\n*${product.title}*\n`
            message += `Ingredientes: ${product.ingredients}\n`
            message += `Quantidade: ${product.amount}\n\n`
            message += `Valor: R$ ${product.value}\n\n`
            message += `-------------------------\n`
        })

        message += `*Formas de pagamento:* ${paymentType}\n`
        message += `-------------------------\n`
        message += `*Entregar em:* ${address}\n`
        message += `-------------------------\n`
        message += `*Subtotal:* R$ ${handleCalculateSubTotalValue()}\n`
        message += `*Desconto:* R$ 0.00\n`
        message += `*Taxa de entrega:* R$ 2.00\n`
        message += `*Valor Total:* R$ ${Number(handleCalculateSubTotalValue()) + 2}\n`
        message += `*Troco para:* R$ ${Number(moneyBack).toFixed(2)}\n\n`
        message += 'Obrigado!'

        Linking.openURL(`whatsapp://send?phone=${"+5518991618592"}&text=${message}`)
    }

    function handleCalculateSubTotalValue() {
        let value = 0

        products.forEach(product => {
            value += Number(product.value)
        })

        return value.toFixed(2)
    }

    function handleCalculateTotalValue() {

    }

    if (products?.length === 0) {
        return (
            <View style={styles.cartEmptyContent}>
                <Text style={styles.cartEmpty}>
                    Não há produtos dentro do carrinho.
                </Text>
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.subtitle}>Resumo dos pedidos</Text>
            {
                products.map(product => {
                    return (
                        <View key={product.id} style={styles.cardOrder}>
                            <View>
                                <Text style={[styles.cardText, styles.cardTitle]}>
                                    {product.title}
                                </Text>
                                <Text style={[styles.cardText, styles.cardIngredients]}>
                                    {product.ingredients}
                                </Text>
                                <Text style={styles.cardText}>Quantidade:
                                    <Text style={styles.strong}> {product.amount}</Text>
                                </Text>
                                <Text style={styles.cardText}>Valor:
                                    <Text style={styles.strong}> R$ {product.value}</Text>
                                </Text>
                            </View>
                            <TouchableOpacity style={styles.trashButton}>
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
                    { label: 'Endereco 1', value: 'address1' },
                    { label: 'Endereco 2', value: 'address2' },
                    { label: 'Endereco 3', value: 'address3' },
                    { label: 'Endereco 4', value: 'address4' },
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
                    { label: 'Dinheiro', value: 'money' },
                    { label: 'Crédito', value: 'creditCard' },
                    { label: 'Débito', value: 'debitCard' },
                    { label: 'Ticket', value: 'ticket' },
                ]}
            />
            <View style={paymentType === "money" ? {display: 'flex'} : {display: 'none'}}>
                <Text style={styles.subtitle}>Troco para?</Text> 
                <TextInput 
                    style={styles.input}
                    keyboardType="numeric" 
                    value={moneyBack}
                    onChangeText={(text) => setMoneyBack(text)}
                />
            </View>
            <View style={styles.infoPrices}>
                <Text style={styles.priceText}>Subtotal: <Text style={styles.price}>R$ {handleCalculateSubTotalValue()}</Text></Text>
                <Text style={styles.priceText}>Desconto: <Text style={styles.price}>R$ 0,00</Text></Text>
                <Text style={styles.priceText}>Taxa de Entrega: <Text style={styles.price}>R$ 2,00</Text></Text>
                <Text style={styles.priceText}>Total: <Text style={styles.price}>R$ 55,00</Text></Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleWhatsApp}>
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cartEmpty: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 18
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