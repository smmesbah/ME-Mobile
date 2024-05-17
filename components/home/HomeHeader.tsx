import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BurgerOutline from '../ui/icons/BurgerOutline'

const HomeHeader = () => {
    return (
        <View
            style={styles.container1}>
            <View
                style={styles.container2}>
                <ImageBackground
                    source={require('@/assets/images/pngwing.com.png')}
                    style={{ width: 50, height: 50 }}
                    imageStyle={styles.imageStyle1}
                />
                <View style={{ gap: 2 }}>
                    <Text style={styles.text1}>Bonjour</Text>
                    <Text style={styles.text2}>Mesbah</Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.container3}>
                <BurgerOutline />
            </TouchableOpacity>
        </View>
    )
}

export default HomeHeader

const styles = StyleSheet.create({
    container1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        // borderBottomWidth: 2,
        // borderBottomColor: '#000',
    },
    container2: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        gap: 10,
    },
    container3: {
        borderWidth: 1,
        borderColor: '#D4D4D4',
        borderRadius: 50,
        padding: 5,
    },
    // ------------------ ImageStyle ------------------
    imageStyle1: {
        borderRadius: 50,
        backgroundColor: '#e6890c',

    },
    // ------------------ TextStyle ------------------
    text1: { fontSize: 14 },
    text2: { fontSize: 18, fontWeight: 'bold' },
})