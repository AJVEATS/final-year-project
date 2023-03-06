import styles from './ExploreComponent.module.scss';
import React, { useEffect, useState } from 'react';
import { firebaseApp } from '@/pages/api/FirebaseApp';
import { collection, doc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const ExploreComponent = () => {
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        getRoutes();
        console.log(routes);
    }, []);

    async function getRoutes() {
        setRoutes([]);
        const auth = getAuth(firebaseApp);
        const user = (auth.currentUser);
        const db = getFirestore(firebaseApp);
        const routeQuery = query(collection(db, "routes"), where('privacy', '==', 'public'));

        const querySnapshot = await getDocs(routeQuery);
        querySnapshot.forEach((doc) => {
            setRoutes(routes => [...routes, { routeId: doc.id, routeData: doc.data() }]);
            console.log(doc.id, " => ", doc.data()); // For Testing
        });

        console.log(routes);
    };

    return (
        <div className={styles.exploreComponent}>
            <p className={styles.exploreTitle}>Explore</p>
        </div>
    );
}

export default ExploreComponent;