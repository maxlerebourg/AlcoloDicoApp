import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    Alert,
    TouchableOpacity,
    Animated,
    ScrollView,
} from 'react-native';
import color from "../Config/Color";


export default class Beer extends React.Component {
    constructor(props) {
        super(props);
        this.beerAnim = new Animated.Value(0);
        let beer = this.props.navigation.state.params.beer;
        this.state = {beer: beer};
    }

    _anim() {
        this.beerAnim.setValue(0.3);
        Animated.spring(
            this.beerAnim, {
                toValue: 1,
                friction: 1
            }).start()
    }

    componentDidMount() {
        this._anim();
    }

    render() {
        //'https://s1.qwant.com/thumbr/0x380/2/e/ca32a9e700f08702a6f188bc46f42d88e625c288aaa922b3a70639de5bdb41/css-background-image-HD6-1.jpg?u=http%3A%2F%2Fhdimages.org%2Fwp-content%2Fuploads%2F2016%2F10%2Fcss-background-image-HD6-1.jpg&q=0&b=1&p=0&a=1'
        return (
            <View style={styles.main_container}>
                <View style={styles.img}>
                    <TouchableOpacity activeOpacity={1} onPress={() => {
                        this._anim()
                    }}>
                        <Image
                            style={styles.img_background}
                            source={{uri: 'https://milesandlove.com/system/attachments/6018/xxlarge/paysage-normand.jpg?1556646490'}}
                        />
                        <Animated.Image
                            style={[styles.image, {transform: [{scale: this.beerAnim}]}]}
                            source={{uri: this.state.beer.images}}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.info_container}>
                    <View style={styles.row}>
                        <Text style={styles.title}>{this.state.beer.name}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.text}>Point de vente : {this.state.beer.origin ? this.state.beer.origin : 'Partout' }
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.text}>Brasserie : {this.state.beer.brand}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.text}>Prix : ~ {this.state.beer.price} €</Text>
                        <Text style={styles.text}>Alcool : {this.state.beer.alcohol} %</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: color.backColor,
    },
    img: {
        height: '70%',
        width: '100%',
    },
    image: {
        top: 60,
        height: '75%',
        width: '100%',
        resizeMode: 'contain',
        position: 'absolute',
    },
    img_background: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
    info_container: {
        width: '100%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        height: '25%',
        width: '100%',
        flexDirection: 'row',
    },
    title: {
        flex: 1,
        textAlign: 'center',
        color: color.fontTitleColor,
        fontSize: 20,
        fontWeight: 'bold',
    },
    text: {
        flex: 1,
        textAlign: 'center',
        color: color.fontColor,
        fontSize: 15,
    }
});
