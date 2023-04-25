/**
* @fileoverview This file represets the disover page which allows users view lists of public routes, their created
* routes and their liked routes. Users are able to filter and search the routes displayed. It gets all the routes 
* from the 'routes' collection in the firestore database. The user's liked routes are retrieved from teh user document
* in the 'users' collection. This page includes the:
* - SearchComponent
* - ExploreComponent
* - LayoutComponent
* - Base
*/
import styles from '@/styles/pages/discover.module.scss';
import React, { useEffect, useState } from 'react';
import Base from 'Components/Layout/Base/BaseComponent';
import Head from 'next/head';
import LayoutComponent from 'Components/Layout/LayoutComponent/LayoutComponent';
import ExploreComponent from 'Components/ExploreComponent/ExploreComponent';
import { getAuth } from 'firebase/auth';
import { firebaseApp } from './api/FirebaseApp';
import { collection, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore';
import SearchComponent from 'Components/SearchComponent/SearchComponent';

const Discover = () => {
    const [routes, setRoutes] = useState([]);
    const [currentRoutes, setCurrentRoutes] = useState([]);
    const [allRoutes, setAllRoutes] = useState([]);
    const [likedRoutes, setLikedRoutes] = useState([]);
    const [usersRoutes, setUsersRoutes] = useState([]);
    const [usersLikes, setUsersLikes] = useState([]);
    const [title, setTitle] = useState('Public Routes');
    const [filter, setFilter] = useState('public');

    const [nameQuery, setNameQuery] = useState('');
    const [distanceQuery, setDistanceQuery] = useState(10000);
    const [durationQuery, setDurationQuery] = useState(240);

    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);
    const uid = auth.currentUser.uid;

    useEffect(() => {
        getRoutes();
        getLikedRoutes();
    }, []);

    useEffect(() => {
        // console.log('allRoutes');
        // console.log(allRoutes);
        setRoutes(allRoutes.filter(routes => routes.routeData.privacy == 'public'));
        setUsersRoutes(allRoutes.filter(routes => routes.routeData.uid == uid));
    }, [allRoutes]);

    /**
     * Updates the routes displayed depending on the filter
     */
    useEffect(() => {
        // console.log('liked routes');
        // console.log(filter);
        if (filter === 'public') {
            setRoutes([]);
            setCurrentRoutes(allRoutes.filter(routes => routes.routeData.privacy == 'public'));
            setRoutes(allRoutes.filter(routes => routes.routeData.privacy == 'public'));
            console.log(`routes ${routes.length}`);
            console.log(`current routes ${currentRoutes.length}`);
            setTitle('Public Routes');
        } else if (filter === 'users') {
            setRoutes([]);
            setCurrentRoutes(usersRoutes);
            setRoutes(usersRoutes);
            setTitle('Your Routes');
        } else if (filter === 'likes') {
            setRoutes([]);
            setCurrentRoutes(likedRoutes);
            setRoutes(likedRoutes);
            setTitle('Liked Routes');
        };
    }, [filter]);

    /**
     * Checks if the user has a liked routes and complies a list of the routes that the user has liked
     */
    useEffect(() => {
        // console.log('users likes');
        // console.log(usersLikes);
        if (usersLikes.length >= 1) {
            // console.log('user has liked routes');
            for (const route in allRoutes) {
                if (usersLikes.includes(allRoutes[route].routeId)) {
                    // console.log('This is a liked routes');
                    setLikedRoutes(routes => [...routes, allRoutes[route]]);
                } else {
                    // console.log('This is not a liked routes');
                }
            };
        };
    }, [usersLikes]);

    /**
     * This async functions gets all of the routes from the 'routes' collection in the firestore database.
     */
    async function getRoutes() {
        setAllRoutes([]);
        const querySnapshot = await getDocs(collection(db, 'routes'));
        querySnapshot.forEach((doc) => {
            // console.log({ routeId: doc.id, routeData: doc.data() });
            setAllRoutes(routes => [...routes, { routeId: doc.id, routeData: doc.data() }]);
        });
    };

    /**
     * This asyn function get the id of the routes that the user has liked
     */
    async function getLikedRoutes() {
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            // if (docSnap.data().likes) {
            // console.log(docSnap.data().likes);
            setUsersLikes([...docSnap.data().likes]);
            // }
        } else {
            // console.log('No such document');
        }
    };

    /**
     * This function clears and resets the search form's filters
     */
    const clearFilters = () => {
        setDistanceQuery(10000);
        setDurationQuery(240);
        setRoutes([]);
        setRoutes(currentRoutes);
        // setFilter('public');
    };

    return (
        <Base>
            <Head>
                <title>Discover</title>
            </Head>
            <LayoutComponent>
                <div className={styles.exploreMain}>
                    <ExploreComponent
                        routes={routes}
                        title={title}
                        filter={filter}
                        setFilter={setFilter}
                        setTitle={setTitle} />
                    <SearchComponent
                        distanceQuery={distanceQuery}
                        setDistanceQuery={setDistanceQuery}
                        durationQuery={durationQuery}
                        setDurationQuery={setDurationQuery}
                        clearFilters={clearFilters}
                        nameQuery={nameQuery}
                        setNameQuery={setNameQuery}
                        setRoutes={setRoutes}
                        allRoutes={routes}
                        currentRoutes={currentRoutes} />
                </div>
            </LayoutComponent>
        </Base >
    );
}

export default Discover;