import { Animated, Dimensions, Modal, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ClockFill from '@/components/ui/icons/ClockFill';
import AlarmIcon from '@/components/ui/icons/AlarmOutline';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

export type ReminderDrawerProps = {
    isReminderDrawerOpen: boolean;
    setIsReminderDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    reminderTime: Date | undefined;
    setReminderTime: React.Dispatch<React.SetStateAction<Date | undefined>>;
    eventTime: Date | undefined;
}
const windowHeight = Dimensions.get('window').height;


const ReminderDrawer: React.FC<ReminderDrawerProps> = ({
    isReminderDrawerOpen,
    setIsReminderDrawerOpen,
    reminderTime,
    setReminderTime,
    eventTime,
}) => {
    const [isReminderTimeEnable, setIsReminderTimeEnable] = React.useState<boolean>(false);
    const opacityAnim = React.useRef(new Animated.Value(0)).current;
    const [isAtTimeOfEvent, setIsAtTimeOfEvent] = useState<boolean>(true);
    const timeZoneOffsetInHours = moment().utcOffset() / 60 * -1;
    // const eventTimeAfterAddingOffset = eventTime ? moment(eventTime).add(timeZoneOffsetInHours, 'hours').toDate() : new Date();
    useEffect(() => {
        if(reminderTime){
            handleReminderTimeEnable();
        }
    },[])
    useEffect(() => {
        const timeZoneOffsetInHours = moment().utcOffset() / 60 * -1;
        if (isReminderTimeEnable){
            setReminderTime(eventTime === undefined ? new Date() : moment(eventTime).add(timeZoneOffsetInHours, 'hours').toDate());
        }
        else
            setReminderTime(undefined);
    }, [isReminderTimeEnable])

    const handleReminderTimeSave = () => {
        setIsReminderDrawerOpen(false);
        if (!isReminderTimeEnable) {
            setReminderTime(undefined);
            return;
        }
    }

    const handleReminderTimeEnable = () => {
        setIsReminderTimeEnable(!isReminderTimeEnable);
        Animated.timing(opacityAnim, {
            toValue: isReminderTimeEnable ? 0 : 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }
    const handleReminderTimeChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || reminderTime;
        setReminderTime(currentDate);
    }

    const handle10MinsBeforePress = () => {
        setIsAtTimeOfEvent(false);

        if (eventTime) {
            const newReminderTime = new Date(eventTime.getTime() - 10 * 60 * 1000);
            const timeZoneOffsetInHours = moment().utcOffset() / 60 * -1;

            setReminderTime(moment(newReminderTime).add(timeZoneOffsetInHours, 'hours').toDate());
            handleReminderTimeChange(null, moment(newReminderTime).add(timeZoneOffsetInHours, 'hours').toDate());
        } else {
            alert('Please select event time first');
        }
        setIsAtTimeOfEvent(true);
    }

    const handleAtTimeOfEventPress = () => {
        setIsAtTimeOfEvent(true);
        setReminderTime(moment(eventTime).add(timeZoneOffsetInHours, 'hours').toDate());
        handleReminderTimeChange(null, moment(eventTime).add(timeZoneOffsetInHours, 'hours').toDate());
    }
    return (
        <>
            <Modal
                animationType='slide'
                transparent={true}
                visible={isReminderDrawerOpen}
            >
                <View
                    style={[
                        styles.bottomSheet,
                    ]}
                >
                    {/* Top section */}
                    <View style={[styles.container1]}>
                        <TouchableOpacity onPress={handleReminderTimeSave}>
                            <Text style={[styles.text1]}>Done</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Reminder title section */}
                    <Text style={[styles.text2]}>
                        {
                            !isReminderTimeEnable
                                ? "No Reminder"
                                : `Remind me at ${moment(reminderTime).format('hh:mm A')}`
                        }
                    </Text>

                    {/* Reminder enable section */}
                    <View style={[styles.container2]}>
                        <View style={[styles.container3]}>
                            <AlarmIcon fillColor="#000" height={30} width={30} />
                            <View>
                                <Text style={[styles.text1]}>Reminder</Text>
                                <Text style={[styles.text3]}>Set a specific time to remind me</Text>
                            </View>
                        </View>
                        <View>
                            <Switch
                                trackColor={{ false: '#D3D3D3', true: '#90EE90' }}
                                thumbColor={isReminderTimeEnable ? '#fff' : '#fff'}
                                ios_backgroundColor="#D3D3D3"
                                onValueChange={handleReminderTimeEnable}
                                value={isReminderTimeEnable}
                                style={{
                                    transform: [{ scaleX: .8 }, { scaleY: .8 }]
                                }}
                            />
                        </View>
                    </View>

                    {/* Time selection section */}
                    <Animated.View style={[styles.container4, { opacity: opacityAnim }]}>
                        <View style={[styles.container7]} />
                        {
                            reminderTime && <DateTimePicker
                                mode="time"
                                testID="start time picker"
                                value={reminderTime!}
                                is24Hour={true}
                                // minimumDate={eventTimeAfterAddingOffset}
                                onChange={handleReminderTimeChange}
                                display="spinner"
                            />
                        }

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            marginTop: 10,
                        }}>
                            <TouchableOpacity
                                onPress={handleAtTimeOfEventPress}
                                style={[
                                    {
                                        padding: 12,
                                        borderRadius: 20,
                                    },
                                    {
                                        backgroundColor: isAtTimeOfEvent ? '#7393B3' : '#D3D3D3',
                                    }
                                ]}>
                                <Text>At time of event</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handle10MinsBeforePress}
                                style={[
                                    {
                                        padding: 12,
                                        borderRadius: 20,
                                    },
                                    {
                                        backgroundColor: isAtTimeOfEvent ? '#D3D3D3' : '#7393B3',
                                    }
                                ]}>
                                <Text>
                                    10 mins before
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </View>
            </Modal>
        </>
    )
}

export default ReminderDrawer

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
    text3: { fontSize: 12, fontWeight: 400 },
})