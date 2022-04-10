import { createContext, useState, useContext, useEffect, SetStateAction, Dispatch, ReactNode } from 'react';
import weatherApi from '../services/OpenWeatherApi';

// Types
import {Coordinates, ForecastData, SavedCity, SavedCityList} from '../models/types'

const NEXT_PUBLIC_CITY_LOCAL_STORAGE = 'WeatherAppSavedCities';

type ContextData = {
    cities: SavedCityList
    isLoading: boolean
    forecast: ForecastData
    setForecast: Dispatch<SetStateAction<ForecastData>>
    deleteCity: (cityId: number) => void;
    saveCity: ({ cityName, countryName, cityId }: SavedCity) => void;
    selectedCity: SavedCity
    setSelectedCity: Dispatch<SetStateAction<SavedCity>>
}

const AppContext = createContext({} as ContextData)

const AppsProvider = ({children} : {
    children: ReactNode
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [forecast, setForecast] = useState<ForecastData>({} as ForecastData);
    const [cities, setCities] = useState<SavedCityList>((): SavedCityList => {
        if (typeof window !== "undefined") {
            const savedCities = localStorage.getItem(
                NEXT_PUBLIC_CITY_LOCAL_STORAGE
            );

            return savedCities ? JSON.parse(savedCities) : [];
        }
        return []
    });
    const [selectedCity, setSelectedCity] = useState<SavedCity>({} as SavedCity)

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                onGeoLocationSuccess,
                onGeoLocationError)
        }
    }, [])

    async function onGeoLocationSuccess({ coords: { latitude, longitude } } : Coordinates) {
        const result = await weatherApi.getForecastWeatherByCoordinates(latitude, longitude);

        if (result) {
            setForecast(result.data);
            saveCity({
                cityName: result.data.city.name,
                cityId: result.data.city.id,
                countryName: result.data.city.country,
            });
        }
        setIsLoading(false)
    }

    async function onGeoLocationError() {
        const result = await weatherApi.getForecastWeatherByCoordinates(38.7259284, -9.137382);

        if (result) {
            setForecast(result.data);
            saveCity({
                cityName: result.data.city.name,
                cityId: result.data.city.id,
                countryName: result.data.city.country,
            });
        }
        setIsLoading(false)
    }

    function saveCity({ cityId, countryName, cityName }: SavedCity) {
        const cityAlreadySaved = cities.some((item) => {
            return item.cityId === cityId;
        });

        !cityAlreadySaved &&
        setCities((prev) => {
            const newCitiesValue: SavedCity[] = [{ cityName, countryName, cityId }, ...prev];

            localStorage.setItem(
                NEXT_PUBLIC_CITY_LOCAL_STORAGE,
                JSON.stringify(newCitiesValue)
            );

            return newCitiesValue;
        });
        setSelectedCity({ cityId, countryName, cityName })
    }

    function deleteCity(cityId: number) {
        setCities((prev) => {
            const newCitiesValue = prev.filter((city) => city.cityId !== cityId);
            localStorage.setItem(
                NEXT_PUBLIC_CITY_LOCAL_STORAGE,
                JSON.stringify(newCitiesValue)
            );

            if (newCitiesValue.length >= 0) {
                setSelectedCity(newCitiesValue[0])
            }

            return newCitiesValue;
        });
    }

    const contextData = {
        cities,
        isLoading,
        forecast,
        deleteCity,
        saveCity,
        selectedCity,
        setSelectedCity,
        setForecast
    };

    return (
        <AppContext.Provider value={contextData}>
            { children }
        </AppContext.Provider>
    )
};

function useWeather() {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error('useWeather() needs AppProvider');
    }

    return context;
}

export {
    AppsProvider,
    useWeather
};
