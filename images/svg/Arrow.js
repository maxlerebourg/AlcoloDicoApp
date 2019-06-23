import Svg, {Path} from 'react-native-svg';
import React from "react";
import color from "../../components/Config/Color";

export default class Arrow extends React.Component {
    render() {
        let config = this.props.config;
        return (config.empty ?
            <Svg xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 401.998 401.998"
                 height={config && config.height ? config.height + "pt" : "30pt"}
                 width={config && config.width ? config.width + "pt" : "30pt"}>
                <Path fill={config && config.color ? config.color : color.fontTitleColor} d="M73.092,164.452h255.813c4.949,0,9.233-1.807,12.848-5.424c3.613-3.616,5.427-7.898,5.427-12.847
                    c0-4.949-1.813-9.229-5.427-12.85L213.846,5.424C210.232,1.812,205.951,0,200.999,0s-9.233,1.812-12.85,5.424L60.242,133.331
                    c-3.617,3.617-5.424,7.901-5.424,12.85c0,4.948,1.807,9.231,5.424,12.847C63.863,162.645,68.144,164.452,73.092,164.452z"/>
            </Svg> :
            <Svg xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 401.998 401.998"
                 height={config && config.height ? config.height + "pt" : "30pt"}
                 width={config && config.width ? config.width + "pt" : "30pt"}>
                <Path fill={config && config.color ? config.color : color.fontTitleColor} d="M328.905,237.549H73.092c-4.952,0-9.233,1.808-12.85,5.421c-3.617,3.617-5.424,7.898-5.424,12.847
                    c0,4.949,1.807,9.233,5.424,12.848L188.149,396.57c3.621,3.617,7.902,5.428,12.85,5.428s9.233-1.811,12.847-5.428l127.907-127.906
                    c3.613-3.614,5.427-7.898,5.427-12.848c0-4.948-1.813-9.229-5.427-12.847C338.139,239.353,333.854,237.549,328.905,237.549z"/>
            </Svg>)
    }
}
