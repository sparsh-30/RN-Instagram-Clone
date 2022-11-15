import { View, Text, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import LoginForm from '../components/LoginScreen/LoginForm'

export default function LoginScreen() {
  return (
    <SafeAreaView className="flex-1 px-7">
        <Image source={require('./../assets/instagram_logo.png')} className="w-[200] h-[200] mx-auto my-10" />
        <LoginForm />

    </SafeAreaView>
  )
}