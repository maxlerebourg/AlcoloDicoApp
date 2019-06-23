import Svg, {Path} from 'react-native-svg';
import React from "react";
import color from "../../components/Config/Color";

export default class List extends React.Component {
    render() {
        let config = this.props.config;
        return (<Svg xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 487.958 487.958"
                     height={config && config.height ? config.height+"pt" : "30pt"}
                     width={config && config.width ? config.width+"pt" : "30pt"}
                     >
            <Path fill={config && config.color ? config.color : color.fontTitleColor}
                  d="M483.058,215.613l-215.5-177.6c-4-3.3-9.6-4-14.3-1.8c-4.7,2.2-7.7,7-7.7,12.2v93.6c-104.6,3.8-176.5,40.7-213.9,109.8
                c-32.2,59.6-31.9,130.2-31.6,176.9c0,3.8,0,7.4,0,10.8c0,6.1,4.1,11.5,10.1,13.1c1.1,0.3,2.3,0.4,3.4,0.4c4.8,0,9.3-2.5,11.7-6.8
                c73-128.7,133.1-134.9,220.2-135.2v93.3c0,5.2,3,10,7.8,12.2s10.3,1.5,14.4-1.8l215.4-178.2c3.1-2.6,4.9-6.4,4.9-10.4
                S486.158,218.213,483.058,215.613z M272.558,375.613v-78.1c0-3.6-1.4-7-4-9.5c-2.5-2.5-6-4-9.5-4c-54.4,0-96.1,1.5-136.6,20.4
                c-35,16.3-65.3,44-95.2,87.5c1.2-39.7,6.4-87.1,28.1-127.2c34.4-63.6,101-95.1,203.7-96c7.4-0.1,13.4-6.1,13.4-13.5v-78.2
                l180.7,149.1L272.558,375.613z"/>

        </Svg>)
    }
}
