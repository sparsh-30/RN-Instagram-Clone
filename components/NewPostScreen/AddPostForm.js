import { View, Text, Image, TextInput, ScrollView, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Divider } from 'react-native-elements'
import uuid from 'react-native-uuid'
import * as Yup from 'yup'
import { Formik } from 'formik'
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import {db,auth} from './../../firebase'
import { collection, query, where, getDocs, doc, onSnapshot, addDoc, setDoc, serverTimestamp, limit } from "firebase/firestore";

const uploadPostSchema=Yup.object().shape({
    caption: Yup.string().max(2200, "Caption limit cannot exceed 2200"),
})

const PLACEHOLDER_IMAGE="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";

export default function AddPostForm() {
    const [image, setImage] = useState(PLACEHOLDER_IMAGE);
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);
    const navigation=useNavigation();

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          quality: 1,
        });
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
    };

    const getUsername=()=>{
        const user=auth.currentUser;
        // console.log(user);
        // console.log(user.uid);
        const unsubscribe=query(collection(db,'users'),where('email','==',user.email));
        // console.log(unsubscribe);
        onSnapshot(unsubscribe,(snapshot)=>{
            snapshot.forEach((doc) =>{
                setCurrentLoggedInUser({
                    username: doc.data().username,
                    profilePicture: doc.data().profile_picture
                })
                // console.log(doc.data());
            })
        })
    }

    useEffect(()=>{
        getUsername();
        // console.log(currentLoggedInUser.username);
    },[]);

    const uploadPostToFirebase=(imageUrl,caption)=>{
        // console.log(currentLoggedInUser);
        const user=doc(db,'users',auth.currentUser.email,'posts',uuid.v4());
        const unsubscribe=setDoc(user,{
            email: auth.currentUser.email,
            imageUrl:image,
            username:currentLoggedInUser.username,
            profile_picture:currentLoggedInUser.profilePicture,
            owner_uid:auth.currentUser.uid,
            caption:caption,
            createdAt:serverTimestamp(),
            likes:0,
            likes_by_users:[],
            comments:[]
        })
        .catch((error)=> console.log(error));
    }
    
    
    return (
    <ScrollView>
        <Formik
            initialValues={{caption:"",imageUrl:""}}
            onSubmit={(values)=> {
                uploadPostToFirebase(values.imageUrl,values.caption);
                navigation.goBack();
            }}
            validationSchema={uploadPostSchema}
            validateOnMount={true}
        >
            {({handleChange, handleBlur, handleSubmit, values, errors, isValid})=>
                <>
                    <View>

                        <Image className="w-3/4 h-[400] mx-auto mb-3" source={{uri: image}} />
                    
                        {/* <TextInput onChange={(e)=> setThumbnail(e.nativeEvent.text)} className="text-center text-white text-lg mb-3" placeholder='Enter the image URL' placeholderTextColor='gray' onChangeText={handleChange('imageUrl')} onBlur={handleBlur('imageUrl')} value={values.imageUrl} />
                        {
                            errors.imageUrl && (
                                <Text className="text-red-700 text-[20] ml-3 mb-2">{errors.imageUrl}</Text>
                            )
                        } */}
                        <View className="w-1/2 mb-8 mx-auto">
                            <Button title='Browse image' onPress={pickImage} />
                        </View>

                        <TextInput className="my-5 text-center text-white text-xl" placeholder='Enter your caption' placeholderTextColor='gray' multiline={true} onChangeText={handleChange('caption')} onBlur={handleBlur('caption')} value={values.caption} />

                        <View className="w-1/2 mx-auto">
                            <Button className="mt-5" title='Submit' onPress={handleSubmit} disabled={image===PLACEHOLDER_IMAGE ? true : false} />
                        </View>

                    </View>
                </>
            }
        </Formik>
    </ScrollView>
  )
}