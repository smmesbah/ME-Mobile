import { Animated, Button, Dimensions, Modal, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import ClockFill from '@/components/ui/icons/ClockFill';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

export type SelectTimeDrawerProps = {
    isSelectTimeOpen: boolean;
    setIsSelectTimeOpen: React.Dispatch<React.SetStateAction<boolean>>;
    startTime: Date | undefined;
    setStartTime: React.Dispatch<React.SetStateAction<Date | undefined>>;
    endTime: Date | undefined;
    setEndTime: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const windowHeight = Dimensions.get('window').height;
const SelectTimeDrawer: React.FC<SelectTimeDrawerProps> = ({
    isSelectTimeOpen,
    setIsSelectTimeOpen,
    startTime,
    setStartTime,
    endTime,
    setEndTime
}) => {
    const [timeZoneOffsetInMinutes, setTimeZoneOffsetInMinutes] = useState(moment().utcOffset());
    const [isSpecifiedTimeEnable, setIsSpecifiedTimeEnable] = useState(false);
    const [isPointTime, setIsPointTime] = useState(true);
    const [startTimeDummy, setStartTimeDummy] = useState<Date | null>(null);
    const [endTimeDummy, setEndTimeDummy] = useState<Date | null>(null);


    const heightAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(0)).current;
    const [buttonWidth, setButtonWidth] = useState(0);
    const slideInterpolate = slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, buttonWidth]
    });

    const handleSpecifiedTime = () => {
        setStartTimeDummy(new Date());
        setIsSpecifiedTimeEnable(!isSpecifiedTimeEnable);
        Animated.parallel([
            Animated.timing(heightAnim, {
                toValue: isSpecifiedTimeEnable ? 0 : 1,
                duration: 300,
                useNativeDriver: false,
            }),
            Animated.timing(opacityAnim, {
                toValue: isSpecifiedTimeEnable ? 0 : 1,
                duration: 300,
                useNativeDriver: false,
            })
        ]).start();
    };

    const handleToggle = () => {
        setStartTimeDummy(new Date());
        setIsPointTime(!isPointTime);
        Animated.timing(slideAnim, {
            toValue: isPointTime ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const handleStartTimeChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || startTimeDummy;
        setStartTimeDummy(currentDate);
    }

    const handleEndTimeChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || endTimeDummy;
        setEndTimeDummy(currentDate);
    }

    const handleTimeSave = () => {
        if (!isSpecifiedTimeEnable) {
            setStartTime(undefined);
            setEndTime(undefined);
            setIsSelectTimeOpen(false);
            return;
        }
        const timeZoneOffsetInHours = moment().utcOffset() / 60;

        if (isPointTime) {
            setStartTime(startTimeDummy === null
                ? moment(new Date()).add(timeZoneOffsetInHours, 'hours').toDate()
                : moment(startTimeDummy).add(timeZoneOffsetInHours, 'hours').toDate());
            setEndTime(undefined);
            setIsSelectTimeOpen(false);
        } else {
            setStartTime(startTimeDummy === null
                ? moment(new Date()).add(timeZoneOffsetInHours, 'hours').toDate()
                : moment(startTimeDummy).add(timeZoneOffsetInHours, 'hours').toDate());
            setEndTime(endTimeDummy === null
                ? moment(startTimeDummy).add((timeZoneOffsetInHours * 60 + 1), 'minutes').toDate()
                : moment(endTimeDummy).add(timeZoneOffsetInHours, 'hours').toDate());
            setIsSelectTimeOpen(false);
        }
    }

    return (
        <View>
            <Modal
                animationType='slide'
                transparent={true}
                visible={isSelectTimeOpen}
            >
                <View style={[
                    styles.bottomSheet,
                ]}>
                    {/* Top section */}
                    <View style={[styles.container1]}>
                        <TouchableOpacity onPress={handleTimeSave}>
                            <Text style={[styles.text1]}>Done</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={[styles.text2]}>
                        {
                            !isSpecifiedTimeEnable ?
                                "Do it at any time of the day"
                                : isPointTime ? `Do it at ${moment(startTimeDummy).format('hh:mm A')} of the day`
                                    : `Do it between ${moment(startTimeDummy).format('hh:mm A')} and ${endTimeDummy === null ? moment(startTimeDummy).add(1, 'minute').format('hh:mm A') : moment(endTimeDummy).format('hh:mm A')} of the day`
                        }
                    </Text>

                    <View style={[styles.container2]}>
                        <View style={[styles.container3]}>
                            <ClockFill fillColor="#000" height={30} width={30} />
                            <View>
                                <Text style={[styles.text1]}>Specified time</Text>
                                <Text style={[styles.text3]}>Set a specific time to do it</Text>
                            </View>
                        </View>
                        <View>
                            <Switch
                                trackColor={{ false: '#D3D3D3', true: '#90EE90' }}
                                thumbColor={isSpecifiedTimeEnable ? '#fff' : '#fff'}
                                ios_backgroundColor="#D3D3D3"
                                onValueChange={handleSpecifiedTime}
                                value={isSpecifiedTimeEnable}
                                style={{
                                    transform: [{ scaleX: .8 }, { scaleY: .8 }]
                                }}
                            />
                        </View>
                    </View>

                    <Animated.View style={[styles.container4, { opacity: opacityAnim }]}>
                        <View style={[styles.container7]} />
                        <View style={[styles.container5]}>
                            <Animated.View style={[styles.container6, { transform: [{ translateX: slideInterpolate }] }]} />
                            <TouchableOpacity
                                onLayout={(event) => setButtonWidth(event.nativeEvent.layout.width)}
                                onPress={handleToggle}
                                style={[styles.container8]}
                            >
                                <Text style={{ fontWeight: isPointTime ? '500' : '300', }}>
                                    Point Time
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onLayout={(event) => setButtonWidth(event.nativeEvent.layout.width)}
                                onPress={handleToggle} style={[styles.container9]}>
                                <Text style={{ fontWeight: isPointTime ? '300' : '500', }}>
                                    Time Period
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <DateTimePicker
                            mode="time"
                            testID="start time picker"
                            value={startTimeDummy === null ? new Date() : startTimeDummy}
                            is24Hour={true}
                            minimumDate={new Date()}
                            onChange={handleStartTimeChange}
                            display="spinner"
                        />

                        {
                            !isPointTime && (
                                <View style={[styles.container10]}>
                                    <Text style={[styles.text4]}>TO</Text>
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={endTimeDummy === null ? moment(startTimeDummy).add(1, 'minutes').toDate() : endTimeDummy}
                                        mode="time"
                                        is24Hour={true}
                                        minimumDate={moment(startTimeDummy).add(1, 'minutes').toDate()}
                                        onChange={handleEndTimeChange}
                                        display="spinner"
                                    />
                                </View>
                            )
                        }
                    </Animated.View>
                </View>
            </Modal>
        </View>
    )
}

export default SelectTimeDrawer

const styles = StyleSheet.create({
    // ------------------- Container Styles -------------------
    bottomSheet: {
        position: 'absolute',
        left: 0,
        right: 0,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingVertical: 20,
        paddingHorizontal: 15,
        bottom: 0,
        borderWidth: 1,
        height: windowHeight * 0.86,
        backgroundColor: "#fff"
    },
    container1: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    container2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: 30,
        paddingHorizontal: 10,
    },
    container3: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    container4: {
        marginTop: 20,
        flexDirection: 'column',
        width: '100%',
    },
    container5: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10,
        backgroundColor: '#D3D3D3',
        borderRadius: 20,
        position: 'relative',
        overflow: 'hidden',
    },
    container6: {
        position: 'absolute',
        width: '50%',
        height: '100%',
        backgroundColor: '#7393B3',
    },
    container7: {
        borderWidth: 0.5,
        width: '100%',
        borderRadius: 10,
        borderColor: '#bababa'
    },
    container8: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        zIndex: 1,
    },
    container9: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        zIndex: 1,
    },
    container10: {
        alignItems: 'center',
        justifyContent: 'center',

    },
    // ------------------- Text Styles -------------------
    text1: {
        fontSize: 16,
        fontWeight: '500'
    },
    text2: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 10,
        textAlign: 'center',
        paddingHorizontal: 40,
    },
    text3: { fontSize: 12, fontWeight: '400' },
    text4: { fontSize: 20, fontWeight: '500' }
})