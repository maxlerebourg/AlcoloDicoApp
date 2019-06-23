import {
    Alert,
    KeyboardAvoidingView,
    TextInput,
    StyleSheet,
    FlatList,
    Text,
    View,
    TouchableOpacity,
    AsyncStorage
} from "react-native";
import React from "react";
import {getCommentsFromApi, CommentInApi} from "../../API/GameAPI";
import color from "../Config/Color";
import {alert} from "../Auth/AlertLogin";

import Star from "../../images/svg/Star";
import Send from "../../images/svg/Send";

export default class Commentary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {game: this.props.game, comment: '', comments: [], rate: 0, star: []};
    }

    handleComment(text) {
        this.setState({comment: text})
    }

    _comment() {
        AsyncStorage.getItem('user', '').then((user) => {
            if (JSON.parse(user).pseudo) {
                if (this.state.comment !== '' && this.state.rate !== 0) {
                    let json = {review: this.state.comment, rate: this.state.rate};
                    CommentInApi(json, this.state.game.id).then(() => {
                        this.setState({comment: ''});
                        this._getComments();
                    });

                } else {
                    Alert.alert('Manque d\'informations',
                        'Vous n\'avez pas remplis'
                        +(this.state.rate === 0 ? ' la note' : '')+(this.state.comment === '' ? ' le commentaire' : '')
                    )
                }
            }
        }).catch(() => {
            alert("Vous n'êtes pas connecté.", this);
        })

    }

    _getComments() {
        getCommentsFromApi(this.state.game.id).then((data) => {
            if (data[0] !== undefined) this.setState({comments: data});
            else {
                let datat = [{id: 0, review: 'Il n\'y a pas encore de commentaire pour ce jeu', user: {pseudo: ''}}];
                this.setState({comments: datat});

            }
        }).catch(() => {
            let datat = [{id: 0, review: 'Il n\'y a pas encore de commentaire pour ce jeu', user: {pseudo: ''}}];
            this.setState({comments: datat});
        })
    }

    componentDidMount() {
        this._getComments();
    }

    render() {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <TouchableOpacity
                    key={i}
                    style={styles.star}
                    onPress={() => {
                        this.setState({rate: i+1});
                }}>
                        {<Star  config={{height: 25, width: 25, empty: !(i < this.state.rate) }}/> }
                </TouchableOpacity>);
        }
        return (
            <View>
                <View style={styles.header_comment}>
                    {stars}
                </View>
                <KeyboardAvoidingView style={styles.comment}>
                    <TextInput style={styles.input}
                               value={this.state.comment}
                               onChangeText={(text) => {
                                   this.handleComment(text)
                               }}
                               placeholder='Laisse un commentaire...'
                    />
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => {this._comment()}}>
                        <Send config={{color: color.fontColor, width: 25, height: 25}}/>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
                <FlatList
                    data={this.state.comments}
                    renderItem={({item}) => <CommentItem comment={item}/>}
                    keyExtractor={(item) => item.id.toString()}/>
            </View>
        )
    }
}

export class CommentItem extends React.Component {


    render() {
        const {comment} = this.props;
        let star = [];
        if (comment.rate) {
            for (let i = 0; i < comment.rate; i++) {
                star.push(
                    <Star config={{height: 15, width: 15}}/>);
            }
        }
        return (
            <View style={styles.comment_solo}>
                <View style={styles.header_comment}>
                    <Text style={styles.comment_user}>{comment.user.pseudo}</Text>
                    {star}
                </View>
                <View style={styles.content_comment}>
                    <Text style={styles.text}>{comment.review}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    comment: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    star: {
        height: 40,
        width: '20%',
        alignItems: 'center',
    },
    input: {
        width: '70%',
        backgroundColor: color.fontEditColor,
        borderColor: color.backColor,
        borderWidth: 1,
        borderRadius: 3,
        padding: 5,
        marginRight: 5,
    },
    comment_solo: {
        margin: 5,
        marginBottom: 10,
    },
    content_comment: {
        flex: 5
    },
    header_comment: {
        width: '100%',
        flexDirection: 'row',
    },
    comment_user: {
        color: color.fontTitleColor,
        fontWeight: 'bold',
        marginLeft: 15,
        width: '60%',
    },
    text: {
        color: color.fontColor,
    },
    icon: {
        height: 30,
        width: 30,
    },
});