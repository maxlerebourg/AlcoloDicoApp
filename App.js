import React from 'react'
import Navigation from './components/Navigation'
import * as firebase from "react-native-firebase";
import {AsyncStorage} from "react-native";
import {NotificationTokenToApi} from "./API/ToolsAPI";


export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        firebase.messaging().getToken()
            .then((fcmToken) => {
                if (fcmToken) {
                    AsyncStorage.getItem("user")
                        .then((user) => {
                            if (user){
                                AsyncStorage.getItem("notification_id")
                                    .then((token) => {
                                        if (token !== fcmToken) {
                                            NotificationTokenToApi(fcmToken)
                                                .then((rep) => {
                                                    if (rep.status === 'ok')
                                                        AsyncStorage.setItem("notification_id", fcmToken)
                                                })
                                        }
                                    }).catch(() => {
                                    NotificationTokenToApi(fcmToken)
                                        .then((rep) => {
                                            if (rep.status === 'ok')
                                                AsyncStorage.setItem("notification_id", fcmToken)
                                        })
                                });
                            }
                        });
                }
            });
    }


    render() {
        return (
            <Navigation/>
        )
    }
}