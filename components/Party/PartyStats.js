import React from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Text,
    Alert,
    CheckBox,
    AsyncStorage
} from 'react-native';
import color from "../Config/Color";
import Chart from "../../images/svg/Chart";

import {alert} from "../Auth/AlertLogin";
import {statsPartyInApi} from "../../API/PartyAPI";


export default class PartyHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: <Text style={styles.text}>Waiting...</Text>, type: 'pie', stats: [],
            parties: {all: 0, home: 0, friend: 0, extern: 0, week: 0, month: 0}
        };
    }

    componentDidMount() {
        AsyncStorage.getItem('user').then((usr) => {
            usr = JSON.parse(usr);
            if (usr.id) {
                statsPartyInApi().then((stats) => {
                    this.setState({
                        chart: <Chart config={{width: 300, height: 400, chart: stats, type: this.state.type, user: usr}}/>,
                        stats: stats,
                        user: usr
                    });
                    //Alert.alert('stats', JSON.stringify(stats));
                    let usersById = [];
                    stats.map((user) => {
                        usersById[user.id] = user.name
                    });
                    usr = stats.find((el) => {
                        return el.id === usr.id
                    });
                    let parties = {all: usr.counter, home: 0, friend: 0, extern: 0, week: 0, month: 0};
                    let minDate = new Date(usr.dataPoints[0].x).getTime();
                    let maxDate = new Date(usr.dataPoints[0].x).getTime();
                    usr.dataPoints.map((data) => {
                        isNaN(data.z) ?
                            parties.extern++ :
                            parseInt(data.z) === usr.id ? parties.home++ : parties.friend++;
                        let date = new Date(data.x);
                        minDate > date ? minDate = date : null;
                        maxDate < date ? maxDate = date : null;
                        /*
                        month[`${date.toISOString().substring(0, 7)}`] ?
                            month[`${date.toISOString().substring(0, 7)}`].counter++ :
                            month[`${date.toISOString().substring(0, 7)}`].counter = 1;
                        */
                    });
                    let deltaDate = (maxDate - minDate) / 86400000;
                    parties.month = Math.floor((usr.counter / (deltaDate/30)) * 10) / 10;
                    parties.week = Math.floor((usr.counter / (deltaDate/7)) * 10) / 10;
                    this.setState({
                        parties: parties,
                    });
                })
            } else {
                alert(JSON.stringify(usr));
            }
        })
    }

    render() {
        let checkbox = [];
        for (let type of ['box', 'line', 'pie']) {
            checkbox.push(<Text style={styles.text}>{type[0].toUpperCase() + type.slice(1)}</Text>);
            checkbox.push(<CheckBox
                value={this.state.type === type}
                onValueChange={() => {
                    this.setState({
                        type: type,
                        chart: <Chart config={{width: 300, height: 400, chart: this.state.stats, type: type, user: this.state.user}}/>,
                    })
                }}
            />);
        }
        return (
            <ScrollView style={styles.main_container}>
                <View style={styles.container}>
                    <View style={styles.row}>
                        {checkbox}
                    </View>
                    {this.state.chart}
                    <View>
                        <Text style={styles.text}>Nombre de soirées totales : {this.state.parties.all}</Text>
                        <Text style={styles.text}>Vos soirées : </Text>
                        <View>
                            <Text style={styles.text}>- A la maison : {this.state.parties.home}</Text>
                            <Text style={styles.text}>- Chez des potes : {this.state.parties.friend}</Text>
                            <Text style={styles.text}>- En exterieur : {this.state.parties.extern}</Text>
                        </View>
                        <Text style={styles.text}>Moyenne par semaine : {this.state.parties.week}</Text>
                        <Text style={styles.text}>Moyenne par mois : {this.state.parties.month}</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    main_container: {
        width: '100%',
        height: '100%',
        backgroundColor: color.displayColor
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: color.mainColor,
        padding: 11,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3,
    },
    buttonText: {
        color: 'white'
    },
    party: {
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    day: {
        backgroundColor: 'white',
        flexDirection: 'row',
        width: '100%',
    },
    day_container: {
        backgroundColor: color.displayColor,
        height: 80,
        width: '80%',
        borderRadius: 5,
        padding: 10,
        marginTop: 17,
        justifyContent: 'center',
    },
    hour_day: {
        fontWeight: 'bold',
        fontSize: 18,
        color: color.fontTitleColor
    },
    text: {
        color: color.fontColor
    }
});
