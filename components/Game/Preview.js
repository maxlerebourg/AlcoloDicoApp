import {StyleSheet, Text, View} from "react-native";
import React from "react";
import color from '../Config/Color';

export default class Preview extends React.Component {
    render() {
        let game = this.props.game;
        return (
            <View>
                <Text style={styles.text}>
                    {game.preview}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '30%',
        marginTop: 10,
        marginBottom: 10,
        alignItems:'center',
        justifyContent:'center',
    },
    star: {
        flexDirection: 'row',
        margin: 4,
    },
    header: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
    },
    text: {
        color: color.fontColor,
    }
});