import axios from 'axios';

// Types
import { ForecastData } from "../models/types";

const openWeatherApi = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5'
});

async function getForecastWeatherByCoordinates(lat: number, lon: number) {
    try {
        return await openWeatherApi.get<ForecastData>(`forecast/daily?lat=${lat}&lon=${lon}&cnt=10&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_ID}`)
    } catch (error) {
        return null;
    }
}

async function getForecastWeatherByCity(cityName: string) {
    try {
        return await openWeatherApi.get<ForecastData>(`forecast/daily?q=${cityName}&cnt=10&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_ID}`)
    } catch (error) {
        return null;
    }
}

export default {
    getForecastWeatherByCity,
    getForecastWeatherByCoordinates
};
