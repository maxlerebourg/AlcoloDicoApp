import Svg, {Path} from 'react-native-svg';
import React from "react";
import color from "../../components/Config/Color";

export default class Play extends React.Component {
    render() {
        let config = this.props.config;
        return (<Svg xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 350 350"
                     height={config && config.height ? config.height+"pt" : "30pt"}
                     width={config && config.width ? config.width+"pt" : "30pt"}
                     >
            <Path fill={config && config.color ? config.color : color.fontTitleColor} d="M175,0C78.343,0,0,78.343,0,175c0,96.656,78.343,175,175,175c96.656,0,175-78.344,175-175C350,78.343,271.656,0,175,0z
                 M258.738,189.05l-104.386,71.812c-2.904,1.989-6.284,3.006-9.673,3.006c-2.728,0-5.436-0.648-7.93-1.951
                c-5.605-2.965-9.125-8.777-9.125-15.103V103.188c0-6.326,3.52-12.139,9.125-15.104c5.605-2.94,12.377-2.535,17.603,1.055
                l104.386,71.811c4.619,3.18,7.387,8.441,7.387,14.05C266.125,180.609,263.358,185.87,258.738,189.05z"/>
        </Svg>)
    }
}
