import React from 'react';
import {
    FlatList,
    View,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    Image,
    Alert,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';
import Item from './GameItem'
import {getSearchGameFromApi} from "../../API/GameAPI";
import color from "../Config/Color";
import Plus from "../../images/svg/Plus";


export default class GameSearch extends React.Component {
    offset = 0;
    ok = true;

    constructor(props) {
        super(props);
        this.state = {games: [], isLoading: false, text: ''};
    }

    _loadGames(text) {
        if (!this.ok) return;
        this.ok = false;
        //this.setState({isLoading: true});
        getSearchGameFromApi(text).then((data) => {
            //Alert.alert('games', JSON.stringify(data));
            this.setState({
                games: data,
                //isLoading: false
            })
        }).catch(() => {
            AsyncStorage.getItem('game', '').then(dataset => {
                let data = JSON.parse(dataset).slice(0, dataset.length);
                let datas = data.map((a) => {
                    return a.name.contains(text)
                });
                this.setState({
                    games: datas,
                    //isLoading: false
                })
            })
        });
        this.ok = true;
    }

    _displayDetail = (game) => {
        this.props.navigation.navigate('GameDetail', {title: game.name, game: game, play: this._letsPlay});
    };
    _letsPlay = (jeu) => {
        this.props.navigation.navigate(jeu);
    };

    componentDidMount() {
        setTimeout(() => {
            this.input.focus()
        }, 250)
    }

    render() {
        return (
            <View style={styles.main_container}>
                <View style={styles.input}>
                    <TextInput
                        ref={(view) => this.input = view}
                        style={styles.text_input}
                        onChangeText={(text) => {
                            text.length > 1 ?
                                this.setState({text: text}, this._loadGames(text)) :
                                this.setState({text: text, games: []})
                            ;
                        }}
                        placeholder="Donne le blaze"
                        placeholderTextColor={color.fontTitleColor}
                    />
                </View>
                <FlatList
                    onMomentumScrollBegin={() => {this.input.blur();}}
                    data={this.state.games}
                    renderItem={({item}) =>
                        <Item game={item} displayDetail={this._displayDetail} play={this._letsPlay}/>
                    }
                    keyExtractor={(item) => item.id.toString()}
                />
                <TouchableOpacity
                    style={styles.plus}
                    onPress={() => this.props.navigation.navigate('AddOrEdit')}>
                    <Plus config={{height: 20, width: 20}}/>
                </TouchableOpacity>
                {this.state.isLoading ?
                    <View style={[styles.loading_container, {backgroundColor: 'rgba(100,100,100, 0.8)'}]}>
                        <View style={styles.loading}>
                            <Image style={styles.loading} source={require('../../images/dice.gif')}/>
                        </View>
                    </View> : null
                }
            </View>
        );
    }
}


const styles = StyleSheet.create({
    main_container: {
        backgroundColor: color.backColor,
        height: '100%',
        width: '100%'
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loading: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        borderRadius: 10,
        overflow: 'hidden',
    },
    filter: {
        flexDirection: 'row',
        width: '100%',
        position: 'absolute',
        zIndex: 3,
    },
    picker: {
        flex: 7,
        height: '100%',
        backgroundColor: color.fontEditColor,
        color: color.fontTitleColor,
    },
    plus: {
        height: 55,
        width: 55,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: '4%',
        bottom: '1%',
        borderRadius: 100,
        backgroundColor: color.mainColor,

    },
    input: {
        height: 45,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text_input: {
        color: color.fontTitleColor,
        backgroundColor: color.fontEditColor,
        height: 45,
        width: '100%',
        padding: 5,
        borderRadius: 3,
        textAlign: 'center',
    }
});
