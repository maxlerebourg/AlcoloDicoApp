import Svg, {Path} from 'react-native-svg';
import React from "react";
import color from "../../components/Config/Color";

export default class Ingredient extends React.Component {
    render() {
        return (<Svg xmlns="http://www.w3.org/2000/svg" height="30pt" width="30pt" viewBox="0 0 512 512">

			<Path fill={color.fontColor} d="M496.107,237.6c4.751-13.198,5.261-26.01,1.46-38.213c-4.278-13.734-13.244-23.821-20.854-30.335
				c8.33-8.485,12.708-20.271,11.859-32.151c14-6.802,23.429-21.243,23.429-37.311c0-16.067-9.429-30.508-23.429-37.311
				c1.11-15.527-6.683-30.911-20.598-38.945c-13.916-8.033-31.135-7.087-44.026,1.634c-12.89-8.722-30.111-9.667-44.026-1.634
				c-13.914,8.034-21.705,23.42-20.597,38.945c-1.274,0.62-2.496,1.323-3.691,2.064c-26.067-40.209-54.605-45.563-70.017-44.943
				c-22.419,0.906-43.711,15.222-52.983,35.625c-6.177,13.594-16.325,19.286-23.751,21.667c-11.487,3.684-24.627,2.258-35.145-3.814
				c-11.439-6.604-25.027-13.539-39.092-14.905c-13.638-1.324-25.855,2.782-36.413,12.178c-3.831-0.884-7.066-0.257-9.131,0.445
				c-10.914,3.716-17.379,18.396-22.517,39.217c-4.067-15.793-8.136-28.758-11.452-38.385c-1.532-4.448-2.644-8.124-3.536-11.078
				c-2.376-7.864-4.253-14.076-11.116-16.011c-6.855-1.933-11.683,2.362-17.79,7.8c-0.739,0.658-1.538,1.369-2.404,2.133
				L3.39,69.163c-3.195,2.815-4.258,7.345-2.647,11.288c13.213,32.319,28.555,121.776,33.77,153.717h-4.77
				C13.343,234.168,0,247.51,0,263.911v40.515c0,7.571,2.848,14.487,7.523,19.743C2.847,329.425,0,336.34,0,343.912v40.515
				c0,7.571,2.848,14.487,7.523,19.743C2.847,409.426,0,416.34,0,423.911v40.515c0,16.4,13.343,29.742,29.743,29.742h452.513
				c16.4,0,29.743-13.342,29.743-29.742v-40.515c0-7.571-2.848-14.486-7.523-19.742c4.676-5.256,7.523-12.172,7.523-19.743v-40.515
				c0-7.571-2.848-14.487-7.523-19.743c4.676-5.256,7.523-12.171,7.523-19.743v-40.515C512,252.508,505.548,242.59,496.107,237.6z
				 M478.471,205.336c2.758,8.851,1.906,18.53-2.5,28.832h-51.887c0.389-0.669,0.777-1.335,1.165-2.007
				c11.788-20.418,18.593-36.8,20.927-50.787c0.363,0.009,0.726,0.022,1.088,0.022c3.646,0,7.279-0.485,10.805-1.438
				C463.596,183.688,474.434,192.377,478.471,205.336z M372.81,78.636c2.766-0.592,5.151-2.329,6.565-4.778
				c1.414-2.45,1.726-5.384,0.856-8.075c-3.082-9.537,0.993-20.104,9.69-25.126c8.698-5.02,19.888-3.268,26.605,4.169
				c1.895,2.099,4.592,3.297,7.421,3.297c2.828,0,5.524-1.198,7.421-3.297c6.718-7.438,17.909-9.192,26.605-4.17
				c8.698,5.022,12.773,15.589,9.691,25.126c-0.87,2.691-0.559,5.625,0.855,8.075c1.414,2.45,3.8,4.186,6.565,4.778
				c9.801,2.099,16.914,10.912,16.914,20.956s-7.113,18.856-16.913,20.955c-2.766,0.592-5.152,2.328-6.566,4.778
				c-1.414,2.45-1.726,5.384-0.855,8.076c3.082,9.537-0.994,20.104-9.691,25.127c-3.581,2.068-7.645,3.026-11.696,2.839
				c-2.1-11.529-8.049-20.339-15.324-27.283c5.051-6.189,11.904-12.367,18.328-15.052c5.096-2.129,7.501-7.987,5.371-13.082
				c-2.129-5.095-7.986-7.5-13.082-5.371c-10.195,4.261-19.795,12.897-26.686,21.545c-0.988-0.599-1.971-1.179-2.941-1.739
				c-1.006-0.581-1.997-1.134-2.979-1.67c4.046-10.294,6.727-22.929,5.318-33.891c-0.703-5.479-5.718-9.352-11.192-8.645
				c-5.478,0.704-9.348,5.715-8.644,11.192c0.889,6.918-1.043,15.96-3.886,23.437c-5.442-1.604-10.595-2.39-15.61-2.39
				c-5.404,0-10.605,0.88-15.688,2.688c-2.173-3.408-3.367-7.393-3.367-11.513C355.896,89.549,363.009,80.735,372.81,78.636z
				 M359.839,159.222c3.456,0,6.818-1.794,8.67-5.002c2.762-4.783,1.123-10.899-3.66-13.66l-8.674-5.008
				c1.688-1.303,3.306-2.391,4.85-3.275c0.268-0.129,0.528-0.275,0.785-0.429c5.09-2.745,9.41-3.431,13.139-3.431
				c7.441,0,16.019,2.951,26.993,9.287c15.892,9.175,23.32,17.651,24.839,28.344c1.217,8.56-1.22,19.727-7.388,33.804l-15.318-8.844
				c-4.785-2.764-10.899-1.123-13.66,3.66c-2.762,4.783-1.123,10.899,3.66,13.66l16.343,9.435c-0.803,1.443-1.629,2.906-2.489,4.396
				c-2.342,4.055-4.701,8.076-7.046,12.006H294.527c4.014-8.564,8.442-17.461,13.234-26.63l11.305,6.526
				c1.575,0.909,3.294,1.341,4.99,1.341c3.456,0,6.818-1.794,8.67-5.003c2.762-4.783,1.123-10.899-3.66-13.66l-11.828-6.828
				c2.759-4.985,5.614-10.039,8.572-15.163c5.866-10.16,11.197-18.122,16.06-24.362l12.98,7.494
				C356.424,158.79,358.143,159.222,359.839,159.222z M146.85,213.168c0-43.379,35.292-78.67,78.671-78.67
				c31.9,0,60.566,19.337,72.675,48.539c-1.037,1.889-2.061,3.769-3.068,5.638c-0.004,0.005-0.007,0.009-0.01,0.014
				c-0.01,0.016-0.016,0.033-0.025,0.05c-8.595,15.939-16.142,31.135-22.565,45.43H149.689v-0.001
				C147.805,227.359,146.85,220.324,146.85,213.168z M153.011,106.626c-11.061-6.006-21.56-6.913-30.028-5.95
				c0.238-0.64,0.48-1.263,0.729-1.87c1.59-3.891,0.578-8.361-2.533-11.187l-5.977-5.429c11.661-7.825,25.627-5.216,48.538,8.011
				c9.698,5.599,20.932,8.484,32.125,8.484c6.492,0,12.972-0.971,19.127-2.945c15.937-5.111,28.669-16.631,35.853-32.438
				c5.012-11.029,18.284-23.217,35.582-23.916c19.508-0.796,38.863,13.301,54.914,39.814c-3.463,6.082-5.443,13.062-5.443,20.392
				c0,7.72,2.166,15.19,6.119,21.64c-3.248,2.69-6.483,5.828-9.729,9.428c-0.112,0.12-0.223,0.24-0.33,0.366
				c-7.182,8.035-14.419,18.348-21.961,31.152c-9.807-16.223-24.033-29.16-40.76-37.44c1.852-6.624,5.333-16.653,11.232-25.754
				c3.004-4.634,1.683-10.827-2.952-13.831c-4.636-3.006-10.826-1.683-13.831,2.952c-6.742,10.4-10.873,21.598-13.234,29.616
				c-8.019-2.1-16.379-3.225-24.931-3.225c-54.407,0-98.67,44.263-98.67,98.669c0,7.114,0.768,14.135,2.258,21h-15.894
				c-0.771-21.514-1.871-75.111,4.374-111.857c5.15-1.888,15.061-3.981,25.878,1.894c1.517,0.823,3.151,1.214,4.764,1.214
				c3.548,0,6.984-1.893,8.797-5.23C159.663,115.333,157.865,109.262,153.011,106.626z M79.562,146.397
				c1.979-11.042,4.439-24.783,7.653-36.534c3.272-11.963,6.068-17.093,7.578-19.19l8.006,7.272
				c-11.857,37.734-10.59,109.221-9.613,136.221h-8.292c-1.158-27.294-4.073-52.369-7.797-74.626
				C77.844,155.979,78.65,151.486,79.562,146.397z M21.787,79.609L33.431,69.35c0.76,2.467,1.664,5.314,2.794,8.594
				c9.521,27.642,25.473,83.744,28.649,156.223h-10.09C50.332,206.493,35.718,119.505,21.787,79.609z M492.001,464.423
				c0,5.372-4.371,9.742-9.743,9.742H29.744c-5.372,0-9.743-4.37-9.743-9.742v-40.515c0-5.372,4.371-9.742,9.743-9.742h452.513
				c5.372,0,9.743,4.37,9.743,9.742V464.423z M492.001,384.425c0,5.373-4.371,9.743-9.743,9.743H29.744
				c-5.372,0-9.743-4.371-9.743-9.743V343.91c0-5.372,4.371-9.743,9.743-9.743h452.513c5.371,0,9.743,4.371,9.743,9.743V384.425z
				 M492.001,304.425c0,5.372-4.371,9.743-9.743,9.743H29.744c-5.372,0-9.743-4.371-9.743-9.743V263.91
				c0-5.372,4.371-9.743,9.743-9.743h452.472c0.011,0,0.021,0.002,0.032,0.002c0.007,0,0.014-0.001,0.021-0.001
				c5.366,0.006,9.731,4.374,9.731,9.742V304.425z"/>
                <Path fill={color.fontColor} d="M369.37,194.067l0.104,0.06c1.572,0.904,3.287,1.334,4.979,1.334c3.461,0,6.827-1.799,8.677-5.014
				c2.753-4.786,1.106-10.9-3.68-13.655l-0.104-0.06c-4.787-2.754-10.901-1.106-13.655,3.68
				C362.936,185.199,364.584,191.312,369.37,194.067z"/>
                <Path fill={color.fontColor} d="M294.777,82.873c1.371,0,2.765-0.284,4.096-0.882l0.374-0.165c5.061-2.214,7.367-8.11,5.153-13.17
				c-2.214-5.061-8.115-7.367-13.169-5.153l-0.561,0.248c-5.037,2.265-7.284,8.185-5.019,13.221
				C287.317,80.677,290.961,82.873,294.777,82.873z"/>
                <Path fill={color.fontColor} d="M61.003,274.167c-5.508,0-10.001,4.492-10.001,10c0,5.507,4.493,10,10.001,10c5.508,0,10-4.493,10-10
				C71.003,278.659,66.511,274.167,61.003,274.167z"/>
                <Path fill={color.fontColor} d="M61.003,354.167c-5.508,0-10.001,4.492-10.001,10c0,5.507,4.493,10,10.001,10c5.508,0,10-4.493,10-10
				C71.003,358.659,66.511,354.167,61.003,354.167z"/>
                <Path fill={color.fontColor} d="M61.003,434.165c-5.508,0-10.001,4.492-10.001,10.001c0,5.507,4.493,10,10.001,10c5.508,0,10-4.493,10-10
				C71.003,438.658,66.51,434.165,61.003,434.165z"/>
                <Path fill={color.fontColor} d="M451,274.167c-5.508,0-10,4.492-10,10c0,5.507,4.492,10,10,10c5.509,0,10.001-4.493,10.001-10
				C461.001,278.659,456.509,274.167,451,274.167z"/>
                <Path fill={color.fontColor} d="M451,354.167c-5.508,0-10,4.492-10,10c0,5.507,4.492,10,10,10c5.509,0,10.001-4.493,10.001-10
				C461.001,358.659,456.509,354.167,451,354.167z"/>
                <Path fill={color.fontColor} d="M451,434.165c-5.508,0-10,4.492-10,10.001c0,5.507,4.492,10,10,10c5.509,0,10.001-4.493,10.001-10
				C461.001,438.658,456.508,434.165,451,434.165z"/>
		
</Svg>
        )
    }
}
