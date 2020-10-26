import React from 'react'
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

export default function Header() {
    return (
        <View style={styles.header}>
            <View />
            <Text style={styles.appTitle}>GoBurger</Text>
            <TouchableWithoutFeedback>
                <FontAwesome5 style={styles.buttonBurger} name="hamburger" size={24} />
            </TouchableWithoutFeedback>
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 24,
        paddingTop: 40,
        backgroundColor: '#FFBA00',
    },
    appTitle: {
        fontWeight: 'bold',
        fontSize: 24
    },
    buttonBurger: {
        marginRight: 20,
        marginTop: 3
    },
})