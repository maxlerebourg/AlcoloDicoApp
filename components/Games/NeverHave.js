import React from "react";
import {
    StyleSheet,
    Text,
    Animated,
    Easing,
    View,
    TouchableOpacity,
} from "react-native";
import list from './NeverHaveList/list';
import color from "../Config/Color";


export default class NeverHave extends React.Component {
    list = [];

    constructor(props) {
        super(props);
        this.list = list.slice(0,list.length);
        let rand = Math.floor(Math.random() * this.list.length);
        this.state = {text: this.list[rand].phrase};
        this.list.splice(rand, 1);
    }

    _next() {
        if (this.list.length === 0) {
            this.setState({text: 'C\'est fini !'})
        } else {
            let rand = Math.floor(Math.random() * this.list.length);
            this.setState({text: this.list[rand].phrase});
            this.list.splice(rand,1)
        }
    }
    render() {
        return (
            <View style={styles.main_container}>
                <TouchableOpacity style={styles.container} onPress={() => {this._next()}}>
                    <Animated.Text style={styles.text}>
                        {this.state.text}
                    </Animated.Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const
    styles = StyleSheet.create({
        main_container: {
            height: '100%',
            width: '100%',
            backgroundColor: color.displayColor,
        },
        container:{
            height: '100%',
            width: '100%',
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
        },
        text: {
            fontSize: 50,
            color: color.fontTitleColor,
        }
    });