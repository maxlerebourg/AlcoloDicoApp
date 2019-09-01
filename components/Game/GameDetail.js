import React from 'react'
import {
    StyleSheet,
    Text,
    Image,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native'
import Commentary from './Commentary'
import Rules from './Rules'
import Preview from './Preview'
import {getImageFromApi} from "../../API/GameAPI";


import Users from '../../images/svg/Users';
import color from "../Config/Color";
import Star from "../../images/svg/Star";
import Arrow from "../../images/svg/Arrow";
import GameIcon from "./GameIcon";

export default class GameDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {img: 0, displayPreview: false, displayRules: true, displayComment: false}
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('title'),
        };
    };

    componentDidMount() {
        setTimeout(() => {this.scroll.scrollTo({y:500,animated:true})}, 300);
    }

    render() {
        let i = 0;
        let game = this.props.navigation.state.params.game;
        let random = [];
        if (this.props.navigation.state.params.rand)
            random.push(
                <TouchableOpacity
                    key={i++}
                    style={styles.aleatoire}
                    onPress={() => {
                        this.props.navigation.state.params.rand();
                        this.setState({displayComment: false});
                    }}>
                    <Text key={i++} style={styles.submitButtonText}>Un autre</Text>
                </TouchableOpacity>
            );

        return (
            <View style={styles.main_container}>

                <Image
                    style={styles.image}
                    source={{uri: getImageFromApi(game.images.split(',')[this.state.img].trim())}}
                />
                <View style={styles.scroll}>
                    <ScrollView ref={(view) => {this.scroll = view}}>
                        <View style={styles.content_container}>
                            <TouchableOpacity
                                style={{height: 500}}
                                onPress={() => {
                                    this.state.img + 1 < game.images.split(',').length ? this.setState({img: this.state.img + 1}) : this.setState({img: 0})
                                }}/>
                            <View style={[styles.section_container]}>
                                <View style={styles.header}>
                                    <View style={styles.container}>
                                        <Text style={styles.text}>
                                            {!(game.comments && game.comments[0]) ? 'Pas d\'avis' : 'Avis ('+game.comments[0].comments+')'}
                                        </Text>
                                        <View style={styles.star}>
                                            {game.comments && game.comments[0] ?
                                                <Text style={styles.text}>
                                                    {(Math.round(game.comments[0].rate * 10) / 10).toFixed(1) + ' '}
                                                </Text> : null}
                                            {game.comments && game.comments[0] ? <Star config={{height: 20, width:20}}/> : null}
                                        </View>
                                    </View>
                                    <View style={styles.container}>
                                        <Text style={styles.text}>Catégorie</Text>
                                        <GameIcon category={game.categoryId} />
                                    </View>
                                    <View style={styles.container}>
                                        <Text style={styles.text}>Multijoueur</Text>
                                        {!game.multiplayer ? <Users/> :
                                            <View style={styles.star}>
                                                <Text style={{
                                                    fontSize:17,
                                                    fontWeight: 'bold',
                                                    color: color.fontColor,}}>
                                                    {game.multiplayer}
                                                </Text>
                                            </View>
                                        }
                                    </View>
                                </View>
                                <TouchableOpacity
                                    style={styles.section}
                                    onPress={() => {
                                        this.setState({displayPreview: !this.state.displayPreview})
                                    }}>
                                    <Text style={styles.title_section}>Présentation</Text>
                                    <Arrow config={{height: 20, width: 20, color: color.fontColor, empty: this.state.displayPreview}}/>
                                </TouchableOpacity>

                                {this.state.displayPreview ? <Preview game={game}/> : null}
                            </View>
                            <View style={styles.section_container}>
                                <TouchableOpacity
                                    style={styles.section}
                                    onPress={() => {
                                        this.setState({displayRules: !this.state.displayRules})
                                    }}>
                                    <Text style={styles.title_section}>Règles du jeu</Text>
                                    <Arrow config={{height: 20, width: 20, color: color.fontColor, empty: this.state.displayRules}}/>
                                </TouchableOpacity>
                                {this.state.displayRules ?
                                    <Rules game={game} play={this.props.navigation.state.params.play}/> : null}
                            </View>
                            <View style={styles.section_container}>
                                <TouchableOpacity
                                    style={styles.section}
                                    onPress={() => {
                                        this.setState({displayComment: !this.state.displayComment})
                                    }}>
                                    <Text style={styles.title_section}>Commentaires</Text>
                                    <Arrow config={{height: 20, width: 20, color: color.fontColor, empty: this.state.displayComment}}/>
                                </TouchableOpacity>
                                {this.state.displayComment ?
                                    <Commentary game={game}/> : null}
                            </View>

                        </View>
                    </ScrollView>
                </View>
                {random}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        width: '100%',
        height: '100%',
        backgroundColor: color.backColor
    },
    container: {
        width: '33%',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scroll: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        flex: 1
    },
    star: {
        flexDirection: 'row',
        margin: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content_container: {
        padding: 10,
    },
    image: {
        height: '100%',
        resizeMode: 'cover'
    },
    /*rules_text: {
        padding: 10
    },*/
    aleatoire: {
        position: 'absolute',
        right: '0%',
        bottom: '0%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.mainColor,
        padding: 10,
        borderTopLeftRadius: 3
    },
    submitButtonText: {
        color: 'white',
    },
    section_container: {
        /*borderColor: '#ccc',
        borderTopWidth: 1,
        borderLeftWidth: 1,*/
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        padding: 5,
        paddingRight: 10,
        paddingLeft: 10,
        margin: 1,
        backgroundColor: color.displayColor,
    },
    section: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    title_section: {
        color: color.fontTitleColor,
        width: '70%',
        fontSize: 15,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 25,
        marginRight: 25,
        borderBottomWidth: 1,
        borderColor: color.fontColor,
        fontWeight: 'bold',
    },
    icon: {
        right: '10%',
    },
    text:{
        color: color.fontColor,
    }
});