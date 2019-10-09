import {
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
    AsyncStorage,
    Alert
} from "react-native";
import React from "react";
import {RegisterInApi} from "../../API/ToolsAPI";
import color from "../Config/Color";


export default class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {pseudo: '', firstname: '', lastname: '', mail: '', password: ''};
    }

    handlePseudo = (text) => {
        this.setState({pseudo: text})
    };
    handleFirstName = (text) => {
        this.setState({firstname: text})
    };
    handleLastName = (text) => {
        this.setState({lastname: text})
    };
    handleMail = (text) => {
        this.setState({mail: text})
    };
    handlePassword = (text) => {
        this.setState({password: text})
    };

    connect() {
        let json = this.state;
        let ok = '';
        for (var prop in json) {
            console.log(json[prop])
            if (json[prop] == '') ok += prop + ' '
        }
        if (ok == '') {
            RegisterInApi(json).then((data) => {
                if (data.pseudo) {
                    Alert.alert('Connexion Réussie', 'Vous êtes connecté sous le pseudo : ' + data.pseudo);
                    AsyncStorage.setItem('user', JSON.stringify(data));this.props.navigation.navigate('Home');
                } else Alert.alert('Status', data.status);
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

    componentDidMount() {
        AsyncStorage.getItem('user', '').then((user) => {
            if (JSON.parse(user).pseudo)
                this.props.navigation.navigate('User', {user: JSON.parse(user)});
        })
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <ScrollView>
                    <TextInput style={styles.input}
                               onChangeText={this.handlePseudo}
                               autoCapitalize="none"
                               placeholder='Pseudo'
                        //placeholderTextColor="#9a73ef"
                               autoCorrect={false}
                    />
                    <TextInput style={styles.input}
                               onChangeText={this.handleFirstName}
                               placeholder='Prénom'
                        //placeholderTextColor="#9a73ef"
                    />
                    <TextInput style={styles.input}
                               onChangeText={this.handleLastName}
                               placeholder='Nom'
                        //placeholderTextColor="#9a73ef"
                    />
                    <TextInput style={styles.input}
                               onChangeText={this.handleMail}
                               autoCapitalize="none"
                               placeholder='Mail'
                        //placeholderTextColor="#9a73ef"
                               autoCorrect={false}
                    />
                    <TextInput style={styles.input}
                               onChangeText={this.handlePassword}
                               placeholder='Password'
                        //placeholderTextColor="#9a73ef"
                               secureTextEntry
                    />

                    <TouchableOpacity style={styles.submitButton}
                                      onPress={() => this.connect()}>
                        <Text style={styles.submitButtonText}>Inscription</Text>
                    </TouchableOpacity>

                </ScrollView>

            </KeyboardAvoidingView>
        );
    }
}
const styles = StyleSheet.create({
    main_container: {
        height: '0%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        height: '100%',
        width: '100%',
        padding: 20,
        backgroundColor: color.displayColor,
    },
    input: {
        backgroundColor: 'white',
        margin: 15,
        height: 40,
        //borderColor: color.mainColor,
        //borderWidth: 1,
        padding: 5,
        borderRadius: 3
    },
    submitButton: {
        backgroundColor: color.mainColor,
        padding: 10,
        margin: 15,
        height: 40,
        borderRadius: 3
    },
    submitButtonText: {
        color: 'white'
    }
});