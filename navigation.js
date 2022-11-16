import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen'
import NewPostScreen from './screens/NewPostScreen'
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'

const Stack=createStackNavigator();

export function SignedInStack() {
  return (
    <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{headerShown:false,animationEnabled:true,gestureEnabled:true,gestureDirection:'horizontal'}}>
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='NewPostScreen' component={NewPostScreen} />
    </Stack.Navigator>
  )
}

export function SignedOutStack() {
  return (
    <Stack.Navigator initialRouteName='LoginScreen' screenOptions={{headerShown:false,animationEnabled:true,gestureEnabled:true,gestureDirection:'horizontal'}}>
        <Stack.Screen name='LoginScreen' component={LoginScreen} />
        <Stack.Screen name='SignupScreen' component={SignupScreen} />
    </Stack.Navigator>
  )
}

