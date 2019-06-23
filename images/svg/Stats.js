import Svg, {Path, Polyline, Rect} from 'react-native-svg';
import React from "react";

export default class Stats extends React.Component {
    render() {
        let config = this.props.config;
        return (<Svg xmlns="http://www.w3.org/2000/svg"
                     height={config && config.height ? config.height+"pt" : "30pt"}
                     width={config && config.width ? config.width+"pt" : "30pt"}
                     viewBox="0 0 496 496">
                    <Path fill={'#719FA3'} d="M496,428c0,6.4-5.6,12-12,12H12c-6.4,0-12-5.6-12-12l0,0c0-6.4,5.6-12,12-12h472
	                    C490.4,416,496,421.6,496,428L496,428z"/>
                    <Rect x="24" y="56" fill={'#1589AD'} width="88" height="344"/>
                    <Polyline fill={'#04567F'} points="24,56 112,56 112,400 "/>
                    <Rect x="144" y="128" fill={'#24966A'} width="88" height="272"/>
                    <Polyline fill={'#007763'} points="144,128 232,128 232,400 "/>
                    <Rect x="264" y="208" fill={'#E8961F'} width="88" height="192"/>
                    <Polyline fill={'#E57520'} points="264,208 352,208 352,400 "/>
                    <Rect x="384" y="272" fill={'#D32A0F'} width="88" height="128"/>
                    <Polyline fill={'#AF1909'} points="384,272 472,272 472,400 "/>
                </Svg>)
    }
}
