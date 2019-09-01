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
import {postGameInApi} from "../../API/GameAPI";
import color from "../Config/Color";
import {alert} from "../Auth/AlertLogin" ;


export default class AddOrEditGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', preview: '', rules: '', images: '', category: '1', multiplayer: null};
    }

    handleName = (text) => {
        this.setState({name: text})
    };
    handlePreview = (text) => {
        this.setState({preview: text})
    };
    handleUrl = (text) => {
        this.setState({images: text})
    };
    handleCat = (text) => {
        this.setState({category: text})
    };
    handleRules = (text) => {
        this.setState({rules: text})
    };
    handleMP = (text) => {
        this.setState({multiplayer: text})
    };

    submit() {
        AsyncStorage.getItem('user', '').then((user) => {
            if (JSON.parse(user).pseudo) {
                let json = this.state;
                let ok = '';
                for (var prop in json) {
                    console.log(json[prop])
                    if (json[prop] == '') ok += prop + ' '
                }
                if (ok == '') {
                    postGameInApi(json).then(data => {
                        Alert.alert(
                            'Ajout du Jeu',
                            data[0].name + ' a été ajouté et est en attente de validation par nos admins.',
                            [
                                {text: 'OK', onPress: () => console.log('OK Pressed')}
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
            alert("Tu l'as voulu, fallez aller te connecter !");
        })
    }
    componentDidMount() {
        AsyncStorage.getItem('user', '').then((user) => {
            if (!JSON.parse(user).pseudo) Alert.alert('Pas de chance', 'Va te connecter !');
        }).catch(() => {
            alert("Vous n'êtes pas connecté.", this)
        })
    }

    render() {
        return (
            <View style={styles.main_container}>
                <KeyboardAvoidingView>
                    <ScrollView>
                        <TextInput style={styles.input}
                                   underlineColorAndroid="transparent"
                                   placeholder="Nom"
                                   placeholderTextColor= {color.fontTitleColor}
                                   onChangeText={this.handleName}/>
                        <TextInput style={styles.input_text}
                                   multiline={true}
                                   numberOfLines={4}
                                   underlineColorAndroid="transparent"
                                   placeholder="Présentation courte du jeu"
                                   placeholderTextColor={color.fontTitleColor}
                                   onChangeText={this.handlePreview}/>
                        <TextInput style={styles.input_text}
                                   multiline={true}
                                   numberOfLines={4}
                                   underlineColorAndroid="transparent"
                                   placeholder="Règles du jeu"
                                   placeholderTextColor={color.fontTitleColor}
                                   onChangeText={this.handleRules}/>
                        <TextInput style={styles.input}
                                   underlineColorAndroid="transparent"
                                   placeholder="URL d'une image"
                                   placeholderTextColor={color.fontTitleColor}
                                   onChangeText={this.handleUrl}/>
                        <Picker selectedValue={this.state.category}
                                style={styles.input}
                                onValueChange={(itemValue) => {
                                    this.handleCat(itemValue);
                                }}>
                            <Picker.Item label="Cartes" value="1"/>
                            <Picker.Item label="Caps" value="2"/>
                            <Picker.Item label="Rien" value="3"/>
                            <Picker.Item label="Balles" value="4"/>
                            <Picker.Item label="Dés" value="5"/>
                            <Picker.Item label="Domino" value="6"/>
                            <Picker.Item label="Jeu Vidéo Multijoueur" value="7"/>
                            <Picker.Item label="Jeu Vidéo en Lan" value="8"/>
                            <Picker.Item label="Application mobile" value="9"/>
                        </Picker>
                        <Picker selectedValue={this.state.multiplayer}
                                style={styles.input}
                                onValueChange={(itemValue) => {
                                    this.handleMP(itemValue);
                                }}>
                            <Picker.Item label="2" value="2"/>
                            <Picker.Item label="3" value="3"/>
                            <Picker.Item label="4" value="4"/>
                            <Picker.Item label="5 et +" value={null}/>
                        </Picker>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={
                                () => this.submit()
                            }>
                            <Text style={styles.buttonText}>Proposer</Text>
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
        padding: 5
    },
    input_text: {
        backgroundColor: color.fontEditColor,
        color: color.fontTitleColor,
        margin: 15,
        height: 80,
        padding: 5
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
})