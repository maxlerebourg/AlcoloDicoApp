import {AsyncStorage} from "react-native";


const server = 'max.hanotaux.fr';
//const server = '192.168.1.16';

export async function myPartyInApi (id) {
    const url = 'http://' + server + ':3000/party' + (id ? '/'+id : '');
    let user = await AsyncStorage.getItem('user', '');
    return fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': JSON.parse(user).token,
        }}).then(data => data.json());
}
export async function myPartyByMonthInApi (day) {
    const url = 'http://' + server + ':3000/party/month/' + day;
    let user = await AsyncStorage.getItem('user', '');
    return fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': JSON.parse(user).token,
        }}).then(data => data.json());
}
export async function createPartyInApi (json) {
    const url = 'http://' + server + ':3000/create/party';
    let user = await AsyncStorage.getItem('user', '');
    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept':       'application/json',
            'Content-Type': 'application/json',
            'Authorization': JSON.parse(user).token,
        },
        body: JSON.stringify(json)}).then(data => data.json());
}
export async function updatePartyInApi (id, json) {
    const url = 'http://' + server + ':3000/update/party/'+id;
    let user = await AsyncStorage.getItem('user', '');
    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept':       'application/json',
            'Content-Type': 'application/json',
            'Authorization': JSON.parse(user).token,
        },
        body: JSON.stringify(json)}).then(data => data.json());
}
export async function cancelPartyInApi (id) {
    const url = 'http://' + server + ':3000/cancel/party/'+id;
    let user = await AsyncStorage.getItem('user', '');
    return fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': JSON.parse(user).token,
        }}).then(data => data.json());
}
export async function addUserPartyInApi (json, id) {
    const url = 'http://' + server + ':3000/add/user/party/'+id;
    let user = await AsyncStorage.getItem('user', '');
    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept':       'application/json',
            'Content-Type': 'application/json',
            'Authorization': JSON.parse(user).token,
        },
        body: JSON.stringify(json)}).then(data => data.json());
}
export async function removeUserPartyInApi (json, id) {
    const url = 'http://' + server + ':3000/remove/user/party/'+id;
    let user = await AsyncStorage.getItem('user', '');
    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept':       'application/json',
            'Content-Type': 'application/json',
            'Authorization': JSON.parse(user).token,
        },
        body: JSON.stringify(json)}).then(data => data.json());
}
export async function addNotePartyInApi (json, id) {
    const url = 'http://' + server + ':3000/note/party/'+id;
    let user = await AsyncStorage.getItem('user', '');
    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept':       'application/json',
            'Content-Type': 'application/json',
            'Authorization': JSON.parse(user).token,
        },
        body: JSON.stringify(json)}).then(data => data.json());
}
export async function statsPartyInApi() {
    const url = 'http://' + server + ':3000/party/stat';
    let user = await AsyncStorage.getItem('user', '');
    return fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': JSON.parse(user).token,
        }}).then(data => data.json());
}
