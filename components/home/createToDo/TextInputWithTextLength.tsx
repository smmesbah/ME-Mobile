import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

export type TextInputWithTextLengthProps = {
    taskTitle: string;
    setTaskTitle: (text: string) => void;
}

const TextInputWithTextLength: React.FC<TextInputWithTextLengthProps> = ({ taskTitle, setTaskTitle }) => {
    return (
        <View style={[styles.container1]}>
            <TextInput
                style={[styles.container2]}
                onChangeText={setTaskTitle}
                value={taskTitle}
                placeholder='Task Title Here'
                multiline={true}
                maxLength={50}
            />
            <Text style={[styles.text1]}>
                {taskTitle.length}/50
            </Text>
        </View>
    )
}

export default TextInputWithTextLength

const styles = StyleSheet.create({
    // ---------------------- Container Styles ----------------------
    container1: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container2: {
        fontSize: 16,
        fontWeight: '500',
        paddingVertical: 5,
        width: '70%',
        textAlign: 'center',
    },
    // ---------------------- Text Styles ----------------------
    text1: { fontSize: 14, fontWeight: '500', color: '#808080' }

})