import React from "react";
import {StyleSheet, View, TouchableOpacity, Image, Text, AsyncStorage, Alert} from "react-native";
import SocketIOClient from "socket.io-client/dist/socket.io.js";
import color from "../Config/Color";

export default class Fuck extends React.Component {
    socket = [];
    constructor(props) {
        super(props);
        this.socket = SocketIOClient('http://192.168.1.16:3001');
        this.state = {user: 'none', atout: [], main: [], img_main: <Text>Waiting...</Text>, inGame: [], text: ''};

    }
    _playCard = (card) => {
        this.setState({text: ''});
        this.socket.emit('card', card);
    };

    componentDidMount() {
        AsyncStorage.getItem('user')
            .then((usr) => {
                this.socket.emit('player', JSON.parse(usr));

                this.socket.on('dist', (msg) => {
                    //Alert.alert('rooms',JSON.stringify(msg));
                    let img_main = [];
                    for (let i = 0; i < msg[0].length; i++) {
                        img_main.push(
                            <TouchableOpacity key={i} style={styles.card_view} onPress={() => {this._playCard(msg[0][i])}}>
                                <Image
                                    key={i+10}
                                    style={styles.card}
                                    source={{uri: msg[0][i].url}}
                                />
                            </TouchableOpacity>)
                    }
                    this.setState({main: msg[0], atout: msg[1], inGame: msg[2], img_main: img_main});
                });

                this.socket.on('update', (msg) => {this.setState({inGame: msg})});

                this.socket.on('status', (msg) => {this.setState({text: msg})});

                this.socket.on('room', (msg) => {
                    let img_main = [];
                    for (let i = 0; i < msg.length; i++) {
                        img_main.push(
                            <TouchableOpacity key={i} style={styles.card_view} onPress={() => {
                                this.socket.emit('joinRoom', msg[i]);
                                //this.socket = SocketIOClient('http://192.168.1.16:3001/'+msg[i].name);
                            }}>
                                <Text key={i+1000}>{msg[i].name}</Text>
                            </TouchableOpacity>
                        )
                    }
                    img_main.push(<TouchableOpacity
                        style={styles.aleatoire}
                        onPress={() => {
                            this.socket.emit('createRoom',{name: 'Joe'});
                            //this.socket = SocketIOClient('http://192.168.1.16:3001/Joe');
                        }}>
                        <Text style={styles.submitButtonText}>Crée salle</Text>
                    </TouchableOpacity>);
                    this.setState({img_main: img_main});
                });
            }).catch(() => {Alert.alert('Error', 'Va te connecter !')});


    }

    render() {
        return (
            <View style={styles.main_container}>
                <Text>{this.state.text}</Text>
                <Image style={styles.atout} source={{uri: this.state.atout.url}}/>
                <Image style={styles.atout} source={{uri: this.state.inGame.url}}/>
                <View style={styles.main}>
                    {this.state.img_main}
                </View>
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
    main: {
        flexDirection: 'row',
    },
    atout: {
        width: '20%',
        height: 100,
        margin: '10%',
        resizeMode: 'center',
    },
    card_view: {
        width: 100/7+'%',
        height: 100,
        resizeMode: 'center',
    },
    card: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    aleatoire: {
        position: 'absolute',
        right: '0%',
        bottom: '0%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.mainColor,
        padding: 10,
        borderRadius: 3
    },
    submitButtonText: {
        color: 'white',
    },
});