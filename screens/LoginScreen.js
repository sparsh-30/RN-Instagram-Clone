import { View, Text, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import LoginForm from '../components/LoginScreen/LoginForm'

export default function LoginScreen() {
  return (
    <>
    <StatusBar style='light' />
    <SafeAreaView className="flex-1 px-7">
        <Image source={require('./../assets/instagram_logo.png')} className="w-[200] h-[200] mx-auto my-10" />
        <LoginForm />

    </SafeAreaView>
    </>
  )
}