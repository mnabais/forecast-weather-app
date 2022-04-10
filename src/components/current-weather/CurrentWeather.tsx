import { FormEvent, useState } from 'react';
import classNames from 'classnames';

// Services
import weatherApi from '../../services/OpenWeatherApi'

// Context
import { useWeather } from '../../context/weatherContext'

// Types
import { SavedCity } from "../../models/types";

// Components
import Image from "next/image";
import {returnStatement} from "@babel/types";

// Styles
import styles from '../../styles/CurrentWeather.module.css'

export default function CurrentWeather() {
    const [searchValue, setSearchValue] = useState('');
    const [error, setError] = useState(false);

    const { cities, forecast, selectedCity, setSelectedCity, saveCity, setForecast } = useWeather();
    const { weather, temp, feels_like, humidity, speed, dt } = forecast.list[0];
    const convertedDate = new Date(dt * 1000).toLocaleDateString("en-GB", {
        weekday: "long",
        day: 'numeric',
        month: 'long'
    });

    const handleAddCity = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const forecast = searchValue && await weatherApi.getForecastWeatherByCity(searchValue);

        if (forecast) {
            setForecast(forecast.data);
            saveCity({
                cityName: forecast.data.city.name,
                cityId: forecast.data.city.id,
                countryName: forecast.data.city.country,
            })
        } else {
            setError(true)
        }
        setSearchValue('');
    }

    const handleSelectCity = async (city: SavedCity) => {
       const forecast = await weatherApi.getForecastWeatherByCity(city.cityName);

        if (forecast) {
            setSelectedCity(city)
            setForecast(forecast.data);
        }
    }

    return(
        <div className={ styles.currentWeatherWrapper }>
            <div className={ styles.headerWrapper }>
                <div className={ styles.titleDateContainer }>
                    <h1 className={ styles.title }>Weather Forecast</h1>
                    {selectedCity && <h2 className={styles.currentDate}>{convertedDate}</h2>}
                </div>
                <form className={ styles.addCityForm } onSubmit={ handleAddCity }>
                    <input
                        placeholder={ 'Enter a city name' }
                        className={ styles.addCityInput }
                        value={ searchValue }
                        onChange={event => {
                            setError(false);
                            setSearchValue(event.target.value);
                        }} />
                    <button className={ styles.addIcon } type="submit">
                        <Image src={`/add.svg`} alt={'add icon'} width="30" height="30"/>
                    </button>
                    { error && <span className={ styles.error }>{'City not found'}</span> }
                </form>
            </div>
            <ol className={ styles.locationsTabs }>
            { cities.map((city) => {
                const isActive = selectedCity && city.cityId === selectedCity.cityId;
                return (
                    <li
                        key={ city.cityId }
                        className={classNames(styles.tab, isActive && styles.activeTab)}
                        onClick={ () => handleSelectCity(city) }>
                        {city.cityName}
                    </li>
                );
            })}
            </ol>
            <div className={ classNames(!selectedCity && styles.cardWithoutCity, styles.currentWeatherCard) }>
                { selectedCity ? (
                    <>
                    <div className={styles.currentWeatherInfo}>
                        <div className={styles.topWrapper}>
                            <div
                                className={styles.cityName}>{`${selectedCity.cityName}, ${selectedCity.countryName}`}</div>
                        </div>
                        <div className={styles.bottomWrapper}>
                            <div className={styles.icon}>
                                <Image src={`/weather-icons/${weather[0].icon}.png`} alt={weather[0].description}
                                       width="67"
                                       height="53"/>
                            </div>
                            <div className={styles.temperatureWrapper}>
                                <span className={styles.maxTemperature}>{`${Math.floor(temp.max)}° `}</span>
                                <span className={styles.minTemperature}>{`${Math.floor(temp.min)}°`}</span>
                                <p className={styles.weatherDescriptive}>{weather[0].description}</p>
                            </div>
                            <div className={styles.conditionWrapper}>
                                <p className={styles.precipitation}>{`Feels Like: ${Math.floor(feels_like.day)}°`}</p>
                                <p className={styles.humidity}>{`Humidity: ${humidity}`}</p>
                                <p className={styles.wind}>{`Wind: ${speed} m/s`}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.illustration} >
                    <Image src={`/city1.svg`} alt={'add icon'} width="400" height="205"/>
                    </div>
                    </>
                    ) :
                    <div className={ styles.labelWithoutCity } >
                        You need to enter a city name
                    </div>
                }
            </div>
        </div>
    )
}
