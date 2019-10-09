import React from 'react';
import {
    FlatList,
    View,
    StyleSheet,
    TextInput,
    Text,
    Image,
    Alert,
    TouchableOpacity,
    AsyncStorage, ScrollView
} from 'react-native';

import Info from '../../images/svg/Info';
import Users from '../../images/svg/Users';
import Note from '../../images/svg/Note';
import Crown from "../../images/svg/Crown";
import AddUser from "../../images/svg/AddUser";
import Plus from "../../images/svg/Plus";
import Cross from "../../images/svg/Cross";

import {searchUserInApi} from "../../API/ToolsAPI";
import {
    myPartyInApi, addNotePartyInApi, addUserPartyInApi,
    removeUserPartyInApi
} from "../../API/PartyAPI";
import color from "../Config/Color";
import Send from "../../images/svg/Send";


export default class PartyDetail extends React.Component {
    constructor(props) {
        super(props);
        let party = this.props.navigation.state.params.party;
        //Alert.alert('caca', JSON.stringify(party));
        let user = this.props.navigation.state.params.user;
        let date = new Date();
        let dateParty = new Date(party.date);
        this.state = {
            party: party,
            user: user,
            suggest: [],
            guests: [],
            date: date,
            dateParty: dateParty,
            hourParty: dateParty.getHours() + ' h ' + (dateParty.getMinutes() < 9 ? '0' : '') + dateParty.getMinutes(),
            notes: <Text style={styles.text}>{party.note}</Text>,
            note: '',
            display: (party.user && user.pseudo === party.user.pseudo && date < dateParty.getTime() + 86400000)
        };
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('title'),
        };
    };

    _searchSuggestion(name) {
        searchUserInApi(name).then((data) => {
            data.length > 0 ? this.setState({suggest: data}) : this.setState({suggest: []})
        });
    }

    _guests() {
        myPartyInApi(this.state.party.id).then((data) => {
            this.setState({guests: data});
            setTimeout(() => {this.scroll.scrollTo({y:500,animated:true})}, 100);
        });
    }

    _addGuests(user_id) {
        addUserPartyInApi({id: user_id}, this.state.party.id).then(() => {
            this._guests();
        });
    }

    _removeGuests(user_id) {
        removeUserPartyInApi({id: user_id}, this.state.party.id).then(() => {
            this._guests();
        });
    }

    _addNote(id) {
        if (this.state.note.length > 0) {
            addNotePartyInApi({note: this.state.note}, this.state.party.id).then((data) => {
                this.setState({note: '', notes: <Text style={styles.text}>{data.note}</Text>});
            });
        }
    }

    componentDidMount() {
        this._guests();
    }

    render() {
        return (
            <View style={styles.main_container}>
                <Image
                    style={styles.image}
                    source={{uri: 'https://cdn.pixabay.com/photo/2015/05/31/11/15/wine-791133_960_720.jpg'}}
                />
                <View style={styles.scroll}>
                    <ScrollView ref={(view) => {this.scroll = view}}>
                        <View style={styles.content_container}>
                            <View style={{height: 500}}/>
                            <View style={[styles.section_container, (this.state.display ? null : {display: 'none'})]}>
                                <View style={styles.section}>
                                    <AddUser/>
                                    <Text style={styles.title_section}>Ajouter des gens</Text>
                                </View>
                                <TextInput
                                    style={styles.text_input}
                                    onChangeText={(changedText) => {
                                        changedText.length > 0 ? this._searchSuggestion(changedText) : null
                                    }}
                                    placeholder="Ajouter quelqu'un..."
                                    clearButtonMode="always"
                                    placeholderTextColor={color.fontColor}
                                />
                                <FlatList
                                    data={this.state.suggest}
                                    renderItem={(item) => {return this.renderUser(item, false)}}
                                    keyExtractor={(item) => item.id.toString()}
                                />
                            </View>
                            <View style={[styles.section_container,
                                (this.state.date > this.state.dateParty ? null : {display: 'none'})]}>
                                <View style={styles.section}>
                                    <Note />
                                    <Text style={styles.title_section}>Rappel de la soirée</Text>
                                </View>
                                {this.state.notes}
                                <View style={styles.header}>
                                    <TextInput
                                        style={styles.text_input}
                                        value={this.state.note}
                                        onChangeText={(changedText) => {
                                            this.setState({note: changedText});
                                        }}
                                        placeholder="Ajouter une note..."
                                        placeholderTextColor={color.fontEditColor}
                                        onSubmitEditing={() => this._addNote()}
                                    />
                                    <TouchableOpacity
                                        style={styles.icon}
                                        onPress={() => {this._addNote()}}>
                                        <Send config={{color: color.fontColor, width: 25, height: 25}}/>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.section_container}>
                                <View style={styles.section}>
                                    <Info />
                                    <Text style={styles.title_section}>Informations</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => {
                                        if(this.state.party.user && this.state.user.pseudo === this.state.party.user.pseudo)
                                            this.props.navigation.navigate('PartyEdit', {party: this.state.party, display: this.state.display})}}>
                                    <View style={styles.info}>
                                        <Text style={styles.text}>Heure : </Text>
                                        <Text style={styles.user_name}>{this.state.hourParty}</Text>
                                    </View>
                                        {(!this.state.party.location && this.state.party.user ?
                                            <View style={styles.info}>
                                                <Text style={styles.text}>Lieu : chez </Text>
                                                <Text style={styles.user_name}>
                                                    {this.state.party.user.firstname ? this.state.party.user.firstname : 'moi'} {this.state.party.user.lastname}
                                                </Text>
                                            </View> :
                                            <View style={styles.info}>
                                                <Text style={styles.text}>Lieu : </Text>
                                                <Text style={styles.user_name}>{this.state.party.location}</Text>
                                            </View>
                                        )}
                                </TouchableOpacity>
                            </View>
                            <View style={styles.section_container}>
                                <View style={styles.section}>
                                    <Users />
                                    <Text style={styles.title_section}>Invités</Text>
                                </View>
                                <FlatList
                                    data={this.state.guests}
                                    renderItem={(item) => {
                                        return this.renderUser(item, true);
                                    }}
                                    keyExtractor={(item) => item.id.toString()}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }

    renderUser(item, bool) {
        item = item.item;
        return (
            <View style={styles.user_container}>
                <View style={styles.user}>
                    <Text style={styles.user_name}>{item.firstname}</Text>
                    <Text style={styles.text}> @{item.pseudo} </Text>
                    {this.state.party.userId === item.id ? <Crown /> : null}
                </View>
                <View style={(this.state.display ? null : {display: 'none'})}>
                    {this.state.display && !bool ?
                        <TouchableOpacity
                            style={styles.icon}
                            onPress={() => {this._addGuests(item.id)}}>
                            <Plus config={{height: 15, width: 15}} />
                        </TouchableOpacity> :
                        <TouchableOpacity
                            style={styles.icon}
                            onPress={() => {this._removeGuests(item.id)}}>
                            <Cross config={{height: 15, width: 15}} />
                        </TouchableOpacity>
                    }
                </View>
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
    section_container: {
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
        height: 30,
        width: 30,
    },
    user_container: {
        flexDirection: 'row',
        height: 30,
        alignContent: 'flex-end',
    },
    user: {
        flexDirection: 'row',
        height: 30,
        width: '93%',
    },
    user_name: {
        color: color.fontColor,
        fontWeight: 'bold',
        fontSize: 16,
    },
    text: {
        color: color.fontColor,
    },
    text_input: {
        color: color.fontColor,
        width: '95%',
    },
    info: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    }
});
