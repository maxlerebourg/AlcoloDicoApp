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
import Item from './GameItemHorizontal'
import dico from '../Config/Game'
import {getListGameFromApi} from "../../API/GameAPI";
import color from "../Config/Color";
import Plus from "../../images/svg/Plus";
import Search from "../../images/svg/Search";


export default class GameList extends React.Component {
    offset = 0;
    constructor(props) {
        super(props);
        let state = this.props.navigation.state;
        let label = state.params ? state.params.label : '';
        let games = state.params ? state.params.games.sort((a, b) => {return a.name > b.name ? 1 : -1}) : [];
        this.appear = new Animated.Value(1);
        this.height = new Animated.Value(45);

        this.state = {
            games: games,
            isLoading: false,
            mod: false,
            choosenLabel: label,
            visible: true};
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title'),
            headerRight: (
                <TouchableOpacity
                    onPress={() => {navigation.navigate('GameSearch')}}
                    style={{width: 60, alignItems: 'center'}}>
                    <Search/>
                </TouchableOpacity>
            ),
        };
    };

    _loadGames(cat) {
        if (cat !== 'new') return;
        this.setState({isLoading: true});
        getListGameFromApi(cat).then((data) => {
            //if (cat === '') AsyncStorage.setItem('game', JSON.stringify(data));
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
        });
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

    _displayDetail = (game) => {
        this.props.navigation.navigate('GameDetail', {title: game.name, game: game, play: this._letsPlay});
    };
    _letsPlay = (jeu) => {
        this.props.navigation.navigate(jeu);
    };
    componentDidMount() {
        this._loadGames(this.state.choosenLabel);
    }

    render() {
        return (
            <View style={styles.main_container}>
                <FlatList
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={<View style={{height: 15}}/>}
                    data={this.state.games}
                    renderItem={({item}) =>
                        <Item game={item} category={true} displayDetail={this._displayDetail} play={this._letsPlay}/>
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
        backgroundColor: color.displayColor,
        height: '100%',
        width: '100%',
        paddingLeft: '3%',
        paddingRight: '3%',

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
});
