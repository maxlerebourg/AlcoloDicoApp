import Svg, {Path, Circle} from 'react-native-svg';
import React from "react";
import color from "../../components/Config/Color";

export default class Hess extends React.Component {
    render() {
        return (color.iconColored ?
            <Svg xmlns="http://www.w3.org/2000/svg" height="30pt" width="30pt" viewBox="-5 -5 68 58">
                <Path fill={'#EBBA16'} d="M44,18.394v21.141c0,2.722-2.207,4.929-4.929,4.929L22,44.535l-10,11v-11H4.929 C2.207,44.535,0,42.328,0,39.606l0-21.141c0-2.722,2.207-4.929,4.929-4.929l34.141-0.071C41.793,13.465,44,15.672,44,18.394z"/>
                <Path fill={'#ED8A19'} d="M53.071,2.535l-34.141-0.07C16.207,2.465,14,4.672,14,7.394v6.122l25.071-0.052 c2.722,0,4.929,2.207,4.929,4.93v18.441l7,7.7v-11h2.071c2.722,0,4.929-2.207,4.929-4.929V7.465 C58,4.742,55.793,2.535,53.071,2.535z"/>
                <Circle fill={'#FFFFFF'} cx="11" cy="29.45" r="3"/>
                <Circle fill={'#FFFFFF'} cx="22" cy="29.45" r="3"/>
                <Circle fill={'#FFFFFF'} cx="33" cy="29.45" r="3"/>
            </Svg>
            :
            <Svg height="30pt" width="30pt" viewBox="-5 -5 42 42" xmlns="http://www.w3.org/2000/svg">
                <Path fill={color.fontColor} d="M24,22a1,1,0,0,1-.64-.23L18.84,18H17A8,8,0,0,1,17,2h6a8,8,0,0,1,2,15.74V21a1,1,0,0,1-.58.91A1,1,0,0,1,24,22ZM17,4a6,6,0,0,0,0,12h2.2a1,1,0,0,1,.64.23L23,18.86V16.92a1,1,0,0,1,.86-1A6,6,0,0,0,23,4Z"/>
                <Path fill={color.fontColor} d="M8,30a1,1,0,0,1-.42-.09A1,1,0,0,1,7,29V25.74a8,8,0,0,1-1.28-15,1,1,0,1,1,.82,1.82,6,6,0,0,0,1.6,11.4,1,1,0,0,1,.86,1v1.94l3.16-2.63A1,1,0,0,1,12.8,24H15a5.94,5.94,0,0,0,4.29-1.82,1,1,0,0,1,1.44,1.4A8,8,0,0,1,15,26H13.16L8.64,29.77A1,1,0,0,1,8,30Z"/>
            </Svg>
        )
    }
}
