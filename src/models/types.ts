export type Coordinates = {
    coords: {
        latitude: number,
        longitude: number
    }
};

export type ForecastData = {
    city: CityData
    cnt: number
    cod: string
    list: ListItem[]
    message: number
}

export type CityData = {
    coord: CoordData
    country: string
    id: number
    name: string
    population: number
    timezone: number
}

export type SavedCity = {
    countryName: string
    cityId: number
    cityName: string
}

export type SavedCityList = SavedCity[]

export type CoordData = {
    lon: number
    lat: number
}

export type ListItem = {
    clouds: number
    deg: number
    dt: number
    feels_like: FeelsLikeData
    gust: number
    humidity: number
    pop: number
    pressure: number
    speed: number
    sunrise: number
    sunset: number
    temp: TemperatureData
    weather: WeatherData[]
}

export type FeelsLikeData = {
    day: number
    night: number
    eve: number
    morn: number
}

export type TemperatureData = {
    day: number
    min: number
    max: number
    night: number
    eve: number
    morn: number
}

export type WeatherData = {
    description: string
    icon: string
    id: number
    main: string
}
