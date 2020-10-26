import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'

export default function Profile() {
    return (
        <View style={styles.container}>
            <View style={styles.userContainer}>
                <Image 
                    style={styles.profileImg}
                    source={{
                        uri: 'https://avatars1.githubusercontent.com/u/53832604?s=460&u=c7f5ef19cc8de6de885a928cd96ced29b19461f3&v=4'
                    }}
                />
                <Text style={styles.username}>Pedro César</Text>
            </View>
            <View style={styles.addressContainer}>
                <Text style={styles.addressText}><Text style={styles.strong}>Endereço:</Text> Rua Lázaro Ferreira Arantes, 39</Text>
                <Text style={styles.addressText}><Text style={styles.strong}>Bairro:</Text> Jardim Cristal</Text>
                <Text style={styles.addressText}>16880-000</Text>
                <Text style={styles.addressText}>Valparaíso / SP</Text>
            </View>
            <TouchableOpacity style={styles.logoutButton}>
                <Feather name="log-out" size={25} />
                <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userContainer: {
        marginTop: 20,
        alignItems: 'center'
    },
    profileImg: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    username: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 25,
        color: '#757575',
        marginTop: 10
    },
    addressContainer: {
        marginHorizontal: 20
    },
    addressText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 16  
    },
    strong: {
        fontFamily: 'Poppins_600SemiBold',
    },
    logoutButton: {
        flexDirection: 'row',
        backgroundColor: '#FFBA00',
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginTop: 10,
        borderRadius: 8
    },
    logoutText: {
        fontFamily: 'Poppins_600SemiBold',
        marginLeft: 6,
        fontSize: 17
    }
})