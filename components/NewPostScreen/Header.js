import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

export default function Header() {
  const navigation=useNavigation();
  return (
    <View className="flex-row justify-between items-center px-2 mt-4 mb-10">
        <TouchableOpacity>
            <Entypo onPress={()=> navigation.navigate('HomeScreen')} name="chevron-thin-left" size={30} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-center text-xl font-[800] mr-8">New Post</Text>
        <Text></Text>
    </View>
  )
}