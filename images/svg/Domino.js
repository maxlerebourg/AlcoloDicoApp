import Svg, {Path, G, Circle} from 'react-native-svg';
import React from "react";
import color from "../../components/Config/Color";

export default class Domino extends React.Component {
    render() {
        let config = this.props.config;
        return (color.iconColored ?
                <Svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"
                     height={config && config.height ? config.height+"pt" : "30pt"}
                     width={config && config.width ? config.width+"pt" : "30pt"}>
                    <Path d="m56.528 9.5-5.349-.945-16.482-2.911c-.535-.095-1.086-.042-1.594.152l-4.67 1.787 24.619 4.349c.544.096.907.615.811 1.159l-8.351 47.268 3.279-3.775c.357-.41.595-.91.69-1.446l3.207-18.155-.004-.002.004.002 4.418-25.006.233-1.319c.096-.543-.267-1.062-.811-1.158z" fill="#cecbd1"/>
                    <Path d="m53.052 11.933-24.619-4.35-8.351 47.268c-.096.544.267 1.063.811 1.159l24.619 4.349 8.351-47.268c.095-.544-.268-1.062-.811-1.158z" fill="#fbf5fc"/>
                    <Circle cx="47.247" cy="16.244" fill="#2b2b2b" r="2"/>
                    <Path d="m42.823 29.676c-.194 1.087.531 2.126 1.618 2.32s2.126-.531 2.32-1.618-.531-2.126-1.618-2.32-2.127.53-2.32 1.618z" fill="#2b2b2b"/>
                    <Path d="m40.844 30.671h2v9.851h-2z" fill="#2b2b2b" transform="matrix(.175 -.985 .985 .175 -.539 70.55)"/>
                    <Path d="m36 7h-5.432-16.737c-.544 0-1.077.148-1.543.427l-4.288 2.573h25c.552 0 1 .448 1 1v48l2.572-4.287c.28-.466.428-1 .428-1.544v-18.436l-.005-.001.005.001v-25.394-1.339c0-.552-.448-1-1-1z" fill="#e8e4eb"/>
                    <Path d="m33 10h-25v48c0 .552.448 1 1 1h25v-48c0-.552-.448-1-1-1z" fill="#fbf5fc"/>
                    <G fill="#2b2b2b">
                        <Circle cx="14" cy="15" r="2"/>
                        <Circle cx="28" cy="15" r="2"/>
                        <Circle cx="28" cy="29" r="2"/>
                        <Circle cx="14" cy="29" r="2"/>
                        <Circle cx="14" cy="41" r="2"/>
                        <Circle cx="21" cy="47" r="2"/>
                        <Circle cx="28" cy="53" r="2"/>
                    <Path d="m11 34h20v2h-20z"/></G>
                </Svg>:
                <Svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"
                     height={config && config.height ? config.height+"pt" : "30pt"}
                     width={config && config.width ? config.width+"pt" : "30pt"}>
                    <Path fill={color.fontColor} d="m7 10v48c0 1.103.897 2 2 2h25c.271 0 .515-.11.695-.284l10.567 1.882c.059.011.117.016.176.016.203 0 .403-.062.572-.18.068-.047.115-.114.168-.175l.013.012 3.284-3.77c.477-.547.796-1.214.922-1.926l7.922-44.469c.193-1.085-.532-2.125-1.617-2.319l-21.825-3.889c-.716-.127-1.45-.058-2.127.2l-2.366.902h-16.553c-.725 0-1.436.197-2.059.57l-4.287 2.573.009.015c-.29.174-.494.478-.494.842zm26 48h-24v-47h24zm2.834-.113 1.596-2.66c.373-.621.57-1.333.57-2.059v-17.241l8.518 1.517.352-1.969-8.87-1.579v-23.363l14.871 2.649-8.243 46.271zm12.595-2.662c-.063.356-.223.688-.461.962l-.913 1.048 7.785-43.703c.193-1.085-.532-2.126-1.617-2.319l-15.223-2.711v-.502c0-.184-.033-.359-.08-.528l18.43 3.283zm-35.628-46.939c.311-.187.668-.286 1.03-.286h22.169v45.169c0 .363-.099.718-.285 1.029l-.715 1.191v-44.389c0-1.103-.897-2-2-2h-21.39z"/><Path fill={color.fontColor}  d="m11 34h20v2h-20z"/><Path fill={color.fontColor}  d="m14 18c1.654 0 3-1.346 3-3s-1.346-3-3-3-3 1.346-3 3 1.346 3 3 3zm0-4c.552 0 1 .449 1 1s-.448 1-1 1-1-.449-1-1 .448-1 1-1z"/>
                    <Path fill={color.fontColor} d="m28 18c1.654 0 3-1.346 3-3s-1.346-3-3-3-3 1.346-3 3 1.346 3 3 3zm0-4c.552 0 1 .449 1 1s-.448 1-1 1-1-.449-1-1 .448-1 1-1z"/>
                    <Path fill={color.fontColor} d="m28 32c1.654 0 3-1.346 3-3s-1.346-3-3-3-3 1.346-3 3 1.346 3 3 3zm0-4c.552 0 1 .449 1 1s-.448 1-1 1-1-.449-1-1 .448-1 1-1z"/>
                    <Path fill={color.fontColor} d="m14 32c1.654 0 3-1.346 3-3s-1.346-3-3-3-3 1.346-3 3 1.346 3 3 3zm0-4c.552 0 1 .449 1 1s-.448 1-1 1-1-.449-1-1 .448-1 1-1z"/>
                    <Path fill={color.fontColor} d="m14 44c1.654 0 3-1.346 3-3s-1.346-3-3-3-3 1.346-3 3 1.346 3 3 3zm0-4c.552 0 1 .449 1 1s-.448 1-1 1-1-.449-1-1 .448-1 1-1z"/>
                    <Path fill={color.fontColor} d="m21 44c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zm0 4c-.552 0-1-.449-1-1s.448-1 1-1 1 .449 1 1-.448 1-1 1z"/>
                    <Path fill={color.fontColor} d="m28 50c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zm0 4c-.552 0-1-.449-1-1s.448-1 1-1 1 .449 1 1-.448 1-1 1z"/>
                    <Path fill={color.fontColor} d="m49.708 14.527c-.459-.657-1.146-1.097-1.936-1.237-.786-.142-1.585.035-2.241.493-.658.458-1.098 1.146-1.237 1.935-.141.789.034 1.585.492 2.242.459.658 1.146 1.097 1.935 1.237.178.032.356.047.533.047.607 0 1.2-.185 1.709-.54.658-.459 1.098-1.146 1.237-1.934.141-.789-.034-1.585-.492-2.243zm-1.889 2.536c-.219.153-.481.209-.748.165-.263-.047-.492-.193-.645-.412s-.211-.484-.164-.747c0 0 0 0 0-.001.047-.263.193-.492.412-.645.17-.118.368-.18.57-.18.059 0 .118.005.177.016.264.047.493.193.646.413.152.219.211.484.164.748s-.193.491-.412.643z"/>
                    <Path fill={color.fontColor} d="m45.318 27.073c-1.633-.292-3.189.799-3.48 2.427-.29 1.628.8 3.189 2.428 3.479.178.032.356.047.533.047.607 0 1.2-.185 1.709-.54.658-.459 1.098-1.146 1.237-1.935.29-1.627-.799-3.188-2.427-3.478zm.046 3.774c-.219.153-.486.209-.747.165-.544-.097-.907-.617-.811-1.16.098-.544.625-.904 1.16-.809.543.097.906.617.81 1.16-.047.262-.193.491-.412.644z"/>
                </Svg>
            )
    }
}
