/**
 * @fileoverview This file represets the ExploreComponent which displays the walking routes. It allows users to 
 * apply filters to change which routes are displayed with the ExploreNavigationComponent. The walking routes 
 * are displayed as a list, their distance and duration are formatted as well.
 * 
 * @param {Object} routes - An object containing all the routes and their data
 * @param {string} title - The useState string for the pages title from the discover.js page 
 * @param {string} filter - The useState string for the current filter applied from the discover.js page
 * @param {function} setFilter - A function to update the useState varible from the discover.js page
 * 
 */
import Link from 'next/link';
import styles from './ExploreComponent.module.scss';
import { faRoute, faClock, faPersonHiking } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from 'react';
import ExploreNavigationComponent from './ExploreNavigationComponent/ExploreNavigationComponent';

const ExploreComponent = ({ routes, title, filter, setFilter }) => {
    const [displayTitle, setDisplayTitle] = useState();

    /**
     * This function takes in a distance in meters in and formats it to a string.
     * If the distance is over 1,000 the route is converted to kilometers.
     * 
     * @param {number} distance - The distance of the route in meters
     */
    const formatDistance = (distance) => {
        let formattedDistance = '';
        if (distance >= 1000) {
            formattedDistance = `${(distance / 1000).toFixed(2)}km`
        } else {
            formattedDistance = `${distance}m`;
        };
        return formattedDistance;
    };

    /**
     * This function takes in a duration in minutes in and formats it to a string.
     * If the duration is over 60 the route is converted to hours.
     * 
     * @param {number} duration - The duration of the route in minutes
     */
    const formatDuration = (duration) => {
        let formattedDuration = '';
        if (duration >= 60) {
            const hours = Math.floor(duration / 60);
            const minutes = duration % 60;
            formattedDuration = `${hours}hr ${minutes}mins`;
        } else if (duration < 60) {
            formattedDuration = `${duration}mins`
        };
        return formattedDuration;
    };

    /**
    * If there are no route with the current filter or search criteria the title is updated to a string telling 
    * the user that there are no routes.
    */
    useEffect(() => {
        if (routes.length == 0) {
            setDisplayTitle('😥 No Routes Found');
        } else if (routes.length > 0) {
            setDisplayTitle(title);
        }
    }, [routes]);

    return (
        <div className={styles.exploreList}>
            <p className={styles.exploreTitle}>{displayTitle}</p>
            <ExploreNavigationComponent
                filter={filter}
                setFilter={setFilter} />
            <div className={styles.routesContainer}>
                {routes.map((data) => (
                    <Link
                        href={{
                            pathname: `/routes/${data.routeId}`
                        }}>
                        <div key={data.routeId} className={styles.routeCard}>
                            <p className={styles.routeTitle}>{(data.routeData.name)}</p>
                            <div className={styles.routeStats}>
                                <div className={styles.routeLength}>
                                    <FontAwesomeIcon icon={faRoute} />
                                    <p>{formatDistance(data.routeData.distance)}</p>
                                </div>
                                <div className={styles.routeDuration}>
                                    <FontAwesomeIcon icon={faClock} />
                                    <p>{formatDuration(data.routeData.duration)}</p>
                                </div>
                                <div className={styles.routeDifficulty}>
                                    <FontAwesomeIcon icon={faPersonHiking} />
                                    <p>{`${data.routeData.difficulty} level`}</p>
                                </div>
                                {/* <p>{data.routeId}</p> */}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ExploreComponent;