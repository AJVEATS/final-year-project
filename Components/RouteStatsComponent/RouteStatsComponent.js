import styles from './RouteStatsComponent.module.scss';
import { faHeart, faPersonHiking } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { saveAs } from "file-saver";
import React, { useState, useEffect } from 'react';

const RouteStatsComponent = ({ routeInfo }) => {

    const handleFavouritePress = () => {
        console.log('handleFavouritePress() initiated');
    };

    const handleDirectionsClick = () => {
        let directions = `Directions for ${routeInfo.name} \n`;
        console.log(routeInfo.directions[0]);
        for (const step in routeInfo.directions) {
            directions = directions + `- ${routeInfo.directions[step]} \n`;
        };
        const blob = new Blob([directions], { type: "text/plain;charset=utf-8" });
        saveAs(blob, `${routeInfo.name}_directions.txt`);
    };

    return (
        <div className={styles.routeInfoComponent}>
            <div className={styles.routeStatsContainer}>
                <div className={styles.routeStatsHeader}>
                    <p>Route Details</p>
                    {/* <div className={styles.heartContainer}>
                        <FontAwesomeIcon icon={faHeart} onClick={() => handleFavouritePress()} />
                    </div> */}
                </div>
                <div className={styles.routeStatsDashboard}>
                    <div className={styles.routeStat}>
                        <div className={styles.routeStatValue}>
                            <p>{routeInfo.duration}</p>
                            <p className={styles.routeStatValueMetric}>mins</p>
                        </div>
                        <p className={styles.routeStatLabel}>Length</p>
                    </div>
                    <div className={styles.routeStat}>
                        <div className={styles.routeStatValue}>
                            <p>{routeInfo.distance}</p>
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
                <button id='downloadIntructions' className={styles.intructionsButton} onClick={() => handleDirectionsClick()}>Download Route Intructions</button>
                <div className={styles.routeElevationContainer}>

                </div>
            </div>
        </div>
    );
}

export default RouteStatsComponent;