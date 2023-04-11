import Link from 'next/link';
import styles from './ExploreComponent.module.scss';
import { faRoute, faClock, faPersonHiking } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from 'react';
import ExploreNavigationComponent from './ExploreNavigationComponent/ExploreNavigationComponent';

const ExploreComponent = ({ routes, routesNull, title }) => {
    const [noRoutesState, setNoRoutesState] = useState('none');

    useEffect(() => {
        if (routesNull == true) {
            setNoRoutesState('block');
        };
    }, []);

    const formatDistance = (distance) => {
        let formattedDistance = '';
        if (distance >= 1000) {
            formattedDistance = `${(distance / 1000).toFixed(2)}km`
        } else {
            formattedDistance = `${distance}m`;
        };
        return formattedDistance;
    };

    const formatDuration = (duration) => {
        let formattedDuration = '';
        if (duration >= 60) {
            formattedDuration = `${(duration / 60).toFixed(1)}hrs`
        } else if (duration < 60) {
            formattedDuration = `${duration}mins`
        };
        return formattedDuration;
    };

    return (
        <div className={styles.exploreList}>
            <p className={styles.exploreTitle}>{title}</p>
            <ExploreNavigationComponent />
            <div className={styles.routesContainer}>
                <p className={styles.noRoutes} style={{ 'display': noRoutesState }}>No saved routes</p>
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