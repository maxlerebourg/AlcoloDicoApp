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
    AsyncStorage
} from 'react-native';
import Item from './CocktailItem';
import dico from '../Config/Cocktail';
import {getListCocktailFromApi} from "../../API/CocktailAPI";
import color from "../Config/Color";


export default class CocktailList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {cocktails: [] = dico, isLoading: false, choosenLabel: ''};
    }

    _loadCocktails(cat) {
        if (cat === '' || cat === 'new') {
            this.setState({isLoading: true});
            getListCocktailFromApi().then((data) => {
                //Alert.alert('cocktails', JSON.stringify(data));
                if (cat === '') {
                    AsyncStorage.setItem('cocktail', JSON.stringify(data));
                    this.setState({
                        cocktails: data,
                        isLoading: false
                    })
                } else {
                    this.setState({
                        cocktails: data,
                        isLoading: false
                    })
                }
            }).catch(() => {
                AsyncStorage.getItem('cocktail', '').then(dataset => {
                    let data = JSON.parse(dataset).slice(0, dataset.length);
                    this.setState({
                        cocktails: data,
                        isLoading: false
                    })
                })
            })
        } else {
            AsyncStorage.getItem('cocktail', '').then(dataset => {
                let data = JSON.parse(dataset).slice(0, dataset.length);
                for (let i = data.length - 1; i >= 0; i < i--) {
                    if (data[i].categoryId != cat) data.splice(i, 1)
                }
                this.setState({cocktails: data})
            })
        }
    }

    _displayDetail = (cock) => {
        this.props.navigation.navigate('CocktailDetail', {title: cock.name, cock: cock});
    };

    componentDidMount() {
        this._loadCocktails('')
    }

    render() {
        return (
            <View style={styles.main_container}>
                <FlatList
                    data={this.state.cocktails}
                    renderItem={({item}) => <Item cock={item} displayDetail={this._displayDetail}/>}
                    keyExtractor={(item) => item.id.toString()}
                />
                {this.state.isLoading ?
                    <View style={[styles.loading_container, {backgroundColor: 'rgba(50,50,50, 0.8)'}]}>
                        <View style={styles.loading}>
                            <Image style={styles.loading} source={require('../../images/beer.gif')}/>
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
        backgroundColor: '#eee'
    },
    picker: {
        flex: 7
    },
    aleatoire: {
        position: 'absolute',
        right: '0%',
        bottom: '0%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.mainColor,
        padding: 10,
        borderRadius: 3,
    },
    button: {
        backgroundColor: color.mainColor,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3,
    },
    buttonText: {
        color: 'white'
    }
});
