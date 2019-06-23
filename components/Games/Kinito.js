import React from "react";
import {StyleSheet, View, TouchableOpacity, Image, Text} from "react-native";


//import {getImageFromApi} from "../../API/GameAPI";

export default class Kinito extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            img1: 'https://images.max.hanotaux.fr/dice/1.png',
            img2: 'https://images.max.hanotaux.fr/dice/1.png',
            nb1: 1,
            nb2: 1,
            running: false
        };
        this._handleStartClick = this._handleStartClick.bind(this);
        this._handleStopClick = this._handleStopClick.bind(this);
    }

    _handleStartClick() {
        if (!this.state.running) {
            this.interval = setInterval(() => {
                this.tick();
            }, 100);
            this.setState({running: true});
            this.timeout = setTimeout(() => {
                this._handleStopClick();
            }, 3000);
        }
    }

    _handleStopClick() {
        if (this.state.running) {
            clearInterval(this.interval);
            clearTimeout(this.timeout);
            this.setState({
                running: false,
                text: 'Vous avez ' + (this.state.nb1 > this.state.nb2 ? this.state.nb1 + '' + this.state.nb2 : this.state.nb2 + '' + this.state.nb1) + '.'
            });
        }
    }

    tick() {
        let nb1 = Math.floor(Math.random() * 6 + 1);
        let nb2 = Math.floor(Math.random() * 6 + 1);
        this.setState({
            nb1: nb1,
            nb2: nb2,
            img1: 'https://images.max.hanotaux.fr/dice/' + nb1 + '.png',
            img2: 'https://images.max.hanotaux.fr/dice/' + nb2 + '.png',
        });
    }

    render() {
        return (
            <View style={styles.main_container}>
                <TouchableOpacity
                    onPress={() => {
                        this.state.running ? this._handleStopClick() : this._handleStartClick();
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