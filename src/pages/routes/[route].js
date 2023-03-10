import Base from "Components/Layout/Base/BaseComponent";
import LayoutComponent from "Components/Layout/LayoutComponent/LayoutComponent";
import styles from '@/styles/pages/route.module.scss';
import React, { useState, useEffect } from 'react';
import Head from "next/head";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../api/FirebaseApp";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { faCaretDown, faCaretUp, faStopwatch, faPersonHiking, faHiking } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RouteMapComponent from "Components/RouteMapComponent/RouteMapComponent";
import EditRouteForm from "Components/forms/EditRouteForm/EditRouteForm";

const Route = () => {
    const [route, setRoute] = useState({});
    const [isActive, setIsActive] = useState(false);
    const [geoJsonPath, setGeoJsonPath] = useState([]);
    const [isAuthor, setIsAuthor] = useState('none');
    const [formState, setFormState] = useState('none');

    const router = useRouter();
    const routeId = router.query.route;

    useEffect(() => {
        getRoute();
        // console.log(route);
    }, []);


    // console.log(routeId);


    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);
    const docRef = doc(db, 'routes', routeId);
    const uid = (auth.currentUser.uid);

    async function getRoute() {

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            setRoute({ ...docSnap.data() });

            // console.log(uid);
            // console.log(docSnap.data().uid);

            if (docSnap.data().uid == uid) {
                // console.log('this is your route');
                setIsAuthor('block');
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

    const handleForm = () => {
        if (formState == 'none') {
            setFormState('block');
        } else if (formState == 'block') {
            setFormState('none');
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
                    <div className={styles.routeMain}>
                        <RouteMapComponent routeInfo={route} geoJsonPath={geoJsonPath} />
                        <div className={styles.routeInfo}>
                            <div className={styles.routeInfoContainer}>
                                <div className={styles.routeDescriptionContainer}>
                                    <p className={styles.routeDescriptionTitle}>Description:</p>
                                    <p className={styles.routeDescription}>{route.description}</p>
                                </div>
                                <div className={styles.routeDifficultyContainer}>
                                    <FontAwesomeIcon icon={faHiking} />
                                    <p className={styles.routeDifficulty}>{`${route.difficulty} level`}</p>
                                </div>
                                <div className={styles.routeDurationContainer}>
                                    <FontAwesomeIcon icon={faStopwatch} />
                                    <p className={styles.routeDuration}>{`${route.duration} minutes`}</p>
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
                    <button className={styles.formButton} style={{ 'display': isAuthor }} onClick={() => handleForm()}>Edit Route Details</button>
                    <EditRouteForm displaySetting={formState} route={route} setDisplaySetting={setFormState} uid={uid} db={db} routeId={routeId} />
                </div>
            </LayoutComponent>
        </Base>
    )
}

export default Route;