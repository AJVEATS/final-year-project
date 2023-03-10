import Base from "Components/Layout/Base/BaseComponent";
import LayoutComponent from "Components/Layout/LayoutComponent/LayoutComponent";
import styles from '@/styles/pages/route.module.scss';
import React, { useState, useEffect } from 'react';
import Head from "next/head";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../api/FirebaseApp";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { faCaretDown, faCaretUp, faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RouteMapComponent from "Components/RouteMapComponent/RouteMapComponent";

const Route = () => {
    const [route, setRoute] = useState({});
    const [isActive, setIsActive] = useState(false);
    const [geoJsonPath, setGeoJsonPath] = useState([]);
    const [isAuthor, setIsAuthor] = useState(false);

    const router = useRouter();
    const routeId = router.query.route;

    useEffect(() => {
        getRoute();
        // console.log(route);
    }, []);


    // console.log(routeId);

    async function getRoute() {
        const auth = getAuth(firebaseApp);
        const db = getFirestore(firebaseApp);
        const docRef = doc(db, 'routes', routeId);
        const docSnap = await getDoc(docRef);
        const uid = (auth.currentUser.uid);
        console.log(uid);

        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            setRoute({ ...docSnap.data() });

            if (route.uid === uid) {
                console.log('this is your route');
            }
        } else {
            console.log("No such document!");
        }
    };

    // console.log(route);

    const displayDirections = () => {
        if (route.directions) {
            return (
                route.directions.map((direction) => (
                    <p className={styles.routeStep}>{direction}</p>
                ))
            );
        } else {
            return ('route directions is not set');
        }
    }

    for (let sets in route.route) {
        geoJsonPath.push([route.route[sets].latitude, route.route[sets].longitude]);
        // console.log(route.route[sets].latitude);
        // console.log(route.route[sets].longitude);
    };


    return (
        <Base>
            <Head>
                <title>Route</title>
            </Head>
            <LayoutComponent>
                <div className={styles.route}>
                    <p className={styles.routeName}>{route.name}</p>
                    <div className={styles.routeMain}>
                        <RouteMapComponent routeInfo={route} geoJsonPath={geoJsonPath} />
                        <div className={styles.routeInfo}>
                            <div className={styles.routeInfoContainer}>
                                <p className={styles.routeDescription}>{route.description}</p>
                                <div className={styles.routeDurationContainer}>
                                    <FontAwesomeIcon icon={faStopwatch} />
                                    <p>{`${route.duration} minutes`}</p>
                                </div>
                            </div>
                            <div className={styles.accordion}>
                                <div className={styles.accordionItem}>
                                    <div className={styles.accordionTitle}
                                        onClick={() => setIsActive(!isActive)}>
                                        <div>Route Directions</div>
                                        <div className={styles.accordionButton}>{isActive ? <FontAwesomeIcon icon={faCaretUp} size={'xs'} /> : <FontAwesomeIcon icon={faCaretDown} />}</div>
                                    </div>
                                    {isActive && <div className={styles.accordionContent}>{displayDirections()}</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutComponent>
        </Base>
    )
}

export default Route;