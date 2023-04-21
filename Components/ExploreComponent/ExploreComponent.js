import Link from 'next/link';
import styles from './ExploreComponent.module.scss';
import { faRoute, faClock, faPersonHiking } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from 'react';
import ExploreNavigationComponent from './ExploreNavigationComponent/ExploreNavigationComponent';

const ExploreComponent = ({ routes, title, filter, setFilter, setTitle }) => {
    const [displayTitle, setDisplayTitle] = useState();

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

    useEffect(() => {
        if (routes.length == 0) {
            setDisplayTitle('😥 No Routes Found');
        } else if (routes.length > 0) {
            setDisplayTitle(title);
        }
    }, [routes]);

    console.log(`routes length ${routes.length}`);

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