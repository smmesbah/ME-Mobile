import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { initWhisper } from 'whisper.rn';
import { Asset } from 'expo-asset';
import { AudioSessionIos } from 'whisper.rn';

const Hi = () => {
    const [transcription, setTranscription] = useState('');
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [whisperContext, setWhisperContext] = useState(null);
    const [transcribeOptions, setTranscribeOptions] = useState(null);
    const [stopFunction, setStopFunction] = useState(null);

    const initializeWhisper = async () => {
        const modelAsset = Asset.fromModule(require('../../models/ggml-tiny.en.bin'));
        await modelAsset.downloadAsync();
        const modelPath = modelAsset.localUri || modelAsset.uri;
        console.log('Model path:', modelPath);

        const whisperContext = await initWhisper({
            filePath: modelPath,
        });

        const options = {
            language: 'en',
            audioSessionOnStartIos: {
                category: AudioSessionIos.Category.PlayAndRecord,
                options: [AudioSessionIos.CategoryOption.MixWithOthers],
                mode: AudioSessionIos.Mode.Default,
            },
            audioSessionOnStopIos: 'restore',
        };

        setWhisperContext(whisperContext);
        setTranscribeOptions(options);
    };

    useEffect(() => {
        initializeWhisper();
    }, []);

    const startTranscribing = async () => {
        if (!whisperContext || !transcribeOptions) return;

        const { stop, subscribe } = await whisperContext.transcribeRealtime(transcribeOptions);
        setIsTranscribing(true);
        setStopFunction(() => stop);

        subscribe((evt: any) => {
            const { isCapturing, data, processTime, recordingTime } = evt;
            if (data && data.result) {
                setTranscription(data.result);
            }
            console.log(
                `Realtime transcribing: ${isCapturing ? 'ON' : 'OFF'}\n` +
                `Result: ${data ? data.result : ''}\n\n` +
                `Process time: ${processTime}ms\n` +
                `Recording time: ${recordingTime}ms`,
            );
        });
    };

    const stopTranscribing = () => {
        if (stopFunction) {
            stopFunction();
            setIsTranscribing(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Realtime Transcription:</Text>
            <Text style={styles.transcription}>{transcription}</Text>
            <Pressable onPress={isTranscribing ? stopTranscribing : startTranscribing} style={styles.button}>
                <Text style={styles.buttonText}>{isTranscribing ? 'Stop' : 'Start'}</Text>
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
    transcription: {
        marginTop: 16,
        padding: 16,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        width: '100%',
        textAlign: 'center',
    },
});
