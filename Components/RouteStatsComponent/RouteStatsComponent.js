import styles from './RouteStatsComponent.module.scss';
import { faHeart, faPersonHiking } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from 'react';
import { getDistance } from 'geolib';
import { doc, setDoc } from 'firebase/firestore';

const RouteStatsComponent = ({ routeInfo, geoJsonPath, db, routeId }) => {
    const [distance, setDistance] = useState();
    console.log(routeInfo);

    // useEffect(() => {

    //     if (routeInfo.route && !routeInfo.elevation) {
    //         // const coordinates = geoJsonPath;
    //         routeInfo.distance = getElevationData(geoJsonPath);

    //         // try {
    //         //     const collectionRef = doc(db, 'routes', routeId);
    //         //     setDoc(collectionRef, routeInfo, { merge: true });

    //         // } catch (e) {
    //         //     console.error(`Error adding document: ${e}`);
    //         // }
    //     }
    //     // setDistance(geoJsonPath.length);
    //     // console.log(distance);
    // }, [routeInfo, geoJsonPath]);

    // const getElevationData = (coordinatesArray) => {
    //     // console.log('getElevation() initiated');
    //     // console.log(coordinatesArray);
    //     // let total = 0;
    //     // for (let i = 0; i < coordinatesArray.length; i++) {
    //     //     // console.log(coordinatesArray[i]);

    //     // }
    //     // return total;
    // }

    const handleDirectionsClick = () => {
        console.log('handleDirectionsClick initiated');
        return null;
    }

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
    )
}

export default RouteStatsComponent;