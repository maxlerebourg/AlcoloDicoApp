import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import color from "../Config/Color";

export default class Chronometer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            minutes: 0,
            seconds: 0,
            millis: 0,
            running: false
        };
        this._handleStartClick = this._handleStartClick.bind(this);
        this._handleStopClick = this._handleStopClick.bind(this);
        this._handleResetClick = this._handleResetClick.bind(this);
    }

    _handleStartClick(event) {
        if (!this.state.running) {
            this.interval = setInterval(() => {
                this.tick();
            }, 100);
            this.setState({running: true})
        }
    }

    _handleStopClick(event) {
        if (this.state.running) {
            clearInterval(this.interval);
            this.setState({running: false});
        }
    }

    _handleResetClick(event) {
        this._handleStopClick();
        this.setState({
            millis: 0,
            seconds: 0,
            minutes: 0
        });
    }

    tick() {
        let millis = this.state.millis + 1;
        let seconds = this.state.seconds;
        let minutes = this.state.minutes;

        if (millis === 10) {
            millis = 0;
            seconds = seconds + 1;
        }
        if (seconds === 60) {
            millis = 0;
            seconds = 0;
            minutes = minutes + 1;
        }

        this.setState({
            millis: millis,
            seconds: seconds,
            minutes: minutes
        });
    }

    zeroPad(value) {
        return value < 10 ? `0${value}` : value;
    }

    render() {
        let run = this.state.running === true;
        let stopDisabled = false === run;
        let resetDisabled = (true === run || (false === run && (this.state.millis > 0 || this.state.seconds > 0 || this.state.minutes > 0 )));
        return (
            <View>
                <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent:'center', marginBot: 10}}>
                    <Text style={styles.status}>
                        {run ? '...' : 'Stop'}
                    </Text>
                    <Text style={styles.time}>
                        {this.zeroPad(this.state.minutes)}:{this.zeroPad(this.state.seconds)}
                    </Text>
                    <Text style={styles.millis}>
                        .0{this.state.millis}
                    </Text>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity
                        disabled={run ? true : false}
                        style={styles.submitButton}
                        onPress={() => {this._handleStartClick()}}>
                        <Text style={{
                            color: run ? 'gray' : 'white'
                        }}>Start</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={stopDisabled ? true : false}
                        style={styles.submitButton}
                        onPress={() => {this._handleStopClick()}}>
                        <Text style={{
                            color: stopDisabled ? 'gray' : 'white'
                        }}>Stop</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={resetDisabled ? false : true}
                        style={styles.submitButton}
                        onPress={() => {this._handleResetClick()}}>
                        <Text style={{
                            color: resetDisabled ? 'white' : 'gray'
                        }}>Reset</Text>
                    </TouchableOpacity>
                </View>
            </View>);
    }
}

const styles = StyleSheet.create({
    status: {
        color: color.fontTitleColor,
        marginRight: 10,
        fontSize: 20,
        width: '50%',
    },
    chrono: {
        color: color.fontTitleColor,
        textAlign: 'center'
    },
    time: {
        color: color.fontTitleColor,
        textAlign: 'center',
        fontSize: 20
    },
    millis: {
        color: color.fontTitleColor,
        textAlign: 'center',
        fontSize: 10
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    submitButton: {
        backgroundColor: color.mainColor,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
});