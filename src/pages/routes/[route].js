import Base from "Components/Layout/Base/BaseComponent";
import LayoutComponent from "Components/Layout/LayoutComponent/LayoutComponent";

import styles from '@/styles/pages/route.module.scss';

import React, { useState, useEffect } from 'react';
import Head from "next/head";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../api/FirebaseApp";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const Route = () => {
    const [route, setRoute] = useState({});
    const router = useRouter();
    const routeId = router.query.route;

    useEffect(() => {
        getRoute();
        // console.log(route);
    }, []);


    // console.log(routeId);

    async function getRoute() {
        const db = getFirestore(firebaseApp);
        const docRef = doc(db, 'routes', routeId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            setRoute({ ...docSnap.data() });
        } else {
            console.log("No such document!");
        }
    };

    // console.log(route);

    const displayDirections = () => {
        if (route.directions) {
            return (
                route.directions.map((direction) => (
                    <p>{direction}</p>
                ))
            );
        } else {
            return ('route directions is not set');
        }
    }


    return (
        <Base>
            <Head>
                <title>Route</title>
            </Head>
            <LayoutComponent>
                <div className={styles.route}>
                    <p className={styles.routeName}>{route.name}</p>
                    <p className={styles.routeDescription}>{route.description}</p>
                    <p className={styles.routeDuration}>{`${route.duration} minutes`}</p>
                    <div>
                        {/* {route.directions.map((direction) => (
                            <p>{direction}</p>
                        ))} */}
                        {displayDirections()}
                    </div>
                </div>
            </LayoutComponent>
        </Base>
    )
}

export default Route;