import React from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text,
    Alert,
    Animated,
    Easing,
} from "react-native";
import color from "../Config/Color";


export default class WorldTour extends React.Component {
    pioche = [];
    inGame = [];

    constructor(props) {
        super(props);
        this.appear = new Animated.Value(0.3);

        for (let i of ['h', 's', 'd', 'c']) {
            for (let j = 1; j < 14; j++) {
                this.pioche.push({value: j, sign: i, url: 'https://images.max.hanotaux.fr/cards/' + j + i + '.png'})
            }
        }
        this.state = {img: [], rule: []};
    }

    _appear() {
        this.appear.setValue(0.3);
        Animated.spring(
            this.appear,
            {
                toValue: 1,
                friction: 2
            }).start();
    }

    _next() {
        if (this.pioche.length > 0) {
            let rand = Math.floor(Math.random() * this.pioche.length);
            this.inGame = this.pioche[rand];
            this.pioche.splice(rand, 1);
            let img = <View style={styles.view_card}>
                <Animated.Image source={{uri: this.inGame.url}}
                       style={[styles.card,{transform: [{scale: this.appear}] }]}/>
            </View>;
            let text = '';
            switch (this.inGame.value) {
                case 1 :
                    text = (this.inGame.sign === 'h' || this.inGame.sign === 'd' ? 'Tu distribues ' : 'Tu prends ') + this.inGame.value + ' gorgée';
                    break;
                case 2 :
                case 3 :
                case 4 :
                case 5 :
                    text = (this.inGame.sign === 'h' || this.inGame.sign === 'd' ? 'Tu distribues ' : 'Tu prends ') + this.inGame.value + ' gorgées';
                    break;
                case 6 :
                    text = "J'ai déjà / Je n'ai jamais";
                    break;
                case 7 :
                    text = "J'ai dans ma valise";
                    break;
                case 8 :
                    text = "Qui de vous deux";
                    break;
                case 9 :
                    text = "Ni oui, ni non";
                    break;
                case 10:
                    text = "Freeze";
                    break;
                case 11:
                    text = "Les hommes boivent";
                    break;
                case 12:
                    text = "Les femmes boivent";
                    break;
                case 13:
                    text = "Roi des pouces";
                    break;
            }
            let rule = <View style={styles.rules}><Text style={styles.text}>{text}</Text></View>;
            this.setState({img: img, rule: rule});
            this._appear();
        } else {
            this.setState({img: null,
                rule: <View style={[styles.rules, {height: '100%', marginTop: 0}]}><Text style={styles.text}>Plus de cartes</Text></View>
            });
        }
    }

    componentDidMount() {
        this._next();
    }

    render() {
        return (
            <View style={styles.main_container}>
                <TouchableOpacity
                    disabled={this.state.i <= 0}
                    onPress={() => {
                        this._next()
                    }}>
                    {this.state.img}
                    {this.state.rule}
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: '100%',
        width: '100%',
        backgroundColor: color.cardBoard,
    },
    view_card: {
        width: '100%',
        height: '85%',
        padding: '5%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
    },
    rules: {
        justifyContent: 'center',
        alignItems: 'center',
        bottom: '0%',
        marginTop: 5,
        width: '100%',
        height: '15%',
        backgroundColor: color.mainColor,
    },
    text: {
        color: 'white',
        fontSize: 15,
    }
});