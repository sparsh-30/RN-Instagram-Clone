import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import Header from '../components/HomeScreen/Header'
import Stories from '../components/HomeScreen/Stories'

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-black">
        <Header />
        <Stories />
    </SafeAreaView>
  )
}