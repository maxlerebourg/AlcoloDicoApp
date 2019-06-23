import Svg, {Path, Rect} from 'react-native-svg';
import React from "react";
import color from "../../components/Config/Color";

export default class Info extends React.Component {
    render() {
        return (
            <Svg xmlns="http://www.w3.org/2000/svg" height="30pt" width="30pt" viewBox="0 0 32 32">
                <Path fill={color.fontColor} d="M16,31A15,15,0,1,1,31,16,15,15,0,0,1,16,31ZM16,3A13,13,0,1,0,29,16,13,13,0,0,0,16,3Z"/>
                <Rect fill={color.fontColor} height="9" width="2" x="15" y="14"/>
                <Path fill={color.fontColor} d="M16,12a2,2,0,1,1,2-2A2,2,0,0,1,16,12Zm0-2Z"/>
            </Svg>)
    }
}
