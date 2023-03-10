import Link from 'next/link';
import styles from './ExploreComponent.module.scss';
import React, { useEffect, useState } from 'react';

const ExploreComponent = ({ routes, routesNull, title }) => {
    const [noRoutesState, setNoRoutesState] = useState('none');

    useEffect(() => {
        if (routesNull == true) {
            setNoRoutesState('block');
        }

    }, []);
    // console.log(routes);

    console.log(routes);

    return (
        <div className={styles.exploreList}>
            <p className={styles.exploreTitle}>{title}</p>
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
                                {/* <p className={styles.routeDistance}>00.00km</p> */}
                                <p>{`${data.routeData.duration} minutes`}</p>
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