import React from 'react';
import {
    FlatList,
    View,
    ScrollView,
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
import {getListCategoryFromApi} from "../../API/GameAPI";
import color from "../Config/Color";
import Plus from "../../images/svg/Plus";
import Search from "../../images/svg/Search";
import Send from "../../images/svg/Send";


export default class GameListHorizontal extends React.Component {
    offset = 0;
    constructor(props) {
        super(props);
        this.appear = new Animated.Value(1);
        this.state = {games: [] = dico, isLoading: false, flat_lists: []};
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerRight: (
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('GameSearch')
                    }}
                    style={{width: 60, alignItems: 'center'}}>
                    <Search/>
                </TouchableOpacity>
            ),
        };
    };

    _loadGames() {
        this.setState({isLoading: true});
        getListCategoryFromApi().then((data) => {
            //Alert.alert('games', JSON.stringify(data));
            AsyncStorage.setItem('game', JSON.stringify(data));

            let flatlists = [<View style={{height: 15}}/>];
            for (let category of data) {
                //Alert.alert("alert", JSON.stringify()category);
                if (category.games.length > 0)
                    flatlists.push(
                        <View keyExtractor={category.id}>
                            <TouchableOpacity
                                style={styles.title_container}
                                onPress={() => {
                                    this.props.navigation.navigate('GameListCategory', {
                                        label: category.id,
                                        games: category.games,
                                        title: category.name,
                                    });
                                }}>
                                <Text style={styles.text}>{category.name}</Text>
                                <Send config={{go_to: true, width: 15, height: 15}}/>
                            </TouchableOpacity>
                            <FlatList
                                decelerationRate={'fast'}
                                ListHeaderComponent={<View style={{width: 15}}/>}
                                ListFooterComponent={category.games.length > 8 ?
                                    <TouchableOpacity
                                        style={styles.footer}
                                        onPress={() => {
                                            this.props.navigation.navigate('GameListCategory', {
                                                label: category.id,
                                                games: category.games,
                                                title: category.name,
                                            });
                                        }}>
                                        <Text style={styles.text}>En découvrir plus</Text>
                                    </TouchableOpacity> :
                                    <View style={{width: 15}}/>
                                }
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                snapToInterval={135}
                                data={category.games.slice(0, 8)}
                                renderItem={({item}) =>
                                    <Item game={item} displayDetail={this._displayDetail} play={this._letsPlay}/>
                                }
                                keyExtractor={(item) => item.id.toString()}
                            />
                        </View>);
            }
            this.setState({
                flat_lists: [<View>{flatlists}</View>],
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
    }

    _displayDetail = (game) => {
        this.props.navigation.navigate('GameDetail', {title: game.name, game: game, play: this._letsPlay});
    };
    _letsPlay = (jeu) => {
        this.props.navigation.navigate(jeu);
    };

    componentDidMount() {
        this._loadGames('')
    }

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

    render() {
        return (
            <View style={styles.main_container}>
                <ScrollView onScroll={this._onScroll}>
                    {this.state.flat_lists}

                </ScrollView>
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
    },
    loading_container: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title_container: {
        width: '100%',
        paddingRight: 20,
        paddingLeft: 20,
        alignItems: 'center',
        flexDirection: 'row',
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
    text: {
        color: color.fontTitleColor,
        fontSize: 18,
        fontWeight: 'bold',
        width: '90%',
        marginBottom: 5,
    },
    footer: {
        flex: 1,
        width: 100,
        maxHeight: 120,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
