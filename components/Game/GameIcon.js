import React from "react";

import Card from "../../images/svg/Card";
import Caps from "../../images/svg/Caps";
import Hess from "../../images/svg/Hess";
import Ball from "../../images/svg/Balle";
import Dice from "../../images/svg/Dice";
import Domino from "../../images/svg/Domino";
import Multi_player from "../../images/svg/Multiplayer";
import Lan from "../../images/svg/Lan";
import App from "../../images/svg/App";
import Puzzle from "../../images/svg/Puzzle";

import {View} from "react-native";

export default class GameIcon extends React.Component {
    render() {
        let category = this.props.category;
        return <View>
            {category === 1 ? <Card/> : null}
            {category === 2 ? <Caps/> : null}
            {category === 3 ? <Hess/> : null}
            {category === 4 ? <Ball/> : null}
            {category === 5 ? <Dice/> : null}
            {category === 6 ? <Domino/> : null}
            {category === 7 ? <Multi_player/> : null}
            {category === 8 ? <Lan/> : null}
            {category === 9 ? <App/> : null}
            {category === 10 ? <Puzzle/> : null}
        </View>
    }
}
