import styles from '@/styles/pages/tracking.module.scss';
import Base from 'Components/Layout/Base/BaseComponent';
import LayoutComponent from 'Components/Layout/LayoutComponent/LayoutComponent';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { getAuth } from 'firebase/auth';
import { firebaseApp } from './api/FirebaseApp';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';

const Tracking = () => {
    const [routes, setRoutes] = useState([]);

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
            setRoutes(routes => [...routes, { routesId: doc.id, routeData: doc.data() }]);
        });
    }

    return (
        <Base>
            <Head>
                <title>Your Routes</title>
            </Head>
            <LayoutComponent>
                <p>Your Routes</p>
                {routes.map((data) => (
                    <div key={data.routeId} className={styles.routeCard}>
                        <p>{(data.routeData.name)}</p>
                        <p>{data.routeData.privacy}</p>
                        <p>{`${data.routeData.duration} minutes`}</p>
                    </div>
                ))}
            </LayoutComponent>
        </Base>
    );
}
export default Tracking;