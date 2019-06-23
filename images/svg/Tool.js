import Svg, {Path} from 'react-native-svg';
import React from "react";
import color from "../../components/Config/Color";

export default class Tool extends React.Component {
    render() {
        let config = this.props.config;
        return (
            config.empty ?
                <Svg xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 511.999 511.999"
                              height={config && config.height ? config.height+"pt" : "30pt"}
                              width={config && config.width ? config.width+"pt" : "30pt"}>
                    <Path fill={config && config.color ? config.color : color.fontTitleColor} d="M476.157,169.884c-3.598-16.894-11.956-32.281-24.17-44.496l-51.04-51.039c-5.458-5.458-12.716-8.465-20.435-8.465
                        c-1.648,0-3.276,0.137-4.868,0.406c0.269-1.594,0.406-3.221,0.406-4.869c0-7.72-3.007-14.978-8.465-20.435L335.071,8.473
                        c-11.294-11.296-29.577-11.299-40.872-0.001l-51.742,51.741c-11.269,11.269-11.269,29.602,0,40.871l32.515,32.515
                        c5.458,5.458,12.716,8.465,20.435,8.465c1.653,0,3.284-0.138,4.882-0.408c-1.097,6.463,0.015,13.226,3.314,19.079L47.15,417.187
                        c-21.651,21.652-21.651,56.882,0,78.534c21.702,21.702,56.829,21.704,78.534,0l255.63-255.63
                        c20.502,20.542,29.838,44.198,30.026,69.557c0.096,13.116,10.735,23.525,23.7,23.525c8.923,0,16.999-4.931,21.077-12.868
                        C479.859,274.108,486.976,220.688,476.157,169.884z M102.289,472.326c-8.774,8.771-22.969,8.771-31.741,0
                        c-8.752-8.752-8.752-22.991,0-31.742l255.68-255.68l31.712,31.771L102.289,472.326z M439.345,274.145
                        c-6.013-20.877-17.232-40.015-32.977-55.789c-7.27-7.284-63.027-63.143-71.686-71.819l4.655-4.655
                        c6.457-6.454,6.46-16.936,0-23.396l-15.889-15.888c-6.461-6.461-16.935-6.46-23.396-0.001l-4.644,4.646l-26.594-26.595
                        l45.82-45.82l26.594,26.592l-4.646,4.647c-6.46,6.46-6.46,16.934,0.001,23.395l15.889,15.888c6.461,6.462,16.935,6.46,23.396,0
                        l4.644-4.644l48.078,48.078c7.684,7.684,12.942,17.363,15.205,27.991C450.689,209.152,449.05,242.774,439.345,274.145z"/>
                </Svg> :
                <Svg xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 512.001 512.001"
                     height={config && config.height ? config.height+"pt" : "30pt"}
                     width={config && config.width ? config.width+"pt" : "30pt"}>
                    <Path fill={config && config.color ? config.color : color.fontTitleColor} d="M474.078,167.619c-3.126-14.678-10.436-28.137-21.049-38.748l-54.568-54.569c-5.159-5.159-13.523-5.159-18.682,0
                        l-8.131,8.131l-16.987-16.987l8.131-8.131c5.159-5.159,5.159-13.523,0-18.682L328.029,3.869c-5.159-5.159-13.523-5.159-18.682,0
                        l-55.319,55.319c-5.159,5.159-5.159,13.523,0,18.682l34.763,34.763c5.159,5.159,13.523,5.159,18.682,0l8.131-8.131l16.987,16.987
                        l-8.14,8.14c-5.156,5.156-5.159,13.513-0.009,18.673l6.652,6.664L45.219,440.842c-16.278,16.278-16.278,42.672,0,58.95
                        c16.278,16.278,42.672,16.278,58.95,0l285.82-285.82l14.256,14.281c22.529,22.57,35.286,53.09,35.522,84.978
                        c0.026,3.522,2.453,6.571,5.879,7.386c3.426,0.816,6.966-0.813,8.576-3.945C477.814,270.758,484.829,218.106,474.078,167.619z"/>
                </Svg>)
    }
}
