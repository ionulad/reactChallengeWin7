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

export function convertKelvinToCelsius(kelvinDegrees: number | undefined) {
    if (!kelvinDegrees) {
        return 0;
    }
    let celsiusDegrees = kelvinDegrees - 273.15;
    return celsiusDegrees.toPrecision(2);
}

export function getWindDirection(d: number | undefined) {
    if (!d) {
        return "no direction"
    }
    if (d > 348.75 || d < 11.25)
        return "N";
    if (d > 11.25 && d < 33.75)
        return "NNE";
    if (d > 33.75 && d < 56.25)
        return "NE";
    if (d > 56.25 && d < 78.75)
        return "ENE";
    if (d > 78.75 && d < 101.25)
        return "E";
    if (d > 101.25 && d < 123.75)
        return "ESE";
    if (d > 123.75 && d < 146.25)
        return "SE";
    if (d > 146.25 && d < 168.75)
        return "SSE";
    if (d > 168.75 && d < 191.25)
        return "S";
    if (d > 191.25 && d < 213.75)
        return "SSW";
    if (d > 213.75 && d < 236.25)
        return "SW";
    if (d > 236.25 && d < 258.75)
        return "WSW";
    if (d > 258.75 && d < 281.25)
        return "W";
    if (d > 281.25 && d < 303.75)
        return "WNW";
    if (d > 303.75 && d < 326.25)
        return "NW";
    if (d > 326.25 && d < 348.75)
        return "NNW";

    return "no direction"
}

export const Town: (weatherDataWrapper: IWeatherDataWrapper) => JSX.Element = (weatherDataWrapper: IWeatherDataWrapper) => {
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
                <div key={weather.id}>
                    <Row justify={"center"} gutter={{xs: 2, sm: 4, md: 6, lg: 8, xl: 10}}>
                        <Col className="gutter-row" flex={"auto"}>
                            <div>
                                <Image className="Town-image"
                                       src={'http://openweathermap.org/img/wn/' + weather.icon + '@2x.png'}/>
                            </div>
                        </Col>
                        <Col className="gutter-row" flex={"auto"}>
                            <div>Temperature: {convertKelvinToCelsius(weatherData.main?.temp)}&#8451;</div>
                        </Col>
                        <Col className="gutter-row" flex={"auto"}>
                            <div>Coordinates: {weatherData.coord?.lat} : {weatherData.coord?.lon}</div>
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
                            <div>Wind direction: {getWindDirection(weatherData.wind?.deg)}</div>
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
