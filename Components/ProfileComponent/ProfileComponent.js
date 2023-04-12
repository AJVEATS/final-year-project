import styles from './ProfileComponent.module.scss'
import ProfileNavigationComponent from './ProfileNavigationComponent/ProfileNavigationComponent';
import React, { useState, useEffect } from 'react';
import AddDetailsComponent from './AddDetailsComponent/AddDetailsComponent';
import EditDetailsComponents from './EditDetailsComponent/EditDetailsComponent';
import { collection, doc, getDoc, getFirestore, query, where } from 'firebase/firestore';
import { firebaseApp } from '@/pages/api/FirebaseApp';
import { getAuth } from 'firebase/auth';
import ProfileInfoComponent from './ProfileInfoComponent/ProfileInfoComponent';

const ProfileComponent = () => {
    const [navigationState, setNavigationState] = useState('add');
    const [userInfo, setUserInfo] = useState([]);

    const auth = getAuth();
    const firebaseUID = auth.currentUser.uid;
    const db = getFirestore(firebaseApp);

    // console.log(auth.currentUser);

    useEffect(() => {
        getUserDetails();
        if (navigationState === 'add') {
            setNavigationState('add');
        } else if (navigationState === 'edit') {
            setNavigationState('edit');
        };
    }, []);

    async function getUserDetails() {
        const docRef = doc(db, 'users', firebaseUID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            setUserInfo({ ...docSnap.data() });
            if (docSnap.data().name == '') {
                setNavigationState('edit');
            }
            // console.log(userInfo);
        } else {
            console.log("No such document!");
        };
    };

    const handleNav = () => {
        if (navigationState === 'add') {
            return (
                <AddDetailsComponent db={db} firebaseUID={firebaseUID} getUserDetails={getUserDetails} setNavigationState={setNavigationState} />
            );
        } else if (navigationState === 'edit') {
            return (
                <EditDetailsComponents db={db} firebaseUID={firebaseUID} auth={auth} user={userInfo} getUserDetails={getUserDetails} setUserInfo={setUserInfo} setNavigationState={setNavigationState} />
            );
        };
    };

    return (
        <div className={styles.profileComponent}>
            <p className={styles.profileTitle}>
                Welcome {userInfo.firstname} 👋</p>
            <ProfileInfoComponent user={userInfo} />
            <ProfileNavigationComponent navigationState={navigationState} setNavigationState={setNavigationState} getUserDetails={getUserDetails} setUserInfo={setUserInfo} />
            {handleNav()}
        </div>
    )
}

export default ProfileComponent;