/**
 * @fileoverview This file represets RouteWeatherComponent which displays the current weather
 * for the selected route.
 * 
 * @param {Object} routeCoordinates - An object containing the routes path coordinates
 */

import styles from './RouteWeatherComponent.module.scss';
import React, { useState, useEffect } from 'react';
import key from '@/pages/api/OpenWeatherMapAPI';

const RouteWeatherComponent = ({ routeCoordinates }) => {
    const [weather, setWeather] = useState({
        'condition': 'loading...',
        'temp': '00',
        'clouds': '00',
        'wind': '00',
    });

    useEffect(() => {
        if (routeCoordinates) {
            getWeather(routeCoordinates[0]);
        }
    }, [routeCoordinates]);

    useEffect(() => {

    }, [weather]);

    /**
     * This async function gets the weather of the passed in coordinates using the OpenWeatherMap API. It then updates
     * the weather useState object.
     * 
     * @param {object} coordinates - A coordinate object in the latLng format e.g. {'latitude': 10, 'longitude': 10}.
     */
    async function getWeather(coordinates) {
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${key.key}&units=metric`)
            .then((reponse) => reponse.json())
            .then((responseJSON) => {
                console.log(responseJSON)
                weather.condition = responseJSON.weather[0].description;
                weather.temp = Math.round(responseJSON.main.temp);
                weather.clouds = responseJSON.clouds.all;
                weather.wind = responseJSON.wind.speed;
            });
    };

    return (
        <div className={styles.routeWeatherComponent}>
            <p>{weather.temp}°C with {weather.condition}</p>
            <p>{weather.clouds}% Cloud coverage</p>
            <p>{weather.wind} m/s Winds</p>
        </div>
    )
}

export default RouteWeatherComponent;