import styles from '@/styles/pages/explore.module.scss';

import React, { useEffect, useState } from 'react';
import ExploreComponent from 'Components/ExploreComponent/ExploreComponent';
import Base from 'Components/Layout/Base/BaseComponent';
import LayoutComponent from 'Components/Layout/LayoutComponent/LayoutComponent';
import Head from 'next/head';
import { getAuth } from 'firebase/auth';
import { firebaseApp } from './api/FirebaseApp';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import RouteSearchComponent from 'Components/SearchComponent/RouteSearchComponent/RouteSearchComponent';
import SearchComponent from 'Components/SearchComponent/SearchComponent';
const Explore = () => {
    const [routes, setRoutes] = useState([]);
    const [routesNull, setRoutesNull] = useState(false);
    const title = 'Explore Community Routes';
    useEffect(() => {
        getPublicRoutes();
    }, []);

    async function getPublicRoutes() {
        const auth = getAuth(firebaseApp);
        const db = getFirestore(firebaseApp);
        const routeQuery = query(collection(db, 'routes'), where('privacy', '==', 'public'));

        const querySnapshot = await getDocs(routeQuery);
        setRoutes([]);
        querySnapshot.forEach((doc) => {
            setRoutes(routes => [...routes, { routeId: doc.id, routeData: doc.data() }]);
            // routes.push({ routeId: doc.id, routeData: doc.data() });
            // console.log(doc.id, " => ", doc.data()); // For Testing
        });

        // console.log(Object.keys(routes).length);
        if (Object.keys(routes).length === 0) {
            setRoutesNull(true);
        };
    };

    return (
        <Base>
            <Head>
                <title>Explore</title>
            </Head>
            <LayoutComponent>
                <div className={styles.exploreMain}>
                    <ExploreComponent routes={routes} routesNull={routesNull} title={title} />
                    {/* <RouteSearchComponent /> */}
                    <SearchComponent />
                </div>
            </LayoutComponent>
        </Base >
    );
}
export default Explore;