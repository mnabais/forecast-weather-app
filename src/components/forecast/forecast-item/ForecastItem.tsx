import React from 'react';

// Types
import { ListItem } from "../../../models/types";

// Components
import Image from 'next/image'

// Styles
import styles from '../../../styles/ForecastItem.module.css'

export default function ForecastItem({ forecastItem } : { forecastItem: ListItem }) {
    const { dt, weather, temp } = forecastItem;
    const weekday = new Date(dt * 1000).toLocaleDateString("en-US", {
        weekday: "long",
    });

    return(
        <li className={ styles.forecastItemWrapper }>
            <p className={ styles.weekday } >{weekday}</p>
            <div className={ styles.iconWrapper }>
                <Image src={`/weather-icons/${weather[0].icon}.png`} alt={weather[0].description} width="72" height="58"/>
            </div>
            <p className={ styles.temperatureWrapper }>
                <span className={ styles.maxTemperature }>{`${Math.floor(temp.max)}° `}</span>
                <span className={ styles.minTemperature }>{`${Math.floor(temp.min)}°`}</span>
            </p>
        </li>
    )
}
