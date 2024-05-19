import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Plus from '../icons/Plus';

export type RadialMenuButtonProps = {
    animatedValue: Animated.Value;
    icon: React.ReactNode;
    translateX: number;
    translateY: number;
}

const RadialMenuButton: React.FC<RadialMenuButtonProps> = ({ animatedValue, icon, translateX, translateY }) => {
    const { width, height } = Dimensions.get('screen');
    return (
        <Animated.View
            style={[
                {
                    position: 'absolute',
                    bottom: 0,
                    top: 0,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    transform: [
                        {
                            translateX: animatedValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, translateX],
                            })
                        },
                        {
                            translateY: animatedValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, translateY],
                            })
                        },
                        {
                            scale: animatedValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 1],
                            }),
                        }
                    ],
                    zIndex: -1,
                }
            ]}
        >
            <TouchableOpacity style={{
                backgroundColor: '#173a56',
                height: width / 12,
                width: width / 12,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.6,
                shadowRadius: 5,
                elevation: 8,
            }}>

                {icon}
            </TouchableOpacity>
        </Animated.View>
    )
}

export default RadialMenuButton

const styles = StyleSheet.create({})