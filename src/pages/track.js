import styles from '@/styles/pages/track.module.scss';
import Base from 'Components/Layout/Base/BaseComponent';
import LayoutComponent from 'Components/Layout/LayoutComponent/LayoutComponent';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { getAuth } from 'firebase/auth';
import { firebaseApp } from './api/FirebaseApp';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import ExploreComponent from 'Components/ExploreComponent/ExploreComponent';
import SearchComponent from 'Components/SearchComponent/SearchComponent';

const Track = () => {
    const [allRoutes, setAllRoutes] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [routesNull, setRoutesNull] = useState(false);
    const [distanceQuery, setDistanceQuery] = useState(10000);
    const [durationQuery, setDurationQuery] = useState(100);
    const title = 'Your Routes';

    useEffect(() => {
        getUserRoutes();
    }, []);

    async function getUserRoutes() {
        const auth = getAuth(firebaseApp);
        const db = getFirestore(firebaseApp);
        const user = (auth.currentUser);
        const userRouteQuery = query(collection(db, 'routes'), where('uid', '==', user.uid));

        const querySnapshot = await getDocs(userRouteQuery);
        setRoutes([]);
        querySnapshot.forEach((doc) => {
            setRoutes(routes => [...routes, { routeId: doc.id, routeData: doc.data() }]);
            setAllRoutes(routes => [...routes, { routeId: doc.id, routeData: doc.data() }]);
        });

        // console.log(Object.keys(routes).length);
        if (Object.keys(routes).length === 0) {
            setRoutesNull(true);
        };
    };

    const filterRoutesByDistance = (distance) => {
        setRoutes([]);
        const distanceFilteredRoutes = allRoutes.filter(route => route.routeData.distance <= distance);
        console.log(distanceFilteredRoutes);
        // setRoutes([distanceFilteredRoutes]);
        setRoutes(distanceFilteredRoutes);
    }

    const filterRoutesByDuration = (duration) => {
        setRoutes([]);
        const durationFilteredRoutes = allRoutes.filter(routes => routes.routeData.duration <= duration);
        console.log(durationFilteredRoutes);
        setRoutes(durationFilteredRoutes);
        // setRoutes(durationFilteredRoutes);
    };

    const clearFilters = () => {
        setDistanceQuery(10000);
        setDurationQuery(100);
        setRoutes([]);
        setRoutes(allRoutes);
    };

    return (
        <Base>
            <Head>
                <title>Your Routes</title>
            </Head>
            <LayoutComponent>
                <div className={styles.trackMain}>
                    <ExploreComponent routes={routes} routesNull={routesNull} title={title} />
                    <SearchComponent
                        distanceQuery={distanceQuery}
                        setDistanceQuery={setDistanceQuery}
                        filterRoutesByDistance={filterRoutesByDistance}
                        durationQuery={durationQuery}
                        setDurationQuery={setDurationQuery}
                        filterRoutesByDuration={filterRoutesByDuration}
                        clearFilters={clearFilters} />
                </div>
            </LayoutComponent>
        </Base>
    );
}
export default Track;