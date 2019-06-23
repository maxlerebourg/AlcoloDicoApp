import React from 'react'
import {
    StyleSheet,
    Text,
    Image,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native'
import {getImageFromApi} from "../../API/CocktailAPI";
import RecipeSvg from '../../images/svg/Recipe';
import IngredientSvg from '../../images/svg/Ingredient';

import color from "../Config/Color";

export default class CocktailDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {img: 0}
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('title'),
        };
    };

    componentDidMount() {
        setTimeout(() => {this.scroll.scrollTo({y:500,animated:true})}, 300);
    }

    render() {
        let cock = this.props.navigation.state.params.cock;
        let recipes = cock.recipe.split('.');
        recipes = recipes.slice(0, recipes.length);
        for (let i = 0; i < recipes.length; i++) {
            recipes[i] = recipes[i].trim() + '.\n';
            if (recipes[i] === '.\n') recipes.splice(i, 1);
        }
        let ingredients = cock.ingredients.split('.');
        ingredients = ingredients.slice(0, ingredients.length);
        for (let i = 0; i < ingredients.length; i++) {
            ingredients[i] = ingredients[i].trim() + '.\n';
            if (ingredients[i] === '.\n') ingredients.splice(i, 1);
        }

        return (
            <View style={styles.main_container}>
                <Image
                    style={styles.image}
                    source={{uri: getImageFromApi(cock.images.split(',')[this.state.img])}}
                />
                <View style={styles.scroll}>
                    <ScrollView ref={(view) => {this.scroll = view}}>
                        <View style={styles.content_container}>
                            <View style={[styles.section_container, {marginTop: 500}]}>
                                <View style={styles.section}>
                                    <IngredientSvg/>
                                    <Text style={styles.title_section}>Ingrédients nécessaires</Text>
                                </View>
                                <Text style={styles.text}>
                                    {ingredients}
                                </Text>
                            </View>
                            <View style={styles.section_container}>
                                <View style={styles.section}>
                                    <RecipeSvg/>
                                    <Text style={styles.title_section}>Recette</Text>
                                </View>
                                <Text style={styles.text}>
                                    {recipes}
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        width: '100%',
        height: '100%',
        backgroundColor: color.backColor
    },
    container: {
        width: '33%',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scroll: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        flex: 1
    },
    star: {
        flexDirection: 'row',
        margin: 4,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content_container: {
        padding: 10,
    },
    image: {
        height: '100%',
        resizeMode: 'cover'
    },
    /*rules_text: {
        padding: 10
    },*/
    aleatoire: {
        position: 'absolute',
        right: '0%',
        bottom: '0%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.mainColor,
        padding: 10,
        borderTopLeftRadius: 3
    },
    submitButtonText: {
        color: 'white',
    },
    section_container: {
        /*borderColor: '#ccc',
        borderTopWidth: 1,
        borderLeftWidth: 1,*/
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        padding: 5,
        paddingRight: 10,
        paddingLeft: 10,
        margin: 1,
        backgroundColor: color.displayColor,
    },
    section: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    title_section: {
        color: color.fontTitleColor,
        width: '70%',
        fontSize: 15,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 25,
        marginRight: 25,
        borderBottomWidth: 1,
        borderColor: color.fontColor,
        fontWeight: 'bold',
    },
    icon: {
        right: '10%',
    },
    text:{
        color: color.fontColor,
    }
});