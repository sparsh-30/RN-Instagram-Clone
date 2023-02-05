import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/NewPostScreen/Header'
import AddPostForm from '../components/NewPostScreen/AddPostForm'

export default function NewPostScreen() {
  return (
    <>
    <StatusBar style='dark' />
    <SafeAreaView className="flex-1 bg-black">
        <Header />
        <AddPostForm />
    </SafeAreaView>
    </>
  )
}