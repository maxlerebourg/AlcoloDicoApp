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
    AsyncStorage, Animated, Easing
} from 'react-native';
import Item from './QuoteItem';
import dico from '../Config/Quote';
import {getListQuoteFromApi, addQuoteRateInApi} from "../../API/ToolsAPI";
import color from "../Config/Color";
import Plus from "../../images/svg/Plus";

export default class QuoteList extends React.Component {
    i = 100; //pas
    j = 0; //offset
    offset = 0;
    constructor(props) {
        super(props);
        this.appear = new Animated.Value(1);
        this.height = new Animated.Value(45);
        this.state = {quotes: [], isLoading: false, choosenLabel: 'new', visible: true};
    }

    _loadQuotes(cat, j) {
        if (true) {
            this.setState({isLoading: true});
            getListQuoteFromApi(cat, this.i, j).then((data) => {
                if (cat === 'new') {
                    AsyncStorage.setItem('quote', JSON.stringify(data));
                    this.setState({
                        quotes: data,
                        isLoading: false
                    });
                } else {
                    this.setState({
                        quotes: data,
                        isLoading: false
                    })
                }
            }).catch(() => {
                AsyncStorage.getItem('quote', '').then(dataset => {
                    let data = JSON.parse(dataset).slice(0, dataset.length);
                    this.setState({
                        quotes: data,
                        isLoading: false
                    })
                })
            })
        }
    }

    _displayDetail = (quote) => {
        this.props.navigation.navigate('QuoteDetail', {quote: quote});
    };
    _addRate = (id) => {
        addQuoteRateInApi(id).then(() => {Alert.alert('rate', 'Added' )});
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

    componentDidMount() {
        this._loadQuotes('new', this.j)
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
                                () => {this.j = 0; this._loadQuotes(itemValue,this.j);});
                        }}>
                        <Picker.Item label="Nouveauté" value="new"/>
                        <Picker.Item label="Vote" value="rate"/>
                        <Picker.Item label="Aléatoire" value="random"/>
                    </Picker>
                </Animated.View>
                <FlatList
                    onScroll={this._onScroll}
                    ListHeaderComponent={<View style={{height: 45, width: '100%'}}/>}

                    data={this.state.quotes}
                    renderItem={({item}) => <Item quote={item} displayDetail={this._displayDetail} addRate={this._addRate}/>}
                    keyExtractor={(item) => item.id.toString()}
                    ListFooterComponent={<TouchableOpacity
                        onPress={() => {
                            this.j += this.i;
                            this._loadQuotes(this.state.choosenLabel, this.j);
                        }}
                        style={{height: 40}}
                    />}
                />
                <TouchableOpacity
                    style={styles.plus}
                    onPress={() => this.props.navigation.navigate('QuoteAdd')}>
                    <Plus config={{height: 20, width: 20}}/>
                </TouchableOpacity>
                {this.state.isLoading ?
                    <View style={[styles.loading_container, {backgroundColor: 'rgba(50,50,50, 0.8)'}]}>
                        <View style={styles.loading}>
                            <Image style={styles.loading} source={require('../../images/quote.gif')}/>
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
        width: '100%',
        height: '100%'
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
        width: 100,
        height: 100,
        resizeMode: 'cover',
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
        color: color.fontTitleColor
    }
});
