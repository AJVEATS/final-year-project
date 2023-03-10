import styles from '@/styles/pages/track.module.scss';
import Base from 'Components/Layout/Base/BaseComponent';
import LayoutComponent from 'Components/Layout/LayoutComponent/LayoutComponent';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { getAuth } from 'firebase/auth';
import { firebaseApp } from './api/FirebaseApp';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import RouteSearchComponent from 'Components/RouteSearchComponent/RouteSearchComponent';
import ExploreComponent from 'Components/ExploreComponent/ExploreComponent';

const Track = () => {
    const [routes, setRoutes] = useState([]);
    const [routesNull, setRoutesNull] = useState(false);
    const title = 'Your Created Routes';

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
        });

        // console.log(Object.keys(routes).length);
        if (Object.keys(routes).length === 0) {
            setRoutesNull(true);
        };

    }

    return (
        <Base>
            <Head>
                <title>Your Routes</title>
            </Head>
            <LayoutComponent>
                <div className={styles.trackMain}>
                    <ExploreComponent routes={routes} routesNull={routesNull} title={title} />
                    {/* <RouteSearchComponent /> */}
                </div>
            </LayoutComponent>
        </Base>
    );
}
export default Track;