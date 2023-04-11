import Base from "Components/Layout/Base/BaseComponent";
import LayoutComponent from "Components/Layout/LayoutComponent/LayoutComponent";
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from 'react';
import Head from "next/head";
import { firebaseApp } from "./api/FirebaseApp";
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import styles from '@/styles/pages/likes.module.scss';
import ExploreComponent from "Components/ExploreComponent/ExploreComponent";

const Likes = () => {
    const [likes, setLikes] = useState([]);
    const [routes, setRoutes] = useState([]);
    let title = 'Your liked walks ❤️';
    const auth = getAuth();
    const firebaseUID = auth.currentUser.uid;
    const db = getFirestore(firebaseApp);

    useEffect(() => {
        getLikedRoutes();
        getLikedRoutesList();
        // console.log(likes);
        // console.log(routes);
    });

    async function getLikedRoutes() {
        const docRef = doc(db, 'users', firebaseUID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // console.log(docSnap.data().likes);
            setLikes([...docSnap.data().likes]);
        } else {
            console.log('No document');
        };
    };

    async function getLikedRoutesList() {
        const routeQuery = query(collection(db, 'routes'));
        const querySnapshot = await getDocs(routeQuery);
        setRoutes([]);
        querySnapshot.forEach((doc) => {
            if (likes.includes(doc.id)) {
                // console.log('This is a liked routes');
                setRoutes(routes => [...routes, { routeId: doc.id, routeData: doc.data() }]);
                // console.log(doc.data());
            } else {
                console.log('This is not a liked routes');
                title = 'No liked routes';
            }
            // setRoutes(routes => [...routes, doc.data()]);
        });
        console.log(routes);
    };

    return (
        <Base>
            <Head>
                <title>Likes</title>
            </Head>
            <LayoutComponent>
                <div className={styles.likeMain}>
                    <ExploreComponent
                        routes={routes}
                        routesNull={false}
                        title={title} />
                </div>
            </LayoutComponent>
        </Base>
    )
}

export default Likes;