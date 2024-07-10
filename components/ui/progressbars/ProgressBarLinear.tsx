import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, View, LayoutChangeEvent } from 'react-native';

type ProgressBarNativeProps = {
    progressValue: number;
};

const ProgressBarNative: React.FC<ProgressBarNativeProps> = ({ progressValue }) => {
    const [progress] = useState(new Animated.Value(0));
    const [progressText, setProgressText] = useState('0');
    const [parentWidth, setParentWidth] = useState(0);

    useEffect(() => {
        const progressListener = progress.addListener(({ value }) => {
            setProgressText(value.toFixed(0));
        });

        Animated.timing(progress, {
            toValue: progressValue,
            duration: 2000,
            useNativeDriver: false,
        }).start();

        return () => {
            progress.removeListener(progressListener);
        };
    }, [progressValue]);

    const onLayout = (event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout; // Get the width of the parent view
        setParentWidth(width);
    };

    return (
        <View style={styles.container} onLayout={onLayout}>
            <View style={styles.progressBar}>
                <Animated.View
                    style={[
                        styles.bar,
                        {
                            width: progress.interpolate({
                                inputRange: [0, 100],
                                outputRange: ['0%', '100%'],
                            }) as unknown as number,
                        },
                    ]}
                />
                <Animated.Text
                    style={[
                        styles.progressText,
                        {
                            left: progress.interpolate({
                                inputRange: [0, 100],
                                outputRange: [0, parentWidth - 35], // Subtracting to avoid overflow
                            }) as unknown as number,
                        },
                    ]}
                >
                    {progressText}%
                </Animated.Text>
            </View>
        </View>
    );
};

export default ProgressBarNative;

const styles = StyleSheet.create({
    container: {
        // margin: 10,
    },
    progressBar: {
        height: 15,
        backgroundColor: '#ccc',
        borderRadius: 10,
        overflow: 'hidden',
    },
    bar: {
        height: 15,
        backgroundColor: '#00CABE',
        borderRadius: 10,
        justifyContent: 'center',
    },
    progressText: {
        fontSize: 10,
        position: 'absolute',
        color: '#000',
        fontWeight: 'bold',
        top: 0.5,
    },
});
