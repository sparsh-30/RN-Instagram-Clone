import { View, Text, Image, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import {data} from './../../assets/StoriesData'

export default function Stories() {
  return (
    <View className="flew-row mt-4 px-3 items-center">
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {
            data.map((story) => {
                return (
                    <View key={story.id}>
                        <Image source={{uri: story.url}} style={styles.demo} className="h-[70] w-[70] rounded-full mr-4" />
                        <Text className="text-white font-bold text-md">{
                            story.username.length>10 ? story.username.slice(0,9).toLowerCase() + "..." : story.username.toLowerCase()
                        }</Text>
                    </View>
                )
            })
        }
      </ScrollView>
    </View>
  )
}

const styles=StyleSheet.create({
    demo:{
        borderWidth:3,
        borderColor:'#ff8501'
    }
})