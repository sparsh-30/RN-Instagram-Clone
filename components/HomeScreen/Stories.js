import { View, Text, Image, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements'
import {data} from './../../assets/StoriesData'

export default function Stories() {
  return (
    <View>
        <View className="flew-row mt-4 px-3 items-center pb-2">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {
                data.map((story) => {
                    return (
                        <View key={story.id}>
                            <Image source={{uri: story.url}} style={styles.story_border} className="h-[70] w-[70] rounded-full mr-4" />
                            <Text className="text-white font-bold text-md">{
                                story.username.length>10 ? story.username.slice(0,9).toLowerCase() + "..." : story.username.toLowerCase()
                            }</Text>
                        </View>
                    )
                })
            }
        </ScrollView>
        </View>
        <Divider width={1} orientation='vertical' />
    </View>
  )
}

const styles=StyleSheet.create({
    story_border:{
        borderWidth:3,
        borderColor:'#ff8501'
    }
})