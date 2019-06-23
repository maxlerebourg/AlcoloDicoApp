import React from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity, Linking} from 'react-native'

import color from "../Config/Color";

export default class QuoteItem extends React.Component {
    render() {
        const {quote} = this.props;
        let date = new Date(new Date().getTime() - new Date(quote.date).getTime());
        let ago = Math.floor(date.getTime() / 86400000);

        return (
            <View style={styles.main_container}>
                <View style={styles.container}>
                    <TouchableOpacity
                        activeOpacity={ quote.link ? 0.2 : 1 }
                        onPress={() => {(quote.link ? Linking.openURL(quote.link)
                            .catch((err) => console.error('An error occurred', err)) : null)}}>
                        <Text style={styles.text}>{quote.quote}</Text>
                        {quote.link ? <Text style={styles.link}>{quote.link}</Text> : null}
                    </TouchableOpacity>
                    <View style={styles.footer}>
                        <Text style={styles.title_text}>#{quote.id}</Text>
                        <View style={styles.plus}>
                            <Text style={styles.title_text}>{quote.rate}</Text>
                            <TouchableOpacity
                                style={styles.icon}
                                onPress={() => {this.props.addRate(quote.id)}}>
                                <Text style={styles.title_text}> + </Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.title_date}>{ago < 1 ? 'Aujourd\'hui' : 'Il y a '+ago+' jours'}</Text>
                    </View>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        width: '100%',
        backgroundColor: color.backColor,
        padding: 5,
    },
    container: {
        backgroundColor: color.displayColor,
        paddingTop: 10,
        paddingRight: 10,
        paddingLeft: 10,
        borderRadius: 15,
        overflow: 'hidden',
    },
    plus: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
    },
    footer: {
        width: '100%',
        flexDirection: 'row',
    },
    title_text: {
        color: color.fontColor,
        flexWrap: 'nowrap',
        fontWeight: 'bold',
    },
    title_date: {
        marginTop: 4,
        color: color.fontColor,
        fontSize: 10,
    },
    text: {
        color: color.fontTitleColor,
        fontSize: 18,
        marginBottom: 5,
    },
    link: {
        color: color.fontLinkColor,
        fontSize: 10,
        marginBottom: 5,
    },
    icon: {
        width: 20,
        height: 20,
    }
});