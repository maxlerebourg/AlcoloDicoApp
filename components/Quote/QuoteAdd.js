import React from 'react';
import {
    View,
    StyleSheet,
    Picker,
    Text,
    Alert,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView, AsyncStorage
} from 'react-native';
import color from "../Config/Color";
import {alert} from "../Auth/AlertLogin" ;
import {postQuoteInApi} from "../../API/ToolsAPI";
import DatePicker from 'react-native-datepicker'


export default class QuoteAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {quote: '' , link: null, date: new Date()};
    }

    handleQuote = (text) => {
        this.setState({quote: text})
    };
    handleLink = (text) => {
        this.setState({link: (text.length <= 0 ? null : text)})
    };

    submit() {
        AsyncStorage.getItem('user', '').then((user) => {
            if (JSON.parse(user).pseudo) {
                let json = this.state;
                let ok = '';
                for (var prop in json) {
                    if (json[prop] == '') ok += prop + ' ';
                }
                if (ok == '') {
                    postQuoteInApi(json).then(data => {
                        Alert.alert(
                            'Ajout du Jeu',
                            'Votre annecdote a été ajouté.',
                            [
                                {text: 'OK', onPress: () => {}}
                            ],
                        );
                    });
                } else {
                    Alert.alert(
                        'Manque d\'information',
                        ok + 'est manquant.',
                        [
                            {text: 'OK', onPress: () => console.log('OK Pressed')}
                        ],
                        {cancelable: true},
                    );
                }
            }
        }).catch(() => {
            alert("Tu l'as voulu, fallez aller te connecter !", this);
        })
    }
    componentDidMount() {
        AsyncStorage.getItem('user', '').then((user) => {
            if (!JSON.parse(user).pseudo) alert('Va te connecter !', this);
        }).catch(() => {
            alert("Vous n'êtes pas connecté.", this)
        })
    }

    render() {
        return (
            <View style={styles.main_container}>
                <KeyboardAvoidingView style={{width:'100%'}}>
                    <ScrollView style={{width:'100%'}}>
                        <DatePicker
                            date={this.state.date} //initial date from state
                            mode="date" //The enum of date, datetime and time
                            placeholder="Choisi ta date"
                            placeholderColor={color.fontTitleColor}
                            format="YYYY-MM-DD"
                            confirmBtnText="Ok"
                            cancelBtnText="Annuler"
                            style={{
                                width:'100%',
                                marginBottom: 15,
                                marginTop: 15,
                            }}
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    width:'100%',
                                    margin: 15,
                                    padding: 5,
                                    backgroundColor: color.fontEditColor,
                                },
                                dateText: {
                                    color: color.fontTitleColor
                                }
                            }}
                            onDateChange={(date) => {
                                this.setState({date: date})
                            }}
                        />
                        <TextInput style={styles.input_text}
                                   multiline={true}
                                   numberOfLines={4}
                                   underlineColorAndroid="transparent"
                                   placeholder="Edit ta quote..."
                                   placeholderTextColor={color.fontTitleColor}
                                   onChangeText={this.handleQuote}/>
                        <TextInput style={styles.input_text}
                                   multiline={true}
                                   numberOfLines={4}
                                   underlineColorAndroid="transparent"
                                   placeholder="Lien vidéo / image (Optionnel)"
                                   placeholderTextColor={color.fontTitleColor}
                                   onChangeText={this.handleLink}/>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.submit()}>
                            <Text style={styles.buttonText}>Envoyer</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    main_container: {
        height: '100%',
        width: '100%',
        paddingTop: 23,
        backgroundColor: color.backColor,
    },
    input: {
        backgroundColor: color.fontEditColor,
        color: color.fontTitleColor,
        margin: 15,
        height: 40,
        padding: 5,
        borderWidth: 1,
        borderColor: color.fontColor,
    },
    input_text: {
        backgroundColor: color.fontEditColor,
        color: color.fontTitleColor,
        margin: 15,
        height: 80,
        padding: 5,
        borderWidth: 1,
        borderColor: color.fontColor,
    },
    button: {
        backgroundColor: color.mainColor,
        padding: 10,
        margin: 15,
        height: 40,
        borderRadius: 3
    },
    buttonText: {
        color: color.fontTitleColor,
    }
});