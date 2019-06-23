import Svg, {Path, Polygon} from 'react-native-svg';
import React from "react";
import color from "../../components/Config/Color";

export default class Cross extends React.Component {
    render() {
        let config = this.props.config;
        return (<Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 357 357"
                     height={config && config.height ? config.height+"pt" : "30pt"}
                     width={config && config.width ? config.width+"pt" : "30pt"}>
            <Polygon fill={config && config.color ? config.color : color.fontTitleColor} points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3 214.2,178.5 		"/>
        </Svg>)
    }
}
