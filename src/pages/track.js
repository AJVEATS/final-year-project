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
    const [nameQuery, setNameQuery] = useState('');
    const [distanceQuery, setDistanceQuery] = useState(10000);
    const [durationQuery, setDurationQuery] = useState(180);
    const title = 'Your Routes';

    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);

    useEffect(() => {
        getUserRoutes();
        document.getElementById("users").style.backgroundColor = "#306b34";
        document.getElementById("users").style.color = "#ffffff";
    }, []);

    async function getUserRoutes() {
        const user = (auth.currentUser);
        const userRouteQuery = query(collection(db, 'routes'), where('uid', '==', user.uid));
        const querySnapshot = await getDocs(userRouteQuery);
        setRoutes([]);
        querySnapshot.forEach((doc) => {
            setRoutes(routes => [...routes, { routeId: doc.id, routeData: doc.data() }]);
            setAllRoutes(routes => [...routes, { routeId: doc.id, routeData: doc.data() }]);
            // console.log(doc.id, " => ", doc.data()); // For Testing
        });

        if (Object.keys(routes).length === 0) {
            setRoutesNull(true);
        };
    };


    const clearFilters = () => {
        setDistanceQuery(10000);
        setDurationQuery(180);
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
                    <ExploreComponent
                        routes={routes}
                        routesNull={routesNull}
                        title={title} />
                    <SearchComponent
                        distanceQuery={distanceQuery}
                        setDistanceQuery={setDistanceQuery}
                        durationQuery={durationQuery}
                        setDurationQuery={setDurationQuery}
                        clearFilters={clearFilters}
                        nameQuery={nameQuery}
                        setNameQuery={setNameQuery}
                        setRoutes={setRoutes}
                        allRoutes={allRoutes} />
                </div>
            </LayoutComponent>
        </Base>
    );
}
export default Track;