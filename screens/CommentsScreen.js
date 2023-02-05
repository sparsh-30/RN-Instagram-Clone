import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
// import { StatusBar } from 'expo-status-bar'
import React from 'react'

export default function CommentsScreen() {
  return (
    <>
      {/* <StatusBar style='dark' /> */}
      <SafeAreaView className="flex-1 bg-black">
          <Text className="text-white">CommentsScreen</Text>
      </SafeAreaView>
    </>
  )
}