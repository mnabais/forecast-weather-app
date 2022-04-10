import React from "react";
import Head from 'next/head'

// Context
import { useWeather } from '../context/weatherContext'

// Components
import CurrentWeather from '../components/current-weather/CurrentWeather';
import Forecast from '../components/forecast/Forecast';
import RemoveButton from '../components/remove-button/RemoveButton';
import Loader from "../components/loader/Loader";

// Styles
import styles from '../styles/Home.module.css'

export default function Home() {
    const { isLoading, forecast } = useWeather();
    const isForecastEmpty = Object.entries(forecast).length === 0

    if (isLoading) {
        return (
            <Loader/>
        )
    }

  return (
        <>
            <Head>
                <title>Weather Forecast</title>
            </Head>
            { !isForecastEmpty ? (
                <div className={styles.weatherAppContainer}>
                    <CurrentWeather />
                    <Forecast />
                    <RemoveButton />
                </div>
            ) : (
                <div className={styles.errorMessage}>Oops! Something went wrong!</div>
            )}
        </>
  )
}
