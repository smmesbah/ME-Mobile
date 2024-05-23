import HomeFooter from '@/components/home/HomeFooter'
import HomeHeader from '@/components/home/HomeHeader'
import RadialMenu from '@/components/home/RadialMenu'
import ToDoBottomDrawer from '@/components/home/ToDoBottomDrawer'
import { Slot } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'

const HomeLayout = () => {
    const [openToDoSheet, setOpenToDoSheet] = useState(false);
    return (
        <>
            <HomeHeader />
            <Slot />
            <RadialMenu 
                setOpenToDoSheet={setOpenToDoSheet}
            />
            <ToDoBottomDrawer 
                openToDoSheet={openToDoSheet}
                setOpenToDoSheet={setOpenToDoSheet}
            />
            <HomeFooter />
        </>
    )
}

export default HomeLayout

const styles = StyleSheet.create({})