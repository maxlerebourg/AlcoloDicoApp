import {AsyncStorage} from "react-native";


const server = 'max.hanotaux.fr';
//const server = '192.168.1.16';

export function getImageFromApi (url) {
    return 'https://images.' + server + '/party/'+url+'.jpg';
}
export function LogInApi (json) {
    const url = 'http://' + server + ':3000/login';
    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept':       'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)}).then(data => data.json());
}
export function RegisterInApi (json) {
    const url = 'http://' + server + ':3000/register';
    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept':       'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)}).then(data => data.json());
}
export async function NotificationTokenToApi(token) {
    const url = 'http://' + server + ':3000/notification_id/'+token;
    let user = await AsyncStorage.getItem('user');
    return fetch(url, {
        method: 'GET',
            headers: {
            'Authorization': JSON.parse(user).token,
        }}).then(data => data.json());
}
export function meteoFromApi () {
    const url = 'http://' + server + ':3000/meteo';
    return fetch(url).then(data => data.json());
}
export function beerFromApi () {
    const url = 'http://' + server + ':3000/beer';
    return fetch(url).then(data => data.json());
}
export function getListQuoteFromApi(cat, i, j){
    const url = 'http://' + server + ':3000/list/quote/'+cat+'/'+i+'/'+j;
    return fetch(url).then(data => data.json());
}
export async function postQuoteInApi(json){
    const url = 'http://' + server + ':3000/add/quote';
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
export async function addQuoteRateInApi(id){
    const url = 'http://' + server + ':3000/quote/'+id+'/plus';
    let user = await AsyncStorage.getItem('user', '');
    return fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': JSON.parse(user).token,
        }}).then(data => data.json());
}
export function searchUserInApi (name) {
    const url = 'http://' + server + ':3000/search/user/'+name;
    return fetch(url).then(data => data.json());
}

