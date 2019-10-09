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
    AsyncStorage
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import {LocaleConfig, Agenda} from 'react-native-calendars';
import {createPartyInApi, cancelPartyInApi, myPartyByMonthInApi} from "../../API/PartyAPI";
import color from "../Config/Color";
import {alert} from "../Auth/AlertLogin";
import Stats from "../../images/svg/Stats";


export default class PartyHome extends React.Component {
    month = [];
    constructor(props) {
        super(props);

        LocaleConfig.locales['fr'] = {
            monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
            dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
            dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.']
        };
        LocaleConfig.defaultLocale = 'fr';

        this.state = {parties: {}, marks: {}, date: '', refreshing: false};
    }

    _createParty() {
        AsyncStorage.getItem('user', '').then((user) => {
            if (JSON.parse(user).pseudo && this.state.date !== '') {
                createPartyInApi({date: this.state.date}).then((data) => {
                    data[0].user = user;
                    data[0].user.firstname = 'moi';
                    Alert.alert('Soirée crée', 'Votre soirée du '+data[0].date.substring(0,10)+' à été ajoutée.');
                    this.props.navigation.navigate('PartyDetail', {
                        party: data[0],
                        title: ('Ma soirée du ' + data[0].date.substring(0, 10)),
                        user: user,
                    });
                });
            }
        }).catch(() => {
            alert('Va te connecter !', this);
        });
    }
    _removeParty = (item) => {
        if (item.mine) {
            Alert.alert(
                'Alerte',
                'Voulez vous supprimer cette soirée ?',
                [{
                            text: 'Annuler',
                            onPress: () => {
                        }}, {
                            text: 'Supprimer', onPress: () => {
                                cancelPartyInApi(item.party.id).then(() => {
                                    //Alert.alert('date', item.party.date.substring(0,10));
                                    this._myParty(item.party.date.substring(0,10), true);
                                });
                        }}], {cancelable: false});
        }
    };
    _myParty(day, remake) {
        AsyncStorage.getItem('user', '').then((user) => {
            let month = new Date(day);
            let time = new Date(month.getFullYear(), month.getMonth(), 1).getTime();
            if ((this.month.indexOf(time) < 0 || remake) && JSON.parse(user).pseudo) {
                this.month.push(time);
                myPartyByMonthInApi(day).then((data) => {
                    let date = new Date(day);
                    let parties = this.state.parties;
                    let marks = this.state.marks;
                    for (let i = 0; i < 32; i++) {
                        const strTime = new Date(date.getFullYear(), date.getMonth(), i).toISOString().substring(0, 10);
                        parties[strTime] = [{}];
                        marks[strTime] = {marked: false};
                    }
                    for (let i of data) {
                        if (!parties[i.date.substring(0, 10)].party) {
                            parties[i.date.substring(0, 10)] = [];
                        }
                        parties[i.date.substring(0, 10)].push({
                            mine: (i.user ? i.user.pseudo === JSON.parse(user).pseudo : false),
                            party: i,
                        });
                        marks[i.date.substring(0, 10)] = {
                            marked: true,
                            dotColor: i.location ? 'green' : (i.user && i.user.pseudo === JSON.parse(user).pseudo ? 'white' : 'red'),
                        }
                    }
                    this.setState({refreshing: false, marks: marks, parties: parties, user: JSON.parse(user)});
                });

            }
        }).catch(() => {
            alert("Vous n'êtes pas connecté.", this);
            this.setState({refreshing: false});
        });
    }
    _goToPartyDetail = (item) => {
        this.props.navigation.navigate('PartyDetail', {
            party: item.party,
            title: ('Ma soirée du ' + item.party.date.substring(0, 10)),
            user: this.state.user
        });

    };

    render() {
        let date = new Date();
        return (
            <View style={styles.main_container}>
                <View style={styles.date_container}>
                    <DatePicker
                        style={{width: 200}}
                        date={this.state.date} //initial date from state
                        mode="datetime" //The enum of date, datetime and time
                        placeholder="Choisi ta date"
                        format="YYYY-MM-DD HH:mm"
                        minDate={new Date(new Date().getTime() - 86400000)}
                        confirmBtnText="Ok"
                        cancelBtnText="Annuler"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36,
                                backgroundColor: color.fontEditColor
                            }
                        }}
                        onDateChange={(date) => {
                            this.setState({date: date})
                        }}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this._createParty()}>
                        <Text style={styles.buttonText}>Organiser</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{marginLeft: 10}}
                        onPress={() => this.props.navigation.navigate('PartyStats')}>
                        <Stats  />
                    </TouchableOpacity>
                </View>
                <Agenda
                    style={{backgroundColor: color.displayColor}}
                    firstDay={1}
                    current={date}
                    markedDates={this.state.marks}
                    loadItemsForMonth={(day) => {
                        this.setState({refreshing: true}, this._myParty(day.dateString.substring(0, 10)));

                    }}
                    onDayPress={(day) => {
                        let date = new Date(day.year, day.month - 1, day.day, 22, 0, 0);
                        if (new Date().getTime() - 86400000 < date) this.setState({date: date});
                    }}
                    renderItem={(item) => {return (<DayItem item={item} goParty={this._goToPartyDetail} removes={this._removeParty}/>)}}
                    renderEmptyData={() => {return (<View/>)}}
                    rowHasChanged={(r1, r2) => {return r1.name !== r2.name;}}
                    items={this.state.parties}
                    theme={{
                        backgroundColor: color.backColor,
                        calendarBackground: color.displayColor,
                        todayTextColor: color.fontColor,
                        dayTextColor: color.fontColor,
                        monthTextColor: color.fontTitleColor,
                    }}
                />
            </View>
        );
    }
}

export class DayItem extends React.Component {
    render() {
        let {item, goParty, removes} = this.props;
        let dateParty = new Date(item.party ? item.party.date : '');
        return item.party ?
        <TouchableOpacity
            onPress={() => {goParty(item)}}
            onLongPress={() => {removes(item);}}>
            <View style={styles.day_container}>
                <Text
                    style={styles.hour_day}>{dateParty.getHours() + ' h ' + (dateParty.getMinutes() < 9 ? '0' : '') + dateParty.getMinutes()}</Text>
                <Text style={styles.text}>
                    {item.party.location ?
                        item.party.location :
                        (item.party.user ? 'Chez ' + item.party.user.firstname : 'Chez un no name')
                    }</Text>
            </View>
        </TouchableOpacity> : <View/>
    }
}

const styles = StyleSheet.create({
    main_container: {
        width: '100%',
        height: '100%',
        backgroundColor: color.displayColor
    },
    date_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
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
