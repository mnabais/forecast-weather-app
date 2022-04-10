import React from 'react';
import { useWeather } from "../../context/weatherContext";

// Styles
import styles from '../../styles/RemoveButton.module.css'

export default function RemoveButton() {
    const { deleteCity, selectedCity, cities } = useWeather();

    return selectedCity ? (
        <button
            className={ styles.removeButtonWrapper }
            onClick={ () => {
                deleteCity(selectedCity.cityId);
            }} >
            Remove Location
        </button>
    ): null
}
