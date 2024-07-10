import { Animated, Dimensions, LayoutChangeEvent, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import HomeIcon from '../ui/icons/Home';
import StickyNotes from '../ui/icons/StickyNotes';
import CalenderOutline from '../ui/icons/Calender1';
import UserOutline from '../ui/icons/User';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('screen');

const HomeFooter = () => {
    const [selectedTab, setSelectedTab] = useState('home');
    const [sliderPosition] = useState(new Animated.Value(0)); // Initial position of the slider
    const [tabPositions, setTabPositions] = useState<{ [key: string]: number }>({});
    const [offset, setOffset] = useState((430 - width) / 8);
    const tabs = ['home', 'stickyNotes', 'calendar', 'user'];

    const animatedValues = useRef({
        home: new Animated.Value(0),
        stickyNotes: new Animated.Value(0),
        calendar: new Animated.Value(0),
        user: new Animated.Value(0),
    }).current;


    useEffect(() => {
        tabs.forEach((tab) => {
            Animated.timing(animatedValues[tab as keyof typeof animatedValues], {
                toValue: selectedTab === tab ? -17 : 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        });
    }, [selectedTab]);

    useEffect(() => {
        const positions: { [key: string]: number } = {};
        tabs.forEach((tab) => {
            positions[tab] = 0;
        });
        setTabPositions(positions);
    }, []);

    const handlePress = (tab: string) => {
        setSelectedTab(tab);

        // Animate slider position to the selected tab's position
        Animated.timing(sliderPosition, {
            toValue: tabPositions[tab] - 67 + offset, // Adjust the offset according to your design
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const handleLayout = (event: LayoutChangeEvent, tab: string) => {
        const { x } = event.nativeEvent.layout;
        setTabPositions(prevPositions => ({
            ...prevPositions,
            [tab]: x,
        }));
        // initial slider position 
        if (tab === 'home') {
            sliderPosition.setValue(x - 67 + offset);
        }
    }


    return (
        <View style={styles.footer}>
            <Animated.View
                style={[{
                    position: 'absolute',
                    top: 0,
                    transform: [{ translateX: sliderPosition }],
                }]}
            >
                <Svg
                    width={106}
                    height={45}
                    viewBox="0 0 106 45"
                    fill="none"
                >
                    <Path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M28 22C28 9.85 15.464 0 0 0h106C90.536 0 78 9.85 78 22v-2c0 13.807-11.193 25-25 25S28 33.807 28 20v2z"
                        fill="#fff"
                    />
                </Svg>
            </Animated.View>

            {tabs.map(tab => (
                <TouchableWithoutFeedback key={tab} onPress={() => handlePress(tab)} onLayout={(event) => handleLayout(event, tab)}>
                    <Animated.View style={[styles.iconContainer, { transform: [{ translateY: animatedValues[tab as keyof typeof animatedValues] }] }]}>
                        <View style={[styles.circle, selectedTab === tab && styles.selectedCircle]}>
                            {tab === 'home' && <HomeIcon />}
                            {tab === 'stickyNotes' && <StickyNotes />}
                            {tab === 'calendar' && <CalenderOutline />}
                            {tab === 'user' && <UserOutline />}
                        </View>
                    </Animated.View>
                </TouchableWithoutFeedback>
            ))}
        </View>
    );
};

export default HomeFooter;

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        height: height * 0.08,
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#173a56',
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
    },
    selectedCircle: {
        backgroundColor: '#173a56',
        borderRadius: 25,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});
