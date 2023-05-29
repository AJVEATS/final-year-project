/**
* @fileoverview This file represets the home page which is the opening page if the application, once the user has been 
* authenticated. This page includes the:
* - LayoutComponent
* - Base
*/
import styles from '@/styles/pages/home.module.scss';
import Base from 'Components/Layout/Base/BaseComponent';
import LayoutComponent from 'Components/Layout/LayoutComponent/LayoutComponent';
import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import Head from 'next/head';
// import MapBoxKey from '@/pages/api/MapBoxKey';
import { firebaseApp } from './api/FirebaseApp';
// import { doc, getDoc, getFirestore } from 'firebase/firestore';
import Link from 'next/link';

const Home = () => {
    // const [username, setUserName] = useState('');

    // const auth = getAuth(firebaseApp);
    // const firebaseUID = auth.currentUser.uid;
    // const db = getFirestore(firebaseApp);

    // useEffect(() => {
    //     getUserDetails();
    // }, []);

    // async function getUserDetails() {
    //     const docRef = doc(db, 'users', firebaseUID);
    //     const docSnap = await getDoc(docRef);

    //     if (docSnap.exists()) {
    //         // console.log("Document data:", docSnap.data().firstname);
    //         setUserName(` ${docSnap.data().firstname}`);
    //     } else {
    //         console.log("No such document!");
    //     };
    // }

    return (
        <Base>
            <Head>
                <title>Home</title>
            </Head>
            <LayoutComponent styles={{ overflow: 'hidden' }}>
                <p className={styles.welcomeMessage}>Welcome </p>
                {/* <Link className={styles.drawButton} href='/draw'>
                    ✏️
                    Create a route
                </Link>
                <div className={styles.imgContainer}>
                    <img
                        className={styles.homeImage}
                        src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-1.8782,50.7220,11,0/1270x900?access_token=${MapBoxKey.key}`} />
                </div> */}
            </LayoutComponent>
        </Base>
    );
}

export default Home;