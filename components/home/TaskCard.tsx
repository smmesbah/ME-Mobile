import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Calender from '../ui/icons/Calender'
import Flag from '../ui/icons/Flag'
import MenuDot from '../ui/icons/MenuDot'
import ProgressBarNative from '../ui/progressbars/ProgressBarLinear'

export type TaskCardProps = {
    // Props type definition
    taskType: string;
    taskTitle: string;
    progress: number;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    priority: "High" | "Medium" | "Low";
    redirectUrl: string;
    key?: string;
}

const TaskCard: React.FC<TaskCardProps> = ({
    taskTitle,
    taskType,
    progress,
    startDate,
    startTime,
    endDate,
    endTime,
    priority,
    redirectUrl
}) => {
    // const [progress, setProgress] = useState(60);

    return (
        <View style={{
            backgroundColor: '#fff',
            borderRadius: 10,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderWidth: 1,
            borderColor: '#D4D4D4',
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',

            }}>
                <View style={{
                    gap: 5,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        gap: 10,
                        alignItems: 'center',
                    }}>
                        <Text style={{ fontSize: 16, color: "#0560FD", fontWeight: '400' }}>{taskType}</Text>
                        <View style={{
                            paddingHorizontal: 15,
                            paddingVertical: 5,
                            backgroundColor: '#0560FD',
                            borderRadius: 20,
                            alignItems: 'center',
                        }}>
                            <Text style={{ fontSize: 12, color: "#fff", fontWeight: '500' }}>{priority}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => console.log(redirectUrl)}>
                        <Text style={{ fontSize: 18, color: "#000", fontWeight: '500' }}>{taskTitle}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{
                    height: 30,
                    width: 30,
                    borderWidth: 1,
                    borderColor: '#D4D4D4',
                    borderRadius: 50,
                    padding: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <MenuDot />
                </TouchableOpacity>
            </View>

            <View style={{
                marginTop: 10,
                gap: 5,
                width: '80%',
            }}>
                <Text style={{
                    fontSize: 14,
                    color: "#6E6E6E",
                    fontWeight: '500'

                }}>
                    Progress
                </Text>

                <ProgressBarNative
                    progressValue={progress}
                />
                {/* <MultiStepProgressBar steps={totalSteps} currentStep={currentStep} /> */}
            </View>

            <View style={{
                flexDirection: 'row',
                marginTop: 15,
                gap: 20,
            }}>
                <View style={{
                    flexDirection: 'row',
                    gap: 5,
                    alignItems: 'center',
                }}>
                    <Calender height={20} width={20} fill={"#0560FD"} />
                    <View style={{
                        gap: 2,
                    }}>
                        <Text style={{ fontSize: 12 }}>{startDate}</Text>
                        <Text style={{ fontSize: 12 }}>{startTime}</Text>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    gap: 5,
                    alignItems: 'center',
                }}>
                    <Flag height={20} width={20} fill={"#0560FD"} />
                    <View style={{
                        gap: 2,
                    }}>
                        <Text style={{ fontSize: 12 }}>{endDate}</Text>
                        <Text style={{ fontSize: 12 }}>{endTime}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default TaskCard

const styles = StyleSheet.create({})