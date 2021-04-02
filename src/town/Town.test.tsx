import React from 'react';
import {render, screen} from '@testing-library/react';
import Town from './Town';
import IWeatherData from "../model/IWeatherData";

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

function addToFavorites(data: IWeatherData) {

}

test('renders scattered clouds row', () => {
    render(<Town weatherData={defaultWeatherData} addToFavorites={() => addToFavorites(defaultWeatherData)}/>);
    const linkElement = screen.getByText(/scattered clouds/i);
    expect(linkElement).toBeInTheDocument();
});
