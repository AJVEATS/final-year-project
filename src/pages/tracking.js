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
        console.log(routes);
    }, []);

    async function getUserRoutes() {
        setRoutes([]);
        const auth = getAuth(firebaseApp);
        const uid = (auth.currentUser.uid);
        console.log(uid);
        const db = getFirestore(firebaseApp);
        const userRouteQuery = query(collection(db, "routes"), where('uid', '==', uid));

        const querySnapshot = await getDocs(userRouteQuery);
        querySnapshot.forEach((doc) => {
            setRoutes(routes => [...routes, { routeId: doc.id, routeData: doc.data() }]);
            console.log(doc.id, " => ", doc.data()); // For Testing
        });
    }

    return (
        <Base>
            <Head>
                <title>Your Routes</title>
            </Head>
            <LayoutComponent>
                <p>Your Routes</p>
            </LayoutComponent>
        </Base>
    );
}
export default Tracking;