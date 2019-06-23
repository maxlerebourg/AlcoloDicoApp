import {
    View,
    StyleSheet,
    Button,
    Text,
    TouchableOpacity, TextInput, ScrollView,
} from "react-native";
import React from "react";
import color from "../Config/Color";


export default class Rating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {rate: 0, quantity: 0};
    }

    render() {
        return (
            <View>
                <View style={styles.container}>
                <TextInput style={styles.input}
                           underlineColorAndroid="transparent"
                           placeholderTextColor={color.mainColor}
                           keyboardType='numeric'
                           onSubmitEditing={() => {this.quant.focus()}}
                           onChangeText={(num) => {this.setState({rate: num})}}/>
                <Text style={styles.text}>% pour</Text>
                <TextInput style={styles.input}
                           ref={(view) => {this.quant = view}}
                           underlineColorAndroid="transparent"
                           placeholderTextColor={color.mainColor}
                           keyboardType='numeric'
                           onChangeText={(num) => this.setState({quantity: num})}/>
                <Text style={styles.text}>cl = {this.state.rate * 8 * this.state.quantity / 100}g d'alcool pur.</Text>
                </View>
                <Text style={styles.avert}>Eviter de dépasser 30g par jour et 140g par semaine.</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    input: {
        color: color.fontColor,
        marginTop: 15,
        marginBottom: 5,
        height: 40,
        textAlign: 'center',
        width: '15%',
        borderColor: color.mainColor,
        borderBottomWidth: 1,
    },
    text: {
        color: color.fontColor,
        margin: 10,
        marginTop: 25,
        marginBottom: 5,
        height: 40,
    },
    avert: {
        margin: 10,
        marginTop: 5,
        marginBottom: 5,
        fontSize: 10,
    },
});