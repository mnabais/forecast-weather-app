// Components
import ForecastItem from "./forecast-item/ForecastItem";

// Context
import { useWeather } from '../../context/weatherContext';

// Styles
import styles from '../../styles/Forecast.module.css'

export default function Forecast() {
    const { forecast: { list }, selectedCity } = useWeather();

    return selectedCity ? (
        <ul className={ styles.forecastWrapper }>
            { list.map((forecastItem) => {
                const { dt } = forecastItem

                return <ForecastItem key={ dt } forecastItem={forecastItem}/>;
            }) }
        </ul>
    ) : null;
}
