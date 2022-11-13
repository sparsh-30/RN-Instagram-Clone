import { View, Text, Image, TextInput, ScrollView, Button } from 'react-native'
import React, { useState } from 'react'
import { Divider } from 'react-native-elements'
import * as Yup from 'yup'
import { Formik } from 'formik'

const uploadPostSchema=Yup.object().shape({
    imageUrl: Yup.string().url().required("A URL is required."),
    caption: Yup.string().max(2200, "Caption limit cannot exceed 2200"),
})

const PLACEHOLDER_IMAGE="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";



export default function AddPostForm() {
    const [thumbnail,setThumbnail]=useState(PLACEHOLDER_IMAGE);
    
    return (
    <ScrollView>
        <Formik
            initialValues={{caption:"",imageUrl:""}}
            onSubmit={(values)=> console.log(values)}
            validationSchema={uploadPostSchema}
            validateOnMount={true}
        >
            {({handleChange, handleBlur, handleSubmit, values, errors, isValid})=>
                <>
                    <View>

                        <Image className="w-3/4 h-[400] mx-auto mb-3" source={{uri: thumbnail ? thumbnail :  PLACEHOLDER_IMAGE}} />
                    
                        <TextInput onChange={(e)=> setThumbnail(e.nativeEvent.text)} className="text-center text-white text-lg mb-3" placeholder='Enter the image URL' placeholderTextColor='gray' onChangeText={handleChange('imageUrl')} onBlur={handleBlur('imageUrl')} value={values.imageUrl} />
                        {
                            errors.imageUrl && (
                                <Text className="text-red-700 text-[20] ml-3 mb-2">{errors.imageUrl}</Text>
                            )
                        }

                        <Divider orientation='vertical' width={1} />

                        <TextInput className="my-5 text-center text-white text-xl" placeholder='Enter your caption' placeholderTextColor='gray' multiline={true} onChangeText={handleChange('caption')} onBlur={handleBlur('caption')} value={values.caption} />

                        <Divider orientation='vertical' width={1} />

                        <Button className="mt-5" title='Submit' onPress={handleSubmit} disabled={!isValid} />


                    </View>
                </>
            }
        </Formik>
    </ScrollView>
  )
}