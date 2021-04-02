interface ICoordinates {
    lat?: number
    lon?: number
}

interface IWeather {
    id?: number;
    main?: string;
    description?: string;
    icon?: string;
}

interface IMainData {
    temp?: number;
    feels_like?: number;
    temp_min?: number;
    temp_max?: number;
    pressure?: number;
    humidity?: number;
}

interface IWind {
    name?: string
    speed?: number
    deg?: number;
}

interface ICloud {
    all?: number
}

interface ISystem {
    type?: number;
    id?: number;
    country?: string
    sunrise?: number
    sunset?: number
}

interface IWeatherData {
    coord?: ICoordinates;
    weather: Array<IWeather>;
    base?: string;
    main?: IMainData;
    visibility?: number;
    wind?: IWind;
    clouds?: ICloud;
    dt?: number
    sys?: ISystem;
    timezone?: number
    id?: number;
    name?: string;
    cod?: number;
}

export default IWeatherData;