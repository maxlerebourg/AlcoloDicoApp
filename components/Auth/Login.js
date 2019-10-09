import {
    TextInput,
    KeyboardAvoidingView,
    View,
    ScrollView,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
    AsyncStorage,
    Alert
} from "react-native";
import React from "react";
import {LogInApi} from "../../API/ToolsAPI";
import color from "../Config/Color";


export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mail: '',
            password: '',
            print: <Text style={styles.text}>Waiting...</Text>
        };
    }

    handleMail = (text) => {
        this.setState({mail: text})
    };
    handlePassword = (text) => {
        this.setState({password: text})
    };

    connect() {
        let json = this.state;
        AsyncStorage.getItem('notification_id').then((token) => {
            json.notification_id = token;
            LogInApi(json).then((data) => {
                if (data.pseudo) {
                    Alert.alert('Connexion Réussie', 'Vous êtes connecté sous le pseudo : ' + data.pseudo);
                    AsyncStorage.setItem('user', JSON.stringify(data));
                    this._print();
                    this.props.navigation.navigate('Home');
                } else Alert.alert('Status', data.status);
            });
        });
    }

    disconnect() {
        AsyncStorage.setItem('user', '');
        this._print();
        this.props.navigation.push('List');
    }

    _print() {
        AsyncStorage.getItem('user', '')
            .then((user) => {
                if (JSON.parse(user).pseudo) {
                    let print = [];
                    print.push(
                        <View style={styles.container}>

                            <View style={styles.user}>
                                <Text style={styles.text}>Connecté en tant que : </Text><Text
                                style={styles.name}>{JSON.parse(user).pseudo}</Text><Text style={styles.text}>.</Text>
                            </View>
                            <TouchableOpacity style={styles.submitButton}
                                              onPress={() => this.disconnect()}>
                                <Text style={styles.submitButtonText}>Déconnexion</Text>
                            </TouchableOpacity>
                        </View>);
                    this.setState({print: print});
                }
            }).catch(() => {
            let print = [];
            print.push(
                <KeyboardAvoidingView behavior="padding" style={styles.main_container}>
                    <ScrollView style={styles.container}>
                        <TextInput style={styles.input}
                                   onChangeText={this.handleMail}
                                   autoCapitalize="none"
                                   placeholder='Mail'
                                   autoCorrect={false}
                                   onSubmitEditing={() => {this.pwd.focus()}}
                        />

                        <TextInput style={styles.input}
                                   onChangeText={this.handlePassword}
                                   placeholder='Password'
                                   ref={(view) => {this.pwd = view}}
                                   secureTextEntry/>

                        <TouchableOpacity style={styles.submitButton}
                                          onPress={() => this.connect()}>
                            <Text style={styles.submitButtonText}>Connexion</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.submitButton}
                                          onPress={() => {
                                              this.props.navigation.navigate('Register')
                                          }}>
                            <Text style={styles.submitButtonText}>Inscription</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView>
            );
            this.setState({print: print});
        });
    }

    componentDidMount() {
        this._print();
    }

    render() {

        return (
            <View style={styles.main_container}>
                {this.state.print}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    main_container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        backgroundColor: color.displayColor,
    },
    container: {
        padding: 20
    },
    user: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
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
    },
    name: {
        fontWeight: 'bold',
        fontSize: 20,
        color: color.fontTitleColor,
    },
    text: {
        color: color.fontColor
    }
});