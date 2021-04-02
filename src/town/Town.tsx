import React from 'react';
import './Town.css';
import IWeatherData from '../model/IWeatherData';
import {Col, Divider, Image, Row} from "antd";
import 'antd/dist/antd.css';
import {StarTwoTone} from '@ant-design/icons';

const defaultWeatherData: IWeatherData = {
    id: 681290,
    name: "Cluj-Napoca",
    coord: {
        lat: 46.7667,
        lon: 23.6
    },
    main: {
        temp: 283.15,
        feels_like: 276.61,
        temp_min: 283.15,
        temp_max: 283.15,
        pressure: 1029,
        humidity: 53
    },
    dt: 1616936949,
    wind: {
        speed: 6.69,
        deg: 310
    },
    sys: {
        country: "RO"
    },
    clouds: {
        all: 40
    },
    weather: [
        {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03d"
        }
    ]
};

interface IWeatherDataWrapper {
    weatherData: IWeatherData;

    addToFavorites(data: IWeatherData): any;
}

const Town: (weatherDataWrapper: IWeatherDataWrapper) => JSX.Element = (weatherDataWrapper: IWeatherDataWrapper) => {
    const [weatherData]: [
        IWeatherData,
        (weatherInformation: IWeatherData) => void
    ] = React.useState<IWeatherData>(weatherDataWrapper ? weatherDataWrapper.weatherData : defaultWeatherData)

    return (
        <div className="Town">

            <Divider orientation="center">{weatherData.name} <StarTwoTone twoToneColor="#664422"
                                                                          onClick={() => weatherDataWrapper.addToFavorites(weatherData)}/>
            </Divider>
            {weatherData.weather.map((weather) => (
                <div>
                    <Row justify={"center"} gutter={{xs: 2, sm: 4, md: 6, lg: 8, xl: 10}}>
                        <Col className="gutter-row" flex={"auto"}>
                            <div>
                                <Image className="Town-image"
                                       src={'http://openweathermap.org/img/wn/' + weather.icon + '@2x.png'}/>
                            </div>
                        </Col>
                        <Col className="gutter-row" flex={"auto"}>
                            <div>Temperature: {weatherData.main?.temp}&#8451;</div>
                        </Col>
                    </Row>

                    <Row justify={"center"} gutter={{xs: 2, sm: 4, md: 6, lg: 8, xl: 10}}>
                        <Col className="gutter-row" flex={"auto"}>
                            <div>Weather: {weather.description}. {weatherData.wind?.name}</div>
                        </Col>
                    </Row>

                    <Row justify={"center"} gutter={{xs: 2, sm: 4, md: 6, lg: 8, xl: 10}}>
                        <Col className="gutter-row" flex={"auto"}>
                            <div>Wind Speed: {weatherData.wind?.speed} m/s</div>
                        </Col>
                        <Col className="gutter-row" flex={"auto"}>
                            <div>Wind direction: {weatherData.wind?.deg} degrees</div>
                        </Col>
                        <Col className="gutter-row" flex={"auto"}>
                            <div>Cloud coverage: {weatherData.clouds?.all} %</div>
                        </Col>

                    </Row>
                </div>
            ))}
        </div>
    );
}

export default Town;
