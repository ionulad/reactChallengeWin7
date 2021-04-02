import IWeatherData from "./IWeatherData";

interface IWeatherMessage {
    message?: string;
    cod?: string;
    count?: number;
    list: Array<IWeatherData>;
}

export default IWeatherMessage;