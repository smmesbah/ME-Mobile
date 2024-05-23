import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { Animated, Dimensions, Easing, StyleSheet, TouchableOpacity, View } from 'react-native';
import Close from '../ui/icons/Close';
import Plus from '../ui/icons/Plus';
import RadialMenuButton from '../ui/buttons/RadialMenuButton';
import HomeIcon from '../ui/icons/Home';
import CalenderOutline from '../ui/icons/Calender1';
import TaskAdd from '../ui/icons/TaskAdd';
import NotesAdd from '../ui/icons/NotesAdd';
import MicrophoneFilled from '../ui/icons/MicrophoneFilled';

export type RadialMenuProps = {
    setOpenToDoSheet: Dispatch<SetStateAction<boolean>>;
};

const { height, width } = Dimensions.get('screen');

const RadialMenu: FC<RadialMenuProps> = ({ setOpenToDoSheet }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [micOn, setMicOn] = useState(false);
    const animatedValue = useState(new Animated.Value(0))[0];
    const pulseValue = useState(new Animated.Value(1))[0];

    const toggleMenu = () => {
        setMenuOpen(prevState => !prevState);
        Animated.timing(animatedValue, {
            toValue: menuOpen ? 0 : 1,
            duration: 400,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    };

    const toggleMenuToMic = () => {
        let micNewState = !micOn;
        setMicOn(prevState => !prevState);
        if (micNewState) {
            startPulse();
        }
    }
    const startPulse = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseValue, {
                    toValue: 1.5,
                    duration: 800,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(pulseValue, {
                    toValue: 1,
                    duration: 800,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                })
            ])
        ).start();
    }

    const plusToClose = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '135deg'],
    });

    const closeToPlus = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['135deg', '0deg'],
    });

    return (
        <View style={styles.container}>
            {
                micOn && (
                    <Animated.View
                        style={[
                            styles.pulse,
                            {
                                transform: [{
                                    scale: pulseValue
                                }]
                            }
                        ]}
                    />
                )
            }
            {
                micOn ? (
                    <TouchableOpacity onPress={toggleMenuToMic} activeOpacity={0.8}>
                        <Animated.View style={[styles.button,]}>
                            <MicrophoneFilled width={28} height={28} />
                        </Animated.View>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={toggleMenu} onLongPress={toggleMenuToMic} activeOpacity={0.8}>
                        <Animated.View style={[styles.button, { transform: [{ rotate: closeToPlus }] }]}>
                            <Close width={28} height={28} />
                        </Animated.View>
                    </TouchableOpacity>
                )
            }

            {/* Other menu items can be added here */}
            <RadialMenuButton
                animatedValue={animatedValue}
                icon={<TaskAdd width={22} height={22} />}
                translateX={-65}
                translateY={10}
                onActionFunc={setOpenToDoSheet}
            />
            <RadialMenuButton
                animatedValue={animatedValue}
                icon={<NotesAdd width={24} height={24} />}
                translateX={-50}
                translateY={-45}
            />
            <RadialMenuButton
                animatedValue={animatedValue}
                icon={<CalenderOutline width={24} height={24} />}
                translateX={10}
                translateY={-60}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: height / 10,
        right: 15,
    },
    button: {
        width: width / 8.5,
        height: width / 8.5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: '#173a56',
        // Add shadows for a 3D effect
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 8, // for Android
        zIndex: 1,
    },
    pulse: {
        position: 'absolute',
        width: width / 8.5,
        height: width / 8.5,
        borderRadius: 50,
        backgroundColor: '#173a56',
        opacity: 0.3,
        zIndex: 0,
    }
});

export default RadialMenu;
