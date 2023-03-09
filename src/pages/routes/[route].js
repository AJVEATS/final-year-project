import Base from "Components/Layout/Base/BaseComponent";
import LayoutComponent from "Components/Layout/LayoutComponent/LayoutComponent";

import styles from '@/styles/pages/route.module.scss';

import React, { useState, useEffect } from 'react';
import Head from "next/head";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../api/FirebaseApp";
import { doc, getDoc, getFirestore } from "firebase/firestore";


import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Route = () => {
    const [route, setRoute] = useState({});
    const [isActive, setIsActive] = useState(false);

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
                    <p className={styles.routeStep}>{direction}</p>
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
                    {/* <div> */}
                    {/* {route.directions.map((direction) => (
                            <p>{direction}</p>
                        ))} */}
                    {/* {displayDirections()}
                    </div> */}
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
            </LayoutComponent>
        </Base>
    )
}

export default Route;