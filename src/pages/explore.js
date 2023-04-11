import styles from '@/styles/pages/explore.module.scss';
import React, { useEffect, useState } from 'react';
import ExploreComponent from 'Components/ExploreComponent/ExploreComponent';
import Base from 'Components/Layout/Base/BaseComponent';
import LayoutComponent from 'Components/Layout/LayoutComponent/LayoutComponent';
import Head from 'next/head';
import { getAuth } from 'firebase/auth';
import { firebaseApp } from './api/FirebaseApp';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import SearchComponent from 'Components/SearchComponent/SearchComponent';

const Explore = () => {
    const [allRoutes, setAllRoutes] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [routesNull, setRoutesNull] = useState(false);
    const [nameQuery, setNameQuery] = useState('');
    const [distanceQuery, setDistanceQuery] = useState(10000);
    const [durationQuery, setDurationQuery] = useState(180);
    const title = 'Explore Community Routes';

    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);

    useEffect(() => {
        getPublicRoutes();
        document.getElementById("public").style.backgroundColor = "#306b34";
        document.getElementById("public").style.color = "#ffffff";
    }, []);

    async function getPublicRoutes() {
        const routeQuery = query(collection(db, 'routes'), where('privacy', '==', 'public'));
        const querySnapshot = await getDocs(routeQuery);
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
        setNameQuery('');
        setRoutes(allRoutes);
    };

    return (
        <Base>
            <Head>
                <title>Explore</title>
            </Head>
            <LayoutComponent>
                <div className={styles.exploreMain}>
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
        </Base >
    );
}
export default Explore;