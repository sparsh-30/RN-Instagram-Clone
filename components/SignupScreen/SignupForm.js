import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import validator from 'email-validator'
import {auth,db} from './../../firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore";

export default function SignupForm() {

    const SignupFromSchema=Yup.object().shape({
        email: Yup.string().email().required("An email is required"),
        username: Yup.string().required().min(4,"A username is required"),
        password: Yup.string().required().min(8,"Your password has to have at least 8 characters")
    })

    const navigation=useNavigation();

    const getRandomProfilePicture=async ()=>{
        const response=await fetch('https://randomuser.me/api')
        const data=await response.json();
        return data.results[0].picture.large;
    }

    const onSignup=async (email,password,username)=> {
        try{
            const authUser=await createUserWithEmailAndPassword(auth,email,password);
            // const demo=await addDoc(collection(db,'users'),{
            //     owner_id:authUser.user.uid,
            //     username:username,
            //     email:authUser.user.email,
            //     profile_picture: await getRandomProfilePicture()
            // })
            const setData=await setDoc(doc(db,'users',authUser.user.email),{
                owner_id:authUser.user.uid,
                username:username,
                email:authUser.user.email,
                profile_picture: await getRandomProfilePicture()
            })
        }catch(error){
            alert(error);
        }
    }

  return (
    <View>
        <Formik
            initialValues={{email:'',username:'',password:''}}
            onSubmit={(values)=> {
                onSignup(values.email,values.password,values.username);
                // navigation.navigate('HomeScreen')
            }}
            validationSchema={SignupFromSchema}
            validateOnMount={true}
        >
        {({handleChange, handleBlur, handleSubmit, values, errors, isValid})=>(
            <>
                <TextInput 
                    style={{borderColor: values.email.length<1 || validator.validate(values.email) ? '#ccc' : 'red'}}
                    placeholderTextColor='#444'
                    placeholder='Email'       
                    className="border-2 mt-10 py-1 px-4 rounded-md text-base"
                    keyboardType='email-address'
                    autoCapitalize='none'
                    textContentType='emailAddress'
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                />
                <TextInput 
                    style={{borderColor: values.username.length>=1 && values.username.length<4 ? 'red' : '#cccf'}}
                    placeholderTextColor='#444'
                    placeholder='Username'       
                    className="border-2 mt-2 py-1 px-4 rounded-md text-base"
                    keyboardType='email-address'
                    autoCapitalize='none'
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                />
                <TextInput 
                    style={{borderColor: values.password.length>=1 && values.password.length<8 ? 'red' : '#ccc'}}
                    placeholderTextColor='#444'
                    placeholder='Password' 
                    className="border-2 py-1 px-4 my-2 mb-10 rounded-md text-base" 
                    autoCorrect={false}
                    autoCapitalize='none'
                    secureTextEntry={true}
                    textContentType='password'
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                />

                {/* <Text className="text-right text-base text-[#0d6efd] mb-8">Forgot Password?</Text> */}

                <Button color={isValid ? '#0d6efd' : '#9acaf7'} onPress={handleSubmit} title='Submit' />

                <View className="text-center mt-8 flex-row justify-center">
                    <Text className="text-base">Already have an account? </Text>
                    <TouchableOpacity onPress={()=> navigation.navigate('LoginScreen')}>
                        <Text className="text-[#0d6efd] text-base">Log In</Text>
                    </TouchableOpacity>
                </View>
            </>
            )}
        </Formik>
    </View>
  )
}