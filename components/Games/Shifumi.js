import React from "react";
import {StyleSheet, View, TouchableOpacity, Image, Text, Animated, Easing} from "react-native";
import color from "../Config/Color";


export default class Shifumi extends React.Component {
    constructor(props) {
        super(props);
        this.animed = new Animated.Value(0);
        this.state = {
            anim: []
        };
    }

    play(id) {
        this.animed.setValue(0);

        let anim = [];
        switch (id) {
            case 0 :
                anim.push(<Animated.Image
                    source={require('../../images/pierre.png')}
                    style={[
                        styles.img,
                        {
                            top: this.animed.interpolate({
                                inputRange: [0, 1],
                                outputRange: [600, 300],
                            })
                        }
                    ]}/>);
                break;
            case 1 :
                anim.push(<Animated.Image
                    source={require('../../images/feuille.png')}
                    style={[
                        styles.img,
                        {
                            top: this.animed.interpolate({
                                inputRange: [0, 1],
                                outputRange: [600, 300],
                            })
                        }
                    ]}/>);
                break;
            case 2 :
                anim.push(<Animated.Image
                    source={require('../../images/ciseau.png')}
                    style={[
                        styles.img,
                        {
                            top: this.animed.interpolate({
                                inputRange: [0, 1],
                                outputRange: [600, 300],
                            })
                        }
                    ]}/>);
                break;
        }
        this.setState({anim: anim});

        Animated.timing(
            this.animed,
            {
                toValue: 1,
                duration: 750,
                easing: Easing.linear
            }).start();
    }

    render() {
        return (
            <View style={styles.main_container}>
                <View style={styles.user}>
                    <Text>User</Text>
                    <Text>Score</Text>
                </View>
                <View style={styles.ennemy}>
                    <Text>Ennemi</Text>
                    <Text>Score</Text>
                </View>
                {this.state.anim}
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.button}
                                      onPress={() => this.play(0)}>
                        <Text style={styles.buttonText}>Pierre</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                                      onPress={() => this.play(1)}>
                        <Text style={styles.buttonText}>Feuille</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                                      onPress={() => this.play(2)}>
                        <Text style={styles.buttonText}>Ciseau</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: '100%',
        width: '100%',
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cacaca',
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        bottom: '0%',
        position: 'absolute'
    },
    button: {
        backgroundColor: color.mainColor,
        padding: 10,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 5,
        height: 40,
        borderRadius: 3,
        bottom: '0%'
    },
    buttonText: {
        color: 'white'
    },
    img: {
        flex: 1,
        aspectRatio: 1.5,
        resizeMode: 'contain',
    },
    user: {
        padding: 10,
        height: 70,
        width: 100,
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderWidth: 2,
        borderRadius: 10,
        position: 'absolute',
        bottom: '10%',
        left: 5,
    },
    ennemy: {
        padding: 10,
        height: 70,
        width: 100,
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderWidth: 2,
        borderRadius: 10,
        position: 'absolute',
        top: '10%',
        right: 5,
    }
});