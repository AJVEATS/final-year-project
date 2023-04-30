/**
 * @fileoverview This file represets RouteWeatherComponent which displays the current weather
 * for the selected route.
 * 
 * @param {Object} routeCoordinates - An object containing the routes path coordinates
 */
import styles from './RouteWeatherComponent.module.scss';
import React, { useState, useEffect } from 'react';
import { faHeart, faPersonHiking, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import key from '@/pages/api/OpenWeatherMapAPI';

const RouteWeatherComponent = ({ routeCoordinates }) => {
    const [gotWeather, setGotWeather] = useState(false);
    const [weatherIcon, setWeatherIcon] = useState('');
    const [weather, setWeather] = useState({
        'condition': 'loading...',
        'temp': '00',
        'clouds': '00',
        'wind': '00',
        'sunrise': 'loading...',
        'sunset': 'loading...'
    });

    useEffect(() => {
        if (routeCoordinates) {
            getWeather(routeCoordinates[0]);
        }
    }, [routeCoordinates]);

    useEffect(() => {
        // console.log(weather.temp);
        if (weather.condition === "Fog") {
            setWeatherIcon(<FontAwesomeIcon icon={faPenToSquare} />)
        } else if (weather.condition === "Rain") {
            setWeatherIcon(<FontAwesomeIcon icon={faPenToSquare} />)
        } else if (weather.condition === "Clear") {
            setWeatherIcon(<FontAwesomeIcon icon={faPenToSquare} />)
        } else if (weather.condition === "Clouds") {
            setWeatherIcon(<FontAwesomeIcon icon={faPenToSquare} />)
        } else if (weather.condition === "Snow") {
            setWeatherIcon(<FontAwesomeIcon icon={faPenToSquare} />)
        } else if (weather.condition === "Drizzle") {
            setWeatherIcon(<FontAwesomeIcon icon={faPenToSquare} />)
        } else if (weather.condition === "Thunderstorm") {
            setWeatherIcon(<FontAwesomeIcon icon={faPenToSquare} />)
        } else {
            setWeatherIcon(<FontAwesomeIcon icon={faPenToSquare} />)
        }
    }, [gotWeather]);

    /**
     * This function takes in a unixtimestamp and converts it to this format 00:00, which the function returns.
     * 
     * @param {String} timestamp 
     * @returns Unix timestamp as 24hr time
     */
    const convertUnixTimeStamp = (timestamp) => {
        var dt = new Date(timestamp * 1000);
        return (dt.getHours()) + ':' + ("0" + dt.getMinutes()).substr(-2);
    }

    /**
     * This async function gets the weather of the passed in coordinates using the OpenWeatherMap API. It then updates
     * the weather useState object.
     * 
     * @param {object} coordinates - A coordinate object in the latLng format e.g. {'latitude': 10, 'longitude': 10}.
     */
    async function getWeather(coordinates) {
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${coordinates.longitude}&lon=${coordinates.latitude}&appid=${key.key}&units=metric`)
            .then((reponse) => reponse.json())
            .then((responseJSON) => {
                // console.log(responseJSON)
                console.log(`http://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${key.key}&units=metric`);
                weather.condition = responseJSON.weather[0].description;
                weather.temp = Math.round(responseJSON.main.temp);
                weather.clouds = responseJSON.clouds.all;
                weather.wind = responseJSON.wind.speed;
                weather.sunrise = convertUnixTimeStamp(responseJSON.sys.sunrise);
                weather.sunset = convertUnixTimeStamp(responseJSON.sys.sunset);
                setGotWeather(true);
            });
    };

    return (
        <div className={styles.routeWeatherComponent}>
            <div className={styles.routeWeatherStats}>
                <div className={styles.routeWeatherStat}>
                    <div className={styles.routeWeatherStatValue}>
                        <p>{weather.temp}°C</p>
                    </div>
                    <div className={styles.routeWeaterStatLabel}>
                        <p>Temp</p>
                    </div>
                </div>
                <div className={styles.routeWeatherStat}>
                    <div className={styles.routeWeatherStatValue}>
                        <div className={styles.routeConidtionIcon}>{weatherIcon}</div>
                    </div>
                    <div className={styles.routeWeaterStatLabel}>
                        <p>{weather.condition}</p>
                    </div>
                </div>
                <div className={styles.routeWeatherStat}>
                    <div className={styles.routeWeatherStatValue}>
                        <p>{weather.clouds}%</p>
                    </div>
                    <div className={styles.routeWeaterStatLabel}>
                        <p>Clouds</p>
                    </div>
                </div>
                <div className={styles.routeWeatherStat}>
                    <div className={styles.routeWeatherStatValue}>
                        <p>{weather.sunrise}</p>
                    </div>
                    <div className={styles.routeWeaterStatLabel}>
                        <p>Sunrise</p>
                    </div>
                </div>
                <div className={styles.routeWeatherStat}>
                    <div className={styles.routeWeatherStatValue}>
                        <p>{weather.sunset}</p>
                    </div>
                    <div className={styles.routeWeaterStatLabel}>
                        <p>Sunset</p>
                    </div>
                </div>
                <div className={styles.routeWeatherStat}>
                    <div className={styles.routeWeatherStatValue}>
                        <p>{weather.wind} m/s</p>
                    </div>
                    <div className={styles.routeWeaterStatLabel}>
                        <p>Winds</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RouteWeatherComponent;