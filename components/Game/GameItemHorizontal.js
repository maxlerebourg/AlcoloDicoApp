import React from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'
import {getImageFromApi} from "../../API/GameAPI";

import Star from "../../images/svg/Star";

import color from "../Config/Color";


export default class GameItem extends React.Component {

    render() {
        const {game} = this.props;
        return (
            <View style={styles.main_container}>

                <TouchableOpacity style={styles.content_container} onPress={() => {this.props.displayDetail(game)}}>
                    <View style={styles.container}>
                        <Image
                            style={styles.image}
                            source={{uri: getImageFromApi(game.images.toString().split(',')[0])}}
                        />
                    </View>
                    <View style={styles.text_container}>
                        <Text style={styles.title_text}>{game.name}</Text>
                        { game.comments && game.comments[0] ?
                            <View style={styles.star}>
                                <Text style={styles.text}>{(Math.round(game.comments[0].rate * 10) / 10).toFixed(1)} </Text>
                                <Star config={{width: 9, height: 9, color: color.fontColor}}/>
                            </View> : null
                        }
                    </View>
                </TouchableOpacity>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    main_container: {
        flex: 1/3,
        width: 125,
        height: 180,
        margin: 5,
    },
    container: {
        width: '100%',
        height: '65%',
        overflow: 'hidden',
    },
    content_container: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
        overflow: 'hidden',
    },
    text_container: {
       padding: 5,
    },
    title_text: {
        color: color.fontTitleColor,
        //fontWeight: 'bold',
        flexWrap: 'nowrap',
    },
    image: {
        flex: 1,
        borderRadius: 15,
    },
    text: {
        fontSize: 12,
        color: color.fontColor,
    },
    under_text: {
        fontSize: 12,
        color: color.fontColor,
    },
    star: {
        alignItems: 'center',
        flexDirection: 'row',
    }
});