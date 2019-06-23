import React from "react";
import {StyleSheet,
    View, TouchableOpacity, Image, Text, AsyncStorage, Alert,
Switch, Button, Slider} from "react-native";
import SocketIOClient from "socket.io-client/dist/socket.io.js";
import color from "../Config/Color";

export default class SpaceTeam extends React.Component {
    socket = [];
    panel = [];
    constructor(props) {
        super(props);
        this.socket = SocketIOClient('http://192.168.1.16:3001');
        this.state = {user: 'none', img_panel: <Text>Waiting...</Text>, text: ''};

    }
    _action = (action) => {
        //this.setState({text: ''});
        this.socket.emit('action', action);
    };

    _render(){
        //Alert.alert('dist', JSON.stringify(this.panel));
        let img_panel = [];
        for (let obj of this.panel) {
            switch (obj.object.type) {
                case 'boolean' :
                    img_panel.push(
                        <View
                            key={obj.id}
                            style={styles.item}
                        >
                            <Text style={styles.text}>{obj.object.name.replace('?', obj.prefixe)}</Text>
                            <Switch
                                value={this.panel.find((el) => {return el.id === obj.id}).object.state}
                                onValueChange={(bool) => {
                                    this.panel.find((el) => {return el.id === obj.id}).object.state = bool;
                                    this._action(this.panel.find((el) => {return el.id === obj.id}));
                                    this._render(this.panel);
                                }}/>
                        </View>);
                    break;
                case 'slider' :
                    img_panel.push(
                        <View
                            key={obj.id}
                            style={styles.item}
                        >
                            <Text style={styles.text}>{obj.object.name.replace('?', obj.prefixe)}</Text>
                            <Slider/>
                        </View>);
                    break;
                case 'button':
                    img_panel.push(
                        <View
                            key={obj.id}
                            style={styles.item}
                        >
                            <Text style={styles.text}>{obj.object.name.replace('?', obj.prefixe)}</Text>
                            <Button
                                title={'Click'}
                                onPress={()=>{this._action(obj)}}
                            />
                        </View>);
                    break;
            }

        }
        this.setState({img_panel: img_panel});
    }

    componentDidMount() {
        AsyncStorage.getItem('user')
            .then((usr) => {
                this.socket.emit('player', JSON.parse(usr));

                this.socket.on('dist', (msg) => {
                    this.panel = msg;
                    this._render()
                });

                this.socket.on('update', (msg) => {
                    this.setState({text: msg.text})
                });

                this.socket.on('status', (msg) => {
                    this.setState({text: msg})
                });

                this.socket.on('room', (msg) => {
                    let img_panel = [];
                    for (let i = 0; i < msg.length; i++) {
                        img_panel.push(
                            <TouchableOpacity key={i} style={styles.card_view} onPress={() => {
                                this.socket.emit('joinRoom', msg[i]);
                                //this.socket = SocketIOClient('http://192.168.1.16:3001/'+msg[i].name);
                            }}>
                                <Text key={i+1000}>{msg[i].name}</Text>
                            </TouchableOpacity>
                        )
                    }
                    img_panel.push(
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                this.socket.emit('createRoom',{name: 'Joe'});
                                //this.socket = SocketIOClient('http://192.168.1.16:3001/Joe');
                            }}>
                            <Text style={styles.text}>Crée salle</Text>
                        </TouchableOpacity>);
                    this.setState({img_panel: img_panel});
                });
            }).catch(() => {Alert.alert('Error', 'Va te connecter !')});


    }

    render() {
        return (
            <View style={styles.main_container}>
                <Text style={styles.text}>{this.state.text}</Text>
                <Text style={styles.text}>{this.state.command}</Text>
                {this.state.img_panel}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.backColor,
    },
    panel: {
        margin: '10%',
        flexDirection: 'row',
    },
    item: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button : {
        position: 'absolute',
        right: '0%',
        bottom: '0%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.mainColor,
        padding: 10,
        borderRadius: 3
    },
    text: {
        color: 'white',
    },
});