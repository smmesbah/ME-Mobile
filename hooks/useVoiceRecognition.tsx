import Voice, {
    SpeechErrorEvent,
    SpeechRecognizedEvent,
    SpeechResultsEvent,
} from '@react-native-voice/voice';
import { useCallback, useEffect, useState } from 'react';
import { Permission, PermissionsAndroid } from 'react-native';

interface IState {
    recognized: string;
    pitch: string;
    error: string;
    end: string;
    started: string;
    results: string[];
    partialResults: string[];
    isRecording: boolean;
}

export const useVoiceRecognition = () => {
    const [state, setState] = useState<IState>({
        recognized: '',
        pitch: '',
        error: '',
        end: '',
        started: '',
        results: [],
        partialResults: [],
        isRecording: false,
    })

    const resetState = useCallback(() => {
        setState({
            recognized: '',
            pitch: '',
            error: '',
            end: '',
            started: '',
            results: [],
            partialResults: [],
            isRecording: false,
        })
    }, [setState])

    const startRecognizing = useCallback(async () => {
        resetState();
        try {
            const x = await Voice.start('en-US');
            console.log(x)
        } catch (e) {
            console.error(e);
        }
    }, [resetState]);

    const stopRecognizing = useCallback(async () => {
        try {
            await Voice.stop();
        } catch (e) {
            console.error(e);
        }
    }
        , []);

    const cancelRecognizing = useCallback(async () => {
        try {
            await Voice.cancel();
        } catch (e) {
            console.error(e);
        }
    }, [])

    const destroyRecognizer = useCallback(async () => {
        try {
            await Voice.destroy();
        } catch (e) {
            console.error(e);
        }
        resetState();
    }, [resetState]);

    const requestPermission = async() => {
        const granted =  await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
                title: 'Microphone Permission',
                message: 'App needs access to your microphone',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Permission granted")
        } else {
            console.log("Permission denied")
        }
    }

    useEffect(() => {
        requestPermission();
        Voice.onSpeechStart = (e: any) => {
            setState((prevState) => ({
                ...prevState,
                started: '√',
                isRecording: true,
            }));
        };

        Voice.onSpeechRecognized = () => {
            setState((prevState) => ({ ...prevState, recognized: '√' }));
        }

        Voice.onSpeechEnd = () => {
            setState((prevState) => ({ ...prevState, end: '√', isRecording: false }));
        }

        Voice.onSpeechError = (e: SpeechErrorEvent) => {
            console.log('Error: ', e.error);
            setState((prevState) => ({ ...prevState, error: JSON.stringify(e.error), isRecording: false }));
            destroyRecognizer();
        }

        Voice.onSpeechResults = (e: SpeechResultsEvent) => {
            if (e.value) {
                setState((prevState) => ({ ...prevState, results: e.value! }))
            }
        };

        Voice.onSpeechPartialResults = (e: SpeechResultsEvent) => {
            if (e.value) {
                setState((prevState) => ({ ...prevState, partialResults: e.value! }))
            }
        }

        Voice.onSpeechVolumeChanged = (e: any) => {
            setState((prevState) => ({ ...prevState, pitch: e.value }));
        };

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        }

    }, [])

    return {
        state,
        setState,
        resetState,
        startRecognizing,
        stopRecognizing,
        cancelRecognizing,
        destroyRecognizer
    }
}