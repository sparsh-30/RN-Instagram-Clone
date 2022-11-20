import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import validator from 'email-validator'
import {auth} from './../../firebase'
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginForm() {

    const LoginFromSchema=Yup.object().shape({
        email: Yup.string().email().required("An email is required"),
        password: Yup.string().required().min(8,"Your password has to have at least 8 characters")
    })

    const navigation=useNavigation();

    const onLogin=async (email,password)=>{
        try{
            signInWithEmailAndPassword(auth,email,password)
            .catch((error)=> alert("Enter the correct credentials."));
            console.log(email,password);
        }catch(error){
            alert(error);
        }
    }

  return (
    <View>
        <Formik
            initialValues={{email:'',password:''}}
            onSubmit={(values)=> {
                onLogin(values.email,values.password);
                // navigation.navigate('HomeScreen');
            }}
            validationSchema={LoginFromSchema}
            validateOnMount={true}
        >
        {({handleChange, handleBlur, handleSubmit, values, errors, isValid})=>(
            <>
                <TextInput 
                    style={{borderColor: values.email.length<1 || validator.validate(values.email) ? '#ccc' : 'red'}}
                    placeholderTextColor='#444'
                    placeholder='Phone number, username or email'       
                    className="border-2 mt-10 py-1 px-4 rounded-md text-base"
                    keyboardType='email-address'
                    autoCapitalize='none'
                    textContentType='emailAddress'
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                />
                <TextInput 
                    style={{borderColor: values.password.length>=1 && values.password.length<8 ? 'red' : '#ccc'}}
                    placeholderTextColor='#444'
                    placeholder='Password' 
                    className="border-2 py-1 px-4 my-2 rounded-md text-base" 
                    autoCorrect={false}
                    autoCapitalize='none'
                    secureTextEntry={true}
                    textContentType='password'
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                />

                <Text className="text-right text-base text-[#0d6efd] mb-8">Forgot Password?</Text>

                <Button color={isValid ? '#0d6efd' : '#9acaf7'} onPress={handleSubmit} title='Submit' />

                <View className="text-center mt-8 flex-row justify-center">
                    <Text className="text-base">Don't have an account? </Text>
                    <TouchableOpacity onPress={()=> navigation.navigate('SignupScreen')}>
                        <Text className="text-[#0d6efd] text-base">Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </>
            )}
        </Formik>
    </View>
  )
}