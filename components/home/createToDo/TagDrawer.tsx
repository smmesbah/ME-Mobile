import { Dimensions, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CircleCheckOutline from '@/components/ui/icons/CircleCheckOutline';

export type TagDrawerProps = {
    isTagDrawerOpen: boolean;
    setIsTagDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    tag: string | undefined;
    setTag: React.Dispatch<React.SetStateAction<string | undefined>>;
}
const windowHeight = Dimensions.get('window').height;

const tags = [
    'No tag',
    'Morning Routine',
    'Workout',
    'Clean Room',
    'Healthy Lifestyle',
    'Relationship',
    'Sleep Better'
]

const TagDrawer: React.FC<TagDrawerProps> = ({
    isTagDrawerOpen,
    setIsTagDrawerOpen,
    tag,
    setTag
}) => {
    const handleTagSave = () => {
        setIsTagDrawerOpen(false);
    }

    const handleAddTagClick = () => {
        console.log('Add new tag');
    }

    return (
        <>
            <Modal
                animationType='slide'
                transparent={true}
                visible={isTagDrawerOpen}
            >
                <View
                    style={[
                        styles.bottomSheet,
                    ]}
                >
                    {/* Top section */}
                    <View style={[styles.container1]}>
                        <TouchableOpacity onPress={handleAddTagClick}>
                            <Text style={[styles.text1]}>New Tag</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleTagSave}>
                            <Text style={[styles.text1]}>Done</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={[styles.text2]}>Tag</Text>

                        <ScrollView style={{
                            height: '90%',
                        }}>
                            {tags.map((item, index) => (
                                <View  key={index} style={{
                                    justifyContent: 'center',
                                }}>
                                    <TouchableOpacity
                                        onPress={() => setTag(item)}
                                        style={{
                                            padding: 20,
                                            backgroundColor: tag === item ? '#f5f5f5' : '#fff',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            borderRadius: 10,
                                        }}
                                    >
                                        <Text>{item}</Text>
                                        {
                                            tag === item && (
                                                <CircleCheckOutline fillColors="#000" height={20} width={20} />
                                            )
                                        }
                                    </TouchableOpacity>
                                    <View
                                        style={{
                                            borderWidth: 1,
                                            borderColor: '#f5f5f5',
                                            width: '95%',
                                            alignSelf: 'center',
                                        }}
                                    />
                                </View>
                            ))}
                        </ScrollView>
                    </View>

                </View>
            </Modal>
        </>
    )
}

export default TagDrawer

const styles = StyleSheet.create({
    // ------------------- Container Styles -------------------
    bottomSheet: {
        position: 'absolute',
        left: 0,
        right: 0,
        justifyContent: 'flex-start',
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
        justifyContent: "space-between",
        alignItems: "center",
    },
    // ------------------- Text Styles -------------------
    text1: {
        fontSize: 16,
        fontWeight: '500'
    },
    text2: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 10,
        textAlign: 'center',
        paddingHorizontal: 40,
    }
})