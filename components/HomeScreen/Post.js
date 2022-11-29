import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Divider } from 'react-native-elements'
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {auth,db} from './../../firebase'
import { doc, updateDoc, arrayUnion, arrayRemove, setDoc } from "firebase/firestore";

export default function Post({post}) {

    const handleLike=() => {
        const currentLikeStatus=!post.likes_by_users.includes(auth.currentUser.email);
        const ref=doc(db,'users',post.email,'posts',post.id);
        updateDoc(ref,{
            likes_by_users:currentLikeStatus
            ? arrayUnion(auth.currentUser.email)
            : arrayRemove(auth.currentUser.email)
            // likes: 10
        }).catch((error)=> console.log(error))
    }

  return (
    <View className="mb-2">
        <Divider width={1} orientation="vertical" />
        <PostHeader post={post} />
        <PostImage post={post} />
        <PostFooter post={post} handleLike={handleLike} />
        {/* <PostFooter post={post} /> */}
    </View>
  )
}

const PostHeader=({post})=> {
    return (
    <View className="flex-row justify-between items-center px-2 my-2">
        <View className="flex-row items-center">
            <Image style={styles.story_border} className="w-[40] h-[40] rounded-full mr-2" source={{uri: post.profile_picture}} />
            <Text className="text-white font-[700]">{post.username}</Text>
        </View>
        <TouchableOpacity>
            <Entypo name="dots-three-horizontal" size={20} color="white" />
        </TouchableOpacity>
    </View>
    )
}

const PostImage=({post})=> (
    <View style={{width:'100%',height:450}}>
        <Image source={{uri: post.imageUrl}} style={{height:'100%',resizeMode:'cover'}} />
        {/* <Image source={{uri: post.imageUrl}} className="h-full resize" /> */}
    </View>
)

const PostFooter=({handleLike,post})=> (
    <View className="pt-2 pb-1 px-3">
        <View className="flex-row justify-between">
            <View className="flex-row">
                <TouchableOpacity onPress={handleLike} className="mr-4">
                    {/* <Feather name="heart" size={25} color="white" />
                    <AntDesign name="heart" size={25} color="red" /> */}
                    {
                        post.likes_by_users.includes(auth.currentUser.email)
                        ? <AntDesign name="heart" size={25} color="red" />
                        : <Feather name="heart" size={25} color="white" />
                    }
                </TouchableOpacity>
                <TouchableOpacity className="mr-3">
                    <FontAwesome5 name="comment" size={25} color="white" />
                </TouchableOpacity>
                <TouchableOpacity className="mr-3">
                    <FontAwesome name="send" size={25} color="white" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity>
                <Feather name="bookmark" size={25} color="white" />
            </TouchableOpacity>
        </View>

        <Text className="text-white mt-[1]">{post.likes_by_users.length} likes</Text>

        <Text className="mt-1">
            <Text className="text-white font-[900]">{post.username} </Text>
            <Text className="text-white"> {post.caption}</Text>
        </Text>

        <Text className="text-[#808080] mt-[1]">{post.comments.length===0 ? "No comment" : post.comments.length===1 ? "View 1 comment" : "View all "+post.comments.length+" comments"}</Text>

        {/* <Text className="mt-[1]">
            <Text className="text-white font-[900]">{post.comments.length>0 && (post.comments.length===0 ? "" : post.comments[0].user)} </Text>
            <Text className="text-white"> {post.comments.length>0 && (post.comments.length===0 ? "" : post.comments[0].comment)}</Text>
        </Text> */}
        {post.comments.length>0 && (<Text className="">
                <Text className="text-white font-[900]">{post.comments[0].username} </Text>
                <Text className="text-white"> {post.comments[0].comment}</Text>
        </Text>)}

    </View>
)

const styles=StyleSheet.create({
    story_border:{
        borderWidth:3,
        borderColor:'#ff8501'
    }
})