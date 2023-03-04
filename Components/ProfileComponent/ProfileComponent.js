import Head from 'next/head';
import styles from './ProfileComponent.module.scss'
import ProfileNavigationComponent from './ProfileNavigationComponent/ProfileNavigationComponent';

import React, { useState, useEffect } from 'react';
import AddDetailsComponent from './AddDetailsComponent/AddDetailsComponent';
import EditDetailsComponents from './EditDetailsComponent/EditDetailsComponent';
import { getFirestore } from 'firebase/firestore';
import { firebaseApp } from '@/pages/api/FirebaseApp';
import { getAuth } from 'firebase/auth';
import ProfileInfoComponent from './ProfileInfoComponent/ProfileInfoComponent';

const ProfileComponent = () => {
    const [navigationState, setNavigationState] = useState('add');

    const auth = getAuth();
    const firebaseUID = auth.currentUser.uid;
    const db = getFirestore(firebaseApp);

    console.log(auth.currentUser);

    useEffect(() => {
        if (navigationState === 'add') {
            setNavigationState('add');
        } else if (navigationState === 'edit') {
            setNavigationState('edit');
        }
    }, []);

    const handleNav = () => {
        if (navigationState === 'add') {
            return (
                <AddDetailsComponent db={db} firebaseUID={firebaseUID} />
            );
        } else if (navigationState === 'edit') {
            return (
                <EditDetailsComponents db={db} firebaseUID={firebaseUID} auth={auth} />
            )
        }
    }

    const clearForm = () => {
        console.log('clear form');
    }

    return (
        <div className={styles.profileComponent}>
            <p className={styles.profileTitle}>Profile</p>
            <p className={styles.profileSubTitle}>Welcome ###USERNAME###</p>
            <ProfileInfoComponent />
            <ProfileNavigationComponent navigationState={navigationState} setNavigationState={setNavigationState} />
            {handleNav()}
        </div>
    )
}

export default ProfileComponent;