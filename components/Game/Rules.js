import {
    Text,
    View,
    TouchableOpacity
} from "react-native";
import React from "react";
import playable from "../Config/Playable";
import color from "../Config/Color";
import Play from "../../images/svg/Play";

export default class Rules extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const game = this.props.game;
        let rules = game.rules.split('.');
        rules = rules.slice(0, rules.length);
        for (let i = 0; i < rules.length; i++) {
            rules[i] = rules[i].trim() + '.\n';
            if (rules[i] === '.\n') rules.splice(i, 1);
        }
        let icon = [];
        for (let i = 0; i < playable.length; i++) {
            if (playable[i].id === game.id)
                icon.push(
                    <TouchableOpacity
                        onPress={() => {this.props.play(playable[i].name)}}
                        style={{alignItems: 'flex-end'}}>
                        <Play config={{width: 60, height: 60, color: color.mainColor}}/>
                    </TouchableOpacity>);
        }

        return (
            <View>
                <Text style={{color: color.fontColor}}>
                    {rules}
                </Text>
                {icon}
            </View>
        );
    }
}