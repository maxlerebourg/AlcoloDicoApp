import React from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'
import {getImageFromApi} from "../../API/GameAPI";
import playable from '../Config/Playable';


import Star from "../../images/svg/Star";
import Play from "../../images/svg/Play";

import color from "../Config/Color";
import GameIcon from "./GameIcon";


export default class GameItem extends React.Component {

    render() {
        const {game} = this.props;
        let icon = [];
        for (let i = 0; i < playable.length; i++) {
            if (playable[i].id === game.id)
                icon.push(
                    <TouchableOpacity
                        style={{top: '0%', right: '0%', position: 'absolute', zIndex: 2}}
                        onPress={() => {this.props.play(playable[i].name)}}>
                        <Play config={{color: color.mainColor, width: 22, height: 22}}/>
                    </TouchableOpacity>);
        }

        return (

            <View style={styles.main_container}>

                <TouchableOpacity onPress={() => {this.props.displayDetail(game)}}>
                    <View style={styles.container}>

                        <Image
                            style={styles.image}
                            source={{uri: getImageFromApi(game.images.toString().split(',')[0])}}
                        />
                        <View style={styles.content_container}>
                            {icon}
                            <Text style={styles.title_text}>{game.name}</Text>
                            <View style={styles.content2_container}>
                                <Text style={styles.text}>{game.preview}</Text>
                            </View>
                            <View style={{bottom: '5%', left: '5%', flexDirection: 'row', position: 'absolute'}}>
                                <GameIcon category={game.categoryId} />
                            </View>
                            { game.comments && game.comments[0] ?
                                <View style={styles.star}>
                                    <Text style={styles.text}>{(Math.round(game.comments[0].rate * 10) / 10).toFixed(1)} </Text>
                                    <Star config={{width: 12, height: 12}}/>
                                </View> : null
                            }
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

        )
    }
}
//<Text style={styles.text}>{(Math.round(game.comments[0].rate * 10) / 10).toFixed(1)}</Text>
const styles = StyleSheet.create({
    main_container: {
        backgroundColor: color.backColor,
        padding: 5,
    },
    container: {
        height: 150,
        backgroundColor: color.displayColor,
        flexDirection: 'row',
        borderRadius: 15,
        overflow: 'hidden',
    },
    content_container: {
        flex: 1,
        margin: 4
    },
    content2_container: {
        flex: 5
    },
    title_text: {
        color: color.fontTitleColor,
        fontWeight: 'bold',
        flex: 1,
        flexWrap: 'nowrap',
        fontSize: 18,
    },
    image: {
        width: 120,
        height: '100%',
        borderBottomRightRadius: 15,
    },
    text: {
        color: color.fontColor,
    },
    under_text: {
        fontSize: 12,
        color: color.fontColor,
    },
    star: {
        alignItems: 'center',
        justifyContent: 'center',
        bottom: '5%',
        right: '5%',
        flexDirection: 'row',
        position: 'absolute',
    }
});