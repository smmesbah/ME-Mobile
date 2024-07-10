import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export type FocusButtonProps = {
    label: string;
    focus: string;
    onPressFunc: (label: string) => void;
}

const FocusButton: React.FC<FocusButtonProps> = ({ label, focus, onPressFunc }) => {
    return (
        <TouchableOpacity onPress={() => onPressFunc(label)} style={{
            backgroundColor: focus === label ? "#00CABE" : "#fff",
            padding: 10,
            borderWidth: focus === label ? 0 : 1,
            borderColor: "#D4D4D4",
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Text style={{ color: focus === label ? "#fff" : "#9A9A9A", fontWeight: '500' }}>{label}</Text>
        </TouchableOpacity>
    )
}

export default FocusButton

const styles = StyleSheet.create({})