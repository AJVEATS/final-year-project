import styles from '@/styles/pages/explore.module.scss';

import React, { useEffect, useState } from 'react';
import ExploreComponent from 'Components/ExploreComponent/ExploreComponent';
import Base from 'Components/Layout/Base/BaseComponent';
import LayoutComponent from 'Components/Layout/LayoutComponent/LayoutComponent';
import Head from 'next/head';
import { getAuth } from 'firebase/auth';
import { firebaseApp } from './api/FirebaseApp';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import RouteSearchComponent from 'Components/RouteSearchComponent/RouteSearchComponent';
const Explore = () => {
    const [routes, setRoutes] = useState([]);
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
    };

    return (
        <Base>
            <Head>
                <title>Explore</title>
            </Head>
            <LayoutComponent>
                <div className={styles.exploreMain}>
                    <ExploreComponent routes={routes} />
                    {/* <RouteSearchComponent /> */}
                </div>
            </LayoutComponent>
        </Base >
    );
}
export default Explore;