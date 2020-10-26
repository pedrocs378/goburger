import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import BurgerItem from '../components/BurgerItem'

export default function Favorites() {

    return (
        <View style={styles.container}>
            <ScrollView style={styles.burgersList}>
                <BurgerItem />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    burgersList: {

    }
})