import {createStackNavigator, createBottomTabNavigator, createAppContainer} from 'react-navigation';

import Home from './Home'
import Beer from './Tools/Beer'

import QuoteList from './Quote/QuoteList'
import QuoteDetail from './Quote/QuoteDetail'
import QuoteAdd from './Quote/QuoteAdd'

import PartyHome from './Party/PartyHome'
import PartyDetail from './Party/PartyDetail'
import PartyEdit from './Party/PartyEdit'
import PartyStats from './Party/PartyStats'

import CocktailList from './Cocktail/CocktailList'
import CocktailDetail from './Cocktail/CocktailDetail'

import GameList from './Game/GameList'
import GameListHorizontal from "./Game/GameListHorizontal";
import GameListCategory from "./Game/GameListCategory";
import GameSearch from './Game/GameSearch'
import GameDetail from './Game/GameDetail'
import AddOrEdit from './Game/AddOrEditGame'

import Login from './Auth/Login'
import Register from './Auth/Register'
import Tools from './Tools/Tools'

import Kinito from './Games/Kinito'
import Biskit from './Games/Biskit'
import Bus from './Games/Bus'
import PMU from './Games/PMU'
import TwoCaps from './Games/TwoCaps'
import Fuck from './Games/Fuck'
import Shifumi from './Games/Shifumi'
import NeverHave from './Games/NeverHave'
import WorldTour from './Games/WorldTour'
import SpaceTeam from "./Games/SpaceTeam";

import React from "react"

import color from "./Config/Color";
import List from "../images/svg/List";
import Tool from "../images/svg/Tool";
import Homes from "../images/svg/Home";


const styles = {
    bottom_tab: {
        height: 45,
        backgroundColor: color.displayColor
    },
    header_tab: {
        backgroundColor: color.displayColor,
        height: 45,
    }
};

const getTabBarIcon = (navigation, focused, tintColor) => {
    const {routeName} = navigation.state;
    if (routeName === 'Game') {
        return <List config={{color: tintColor, height: 25, width: 25}}/>
    } else if (routeName === 'Home') {
        return <Homes config={{color: tintColor,  empty: !focused}}/>
    } else if (routeName === 'Tools') {
        return <Tool config={{color: tintColor, empty: !focused}}/>
    }

    // You can return any component that you like here!
    //return <IconComponent name={iconName} type={'ionicon'} size={25} color={tintColor}/>;
};
const HomeStackNavigator = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'Accueil'
        }
    },
    Beer: {
        screen: Beer,
        navigationOptions: {
            title: 'Bière du jour'
        }
    },
    PartyHome: {
        screen: PartyHome,
        navigationOptions: {
            title: 'Mes soirées'
        }
    },
    PartyEdit: {
        screen: PartyEdit,
        navigationOptions: {
            title: 'Modification'
        }
    },
    PartyDetail: {
        screen: PartyDetail,
    },
    PartyStats: {
    screen: PartyStats,
        navigationOptions: {
        title: 'Mes statistiques'
    }
},
    CocktailList: {
        screen: CocktailList,
        navigationOptions: {
            title: 'Cocktails'
        }
    },
    CocktailDetail: {
        screen: CocktailDetail
    },
    Login: {
        screen: Login,
        navigationOptions: {
            title: 'Utilisateur'
        }
    },
    Register: {
        screen: Register,
        navigationOptions: {
            title: 'Inscription'
        }
    },
    QuoteList: {
        screen: QuoteList,
        navigationOptions: {
            title: 'Momentums'
        }
    },
    QuoteDetail: {
        screen: QuoteDetail,
        navigationOptions: {
            title: 'Délire de soirée'
        }
    },
    QuoteAdd: {
        screen: QuoteAdd,
        navigationOptions: {
            title: 'Ajout de votre anecdote'
        }
    },
}, {
    defaultNavigationOptions: {
        headerTintColor: color.fontTitleColor,
        headerStyle: styles.header_tab,
    }
});
const GameStackNavigator = createStackNavigator({
    GameListHorizontal: {
        screen: GameListHorizontal,
        navigationOptions: {
            title: 'Jeux d\'alcool'
        }
    },
    GameListCategory: {
        screen: GameListCategory,
    },
    GameList: {
        screen: GameList,
        navigationOptions: {
            title: 'Jeux d\'alcool'
        }
    },
    GameDetail: {
        screen: GameDetail
    },
    GameSearch: {
        screen: GameSearch,
        navigationOptions: {
            title: 'Chercher un jeu'
        }
    },
    AddOrEdit: {
        screen: AddOrEdit,
        navigationOptions: {
            title: 'Proposer'
        }
    },
    Kinito: {
        screen: Kinito,
        navigationOptions: {
            title: 'Kinito'
        }
    },
    Biskit: {
        screen: Biskit,
        navigationOptions: {
            title: 'Biskit'
        }
    },
    Bus: {
        screen: Bus,
        navigationOptions: {
            title: 'Bus'
        }
    },
    PMU: {
        screen: PMU,
        navigationOptions: {
            title: 'PMU'
        }
    },
    TwoCaps: {
        screen: TwoCaps,
        navigationOptions: {
            title: '2Caps'
        }
    },
    NeverHave: {
        screen: NeverHave,
        navigationOptions: {
            title: 'Je n\'ai jamais'
        }
    },
    WorldTour: {
        screen: WorldTour,
        navigationOptions: {
            title: 'Tour du Monde'
        }
    },
    Fuck: {
        screen: Fuck,
        navigationOptions: {
            title: 'Fuck'
        }
    },
    Shifumi: {
        screen: Shifumi,
        navigationOptions: {
            title: 'Shifumi'
        }
    },
    SpaceTeam: {
        screen: SpaceTeam,
            navigationOptions: {
            title: 'SpaceTeam'
        }
    },
}, {
    defaultNavigationOptions: {
        headerTintColor: color.fontTitleColor,
        headerStyle: styles.header_tab,
    }
});

const App = createBottomTabNavigator(
    {
        Game: {
            screen: GameStackNavigator,
            navigationOptions: {
                title: 'Jeux'
            }
        },
        Home: {
            screen: HomeStackNavigator,
            navigationOptions: {
                title: 'Accueil'
            }
        },
        Tools: {
            screen: Tools,
            navigationOptions: {
                title: 'Outils'
            }
        }
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, tintColor}) =>
                getTabBarIcon(navigation, focused, tintColor),
        }),
        tabBarOptions: {
            activeTintColor: color.mainColor,
            inactiveTintColor: 'gray',
            style: styles.bottom_tab,
            showLabel: false,
        },
    },
);


export default createAppContainer(App)