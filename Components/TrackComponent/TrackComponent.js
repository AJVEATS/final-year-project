import Link from 'next/link';
import styles from './TrackComponent.module.scss';
import React, { useEffect, useState } from 'react';

const TrackComponent = ({ routes, routesNull }) => {
    const [noRoutesState, setNoRoutesState] = useState('none');

    useEffect(() => {
        if (routesNull == true) {
            setNoRoutesState('none');
        } else if (routesNull == false) {
            setNoRoutesState('block');
        };

    }, []);

    console.log(routesNull);
    return (
        <div className={styles.trackList}>
            <p className={styles.trackTitle}>Your create routes</p>
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
                                <p className={styles.routeDistance}>00.00km</p>
                                <p>{`${data.routeData.duration} minutes`}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default TrackComponent;