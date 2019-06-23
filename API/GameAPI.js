import {AsyncStorage} from "react-native";

export function getImageFromApi (url) {
    return url;
}

const server = 'max.hanotaux.fr';
//const server = '192.168.1.16';


export function getListGameFromApi (text) {
    const url = 'http://' + server + ':3000/list/game' + (text ? '/'+text : 's');
    return fetch(url).then(data => data.json());
}
/*export function getRandomFromApi (text) {
    const url = 'http://' + server + ':3000/random' + (text ? '/'+text : '');
    return fetch(url).then(data => data.json());
}*/
export async function postGameInApi(json) {
    const url = 'http://' + server + ':3000/add/game';
    let user = await AsyncStorage.getItem('user', '');
    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': JSON.parse(user).token,
        },
        body: JSON.stringify(json)
    }).then(data => data.json());
}


export async function CommentInApi (json, id) {
    const url = 'http://' + server + ':3000/comment/game/'+id;
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
export function getCommentsFromApi (id) {
    const url = 'http://' + server + ':3000/comments/game/'+id;
    return fetch(url).then(data => data.json());
}