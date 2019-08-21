import React from 'react'
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    StyleSheet,
    AsyncStorage,
    Alert
} from 'react-native'

import {beerFromApi, getImageFromApi} from "../API/ToolsAPI";
import dico_game from './Config/Game';
import dico_cock from './Config/Cocktail';
import color from './Config/Color';

import User from "../images/svg/User";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {g_img: [], c_img: '', temp: 'Loading...', img_temp: '', beer: false};
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <TouchableOpacity
                    onPress={() => {navigation.navigate('Login')}}
                    style={{width: 60, alignItems: 'center'}}>
                    <User/>
                </TouchableOpacity>
            ),
        };
    };
    _load_img(list) {
        let img = [], urls = [];
        for (let i = 0; i < 5; i++) {
            let rand = Math.floor(Math.random() * list.length);
            urls.push(list[rand].images.split(',')[0]);
            list.splice(rand, 1);
        }
        img.push(<Image source={{uri: urls[0]}}
                        style={styles.img}/>);
        img.push(
            <View style={styles.img_section}>
                <View style={styles.img_content}>
                    <Image source={{uri: urls[1]}}
                           style={styles.img}/>
                    <Image source={{uri: urls[2]}}
                           style={styles.img}/>
                </View>
                <View style={styles.img_content}>
                    <Image source={{uri: urls[3]}}
                           style={styles.img}/>
                    <Image source={{uri: urls[4]}}
                           style={styles.img}/>
                </View>
            </View>
        );
        this.setState({g_img: img});
    }

    componentDidMount() {
        beerFromApi().then((data) => {
            this.setState({beer: data});
        }).catch(() => {
            this.setState({beer: false});
        });

        let party = [];
        for (let i = 1; i < 6; i++) {
            party.push({images: getImageFromApi(i)});
        }
        AsyncStorage.getItem('game').then((game) => {
            game = JSON.parse(game);
            this._load_img(game, 'game');
        }).catch(() => {
            this._load_img(dico_game, 'game');
        });
        AsyncStorage.getItem('cocktail').then((cock) => {
            cock = JSON.parse(cock);
            this.setState({c_img: cock[Math.floor(Math.random() * cock.length)].images});
        }).catch(() => {
            this.setState({c_img: dico_cock[0].images});
        });
    }

    render() {
        return (
            <View style={styles.main_container}>
                <ScrollView style={{width: '100%'}}>
                    <View style={styles.section_container}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('GameList')
                            }}>
                            <View style={styles.img_container}>
                                {this.state.g_img}
                            </View>
                            <Text style={styles.title}>Jeux à jouer en soirée</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.section_content}>
                        <View style={styles.section_container}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate('PartyHome')
                                }}>
                                <View style={styles.image}>
                                    <Image
                                        style={styles.image}
                                        source={{uri: getImageFromApi(Math.floor(Math.random() * 5 + 1))}}/>
                                </View>
                                <Text style={styles.title}>Soirées</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.section_container}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate('CocktailList')
                                }}>
                                <View style={styles.image}>
                                    <Image
                                        style={styles.img_background}
                                        source={{uri: this.state.c_img}}/>
                                </View>
                                <Text style={styles.title}>Cocktails</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.section_content}>
                        <View style={styles.section_container}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate('Beer', {beer: this.state.beer})
                                }}>
                                <View style={styles.image}>
                                    <Image
                                        style={styles.img_background}
                                        source={{uri: 'https://milesandlove.com/system/attachments/6018/xxlarge/paysage-normand.jpg?1556646490'}}
                                    />
                                    {!this.state.beer ? <View style={styles.img_beer}><Text>Loading...</Text></View> :
                                        <Image style={[styles.img_beer, {position: 'absolute'}]}
                                               source={{uri: this.state.beer.images}} />}
                                </View>
                                <Text style={styles.title}>Bière du Jour</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.section_container}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate('QuoteList')
                                }}>
                                    <View style={styles.image}>
                                        <Image
                                            style={styles.img_background}
                                            source={{uri: (Math.random() > 0.5 ?
                                                    'https://s2.qwant.com/thumbr/0x380/c/9/cf80aa322da6616ff589d421bb2da22420572f9410789a68329b3678b4d78e/A16205E7-A532-4854-A001-AFF1A48A4D2F.jpg?u=https%3A%2F%2Fimg.haikudeck.com%2Fmg%2FA16205E7-A532-4854-A001-AFF1A48A4D2F.jpg&q=0&b=1&p=0&a=1' :
                                                    'https://s2.qwant.com/thumbr/0x380/7/9/bd1e97165cde6ade8250e0bcf60abbca0a9da2e3863da338fd6759ee6ad4e2/initiative-quotes-1.jpg?u=http%3A%2F%2Fwww.quotationof.com%2Fimages%2Finitiative-quotes-1.jpg&q=0&b=1&p=0&a=1')}}
                                        />
                                    </View>
                                <Text style={styles.title}>Momentums</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>)
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.backColor,
    },
    meteo_container: {
        height: 170,
        width: '100%',
        paddingLeft: '5%',
        paddingRight: '5%',
        justifyContent: 'center',
    },
    party: {
        flexDirection: 'row',
    },
    img_background: {
        height: 130,
        width: '100%',
        resizeMode: 'cover',
    },
    img_beer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 130,
        width: '100%',
        resizeMode: 'contain',
        overflow: 'hidden',
        borderRadius: 10,
    },
    section_container: {
        width: '100%',
        padding: 10,
    },
    img_container: {
        flexDirection: 'row',
        height: 210,
        width: '100%',
        overflow: 'hidden',
        borderRadius: 15,
        borderBottomWidth: 1,
        borderColor: color.displayColor,

    },
    image: {
        height: 130,
        width: '100%',
        resizeMode: 'cover',
        overflow: 'hidden',
        borderRadius: 10,
        backgroundColor: color.backColor,
        borderBottomWidth: 1,
        borderColor: color.displayColor,
    },
    img_section: {
        width: '50%',
    },
    img_content: {
        flexDirection: 'row',
        height: '50%',
        width: '100%',
    },
    img: {
        height: '100%',
        width: '50%',
        padding: '1%',
        resizeMode: 'cover',
    },
    section_content: {
        flexDirection: 'row',
        width: '50%',
    },
    title: {
        color: color.fontTitleColor,
        fontWeight: 'bold',
        fontSize: 17,
        margin: 5,
    },
    login: {
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.mainColor,
    }
});
