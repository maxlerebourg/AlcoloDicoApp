import React from 'react';
import {
    FlatList,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Animated,
    Easing,
    Text
} from 'react-native';
import Item from './GameItemHorizontal'
//import dico from '../Config/Game'

import {getListGameFromApi} from "../../API/GameAPI";
import color from "../Config/Color";
import Plus from "../../images/svg/Plus";
import Search from "../../images/svg/Search";


export default class GameList extends React.Component {
    offset = 0;
    constructor(props) {
        super(props);
        this.appear = new Animated.Value(1);
        let {label, games, config} = this.props.navigation.state.params;
        this.anim = games.map((a) => {return new Animated.Value(0);});
        this.state = {
            games: games.sort((a, b) => {return a.name > b.name ? 1 : -1}),
            config: config,
            isLoading: false,
            mod: false,
            chosenLabel: label,
            visible: true
        };
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

    _displayDetail = (game) => {
        this.props.navigation.navigate('GameDetail', {title: game.name, game: game, play: this._letsPlay});
    };
    _letsPlay = (jeu) => {
        this.props.navigation.navigate(jeu);
    };
    _onScroll = (event) => {
        const currentOffset = event.nativeEvent.contentOffset.y;
        const direction = (currentOffset > 45 && currentOffset > this.offset) ? 'down' : 'up';
        const visible = direction === 'up';
        if (visible !== this.state.visible) {
            this.setState({ visible: visible });
            this.appear.setValue(visible ? 0 : 1);
            Animated.timing(
                this.appear, {duration: 150, toValue: (visible ? 1 : 0), easing: Easing.linear,}).start();
        }
        this.offset = currentOffset
    };
    componentDidMount() {
        let i = 0;
        this.anim.map((a) => {
            Animated.timing(a, {
                toValue: 1,
                duration: 100,
                delay: i++ * 50
            }).start();
        })
    }

    render() {
        return (
            <View style={styles.main_container}>
                <FlatList
                    onScroll={this._onScroll}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={<View style={{height: 15}}/>}
                    data={this.state.games}
                    renderItem={({item, index}) =>
                        <Animated.View style={{opacity: this.anim[index]}}>
                            <Item
                                config={this.state.config}
                                game={item}
                                displayDetail={this._displayDetail}
                                play={this._letsPlay}/>
                        </Animated.View>
                    }
                    keyExtractor={(item) => item.id.toString()}
                />
                <Animated.View style={[styles.plus, {opacity: this.appear}]}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('AddOrEdit')}>
                        <Plus config={{height: 20, width: 20}}/>
                    </TouchableOpacity>
                </Animated.View>
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
