import React from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text,
    Alert,
    Animated,
    Easing,
} from "react-native";
import color from "../Config/Color";


const nb_carte = 5;

export default class Bus extends React.Component {
    pioche = [];
    inGame = [];
    img_i = 0;


    constructor(props) {
        super(props);
        this.appear = new Animated.Value(0.3);

        for (let i of ['h', 's', 'd', 'c']) {
            for (let j = 2; j < 14; j++) {
                this.pioche.push({value: j, url: 'https://images.max.hanotaux.fr/cards/' + j + i + '.png'})
            }
        }
        for (let i = 0; i < nb_carte; i++) {
            let rand = Math.floor(Math.random() * this.pioche.length);
            this.inGame[i] = [];
            this.inGame[i].push(this.pioche[rand]);
            this.pioche.splice(rand, 1);
        }
        let img = [];
        for (let i = 0; i < nb_carte; i++) {
            img[i] = [];
            if (i !== nb_carte - 1)
                img[i].push(
                    <View style={styles.view_card}>
                        <Image key={i}
                               source={{uri: this.inGame[i][this.inGame[i].length - 1].url}}
                               style={styles.card}/>
                    </View>);
            else img[i].push(
                <View style={styles.view_card}>
                    <Image key={i}
                           source={{uri: 'https://images.max.hanotaux.fr/cards/dos.png'}}
                           style={styles.card}/>
                </View>);
        }
        this.state = {img: img}
    }

    _reverse() {
        this.appear.setValue(0.1);
        Animated.sequence([
            Animated.delay(2000),
            Animated.spring(
                this.appear,
                {
                    toValue: 1
                })
        ]).start();
    }

    _setImage() {
        let img = this.state.img;
        if (this.inGame[this.img_i].length > 1 && this.img_i !== nb_carte - 1)
            img[this.img_i] = (
                <View style={styles.view_card}>
                    <Image key={this.img_i}
                           source={{uri: this.inGame[this.img_i][this.inGame[this.img_i].length - 2].url}}
                           style={styles.card}/>
                    <Image key={this.img_i + nb_carte + 1}
                           source={{uri: this.inGame[this.img_i][this.inGame[this.img_i].length - 1].url}}
                           style={styles.card_supp}/>
                </View>);
        else if (this.img_i !== nb_carte - 1)
            img[this.img_i] = (
                <View style={styles.view_card}>
                    <Image key={this.img_i}
                           source={{uri: this.inGame[this.img_i][this.inGame[this.img_i].length - 1].url}}
                           style={styles.card}/>
                </View>);
        else img[this.img_i] = (
                <View style={styles.view_card}>
                    <Image key={this.img_i}
                                    source={{uri: this.inGame[this.img_i][this.inGame[this.img_i].length - 2].url}}
                                    style={styles.card}
                    />
                    <Animated.Image key={this.img_i + nb_carte}
                                    source={{uri: this.inGame[this.img_i][this.inGame[this.img_i].length - 1].url}}
                                    style={[styles.card_supp, {transform: [{scale: this.appear}] }]}
                    />

                </View>);
        return img;
    }

    async plusOuMoins(bool) {
        if (this.pioche.length !== 0 && this.img_i < nb_carte) {
            let rand = Math.floor(Math.random() * this.pioche.length);
            let img = [];
            if ((bool && this.inGame[this.img_i][this.inGame[this.img_i].length - 1].value <= this.pioche[rand].value) ||
                (!bool && this.inGame[this.img_i][this.inGame[this.img_i].length - 1].value >= this.pioche[rand].value)) {
                this.inGame[this.img_i].push(this.pioche[rand]);
                this.pioche.splice(rand, 1);
                img = this._setImage();
                this.setState({img: img});
                if (this.img_i === nb_carte - 1)
                    this._reverse();
                this.img_i = this.img_i + 1;
            } else {
                this.inGame[this.img_i].push(this.pioche[rand]);
                this.pioche.splice(rand, 1);
                img = this._setImage();
                this.setState({img: img});
                if (this.img_i === nb_carte - 1) {
                    this._reverse();
                    setTimeout(()=>{
                        this.inGame[nb_carte - 1].push(this.pioche[rand]);
                        this.pioche.splice(rand, 1);
                        img[nb_carte - 1] = (
                            <View style={styles.view_card}>
                                <Image key={nb_carte - 1}
                                       source={{uri: this.inGame[nb_carte - 1][this.inGame[nb_carte - 1].length - 2].url}}
                                       style={styles.card}/>
                                <Image key={nb_carte - 1 + nb_carte}
                                       source={{uri: 'https://images.max.hanotaux.fr/cards/dos.png'}}
                                       style={styles.card_supp}/>
                            </View>);
                        this.setState({img: img})},
                        3000);
                }
                this.img_i = 0;
            }

        } else {
            if (this.pioche.length === 0) this.setState({img: <Text> Il n'y a plus de cartes. Pas de chance.</Text>});
            if (this.img_i >= nb_carte) this.setState({img: <Text style={styles.text}> Et c'est gagné !</Text>});
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                <TouchableOpacity
                    disabled={this.state.i <= 0}
                    style={styles.submitButton}
                    onPress={() => {
                        this.plusOuMoins(false)
                    }}>
                    <View style={[styles.buttons, {top: 100 / nb_carte * this.img_i + '%'}]}>
                        <Text style={styles.text}>-</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.container}>
                    {this.state.img}
                </View>
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => {
                        this.plusOuMoins(true)
                    }}>
                    <View style={[styles.buttons, {top: 100 / nb_carte * this.img_i + '%'}]}>
                        <Text style={styles.text}>+</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: '100%',
        justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: color.cardBoard,
        flexDirection: 'row'
    },
    container: {
        height: '100%',
    },
    view_card: {
        width: 100,
        height: 100 / nb_carte + '%',
        justifyContent: 'center',
    },
    card_supp: {
        width: '90%',
        height: '95%',
        right: '0%',
        resizeMode: 'center',
        position: 'absolute',
        //rotation: Math.rand(),
    },
    card: {
        width: '90%',
        height: '95%',
        left: '0%',
        resizeMode: 'center',
    },
    submitButton: {
        height: '100%',
        width: '30%',
        //justifyContent: 'center',
        alignItems: 'center',
    },
    buttons: {
        height: 100/nb_carte + '%',
        width: 70,
        backgroundColor: color.mainColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white'
    }
});