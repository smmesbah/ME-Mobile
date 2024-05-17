import { SafeAreaView, StyleSheet, Text } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'
import HomeHeader from '@/components/home/HomeHeader'

const HomeLayout = () => {
    return (
        <>
            <HomeHeader />
            <Slot />
        </>
    )
}

export default HomeLayout

const styles = StyleSheet.create({})