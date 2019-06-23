import Svg, {Path} from 'react-native-svg';
import React from "react";
import color from "../../components/Config/Color";

export default class List extends React.Component {
    render() {
        let config = this.props.config;
        return (<Svg xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24"
                     height={config && config.height ? config.height+"pt" : "30pt"}
                     width={config && config.width ? config.width+"pt" : "30pt"}
                     >
            <Path fill={config && config.color ? config.color : color.fontTitleColor} d="M3,2H1C0.4,2,0,2.4,0,3v2c0,0.6,0.4,1,1,1h2c0.6,0,1-0.4,1-1V3C4,2.4,3.6,2,3,2z"/>
            <Path fill={config && config.color ? config.color : color.fontTitleColor} d="m3,10h-2c-0.6,0-1,0.4-1,1v2c0,0.6 0.4,1 1,1h2c0.6,0 1-0.4 1-1v-2c0-0.6-0.4-1-1-1z"/>
            <Path fill={config && config.color ? config.color : color.fontTitleColor} d="m3,18h-2c-0.6,0-1,0.4-1,1v2c0,0.6 0.4,1 1,1h2c0.6,0 1-0.4 1-1v-2c0-0.6-0.4-1-1-1z"/>
            <Path fill={config && config.color ? config.color : color.fontTitleColor} d="M23,2H9C8.4,2,8,2.4,8,3v2c0,0.6,0.4,1,1,1h14c0.6,0,1-0.4,1-1V3C24,2.4,23.6,2,23,2z"/>
            <Path fill={config && config.color ? config.color : color.fontTitleColor} d="m23,10h-14c-0.6,0-1,0.4-1,1v2c0,0.6 0.4,1 1,1h14c0.6,0 1-0.4 1-1v-2c0-0.6-0.4-1-1-1z"/>
            <Path fill={config && config.color ? config.color : color.fontTitleColor} d="m23,18h-14c-0.6,0-1,0.4-1,1v2c0,0.6 0.4,1 1,1h14c0.6,0 1-0.4 1-1v-2c0-0.6-0.4-1-1-1z"/>


        </Svg>)
    }
}
