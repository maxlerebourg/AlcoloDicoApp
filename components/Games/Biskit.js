import React from "react";
import {StyleSheet, View, TouchableOpacity, Image, Text} from "react-native";


//import {getImageFromApi} from "../../API/GameAPI";

export default class Biskit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            img1: 'https://images.max.hanotaux.fr/dice/1.png', nb1: 1,
            img2: 'https://images.max.hanotaux.fr/dice/1.png', nb2: 1,
            running: false, text: ''
        };
        this._handleStartClick = this._handleStartClick.bind(this);
        this._handleStopClick = this._handleStopClick.bind(this);
    }

    _handleStartClick(event) {
        if (!this.state.running) {
            this.interval = setInterval(() => {
                this.tick();
            }, 100);
            this.setState({running: true});
            this.timeout = setTimeout(() => {
                this._handleStopClick()
            }, 3000);
        }
    }

    _handleStopClick(event) {
        if (this.state.running) {
            clearInterval(this.interval);
            clearTimeout(this.timeout);
            this.setState({running: false});
        }
        this._setText();
    }

    tick() {
        let nb1 = Math.floor(Math.random() * 6 + 1);
        let nb2 = Math.floor(Math.random() * 6 + 1);
        this.setState({
            nb1: nb1,
            nb2: nb2,
            img1: 'https://images.max.hanotaux.fr/dice/' + nb1 + '.png',
            img2: 'https://images.max.hanotaux.fr/dice/' + nb2 + '.png'
        });
    }

    _setText = () => {
        switch (this.state.nb1 + this.state.nb2) {
            case 3 :
                this.setState({text: 'Tu es le Biskit, tu bois à chaque fois que le 3 sort.'});
                break;
            case 7 :
                this.setState({text: 'Criez "Biskit", les gogoles. Le dernier boit.'});
                break;
            case 9 :
                this.setState({text: 'Ton voisin de droite boit.'});
                break;
            case 10 :
                this.setState({text: 'Tu bois.'});
                break;
            case 11 :
                this.setState({text: 'Ton voisin de gauche boit.'});
                break;
            default :
                this.setState({text: 'Passe ton tour, salut.'});
                break;
        }
        if (this.state.nb1 === this.state.nb2) {
            this.setState({text: 'Tu distribues ' + this.state.nb1 + ' gorgées.'});
            if (this.state.nb1 === 5) this.setState({text: 'Tu distribues ' + this.state.nb1 + ' gorgées... Mais t\'en bois 5 aussi.'});
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                <TouchableOpacity
                    onPress={() => {
                        if (!this.state.running)
                            this._handleStartClick();
                        else this._handleStopClick();
                    }}>
                    <View style={styles.dice}>
                        <Image
                            fadeDuration={0}
                            style={styles.imageStyle}
                            source={{uri: this.state.img1}}
                        />
                        <Image
                            fadeDuration={0}
                            style={styles.imageStyle}
                            source={{uri: this.state.img2}}
                        />
                    </View>
                    <Text style={styles.text}>{this.state.text}</Text>
                </TouchableOpacity>
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
        height: '70%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        width: 200,
        height: 300,
        resizeMode: 'center',
    },
    text: {
        height: '30%',
        color: '#555',
        fontWeight: 'bold',
        fontSize: 30,
        margin: 20,
        padding: 10,
    }
});