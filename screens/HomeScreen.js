import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React,{ useEffect, useState } from 'react'
import Header from '../components/HomeScreen/Header'
import Stories from '../components/HomeScreen/Stories'
import Post from '../components/HomeScreen/Post'
import {posts} from './../assets/PostsData'
import BottomTabs from '../components/HomeScreen/BottomTabs'
import {db} from './../firebase'
import { collectionGroup, onSnapshot, doc } from 'firebase/firestore'

export default function HomeScreen({navigation}) {
  const [posts,setPosts]=useState([]);

  useEffect(()=>{
    onSnapshot(collectionGroup(db,"posts"),(snapshot)=> {
      setPosts(snapshot.docs.map(doc=> doc.data()));
    })
  },[])

  return (
    <SafeAreaView className="flex-1 bg-black">
        <Header navigation={navigation} />
        <Stories />
        <ScrollView>
          {posts.map((post,index)=>{
            return (<Post key={index} post={post} />)
          })}
        </ScrollView>
        <BottomTabs />
    </SafeAreaView>
  )
}