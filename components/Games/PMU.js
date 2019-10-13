import React from "react";
import {
    StyleSheet,
    FlatList,
    View,
    TouchableOpacity,
    Image,
    Text,
    Alert,
    Animated,
    Easing,
} from "react-native";
import color from '../Config/Color';


export default class PMU extends React.Component {
    long = 5;
    haut = 7;
    lines = [3, 6, 9, 12];
    pioche = [];
    inGame = [];
    img_i = 0;
    url = 'https://images.max.hanotaux.fr/cards/';

    constructor(props) {
        super(props);

        this.appear = new Animated.Value(0);

        for (let i = 0; i < this.long; i++) {
            this.inGame.push([]);
            for (let j = 0; j < this.haut; j++) {
                this.inGame[i].push([]);
            }
        }

        let k = 0;
        let l = 1;
        for (let i of ['h', 's', 'd', 'c']) {
            for (let j = 1; j < 14; j++) {
                if (j !== 11) this.pioche.push({
                    id: k++,
                    signe: i,
                    value: j,
                    url: this.url + 'dos.png'
                });
                else
                    this.inGame[l++][0] = {
                        id: i,
                        signe: i,
                        value: 11,
                        url: this.url + '11' + i + '.png',
                };
            }
        }

        for (let i = 1; i < this.haut - 1; i++) {
            let rand = Math.floor(Math.random() * this.pioche.length);
            this.inGame[0][i] = this.pioche[rand];
            this.pioche.splice(rand, 1);
        }
        for (let i of this.lines){
            for (let j = 1; j < this.long; j++) {
                if (i < this.haut) {
                    let rand = Math.floor(Math.random() * this.pioche.length);
                    this.inGame[j][i] = this.pioche[rand];
                    this.pioche.splice(rand, 1);
                }
            }
        }


        this.state = {img: [], img_pick: this.url, height: 80 * 7};
    }

    _setImage() {
        let img = [];
        for (let i = 0; i < this.haut; i++) {
            for (let j = 0; j < this.long; j++) {
                if (this.inGame[j][i].url) {
                    img.push(this.inGame[j][i]);
                } else
                    img.push([]);
            }
        }
        this.setState({img: img});
    }
    _pioche() {
        let ok = false;
        try {
            let rand = Math.floor(Math.random() * this.pioche.length); //carte piochée
            for (let i = 0; i < this.haut; i++) {
                for (let j = 0; j < this.long; j++) {
                    for (let k of this.lines) {
                        if (this.pioche[rand].signe && this.inGame[j][i].id === this.pioche[rand].signe && !ok && k < this.haut) {
                            ok = true;
                            if ((i === k-1 || i === k-1) && this.inGame[j][i].signe === this.inGame[j][k].signe) {
                                // passe muraille
                                this.inGame[j][i + 2]       = this.inGame[j][i];
                                this.inGame[j][i + 1].url   = this.url + this.inGame[j][k].value + this.inGame[j][k].signe + '.png';
                                this.inGame[j][i]           = [];
                            } else if ((i === k-1 || i === k-1) && this.inGame[j][i].signe !== this.inGame[j][k].signe) {
                                // bloqued
                                let rand2 = Math.floor(Math.random() * this.pioche.length);
                                this.inGame[j][i - 1]       = this.inGame[j][i];
                                this.inGame[j][i + 1]       = this.pioche[rand2];
                                this.inGame[j][i]           = [];
                                this.pioche.splice(rand2, 1);
                            } else {
                                //avance normalement
                                this.inGame[j][i + 1]       = this.inGame[j][i];
                                this.inGame[j][i]           = [];
                            }
                        }
                    }
                }
            }
            this._setImage();
            this.setState({img_pick: this.url + this.pioche[rand].value + this.pioche[rand].signe + '.png'});

            this.appear.setValue(0);
            Animated.timing(
                this.appear,
                {
                    toValue: 1,
                    duration: 750,
                    easing: Easing.linear
                }).start();
            //this.pioche.splice(rand,1);
        } catch (error) {
        }
    }


    componentDidMount() {
        this._setImage();
    }

    render() {
        const opacity = this.appear.interpolate({
            inputRange: [0, 0.25, 1],
            outputRange: [0.0, 1.0, 0.0]
        });
        return (
            <View style={styles.main_container} onLayout={(event) => {
                const {x, y, width, height} = event.nativeEvent.layout;
                this.setState({height: height});
            }}>
                <Animated.Image source={{uri: this.state.img_pick}} style={[styles.card_pick, {opacity: opacity}]}/>
                <TouchableOpacity onPress={() => {
                    this._pioche()
                }}>

                    <FlatList
                        data={this.state.img}
                        renderItem={({item}) => (
                            <View style={styles.card_view}>
                                <Image fadeDuration={0}
                                       style={[styles.img, {height: this.state.height / 7}]}
                                       source={{uri: item.url}}/>
                            </View>
                        )}
                        //Setting the number of column
                        numColumns={5}
                        keyExtractor={(item) => item.id}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

const
    styles = StyleSheet.create({
        main_container: {
            height: '100%',
            width: '100%',
            backgroundColor: color.cardBoard,
        },
        card_view: {
            flex: 1,
            flexDirection: 'column',
        },
        img: {
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            resizeMode: 'contain',
        },
        card_pick: {
            height: '100%',
            width: '100%',
            padding: '10%',
            resizeMode: 'center',
            position: 'absolute',

        },
    });