import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export type FillButtonProps = {
    label: string;
    onPressFunc: () => void;
    fillColor: string;
    textColor: string;
    state?: "loading" | "active" | "disabled"
}

const FillButton: React.FC<FillButtonProps> = ({ label, onPressFunc, fillColor, textColor, state }) => {
    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: fillColor }]} onPress={onPressFunc}>
            {
                state === "loading"
                    ?
                    <ActivityIndicator size="small" color="#fff" />
                    :
                    <Text style={[styles.textStyle, { color: textColor }]}>
                        {label}
                    </Text>
            }

        </TouchableOpacity>
    )
}

export default FillButton

const styles = StyleSheet.create({
    container: {
        width: '100%',
        // backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 15,
    },
    textStyle: {
        fontSize: 18,
        // color: '#fff',
        fontStyle: 'normal',
        fontWeight: '600',
    }
})

//color: textColor