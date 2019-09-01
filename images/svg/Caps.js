import Svg, {Path} from 'react-native-svg';
import React from "react";
import color from "../../components/Config/Color";

export default class Caps extends React.Component {
    render() {
        return (color.iconColored ?
            <Svg xmlns="http://www.w3.org/2000/svg" height="30pt" width="30pt" viewBox="0 0 512 512">
            <Path fill={'#007756'} d="M478.645,294.344c-2.39,13.918-6.079,27.596-11.018,40.804l15.058,40.214l-10.728,18.467
                l-42.443,6.809c-9.029,10.808-19.057,20.777-29.925,29.735l-7.109,42.413l-18.527,10.618l-40.074-15.328
            c-13.228,4.859-26.936,8.459-40.884,10.758l-27.376,33.145l-9.599-0.04l-11.758-0.05l-27.046-33.365
            c-13.908-2.41-27.586-6.129-40.784-11.098l-40.244,14.978l-18.447-10.768l-6.719-42.463c-10.798-9.039-20.747-19.097-29.675-29.975
            l-42.403-7.189l-10.588-18.557l15.408-40.034c-4.819-13.228-8.399-26.946-10.668-40.914L0,265.079l0.13-21.367l33.415-26.976
            c2.44-13.898,6.189-27.566,11.188-40.764l-14.898-40.274l10.798-18.427l42.483-6.639c9.059-10.768,19.127-20.697,30.035-29.605
            l7.269-42.393l18.577-10.548l40.004,15.488c12.678-4.599,25.806-8.049,39.164-10.308L245.402,0.02h21.357l27.186,33.265
            c13.928,2.35,27.616,6.019,40.834,10.938l40.174-15.138l18.497,10.688l6.879,42.423c10.838,9.009,20.827,19.017,29.805,29.875
            l42.423,7.019l10.658,18.507l-15.248,40.114c4.879,13.218,8.509,26.916,10.838,40.854L512,245.872l-0.04,21.357L478.645,294.344z"/>
            <Path fill={'#005D51'} d="M478.645,294.344c-2.39,13.918-6.079,27.596-11.018,40.804l15.058,40.214l-10.728,18.467
            l-42.443,6.809c-9.029,10.808-19.057,20.777-29.925,29.735l-7.109,42.413l-18.527,10.618l-40.074-15.328
            c-13.228,4.859-26.936,8.459-40.884,10.758l-27.376,33.145l-9.599-0.04V0.02h10.738l27.186,33.265
            c13.928,2.35,27.616,6.019,40.834,10.938l40.174-15.138l18.497,10.688l6.879,42.423c10.838,9.009,20.827,19.017,29.805,29.875
            l42.423,7.019l10.658,18.507l-15.248,40.114c4.879,13.218,8.509,26.916,10.838,40.854L512,245.872l-0.04,21.357L478.645,294.344z"/>
            <Path fill={'#00AD45'} d="M431.902,255.98c0,32.725-8.949,63.39-24.556,89.666c-30.625,51.582-86.886,86.227-151.326,86.227
            c-64.26,0-120.581-34.635-151.276-86.227c-15.628-26.276-24.616-56.941-24.616-89.666c0-32.755,8.949-63.41,24.546-89.666
            c30.635-51.622,86.946-86.227,151.346-86.227c64.26,0,120.581,34.635,151.266,86.227C422.914,192.59,431.902,223.255,431.902,255.98
            z"/>
            <Path fill={'#00924F'} d="M431.902,255.98c0,32.725-8.949,63.39-24.556,89.666c-30.625,51.582-86.886,86.227-151.326,86.227
            V80.087c64.26,0,120.581,34.635,151.266,86.227C422.914,192.59,431.902,223.255,431.902,255.98z"/>
            <Path fill={'#BED652'} d="M431.902,255.98c0,32.725-8.949,63.39-24.556,89.666H104.744
            c-15.628-26.276-24.616-56.941-24.616-89.666c0-32.755,8.949-63.41,24.546-89.666h302.613
            C422.914,192.59,431.902,223.255,431.902,255.98z"/>
            <Path fill={'#7BCD48'} d="M431.902,255.98c0,32.725-8.949,63.39-24.556,89.666H256.02V166.314h151.266
            C422.914,192.59,431.902,223.255,431.902,255.98z"/>
        
        </Svg>
            
        :
        <Svg xmlns="http://www.w3.org/2000/svg" height="30pt" width="30pt" viewBox="0 0 512 512">
                
            <Path fill={color.fontColor} d="M414.881,150.954c-0.597-1.907-1.751-3.566-3.27-4.794c-34.416-48.762-91.188-80.672-155.276-80.672
			c-104.734,0-189.941,85.208-189.941,189.942c0,38.825,11.718,74.96,31.79,105.072c0.597,2.437,2.076,4.525,4.091,5.895
			c34.528,47.803,90.719,78.975,154.061,78.975c104.734,0,189.941-85.208,189.941-189.942
			C446.277,216.861,434.711,180.948,414.881,150.954z M256.335,425.373c-50.509,0-95.933-22.157-127.087-57.253h88.179h29.725
			h64.802c5.522,0,10-4.477,10-10c0-5.522-4.478-10-10-10h-64.802h-29.725h-103.46c-17.426-26.676-27.573-58.518-27.573-92.689
			c0-93.707,76.235-169.942,169.941-169.942c51.083,0,96.971,22.659,128.149,58.45h-90.048h-47.263H199.91c-5.522,0-10,4.477-10,10
			c0,5.522,4.478,10,10,10h47.263h47.263H399.49c16.949,26.428,26.786,57.833,26.786,91.492
			C426.276,349.138,350.041,425.373,256.335,425.373z"/>

            <Path fill={color.fontColor} d="M247.213,282.116l-19.586-0.001v-16.086h9.86c5.522,0,10-4.478,10-10c0-5.522-4.477-10-10-10h-9.86v-16.087l19.586,0.001
			c5.522,0,10-4.478,10-10c0-5.523-4.477-10-10-10l-29.566-0.001c-0.007,0-0.013-0.001-0.02-0.001c-5.522,0-10,4.477-10,10v26.087
			h-1.079c-5.522,0-10,4.478-10,10c0,5.523,4.477,10,10,10h1.079v26.087c0,0.345,0.018,0.687,0.052,1.022
			c0.512,5.042,4.771,8.978,9.948,8.978l29.586,0.001c5.522,0,10-4.478,10-10C257.213,286.594,252.736,282.116,247.213,282.116z"/>

            <Path fill={color.fontColor} d="M393.748,284.504l-22.053-17.603c14.472-1.429,25.814-13.669,25.814-28.511c0-15.799-12.853-28.651-28.651-28.651h-28.789
			c-5.522,0-10,4.477-10,10v27.303h-0.773c-5.522,0-10,4.477-10,10s4.477,10,10,10h0.773v25.277c0,5.522,4.478,10,10,10
			c5.522,0,10-4.478,10-10V275.23l31.202,24.904c1.843,1.471,4.044,2.185,6.231,2.185c2.938,0,5.848-1.288,7.822-3.762
			C398.771,294.241,398.065,287.949,393.748,284.504z M350.069,247.042v-17.303h18.789c4.771,0,8.651,3.881,8.651,8.651
			c0,4.771-3.881,8.652-8.651,8.652H350.069z"/>

            <Path fill={color.fontColor} d="M192.875,236.889c0-15.799-12.852-28.652-28.651-28.652h-28.789c-5.523,0-10,4.477-10,10v2.027v25.764h-0.402
			c-5.522,0-10,4.478-10,10c0,5.523,4.477,10,10,10h0.402v24.788v2.028c0,5.522,4.477,10,10,10h28.789
			c15.799,0,28.651-12.853,28.651-28.652c0-7.119-2.616-13.636-6.93-18.651C190.259,250.524,192.875,244.008,192.875,236.889z
			 M164.224,282.845h-18.789V266.03h10.538c1.075,0,2.108-0.174,3.079-0.488h5.172c4.77,0,8.651,3.881,8.651,8.651
			S168.994,282.845,164.224,282.845z M164.224,245.541h-18.789v-17.304h18.789c4.77,0,8.651,3.881,8.651,8.652
			C172.875,241.659,168.994,245.541,164.224,245.541z"/>

            <Path fill={color.fontColor} d="M311.584,282.116l-19.586-0.001v-16.086h9.86c5.522,0,10-4.478,10-10c0-5.522-4.477-10-10-10h-9.86v-16.087l19.586,0.001
			c5.522,0,10-4.478,10-10c0-5.523-4.477-10-10-10l-29.566-0.001c-0.007,0-0.013-0.001-0.02-0.001c-5.522,0-10,4.477-10,10v26.087
			h-1.08c-5.522,0-10,4.478-10,10c0,5.523,4.477,10,10,10h1.08v26.087c0,0.345,0.018,0.687,0.052,1.022
			c0.512,5.042,4.771,8.978,9.948,8.978l29.586,0.001c5.522,0,10-4.478,10-10C321.584,286.594,317.107,282.116,311.584,282.116z"/>

            <Path fill={color.fontColor} d="M166.737,143.939h-0.541c-5.523,0-10,4.477-10,10c0,5.522,4.478,10,10,10h0.541c5.522,0,10-4.478,10-10
			C176.737,148.416,172.259,143.939,166.737,143.939z"/>

            <Path fill={color.fontColor} d="M345.668,348.12h-0.542c-5.523,0-10,4.478-10,10c0,5.523,4.477,10,10,10h0.542c5.522,0,10-4.477,10-10
			C355.668,352.598,351.19,348.12,345.668,348.12z"/>

            <Path fill={color.fontColor} d="M502,246.569h-12.363c-0.922-24.571-5.65-48.184-13.627-70.261l11.31-4.685c5.103-2.113,7.525-7.963,5.411-13.065
			c-2.113-5.102-7.966-7.525-13.065-5.411l-11.259,4.664c-10.129-21.916-23.547-42.011-39.635-59.636l8.65-8.65
			c3.905-3.905,3.905-10.237,0-14.143c-3.906-3.904-10.236-3.904-14.143,0l-8.613,8.613c-17.533-16.205-37.546-29.758-59.4-40.023
			l4.64-11.202c2.113-5.103-0.31-10.952-5.412-13.066c-5.102-2.109-10.951,0.311-13.066,5.412l-4.609,11.128
			c-22.055-8.124-45.666-12.997-70.248-14.062V10c0-5.523-4.478-10-10-10c-5.522,0-10,4.477-10,10v12.164
			C222,23.18,198.395,27.996,176.34,36.063l-4.716-11.383c-2.113-5.104-7.967-7.525-13.065-5.411
			c-5.102,2.113-7.525,7.963-5.411,13.065l4.729,11.416c-21.836,10.197-41.845,23.67-59.387,39.792l-8.965-8.965
			c-3.906-3.904-10.236-3.904-14.143,0c-3.905,3.905-3.905,10.237,0,14.143l8.969,8.969c-16.09,17.527-29.534,37.514-39.714,59.32
			l-11.867-4.915c-5.102-2.113-10.951,0.311-13.066,5.412c-2.113,5.103,0.311,10.953,5.412,13.066l11.837,4.903
			c-8.033,21.974-12.84,45.484-13.876,69.955H10c-5.523,0-10,4.478-10,10c0,5.523,4.477,10,10,10h13.077
			c1.035,24.439,5.832,47.922,13.848,69.872l-12.243,5.071c-5.103,2.114-7.525,7.964-5.412,13.066
			c1.596,3.851,5.319,6.176,9.243,6.176c1.275,0,2.571-0.246,3.823-0.764l12.266-5.081c10.136,21.736,23.514,41.666,39.522,59.156
			l-9.546,9.546c-3.905,3.905-3.905,10.237,0,14.143c1.953,1.952,4.512,2.929,7.071,2.929c2.559,0,5.118-0.977,7.071-2.929
			l9.525-9.525c17.431,16.065,37.304,29.511,58.993,39.72l-5.144,12.419c-2.113,5.103,0.311,10.952,5.413,13.065
			c1.251,0.518,2.547,0.764,3.822,0.764c3.924,0,7.647-2.325,9.243-6.177l5.106-12.33c21.905,8.088,45.345,12.974,69.751,14.102V502
			c0,5.522,4.478,10,10,10c5.523,0,10-4.478,10-10v-13.277c24.441-0.941,47.932-5.649,69.902-13.573l5.041,12.17
			c1.596,3.851,5.319,6.176,9.243,6.176c1.275,0,2.571-0.246,3.823-0.764c5.103-2.114,7.525-7.964,5.412-13.066l-5.016-12.108
			c21.816-10.068,41.833-23.393,59.405-39.366l9.231,9.232c1.953,1.952,4.512,2.929,7.071,2.929s5.118-0.977,7.071-2.929
			c3.905-3.905,3.905-10.237,0-14.143l-9.17-9.171c16.18-17.435,29.734-37.335,40.029-59.071l11.754,4.868
			c1.251,0.518,2.547,0.764,3.822,0.764c3.924,0,7.647-2.325,9.243-6.177c2.113-5.103-0.31-10.952-5.413-13.065l-11.627-4.815
			c8.18-21.986,13.137-45.524,14.294-70.042H502c5.522,0,10-4.478,10-10C512,251.047,507.522,246.569,502,246.569z M469.806,256.565
			c0,0.002,0,0.003,0,0.005v0.003c-0.617,117.192-96.136,212.344-213.471,212.344c-117.717,0-213.486-95.77-213.486-213.486
			s95.77-213.486,213.486-213.486s213.486,95.77,213.486,213.486C469.821,255.81,469.808,256.186,469.806,256.565z"/>

        </Svg>)
    }
}