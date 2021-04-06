import React from 'react';
import '../styles/Main.css';
import {Alert, Button, Col, Divider, Dropdown, Layout, Menu, Row} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import Town from "../town/Town";
import IWeatherMessage from '../model/IWeatherMessage';
import axios, {CancelTokenSource} from "axios";
import IWeatherData from "../model/IWeatherData";
import {CacheContainer} from 'node-ts-cache'
import {MemoryStorage} from 'node-ts-cache-storage-memory'

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

const townCache = new CacheContainer(new MemoryStorage());
const favoritesCache = new CacheContainer(new MemoryStorage());

const Main: () => JSX.Element = () => {

    const [lat, setLat] = React.useState(23.54);
    const [lon, setLon] = React.useState(46.78);

    const [moveLat, setMoveLat] = React.useState(lat);
    const [moveLon, setMoveLon] = React.useState(lon);

    const [quantity] = React.useState(50);

    const [favorites, setFavorites] = React.useState(() => {
        let parsed = JSON.parse(localStorage.getItem('favorites') as string) as IWeatherData[];
        return parsed ? parsed : defaultFavorite;
    })

    const [towns, setTowns] = React.useState(defaultFavorite);

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
        let newTowns = [...towns];
        data.list.forEach(value => {
            if (!towns.find(v => v.id === value.id)) {
                newTowns = [...newTowns, value];
            }
        });
        townCache.setItem("towns", newTowns, {ttl: 6 * 60}).then(() => console.log("cached data!"));
        setTowns(newTowns);
    }

    React.useEffect(() => {
        loadFavoritesData();
        loadData();
    }, [lat, lon, quantity]);

    function loadFavoritesData() {
        const cachedFavorites = favoritesCache.getItem<IWeatherData[]>("favorites");
        cachedFavorites.then(async (result) => {
            if (result) {
                setFavorites([...result]);
                console.log("loaded favorites data from cache!");
            } else if (favorites.length >= 1) {
                let newFavorites: IWeatherData[] = [];
                (await Promise.all(favorites.map(favorite => loadDataForCity(favorite.id)))).forEach(f => {
                    if (f) {
                        newFavorites = [...newFavorites, f];
                    }
                });

                favoritesCache.setItem("favorites", newFavorites, {ttl: 30}).then(() => console.log("cached favorites data!"));
                setFavorites(newFavorites);
            }
        });
    }

    function loadData() {
        loadCurrentLocationData();
        const cachedTowns = townCache.getItem<IWeatherData[]>("towns");
        cachedTowns.then((result) => {
            if (result) {
                setTowns([...result]);
                console.log("loaded data from cache!")
            } else {
                loadMoreData(lat, lon, quantity);
            }
        });
    }

    function loadDataForCity(cityId: number): Promise<void | IWeatherData> {
        return axios
            .get<IWeatherData>('http://api.openweathermap.org/data/2.5/weather?id=' + cityId + '&appid=daade2050956b8fb98dc00de7917f6a4', {
                cancelToken: cancelTokenSource.token,
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 5000,
            })
            .then((response) => {
                setLoading(false);
                return response.data;
            })
            .catch((ex) => {
                const err = axios.isCancel(ex)
                    ? 'Request cancelled'
                    : ex.code === 'ECONNABORTED'
                        ? 'A timeout has occurred'
                        : ex.response.status === 404
                            ? 'No Data found for this city'
                            : ex.response.data.message;
                setError(err);
                setLoading(false);
            });
    }

    function loadMoreData(lon: number, lat: number, cnt: number) {
        axios
            .get<IWeatherMessage>('http://api.openweathermap.org/data/2.5/find?lat=' + lat + '&lon=' + lon + '&cnt=' + cnt + '&appid=daade2050956b8fb98dc00de7917f6a4', {
                cancelToken: cancelTokenSource.token,
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 5000,
            })
            .then((response) => {
                addMoreDataToTownsList(response.data);
                setLoading(false);
            })
            .catch((ex) => {
                const err = axios.isCancel(ex)
                    ? 'Request cancelled'
                    : ex.code === 'ECONNABORTED'
                        ? 'A timeout has occurred'
                        : ex.response.status === 404
                            ? 'No Data found with these coordinates'
                            : ex.response.data.message;
                setError(err);
                setLoading(false);
            });
    }

    function loadMoreDataOnButtonClick() {
        setMoveLat(moveLat + 1);
        setMoveLon(moveLon + 1)
        loadMoreData(moveLat, moveLon, quantity);
    }

    function sortByLeastWindyTowns() {
        setTowns([...towns].sort((t1, t2) => {
            if (t1.wind && t1.wind?.speed && (!t2.wind || !t2.wind?.speed)) {
                return 1;
            } else if ((!t1.wind || !t1.wind?.speed) && t2.wind && t2.wind?.speed) {
                return -1;
            } else if (t1.wind && t1.wind.speed && t2.wind && t2.wind.speed) {
                return t1.wind.speed - t2.wind.speed;
            }
            return 0;
        }));
    }

    function sortByMostWindyTowns() {
        setTowns([...towns].sort((t1, t2) => {
            if (t1.wind && t1.wind?.speed && (!t2.wind || !t2.wind?.speed)) {
                return -1;
            } else if ((!t1.wind || !t1.wind?.speed) && t2.wind && t2.wind?.speed) {
                return 1;
            } else if (t1.wind && t1.wind.speed && t2.wind && t2.wind.speed) {
                return t2.wind.speed - t1.wind.speed;
            }
            return 0;
        }));
    }

    function sortByClosestTowns() {
        setTowns([...towns].sort((t1, t2) => {
            if (t1.coord && t1.coord?.lat && t1.coord?.lon && (!t2.coord || !t2.coord?.lat || !t2.coord?.lon)) {
                return -1;
            } else if ((!t1.coord || !t1.coord?.lat || !t1.coord?.lon) && t2.coord && t2.coord?.lat && t2.coord?.lon) {
                return 1;
            } else if (t1.coord && t1.coord?.lat && t1.coord?.lon && t2.coord && t2.coord?.lat && t2.coord?.lon) {
                return getDistanceFromLatLonInKm(lon, lat, t1.coord?.lat, t1.coord?.lon)
                    - getDistanceFromLatLonInKm(lon, lat, t2.coord?.lat, t2.coord?.lon);
            }
            return 0;
        }));
    }

    function loadCurrentLocationData() {
        navigator.geolocation.getCurrentPosition((pos) => {
            const crd = pos.coords;
            setLon(crd.latitude);
            setLat(crd.longitude);
        }, (err) => {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
    }

    // from https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
    function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
        let R = 6371; // Radius of the earth in km
        let dLat = deg2rad(lat2 - lat1);  // deg2rad below
        let dLon = deg2rad(lon2 - lon1);
        let a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;// Distance in km
    }

    function deg2rad(deg: number) {
        return deg * (Math.PI / 180)
    }

    function addToFavorites(data: IWeatherData) {
        if (!favorites.find(x => x.id === data.id)) {
            let newFavorites: IWeatherData[] = [...favorites, data];
            localStorage.setItem("favorites", JSON.stringify(newFavorites));
            favoritesCache.setItem("favorites", newFavorites, {ttl: 30}).then(() => console.log("cached favorites data!"));
            setFavorites(newFavorites);

            // setTowns([...towns].filter((value) => {
            //     return value.id !== data.id;
            // }));
        }
    }

    function removeFromFavorites(data: IWeatherData) {
        if (window.confirm('Are you sure you want to remove this city from the favorites list?')) {
            let filtered: IWeatherData[] = [...favorites].filter((value) => {
                return value.id !== data.id;
            });
            localStorage.setItem("favorites", JSON.stringify(filtered ? filtered : defaultFavorite));
            favoritesCache.setItem("favorites", filtered, {ttl: 30}).then(() => console.log("cached favorites data!"));
            setFavorites(filtered);

            // setTowns(towns => [...towns, data]);
        }

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
            <Header className="Main-header" style={headingStyle}>Weather App</Header>
            <Content>
                {favorites.length > 0 &&
                <Divider className={"Divider"} dashed={true}><h1>Favorites</h1></Divider>}
                {favorites.map((weatherFavorite) => (
                        <Town key={weatherFavorite.id} weatherData={weatherFavorite}
                              addToFavorites={() => removeFromFavorites(weatherFavorite)}/>
                    )
                )}
                <Divider className={"Divider"} dashed={true}><h1>Towns</h1></Divider>
                <Row justify={"center"} gutter={{xs: 2, sm: 4, md: 6, lg: 8, xl: 10}}>
                    <Dropdown overlay={menu}>
                        <button className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            Sort By <DownOutlined/>
                        </button>
                    </Dropdown>
                </Row>
                {towns.map((townWeather) => (
                        <Town key={townWeather.id} weatherData={townWeather}
                              addToFavorites={() => addToFavorites(townWeather)}/>
                    )
                )}
                <Divider/>
                {error &&
                <Row justify={"center"} gutter={{xs: 2, sm: 4, md: 6, lg: 8, xl: 10}}>
                    <Col className="gutter-row" flex={"auto"}>
                        <Alert message="Error" description={error} type="error" showIcon/>
                    </Col>
                </Row>}
            </Content>
            <Footer>
                <Row justify={"center"} gutter={{xs: 2, sm: 4, md: 6, lg: 8, xl: 10}}>
                    <h1>
                        Towns loaded: {towns.length}
                    </h1>
                </Row>
                <Row justify={"center"} gutter={{xs: 2, sm: 4, md: 6, lg: 8, xl: 10}}>
                    <Button type="primary" onClick={() => loadMoreDataOnButtonClick()}>
                        Load More
                    </Button>
                    &nbsp;
                    <Dropdown overlay={menu}>
                        <button className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            Sort By <DownOutlined/>
                        </button>
                    </Dropdown>
                </Row>
            </Footer>
        </Layout>
    );
}

export default Main;
