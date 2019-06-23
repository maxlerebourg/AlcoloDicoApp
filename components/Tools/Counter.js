import {
    View,
    StyleSheet,
    Button,
    Text,
    TouchableOpacity,
} from "react-native";
import React from "react";
import color from "../Config/Color";


export default class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {i: 0}
    }

    render() {
        return (
            <View style={styles.buttons}>
                <TouchableOpacity
                    disabled={this.state.i <= 0}
                    style={styles.submitButtonExt}
                    onPress={() => {
                        this.setState({i: this.state.i - 1})
                    }}>
                    <Text style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: this.state.i <= 0 ? 'gray' : 'white'
                    }}>-</Text>
                </TouchableOpacity>
                <View>
                    <Text style={styles.text}>{this.state.i}</Text>

                    <TouchableOpacity
                        disabled={this.state.i <= 0}
                        style={styles.submitButton}
                        onPress={() => {
                            this.setState({i: 0})
                        }}>
                        <Text style={{
                            color: this.state.i <= 0 ? 'gray' : 'white'
                        }}>RàZ</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.submitButtonExt}
                    onPress={() => {
                        this.setState({i: this.state.i + 1})
                    }}>
                    <Text style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: 'white'
                    }}>+</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    submitButton: {

        backgroundColor: color.mainColor,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    submitButtonExt: {
        height: 70,
        width: 70,
        backgroundColor: color.mainColor,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        margin: 5
    },
});