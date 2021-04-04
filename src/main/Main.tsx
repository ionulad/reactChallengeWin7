import React, {useReducer} from 'react';
import './Main.css';
import {Alert, Button, Col, Divider, Dropdown, Layout, Menu, Row} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import Town from "../town/Town";
import IWeatherMessage from '../model/IWeatherMessage';
import axios, {CancelTokenSource} from "axios";
import IWeatherData from "../model/IWeatherData";

const {Header, Footer, Content} = Layout;

const defaultFavorite: IWeatherData[] = [];

const defaultWeatherMessage: IWeatherMessage = {
    message: "accurate",
    cod: "200",
    count: 10,
    list: [{
        id: 685927,
        name: "Baciu",
        coord: {lat: 46.8, lon: 23.5167},
        main: {
            temp: 283.15,
            feels_like: 276.61,
            temp_min: 283.15,
            temp_max: 283.15,
            pressure: 1029,
            humidity: 53
        },
        dt: 1616936724,
        wind: {speed: 6.69, deg: 310},
        sys: {country: "RO"},
        clouds: {all: 40},
        weather: [{id: 802, main: "Clouds", description: "scattered clouds", icon: "03d"}]
    }, {
        id: 681290,
        name: "Cluj-Napoca",
        coord: {lat: 46.7667, lon: 23.6},
        main: {
            temp: 283.15,
            feels_like: 276.61,
            temp_min: 283.15,
            temp_max: 283.15,
            pressure: 1029,
            humidity: 53
        },
        dt: 1616936949,
        wind: {speed: 6.69, deg: 310},
        sys: {country: "RO"},
        clouds: {all: 40},
        weather: [{id: 802, main: "Clouds", description: "scattered clouds", icon: "03d"}]
    }, {
        id: 678050,
        name: "Floreşti",
        coord: {lat: 46.7457, lon: 23.4938},
        main: {
            temp: 283.15,
            feels_like: 276.61,
            temp_min: 283.15,
            temp_max: 283.15,
            pressure: 1029,
            humidity: 53
        },
        dt: 1616936722,
        wind: {speed: 6.69, deg: 310},
        sys: {country: "RO"},
        clouds: {all: 40},
        weather: [{id: 802, main: "Clouds", description: "scattered clouds", icon: "03d"}]
    }, {
        id: 678355,
        name: "Feleacu",
        coord: {lat: 46.7167, lon: 23.6167},
        main: {
            temp: 283.15,
            feels_like: 276.61,
            temp_min: 283.15,
            temp_max: 283.15,
            pressure: 1029,
            humidity: 53
        },
        dt: 1616936722,
        wind: {speed: 6.69, deg: 310},
        sys: {country: "RO"},
        clouds: {all: 40},
        weather: [{id: 802, main: "Clouds", description: "scattered clouds", icon: "03d"}]
    }, {
        id: 682093,
        name: "Chinteni",
        coord: {lat: 46.8667, lon: 23.5333},
        main: {
            temp: 283.15,
            feels_like: 276.61,
            temp_min: 283.15,
            temp_max: 283.15,
            pressure: 1029,
            humidity: 53
        },
        dt: 1616936723,
        wind: {speed: 6.69, deg: 310},
        sys: {country: "RO"},
        clouds: {all: 40},
        weather: [{id: 802, main: "Clouds", description: "scattered clouds", icon: "03d"}]
    }, {
        id: 667763,
        name: "Săvădisla",
        coord: {lat: 46.6833, lon: 23.45},
        main: {
            temp: 283.15,
            feels_like: 275.77,
            temp_min: 283.15,
            temp_max: 283.15,
            pressure: 1029,
            humidity: 50
        },
        dt: 1616936720,
        wind: {speed: 7.72, deg: 330},
        sys: {country: "RO"},
        clouds: {all: 90},
        weather: [{id: 804, main: "Clouds", description: "overcast clouds", icon: "04d"}]
    }, {
        id: 666978,
        name: "Sânnicoară",
        coord: {lat: 46.7833, lon: 23.7167},
        main: {
            temp: 283.15,
            feels_like: 276.61,
            temp_min: 283.15,
            temp_max: 283.15,
            pressure: 1029,
            humidity: 53
        },
        dt: 1616936720,
        wind: {speed: 6.69, deg: 310},
        sys: {country: "RO"},
        clouds: {all: 40},
        weather: [{id: 802, main: "Clouds", description: "scattered clouds", icon: "03d"}]
    }, {
        id: 667006,
        name: "Sânmărtin",
        coord: {lat: 46.9, lon: 23.5667},
        main: {
            temp: 283.15,
            feels_like: 276.61,
            temp_min: 283.15,
            temp_max: 283.15,
            pressure: 1029,
            humidity: 53
        },
        dt: 1616936720,
        wind: {speed: 6.69, deg: 310},
        sys: {country: "RO"},
        clouds: {all: 40},
        weather: [{id: 802, main: "Clouds", description: "scattered clouds", icon: "03d"}]
    }, {
        id: 674231,
        name: "Măcicașu",
        coord: {lat: 46.9, lon: 23.5667},
        main: {
            temp: 283.15,
            feels_like: 276.61,
            temp_min: 283.15,
            temp_max: 283.15,
            pressure: 1029,
            humidity: 53
        },
        dt: 1616936720,
        wind: {speed: 6.69, deg: 310},
        sys: {country: "RO"},
        clouds: {all: 40},
        weather: [{id: 802, main: "Clouds", description: "scattered clouds", icon: "03d"}]
    }, {
        id: 681371,
        name: "Ciurila",
        coord: {lat: 46.65, lon: 23.55},
        main: {
            temp: 283.15,
            feels_like: 276.61,
            temp_min: 283.15,
            temp_max: 283.15,
            pressure: 1029,
            humidity: 53
        },
        dt: 1616936723,
        wind: {speed: 6.69, deg: 310},
        sys: {country: "RO"},
        clouds: {all: 40},
        weather: [{id: 802, main: "Clouds", description: "scattered clouds", icon: "03d"}]
    }]
};

const Main: () => JSX.Element = () => {

    const [lat, setLat] = React.useState(46.78)
    const [lon, setLon] = React.useState(23.54)

    const [favorites, setFavorites] = React.useState(defaultFavorite)

    const [towns, setTowns] = React.useState(defaultWeatherMessage.list);

    const [weatherData, setWeatherData]: [
        IWeatherMessage,
        (townName: IWeatherMessage) => void
    ] = React.useState<IWeatherMessage>(defaultWeatherMessage)

    const [loading, setLoading]: [
        boolean,
        (loading: boolean) => void
    ] = React.useState<boolean>(true);

    const [error, setError]: [string, (error: string) => void] = React.useState(
        ''
    );

    const cancelToken = axios.CancelToken;
    const [cancelTokenSource]: [
        CancelTokenSource,
        (cancelTokenSource: CancelTokenSource) => void
    ] = React.useState(cancelToken.source());

    function addMoreDataToTownsList(data: IWeatherMessage) {
        setWeatherData(data);
        weatherData.list.forEach(value => setTowns(towns => [...towns, value]));
    }

    // initial loading of data
    React.useEffect(() => {
        loadMoreData(lat, lon);
    }, [lat, lon]);

    function loadMoreData(lon: number, lat: number) {
        // TODO welp i'm timed out again
        // axios
        //     .get<IWeatherMessage>('http://api.openweathermap.org/data/2.5/find?lat=' + lat + '&lon=' + lon + '&cnt=10&appid=?', {
        //         cancelToken: cancelTokenSource.token,
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         timeout: 5000,
        //     })
        //     .then((response) => {
        //         addMoreDataToTownsList(response.data);
        //         setLoading(false);
        //     })
        //     .catch((ex) => {
        //         const err = axios.isCancel(ex)
        //             ? 'Request cancelled'
        //             : ex.code === 'ECONNABORTED'
        //                 ? 'A timeout has occurred'
        //                 : ex.response.status === 404
        //                     ? 'No Data found with these coordinates'
        //                     : ex.response.data.message;
        //         setError(err);
        //         setLoading(false);
        //     });
    }

    function loadMoreDataOnButtonClick() {
        // TODO welp, i'm timed out again
        addMoreDataToTownsList(defaultWeatherMessage);

        // load more data
        // setLat(lat + 10);
        // setLon(lon + 10);
        // loadMoreData(lat, lon);
    }

    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    function sortByLeastWindyTowns() {
        console.log("before least windy sort");
        towns.forEach(value => {
            console.log(value.wind?.speed)
        })
        setTowns(towns.sort((t1, t2) => {
            if (t1.wind && t1.wind?.speed && (!t2.wind || !t2.wind?.speed)) {
                return 1;
            } else if ((!t1.wind || !t1.wind?.speed) && t2.wind && t2.wind?.speed) {
                return -1;
            } else if (t1.wind && t1.wind.speed && t2.wind && t2.wind.speed) {
                return t1.wind.speed - t2.wind.speed;
            }
            return 0;
        }));
        console.log("after least windy sort");
        forceUpdate();
    }

    function sortByMostWindyTowns() {
        console.log("before most windy sort");
        towns.forEach(value => {
            console.log(value.wind?.speed)
        })
        setTowns(towns.sort((t1, t2) => {
            if (t1.wind && t1.wind?.speed && (!t2.wind || !t2.wind?.speed)) {
                return -1;
            } else if ((!t1.wind || !t1.wind?.speed) && t2.wind && t2.wind?.speed) {
                return 1;
            } else if (t1.wind && t1.wind.speed && t2.wind && t2.wind.speed) {
                return t2.wind.speed - t1.wind.speed;
            }
            return 0;
        }));
        console.log("after  most windy sort");
        forceUpdate();
    }

    function sortByClosestTowns() {
        // TODO
    }

    function addToFavorites(data: IWeatherData) {
        // TODO actually move the element between the two lists
        setTowns(towns.filter((value) => {
            return value.id !== data.id;
        }));
        setFavorites(favorites => [...favorites, data]);
    }

    function removeFromFavorites(data: IWeatherData) {
        setFavorites(favorites.filter((value) => {
            return value.id !== data.id;
        }));
        // TODO actually move the element between the two lists
        setTowns(towns => [...towns, data]);
    }

    const menu = (
        <Menu>
            <Menu.Item>
                <a target="_blank" onClick={() => sortByClosestTowns()}>
                    Closest to me
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" onClick={() => sortByMostWindyTowns()}>
                    Most Windy
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" onClick={() => sortByLeastWindyTowns()}>
                    Least Windy
                </a>
            </Menu.Item>
        </Menu>
    );

    const headingStyle = {color: "white"};

    return (
        <Layout>
            <Header className="Main-Header" style={headingStyle}>Weather App</Header>
            <Content>
                <Divider>Favorites List</Divider>
                {favorites.map((weatherFavorite) => (
                        <Town weatherData={weatherFavorite} addToFavorites={() => removeFromFavorites(weatherFavorite)}/>
                    )
                )}
                <Divider>Towns List</Divider>
                <Row justify={"center"} gutter={{xs: 2, sm: 4, md: 6, lg: 8, xl: 10}}>
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            Sort By <DownOutlined/>
                        </a>
                    </Dropdown>
                </Row>
                {towns.map((townWeather) => (
                        <Town weatherData={townWeather} addToFavorites={() => addToFavorites(townWeather)}/>
                    )
                )}
                {error &&
                <Row justify={"center"} gutter={{xs: 2, sm: 4, md: 6, lg: 8, xl: 10}}>
                    <Col className="gutter-row" flex={"auto"}>
                        <Alert message="Error" description={error} type="error" showIcon/>
                    </Col>
                </Row>}
                <Row justify={"center"} gutter={{xs: 2, sm: 4, md: 6, lg: 8, xl: 10}}>
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            Sort By <DownOutlined/>
                        </a>
                    </Dropdown>
                </Row>
            </Content>
            <Footer>
                <Row justify={"center"} gutter={{xs: 2, sm: 4, md: 6, lg: 8, xl: 10}}>
                    <Button type="primary" onClick={() => loadMoreDataOnButtonClick()}>
                        Load More Data
                    </Button>
                </Row>
            </Footer>
        </Layout>
    );
}

export default Main;
