import React from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'
import {getImageFromApi} from "../../API/GameAPI";

import Star from "../../images/svg/Star";

import color from "../Config/Color";
import playable from "../Config/Playable";
import Play from "../../images/svg/Play";


export default class GameItem extends React.Component {

    render() {
        const {config, game} = this.props;
        let icon = [];
        for (let i = 0; i < playable.length; i++) {
            if (playable[i].id === game.id)
                icon.push(
                    <TouchableOpacity
                        style={{marginTop: 2}}
                        onPress={() => {this.props.play(playable[i].name)}}>
                        <Play config={{color: color.fontColor, width: 11, height: 11}}/>
                    </TouchableOpacity>);
        }
        return (
            <TouchableOpacity style={[styles.main_container, config]} onPress={() => {
                this.props.displayDetail(game)
            }}>
                <Image
                    style={[styles.image, {width: config.width, height: config.width}]}
                    source={{uri: getImageFromApi(game.images.toString().split(',')[0])}}
                />
                <Text style={styles.title_text}>{game.name}</Text>
                <View style={styles.star}>
                    {game.comments && game.comments[0] ?
                        <View style={styles.star}>
                            <Text style={styles.text}>{(Math.round(game.comments[0].rate * 10) / 10).toFixed(1)} </Text>
                            <Star config={{width: 9, height: 9, color: color.fontColor}}/>
                            <Text style={styles.text}>      </Text>
                        </View>
                         : null
                    }
                    {icon}
                </View>
            </TouchableOpacity>

        )
    }
}
const styles = StyleSheet.create({
    main_container: {
        margin: 5,
        overflow: 'hidden',
    },
    container: {
        width: '100%',
        height: '65%',
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