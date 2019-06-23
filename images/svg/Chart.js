import Svg, {Rect, Text, G, Line, Polygon} from 'react-native-svg';
import React from "react";
import color from "../../components/Config/Color";
import {Alert} from "react-native";

export default class Chart extends React.Component {
    render() {
        let config = this.props.config;
        let maxPrinted = 20;
        config.chart = [{
            "pseudo": "Sina",
            "firstname": "Sina",
            "id": 1,
            "counter": 2,
            "dataPoints": [
                {
                    "x": "2019-05-29",
                    "y": 1,
                    "z": 1
                },
                {
                    "x": "2019-06-15",
                    "y": 2,
                    "z": 1
                },
                {
                    "x": "2019-06-06",
                    "y": 1
                },
                {
                    "x": "2019-06-06",
                    "y": 18
                }
            ]
        },
            {
                "pseudo": "Blandine",
                "firstname": "Blandine",
                "id": 18,
                "counter": 1,
                "dataPoints": [
                ]
            },
            {
                "pseudo": "Emma ",
                "firstname": "Emma ",
                "id": 24,
                "counter": 1,
                "dataPoints": [
                    {
                        "x": "2019-06-15",
                        "y": 1
                    }
                ]
            }
        ];
        let chart = [];
        let minDate = new Date().getTime(), maxDate = new Date().getTime();
        let minParty = 100, maxParty = 0;
        for (let user of config.chart) {
            user.dataPoints.sort((a, b) => {
                return new Date(a.x).getTime() - new Date(b.x).getTime()
            });
            for (let dataPoint of user.dataPoints) {
                let date = new Date(dataPoint.x).getTime();
                if (minDate > date)
                    minDate = date;
                if (maxDate < date)
                    maxDate = date;
                if (minParty > dataPoint.y)
                    minParty = dataPoint.y;
                if (maxParty < dataPoint.y)
                    maxParty = dataPoint.y;
            }
        }
        config.chart.sort((a, b) => {
            return b.counter - a.counter
        });
        let x, dx, y, dy;
        switch (config.type) {
            case 'box' :
                x = 0;
                dx = 55 / (config.chart.length > maxPrinted ? maxPrinted : config.chart.length);
                y = 63;
                dy = 60 / maxParty;
                for (let i = 0; i < config.chart.length && i < maxPrinted; i++) {
                    let colors = 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')';
                    chart.push(
                        <Text x={dx * i + dx / 2}
                              y={y - dy * config.chart[i].counter - .5}
                              fill={color.fontColor}
                              fontSize={'2.5px'}
                              textAnchor={'middle'}>{config.chart[i].counter}</Text>
                    );
                    chart.push(<Rect x={dx * i} y={y - dy * config.chart[i].counter} width={dx}
                                     height={dy * config.chart[i].counter} fill={colors}/>);
                    chart.push(
                        <G rotation={'50'} origin={`${dx * i},${y + 1.5}`}>
                            <Text x={dx * i} y={y + 1.5}
                                  fill={color.fontColor}
                                  fontSize={'2.8px'}
                                  textAnchor={'start'}>{config.chart[i].firstname}</Text>
                        </G>
                    );
                }
                return (<Svg xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 60 80"
                             height={config && config.height ? config.height + "pt" : "30pt"}
                             width={config && config.width ? config.width + "pt" : "30pt"}>
                    {chart}
                </Svg>);


            case 'line' :
                let d = (maxDate - minDate) / 86400000;
                x = 600;
                dx = 600 / d; // pixel par jour
                y = 600;
                dy = 600 / (maxParty - minParty);

                let dxi = 550 / (config.chart.length > maxPrinted ? maxPrinted : config.chart.length);
                for (let i = 0; i < config.chart.length; i++) {
                    let colors = 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')';
                    for (let j = 1; j < config.chart[i].dataPoints.length; j++) {
                        chart.push(
                            <Line
                                x1={Math.floor(dx * ((new Date(config.chart[i].dataPoints[j - 1].x).getTime() - minDate) / 86400000))}
                                y1={y - dy * (j - 1)}
                                x2={Math.floor(dx * ((new Date(config.chart[i].dataPoints[j].x).getTime() - minDate) / 86400000))}
                                y2={y - dy * j}
                                stroke={colors}
                                strokeWidth={"2"}
                            />);
                        if (config.chart[i].dataPoints.length - 1 === j) {
                            chart.push(
                                <Text x={x}
                                      y={y - dy * j}
                                      fill={colors}
                                      fontSize={'28px'}
                                      textAnchor={'start'}>{config.chart[i].firstname}</Text>
                            );
                        }
                    }

                }
                for (let i = 0, j = 0; i <= x; i += x / 4, j++) {
                    let date = new Date((minDate + (d * 86400000 / 4) * j));
                    chart.push(
                        <G rotation={'50'} origin={`${i - 10},${y + 15}`}>
                            <Text x={i - 10}
                                  y={y + 15}
                                  fill={color.fontColor}
                                  fontSize={'20px'}
                                  textAnchor={'start'}>{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear() - 2000}`}</Text>
                        </G>
                    );
                }
                return (<Svg xmlns="http://www.w3.org/2000/svg"
                             viewBox="-20 0 680 600"
                             height={config && config.height ? config.height + "pt" : "30pt"}
                             width={config && config.width ? config.width + "pt" : "30pt"}>
                    {chart}
                </Svg>);


            case 'pie' :
                if (config.user && config.user.id) {
                    let usr = config.chart.find((el) => {
                        return el.id === config.user.id
                    });
                    x = 30;
                    dx = usr.counter / 360;
                    y = 30;
                    //dy = 600 / (maxParty - minParty);
                    let usersById = [];
                    config.chart.map((user) => {
                        usersById[user.id] = user.firstname
                    });
                    let places = {};
                    for (let place of usr.dataPoints) {
                        places[place.z] ?
                            places[place.z].counter++ :
                            places[place.z] = {
                                name: usersById[place.z] ? usersById[place.z] : place.z,
                                counter: 1,
                                printed: false,
                            };
                    }

                    let p = {x: x / 2, y: 0},
                        o = {x: x / 2, y: y / 2};
                    for (let place of usr.dataPoints) {
                        if (!places[place.z].printed){
                            places[place.z].printed = true;
                            let colors = 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')';
                            let ps = {
                                x: Math.pow(p.x - places[place.z].counter, 2),
                                y: Math.pow(p.y - places[place.z].counter, 2)}
                            chart.push(
                               <Polygon
                                    points={`${o.x},${o.y} ${p.x},${p.y} ${ps.x},${ps.y}`}
                                    fill={colors}
                                />);
                            p = ps;
                        }
                    }
                    //Alert.alert('place', JSON.stringify(places[1]));

                    return (<Svg xmlns="http://www.w3.org/2000/svg"
                                 viewBox="-30 -30 30 30"
                                 height={config && config.height ? config.height + "pt" : "30pt"}
                                 width={config && config.width ? config.width + "pt" : "30pt"}>
                        {chart}
                    </Svg>);
                }

        }

    }
}
