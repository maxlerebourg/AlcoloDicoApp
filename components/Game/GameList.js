import React from 'react';
import {
    FlatList,
    View,
    StyleSheet,
    Picker,
    Text,
    Image,
    Alert,
    TouchableOpacity,
    AsyncStorage,
    Animated,
    Easing,
} from 'react-native';
import Item from './GameItem'
import dico from '../Config/Game'
import {getListGameFromApi} from "../../API/GameAPI";
import color from "../Config/Color";
import Plus from "../../images/svg/Plus";


export default class GameList extends React.Component {
    offset = 0;
    constructor(props) {
        super(props);

        this.appear = new Animated.Value(1);
        this.height = new Animated.Value(45);

        this.state = {games: [] = dico, isLoading: false, mod: false, choosenLabel: '', visible: true};
    }

    _loadGames(cat) {
        if (cat === '' || cat === 'new' || cat > 5) {
            this.setState({isLoading: true});
            getListGameFromApi(cat).then((data) => {
                //Alert.alert('games', JSON.stringify(data));
                if (cat === '') AsyncStorage.setItem('game', JSON.stringify(data));
                this.setState({
                    games: data,
                    isLoading: false
                })
            }).catch(() => {
                AsyncStorage.getItem('game', '').then(dataset => {
                    let data = JSON.parse(dataset).slice(0, dataset.length);
                    this.setState({
                        games: data,
                        isLoading: false
                    })
                })
            })
        } else {
            AsyncStorage.getItem('game', '').then(dataset => {
                let data = JSON.parse(dataset).slice(0, dataset.length);
                for (let i = data.length - 1; i >= 0; i < i--) {
                    if (data[i].categoryId != cat) data.splice(i, 1)
                }
                this.setState({games: data})
            })
        }
    }

    _aleatoire = () => {
        AsyncStorage.getItem('game').then((dataset) => {
            let data = JSON.parse(dataset);
            if (this.state.choosenLabel !== '') {
                for (let i = data.length - 1; i >= 0; i < i--) {
                    if (data[i].categoryId != this.state.choosenLabel) data.splice(i, 1)
                }
            }
            let game = data[Math.floor(Math.random() * data.length)];
            this.props.navigation.navigate('GameDetail', {
                title: game.name,
                game: game,
                rand: this._aleatoire,
                play: this._letsPlay
            });
        })
    };

    _onScroll = (event) => {
        const currentOffset = event.nativeEvent.contentOffset.y;
        const direction = (currentOffset > 45 && currentOffset > this.offset) ? 'down' : 'up';
        const visible = direction === 'up';
        if (visible !== this.state.visible) {
            this.setState({ visible: visible });
            this.appear.setValue(visible ? 0 : 1);
            this.height.setValue(visible ? 0 : 45);
            Animated.parallel([
                Animated.timing(
                    this.appear, {
                        duration: 500,
                        toValue: (visible ? 1 : 0),
                        easing: Easing.linear
                    }),
                Animated.timing(
                    this.height, {
                        duration: 250,
                        toValue: (visible ? 45 : 0),
                        easing: Easing.linear
                    })
            ]).start();
        }
        this.offset = currentOffset
    };

    _displayDetail = (game) => {
        this.props.navigation.navigate('GameDetail', {title: game.name, game: game, play: this._letsPlay});
    };
    _letsPlay = (jeu) => {
        this.props.navigation.navigate(jeu);
    };
    _appear(bool){
        this.setState({visible: bool});

    }

    componentDidMount() {
        this._loadGames('')
    }

    render() {
        return (
            <View style={styles.main_container}>
                <Animated.View style={[styles.filter, {opacity: this.appear, height: this.height}]}>
                    <Picker
                        style={styles.picker}
                        selectedValue={this.state.choosenLabel}
                        onValueChange={(itemValue) => {
                            this.setState({choosenLabel: itemValue},
                                () => {this._loadGames(itemValue);});
                        }}>
                        <Picker.Item label="Aucun filtre" value=""/>
                        <Picker.Item label="Nouveautés" value="new"/>
                        <Picker.Item label="Cartes" value="1"/>
                        <Picker.Item label="Caps" value="2"/>
                        <Picker.Item label="Rien" value="3"/>
                        <Picker.Item label="Balles" value="4"/>
                        <Picker.Item label="Dés" value="5"/>
                        <Picker.Item label="Jeux Vidéo Multijoueurs" value="6"/>
                        <Picker.Item label="Jeux Vidéo en Lan" value="7"/>
                    </Picker>
                    {((this.state.choosenLabel > 0 && this.state.choosenLabel < 6) ||this.state.choosenLabel === '' ?
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {this._aleatoire()}}>
                            <Text style={styles.buttonText}>Jeu aléatoire</Text>
                        </TouchableOpacity> : null)
                    }
                </Animated.View>
                <FlatList
                    onScroll={this._onScroll}
                    ListHeaderComponent={<View style={{height: 45, width: '100%'}}/>}

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
    button: {
        backgroundColor: color.mainColor,
        height: '100%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: color.fontTitleColor,
        fontSize: 15,
    }
});
