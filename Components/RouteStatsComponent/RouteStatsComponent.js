import styles from './RouteStatsComponent.module.scss';
import { faHeart, faPersonHiking } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from 'react';
import { getDistance } from 'geolib';

const RouteStatsComponent = ({ routeInfo, geoJsonPath }) => {
    const [distance, setDistance] = useState(0);

    useEffect(() => {

        if (routeInfo.route) {
            const coordinates = geoJsonPath;
            calculateDistance(coordinates);
        }
        // setDistance(geoJsonPath.length);
        // console.log(distance);
    }, [routeInfo, geoJsonPath]);

    const calculateDistance = (coordinatesArray) => {
        // console.log(coordinatesArray);
        let total = 0;
        for (let i = 0; i < coordinatesArray.length; i++) {
            if ((i + 1) < coordinatesArray.length) {
                console.log(geoJsonPath[i]);
                console.log(geoJsonPath[i + 1]);
                total = total + getDistance(coordinatesArray[i], coordinatesArray[i + 1]);

            }
        }
        setDistance(total);
    };



    return (
        <div className={styles.routeInfoComponent}>
            <div className={styles.routeStatsContainer}>
                <div className={styles.routeStatsHeader}>
                    <p>Route Details</p>
                    <FontAwesomeIcon icon={faHeart} />
                </div>
                <div className={styles.routeStatsDashboard}>
                    <div className={styles.routeStat}>
                        <div className={styles.routeStatValue}>
                            <p>20</p>
                            <p className={styles.routeStatValueMetric}>mins</p>
                        </div>
                        <p className={styles.routeStatLabel}>Length</p>
                    </div>
                    <div className={styles.routeStat}>
                        <div className={styles.routeStatValue}>
                            <p>{distance}</p>
                            <p className={styles.routeStatValueMetric}>m</p>
                        </div>
                        <p className={styles.routeStatLabel}>Distance</p>
                    </div>
                    <div className={styles.routeStat}>
                        <div className={styles.routeStatValue}>
                            <p>-</p>
                            <p>00</p>
                            <p className={styles.routeStatValueMetric}>m</p>
                        </div>
                        <p className={styles.routeStatLabel}>Elevation</p>
                    </div>
                </div>
                <div className={styles.routeDescriptionContainer}>
                    <div className={styles.routeDifficultyContainer}>
                        <FontAwesomeIcon icon={faPersonHiking} />
                        <p>{routeInfo.difficulty} level</p>
                    </div>
                    <p className={styles.routeDescription}>{routeInfo.description}</p>
                </div>
                <button id='downloadIntructions' className={styles.intructionsButton}>Download Route Intructions</button>
                <div className={styles.routeElevationContainer}>

                </div>
            </div>
        </div>
    )
}

export default RouteStatsComponent;