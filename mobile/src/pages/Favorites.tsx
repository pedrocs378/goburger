import { useFocusEffect } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { connect, ConnectedProps } from 'react-redux'

import BurgerItem from '../components/BurgerItem'
import api from '../services/api'
import { AppState } from '../store/actions/actionTypes'

import { Burger } from './BurgersMenu'

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

function Favorites(props: Props) {
    const [favorites, setFavorites] = useState<Burger[]>([])

    useFocusEffect(() => {
        api
            .get(`users/${props.id}/favorites`)
            .then(response => {
                setFavorites(response.data)
            })
    })

    return (
        <View style={styles.container}>
            <ScrollView style={styles.burgersList}>
                {
                    favorites.map(burgerFav => {
                        return (
                            <BurgerItem 
                                key={burgerFav.id}
                                burger={burgerFav}
                            />
                        )
                    })
                }
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

export default connector(Favorites)