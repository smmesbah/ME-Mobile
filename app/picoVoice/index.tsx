import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useVoiceRecognition } from '@/hooks/useVoiceRecognition';
import useWakeWord from '@/hooks/useWakeWord';

const Hi = () => {
    const [err, setErr] = useState<any>("No error");
    const { wordDetected, error, porcupineManager } = useWakeWord();
    const { state, startRecognizing, stopRecognizing, destroyRecognizer } = useVoiceRecognition();

    useEffect(() => {
        console.log("Word detected: ", wordDetected);
        if (wordDetected === "JARVIS") {
            console.log("JARVIS detected");
            startRecognizing();
        } else if (wordDetected === "Alexa") {
            console.log("Alexa detected");
            stopRecognizing();
        }
    }, [wordDetected, error, porcupineManager, startRecognizing, stopRecognizing]);

    return (
        <View style={styles.container}>
            <Text>Word Detected: {wordDetected}</Text>
            <Text>Err: {err}</Text>
            <Text>State: {JSON.stringify(state, null, 2)}</Text>
            <Pressable onPressIn={startRecognizing} onPressOut={stopRecognizing} style={styles.button}>
                <Text style={styles.buttonText}>Start</Text>
            </Pressable>
        </View>
    );
};

export default Hi;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    button: {
        marginTop: 16,
        padding: 16,
        backgroundColor: '#007BFF',
        borderRadius: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});
