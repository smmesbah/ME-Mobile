import { SafeAreaView, StyleSheet, Text } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'
import HomeHeader from '@/components/home/HomeHeader'
import HomeFooter from '@/components/home/HomeFooter'
import RadialMenu from '@/components/home/RadialMenu'

const HomeLayout = () => {
    return (
        <>
            <HomeHeader />
            <Slot />
            <RadialMenu />
            <HomeFooter />
        </>
    )
}

export default HomeLayout

const styles = StyleSheet.create({})