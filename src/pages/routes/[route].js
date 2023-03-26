import Base from "Components/Layout/Base/BaseComponent";
import LayoutComponent from "Components/Layout/LayoutComponent/LayoutComponent";
import styles from '@/styles/pages/route.module.scss';
import React, { useState, useEffect } from 'react';
import Head from "next/head";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../api/FirebaseApp";
import { deleteDoc, doc, getDoc, getFirestore } from "firebase/firestore";
import { faCaretDown, faCaretUp, faStopwatch, faTrash, faHiking, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RouteMapComponent from "Components/RouteMapComponent/RouteMapComponent";
import EditRouteForm from "Components/forms/EditRouteForm/EditRouteForm";
import RouteStatsComponent from "Components/RouteStatsComponent/RouteStatsComponent";

const Route = () => {
    const [route, setRoute] = useState({});
    const [isActive, setIsActive] = useState(false);
    const [geoJsonPath, setGeoJsonPath] = useState([]);
    const [isAuthor, setIsAuthor] = useState('none');
    const [formState, setFormState] = useState('none');

    const router = useRouter();
    const routeId = router.query.route;
    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);

    useEffect(() => {
        getRoute();
    }, []);



    async function getRoute() {
        const docRef = doc(getFirestore(firebaseApp), 'routes', router.query.route);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            setRoute({ ...docSnap.data() });

            const uid = (auth.currentUser.uid);
            // console.log(uid);
            // console.log(docSnap.data().uid);

            if (docSnap.data().uid == uid) {
                // console.log('this is your route');
                setIsAuthor('flex');
            }
        } else {
            console.log("No such document!");
        }
    };

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
    };

    async function deleteRoute() {
        console.log('deleteRoute() initiated');
        await deleteDoc(doc(db, 'routes', routeId));
        alert('Your route has been deleted');
        router.push('/explore');
        return null;
    };

    return (
        <Base>
            <Head>
                <title>{route.name}</title>
            </Head>
            <LayoutComponent>
                <div className={styles.route}>
                    <p className={styles.routeName}>{route.name}</p>
                    <div className={styles.routeMain}>
                        <RouteMapComponent routeInfo={route} geoJsonPath={geoJsonPath} />
                        <RouteStatsComponent routeInfo={route} />
                    </div>
                    <div className={styles.routeButtons} style={{ 'display': isAuthor }}>
                        <button id='edit' className={styles.formButton} onClick={() => handleForm()}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                            Edit Route Details
                        </button>
                        <button id='delete' className={styles.formButton} onClick={() => deleteRoute()}>
                            <FontAwesomeIcon icon={faTrash} />
                            Delete Route
                        </button>
                    </div>
                    <EditRouteForm displaySetting={formState} route={route} setDisplaySetting={setFormState} db={db} routeId={routeId} />
                </div>
            </LayoutComponent>
        </Base>
    )
}

export default Route;