/**
* @fileoverview This file represets the route page which allows users to see an indepth view of a walking route.
* It gets the routes document from the 'routes' collection in the firestore database. This page includes the:
* - RouteMapComponent
* - RouteStatsComponent
* - EditRouteForm
* - LayoutComponent
* - Base
*/

import Base from "Components/Layout/Base/BaseComponent";
import LayoutComponent from "Components/Layout/LayoutComponent/LayoutComponent";
import styles from '@/styles/pages/route.module.scss';
import React, { useState, useEffect } from 'react';
import Head from "next/head";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../api/FirebaseApp";
import { deleteDoc, doc, getDoc, getFirestore } from "firebase/firestore";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RouteMapComponent from "Components/RouteMapComponent/RouteMapComponent";
import EditRouteForm from "Components/forms/EditRouteForm/EditRouteForm";
import RouteStatsComponent from "Components/RouteStatsComponent/RouteStatsComponent";
import RouteCommentsComponent from "Components/RouteCommentsComponent/RouteCommentsComponent";

const Route = () => {
    const [route, setRoute] = useState({});
    const [geoJsonPath, setGeoJsonPath] = useState([]);
    const [isAuthor, setIsAuthor] = useState('none');
    const [formState, setFormState] = useState('none');
    const [comments, setComments] = useState({});

    const router = useRouter();
    const routeId = router.query.route;
    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);

    useEffect(() => {
        getRoute();
    }, []);

    /**
     * This async function get's the selected route from the firestore 'routes' collection by the route's id.
     * If the user is the creator of the route the edit and delete route buttons are displayed.
     */
    async function getRoute() {
        const docRef = doc(getFirestore(firebaseApp), 'routes', router.query.route);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            setRoute({ ...docSnap.data() });
            setComments({ ...docSnap.data().comments });
            const uid = (auth.currentUser.uid);
            if (docSnap.data().uid == uid) {
                setIsAuthor('flex');
            }
        } else {
            console.log("No such document!");
        }
    };

    for (let sets in route.route) {
        geoJsonPath.push([route.route[sets].latitude, route.route[sets].longitude]);
    };

    /**
     * This function handles the edit route form, opening and closing it.
     */
    const handleForm = () => {
        if (formState == 'none') {
            setFormState('block');
        } else if (formState == 'block') {
            setFormState('none');
        }
    };

    /**
     * Thid async function deletes the route's document from the firestore database
     */
    async function deleteRoute() {
        console.log('deleteRoute() initiated');
        await deleteDoc(doc(db, 'routes', routeId));
        alert(`The route: ${route.name}, has been deleted.`);
        router.push('/discover');
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
                        <RouteStatsComponent routeInfo={route} auth={auth} db={db} routeId={routeId} />
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
                    <RouteCommentsComponent
                        routeId={routeId}
                        comments={comments} />
                    <EditRouteForm displaySetting={formState} route={route} setDisplaySetting={setFormState} db={db} routeId={routeId} />
                </div>
            </LayoutComponent>
        </Base>
    )
}

export default Route;