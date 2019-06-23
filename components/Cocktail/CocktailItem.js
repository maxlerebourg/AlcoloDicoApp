import React from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'
import {getImageFromApi} from "../../API/CocktailAPI";

import color from "../Config/Color";

export default class CocktailItem extends React.Component {

    render() {
        const {cock} = this.props;
        return (

            <View style={styles.main_container}>

                <TouchableOpacity onPress={() => this.props.displayDetail(cock)}>
                    <Image
                        style={styles.image}
                        source={{uri: getImageFromApi(cock.images.toString().split(',')[0])}}
                    />
                    <View style={styles.container}>
                        <Text style={styles.title}>{cock.name}</Text>
                        <Text style={styles.text}>{cock.preview}</Text>
                    </View>

                </TouchableOpacity>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: 200,
    },
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        position: 'absolute',
        justifyContent: 'center',
        backgroundColor: 'rgba(50,50,50,0.3)',
        padding: 20,
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
        //fontFamily: '1_Thany',
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        //fontFamily: '1_Thany',
    },
    image: {
        width: '100%',
        height: '100%',
    }
});