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
import {updatePartyInApi} from "../../API/PartyAPI";
import color from "../Config/Color";
import DatePicker from "react-native-datepicker";


export default class PartyEdit extends React.Component {
    constructor(props) {
        super(props);
        let {party, display} = this.props.navigation.state.params;
        this.state = {date: party.date, note: party.note, location: party.location, id: party.id, display: display};
    }
    submit() {
        let json = this.state;
        updatePartyInApi(this.state.id, json).then(data => {
            Alert.alert('Soirée mise à jour');
        });
    }
    render() {
        return (
            <View style={styles.main_container}>
                <KeyboardAvoidingView style={{width:'100%'}}>
                    <ScrollView style={{width:'100%'}}>
                        <DatePicker
                            disabled={!this.state.display}
                            date={new Date(this.state.date)} //initial date from state
                            mode="time" //The enum of date, datetime and time
                            placeholder="Choisi ta date"
                            placeholderColor={color.fontTitleColor}
                            format="YYYY-MM-DD HH:mm"
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
                                disabled: {
                                    width:'100%',
                                    margin: 15,
                                    padding: 5,
                                    backgroundColor: color.fontEditColor
                                },
                                dateText: {
                                    color: color.fontTitleColor
                                }
                            }}
                            onDateChange={(date) => {
                                let day = new Date(this.state.date);
                                day.setHours(Number(date.substring(11,13)));
                                day.setMinutes(Number(date.substring(14,16)));
                                this.setState({date: day})
                            }}
                        />
                        <TextInput
                            editable={this.state.display}
                            value={this.state.location}
                            style={styles.input}
                            underlineColorAndroid="transparent"
                            placeholder="Entre un lieu"
                            placeholderTextColor={color.fontTitleColor}
                            onChangeText={(text) => {this.setState({location: text})}}/>
                        <TextInput
                            editable={!this.state.display}
                            value={this.state.note}
                            style={styles.input_text}
                            multiline={true}
                            numberOfLines={4}
                            underlineColorAndroid="transparent"
                            placeholder="Notes de soirée"
                            placeholderTextColor={color.fontTitleColor}
                            onChangeText={(text) => {this.setState({note: text})}}/>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={
                                () => this.submit()
                            }>
                            <Text style={styles.buttonText}>Modifier</Text>
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
})