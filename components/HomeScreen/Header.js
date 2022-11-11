import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Octicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 

export default function Header() {
  return (
    <View className="flex-row justify-between items-center px-4">
      <TouchableOpacity>
        <Image className="w-[150px] h-[50px]" source={require('./../../assets/header_logo.png')} />
      </TouchableOpacity>
      <View className="flex-row">
        <TouchableOpacity className="ml-3">
          <Octicons name="diff-added" size={30} color="white" />
        </TouchableOpacity>

        <TouchableOpacity className="ml-3">
          <Feather name="heart" size={30} color="white" />
        </TouchableOpacity>

        <TouchableOpacity className="ml-3">
          <View className="absolute bg-[#ff3250] w-[25] h-[20] justify-center items-center left-[20] bottom-[18] rounded-3xl z-50">
            <Text className=" text-white text-bold text-center font-[900]">2</Text>
          </View>
          <FontAwesome5 name="facebook-messenger" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  )
}