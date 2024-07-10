import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export type MultiStepProgressBarProps = {
    steps: number;
    currentStep: number;
};

const MultiStepProgressBar: React.FC<MultiStepProgressBarProps> = ({ steps, currentStep }) => {
    const [progress] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(progress, {
            toValue: currentStep,
            duration: 500, // Adjust duration as needed
            useNativeDriver: false,
        }).start();
    }, [currentStep]);

    const stepWidth = (width - 40) / steps;

    return (
        <View style={styles.container}>
            <View style={styles.progressBarContainer}/>
            {/* </View> */}
                <Animated.View
                    style={[
                        styles.progressBar,
                        {
                            // width: progress.interpolate({
                            //     inputRange: [0, steps],
                            //     outputRange: [0, width - 40], // Adjust width as needed
                            // }),
                            width: progress.interpolate({
                                inputRange: [0, steps],
                                outputRange: ['0%', '100%'],
                            }),
                        },
                    ]}
                />
                <View style={styles.stepsContainer}>
                    {[...Array(steps)].map((_, index) => (
                        <View key={index} style={[styles.step, { left: stepWidth * index - 10 }]}>
                            <Text style={styles.stepLabel}>{index + 1}</Text>
                        </View>
                    ))}
                </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    progressBarContainer: {
        width: '100%',
        height: 10,
        backgroundColor: '#ccc',
        borderRadius: 10,
        // overflow: 'hidden',
        position: 'absolute',
        top: 0,
        bottom: 0,
        justifyContent: 'center',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#00CABE',
        borderRadius: 10,
        position: 'absolute',
    },
    stepsContainer: {
        flexDirection: 'row',
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
    },
    step: {
        width: 20,
        height: 20,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    stepLabel: {
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default MultiStepProgressBar;
