import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements'
import { Foundation } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default function BottomTabs() {
  return (
    <View>
        <Divider width={1} orientation='vertical' />
        <View className="flex-row justify-around py-3">
        <TouchableOpacity>
            <Foundation name="home" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
            <AntDesign name="search1" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
            <Feather name="video" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
            <Feather name="shopping-bag" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
            <FontAwesome5 name="user-circle" size={30} color="white" />
        </TouchableOpacity>
        </View>
    </View>
  )
}