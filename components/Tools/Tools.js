import {
    View,
    ScrollView,
    StyleSheet,
    Text,
} from "react-native";
import Chrono from './Chronometer'
import Counter from './Counter'
import React from "react";
import color from '../Config/Color'
import ScoreBoard from "./ScoreBoard";
import Rating from "./Rating";


export default class Tools extends React.Component {
    render() {
        return (
            <View style={styles.main_container}>
                <ScrollView>
                    <View style={{height: 10}}/>
                    <View style={styles.tool}><Text style={styles.text}>Tableau des scores</Text>
                        <ScoreBoard/>
                    </View>

                    <View style={styles.tool}><Text style={styles.text}>Chronomètre</Text>
                        <Chrono/>
                    </View>

                    <View style={styles.tool}><Text style={styles.text}>Compteur</Text>
                        <Counter/>
                    </View>

                    <View style={styles.tool}><Text style={styles.text}>Volume d'alcool</Text>
                        <Rating/>
                    </View>
                    <View style={{height: 10}}/>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    main_container: {
        backgroundColor: color.backColor,
        height: '100%'
    },
    tool: {
        padding: 10,
        margin: 10,
        backgroundColor: color.displayColor,
        borderRadius: 10,
        overflow: 'hidden',
    },
    text: {
        color: color.fontTitleColor,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 2
    }

});