import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SignupForm from '../components/SignupScreen/SignupForm'

export default function SignupScreen() {
  return (
    <SafeAreaView className="flex-1 px-7">
        <Image source={require('./../assets/instagram_logo.png')} className="w-[200] h-[200] mx-auto my-10" />
        <SignupForm />
    </SafeAreaView>
  )
}