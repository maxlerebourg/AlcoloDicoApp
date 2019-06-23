import {
    Platform,
    View,
    ScrollView,
    StyleSheet,
    Button,
    Text,
    TouchableOpacity,
    Image,
    Alert,
    Modal,
    FlatList, TextInput,
} from "react-native";
import React from "react";
import color from "../Config/Color";


export default class ScoreBoard extends React.Component {
    tab = [{id: 0, color: color.mainColor, score: 0, name: 'Player 1'}];

    constructor(props) {
        super(props);
        this.state = {tab: this.tab, modal: {visible: false, title: '', input: ''}};
    }

    _addPlayer() {
        this.tab.push({
            id: this.tab.length,
            color: 'rgb(' + Math.floor(Math.random() * 200) + ',' + Math.floor(Math.random() * 200) + ',' + Math.floor(Math.random() * 200) + ')',
            score: 0,
            name: ('Player ' + (this.tab.length + 1))
        });
        this.setState({tab: this.tab.slice(0, this.tab.length)});
    }

    _remPlayer() {
        //Alert.alert('nb', JSON.stringify(this.state.tab));
        this.tab.splice(this.tab.length - 1, 1);
        this.setState({tab: this.tab.slice(0, this.tab.length)});
    }

    _setName(id, name) {
        this.tab[id].name = name;
        this.setState({tab: this.tab.slice(0, this.tab.length)});
    }

    _setColor(id, color) {
        this.tab[id].color = color;
        this.setState({tab: this.tab.slice(0, this.tab.length)});
    }

    _setScore(id, score) {
        this.tab[id].score = score;
        this.setState({tab: this.tab.slice(0, this.tab.length)});
    }

    _toggleModal(id, select) {
        this.setState({modal: {visible: !this.state.modal.visible, title: select, id: id}, input: ''});
        setTimeout(() => this.input.focus(), 100);
    }

    render() {
        return (
            <View style={styles.main_container}>
                    <View style={styles.buttons}>
                        <Text style={styles.text}>Nombre de joueurs : </Text>
                        <TouchableOpacity
                            disabled={this.state.tab.length <= 1}
                            style={styles.button}
                            onPress={() => {this._remPlayer()}}>
                            <Text style={{
                                color: this.state.tab.length <= 1 ? 'gray' : 'white'
                            }}>-</Text>
                        </TouchableOpacity>
                        <Text style={[styles.text_button, styles.text]}>{this.state.tab.length}</Text>
                        <TouchableOpacity
                            disabled={this.state.tab.length >= 10}
                            style={styles.button}
                            onPress={() => {this._addPlayer()}}>
                            <Text style={{color: this.state.tab.length >= 10 ? 'gray' : 'white'}}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={this.state.tab}
                        renderItem={({item}) => (
                            <View style={styles.cel}>
                                <TouchableOpacity style={[styles.cell, {borderBottomWidth: (this.tab.length-1 !== item.id ? 1 : 0)}]}
                                                  onPress={() => {this._toggleModal(item.id, 'nom')}}
                                                  onLongPress={() => {this._toggleModal(item.id, 'couleur')}}>
                                    <Text style={[{color: item.color}, styles.text_button]}>{item.name}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.cell, {borderBottomWidth: (this.tab.length-1 !== item.id ? 1 : 0)}]}
                                                  onPress={() => {
                                                      this.tab[item.id].score++;
                                                      this.setState({tab: this.tab.slice(0, this.tab.length)})}}
                                                  onLongPress={() => {this._toggleModal(item.id, 'score')}}>
                                    <Text style={[{color: item.color}, styles.text_button]}>{item.score}</Text>
                                </TouchableOpacity>
                            </View>)}
                        keyExtractor={(item) => item.id.toString()}
                    />
                <Modal visible={this.state.modal.visible}
                       transparent={true}>
                    <View style={styles.modal_container}>
                        <View style={styles.modal_content}>
                            <Text style={styles.text_button}>Changer {this.state.modal.title}</Text>
                            <TextInput style={styles.input}
                                       ref={(view) => this.input = view}
                                       keyboardType={this.state.modal.title === 'score' ? 'numeric' : 'default'}
                                       underlineColorAndroid="transparent"
                                       placeholder={this.state.modal.title}
                                       onChangeText={(text) => {this.setState({input: text});}}/>
                            <View style={styles.btn_container}>
                                <TouchableOpacity style={styles.touch_modal}
                                                  onPress={() => {
                                                      this.setState({modal: {visible: false}});
                                                  }}>
                                    <Text style={styles.btn_modal_left}>ANNULER</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.touch_modal}
                                                  onPress={() => {
                                                      switch (this.state.modal.title) {
                                                          case 'nom' :
                                                              this._setName(this.state.modal.id, this.state.input);
                                                              break;
                                                          case 'couleur' :
                                                              this._setColor(this.state.modal.id, this.state.input);
                                                              break;
                                                          case 'score' :
                                                              this._setScore(this.state.modal.id, this.state.input);
                                                              break;
                                                          default :
                                                              break;
                                                      }
                                                      this.setState({modal: {visible: false}});
                                                  }}>
                                    <Text style={styles.btn_modal_right}>OK</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    modal_container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(50,50,50,0.8)',
    },
    modal_content: {
        height: 140,
        width: '90%',
        padding: 15,
        backgroundColor: "#fff",
        borderRadius: 3,
    },
    btn_container: {
        flex: 1,
        flexDirection: 'row',
        ...Platform.select({
            ios: {
                justifyContent: 'center',
                borderTopWidth: 1,
                borderColor: '#B0B0B0',
                maxHeight: 48,
            },
            android: {
                alignSelf: 'flex-end',
                maxHeight: 52,
                paddingTop: 8,
                paddingBottom: 8,
            }
        }),
    },
    touch_modal: {
        ...Platform.select({
            ios: {
                flex: 1,
            },
            android: {
                paddingRight: 8,
                minWidth: 64,
                height: 36,
            }
        }),
    },
    btn_modal_left: {
        ...Platform.select({
            fontWeight: "bold",
            ios: {
                fontSize: 18,
                color: '#408AE2',
                textAlign: 'center',
                borderRightWidth: 5,
                borderColor: '#B0B0B0',
                padding: 10,
                height: 48,
                maxHeight: 48,
            },
            android: {
                textAlign: 'right',
                color: '#009688',
                padding: 8,
                fontWeight:'bold',
                fontSize: 14,
            },
        }),
    },
    btn_modal_right: {
        ...Platform.select({
            fontWeight: "bold",
            ios: {
                fontSize: 18,
                color: '#408AE2',
                textAlign: 'center',
                padding: 10,
            },
            android: {
                textAlign: 'right',
                color: '#009688',
                padding: 8,
                fontWeight:'bold',
                fontSize: 14,
            },
        }),
    },
    input: {
        height: 40,
        width: '70%',
        padding: 5,
        marginTop: 10,
        color: color.fontColor,
    },
    main_container: {
        height: '100%',
        width: '100%'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        //alignItems: 'center',
    },
    button: {
        height: 20,
        width: 20,
        backgroundColor: color.mainColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        margin: 2,
    },
    text: {
        color: color.fontColor,
    },
    text_button: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    cel: {
        flexDirection: 'row',
        height: 25,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cell: {
        height: '100%',
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
    }
});