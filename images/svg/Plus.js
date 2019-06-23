import Svg, {Path} from 'react-native-svg';
import React from "react";
import color from "../../components/Config/Color";

export default class Plus extends React.Component {
    render() {
        let config = this.props.config;
        return (<Svg xmlns="http://www.w3.org/2000/svg"
                     height={config && config.height ? config.height+"pt" : "30pt"}
                     width={config && config.width ? config.width+"pt" : "30pt"} viewBox="0 0 357 357">
            <Path fill={config && config.color ? config.color : color.fontTitleColor} d="M357,204H204v153h-51V204H0v-51h153V0h51v153h153V204z"/>
        </Svg>)
    }
}
