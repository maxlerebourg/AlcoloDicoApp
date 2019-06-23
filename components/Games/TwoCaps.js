import React from "react";
import {StyleSheet, View, TouchableOpacity, Image, Text} from "react-native";



export default class TwoCaps extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={styles.main_container}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cacaca',
    },
    dice: {
        height: '50%',
        flexDirection: 'row',
    },
    imageStyle: {
        width: 200,
        height: 300,
        resizeMode: 'center',
    },
    text: {
        color: '#555',
        fontWeight: 'bold',
        fontSize: 30,
        margin: 20,
    }
});