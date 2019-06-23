import React from 'react'
import {Alert} from "react-native";


export const alert = (text, that) => {Alert.alert('Error',
    text,
    [{text : 'Se connecter',
        onPress: ()=>{that.props.navigation.navigate('Login')}}]);
};

