/**
 * @fileoverview This file represets the ProfileComponent which is the main component for the account page and account functionality. This
 * component retrieves the user's details from their firestore document from the 'users' collection.
 * 
 * This component includes:
 *  - ProfileInfoComponent: which displays the user's current account information stored in their document from the 'users' firestore collection.
 *  - ProfileNavigationComponent: the navigation component which handles the changing of account forms.
 *  - AddDetailsComponent: A form to allow user's to add account details and account personalisation. Their data will be added to their firestore
 *                         collection.
 *  - EditDetailsComponent: A form to allow user's to update their account information that is stored in their firestore collection.
 * 
 */
import styles from './ProfileComponent.module.scss';
import React, { useState, useEffect } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { firebaseApp } from '@/pages/api/FirebaseApp';
import { getAuth } from 'firebase/auth';
import ProfileInfoComponent from './ProfileInfoComponent/ProfileInfoComponent';
import ProfileNavigationComponent from './ProfileNavigationComponent/ProfileNavigationComponent';
import AddDetailsComponent from './AddDetailsComponent/AddDetailsComponent';
import EditDetailsComponent from './EditDetailsComponent/EditDetailsComponent';

const ProfileComponent = () => {
    const [navigationState, setNavigationState] = useState('add');
    const [userInfo, setUserInfo] = useState([]);

    const auth = getAuth();
    const firebaseUID = auth.currentUser.uid;
    const db = getFirestore(firebaseApp);

    // console.log(auth.currentUser);

    useEffect(() => {
        getUserDetails();
        updateNav();
    }, []);

    /**
     * This async function gets the user's account details from their firestore document from the 'users'
     * collection. If the user does not have a name set the add form will be displayed first. If the user
     * does have details the edit form will be displayed with their detail prefilled.
     */
    async function getUserDetails() {
        const docRef = doc(db, 'users', firebaseUID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            setUserInfo({ ...docSnap.data() });
            if (docSnap.data().name != '') {
                setNavigationState('edit');
            }
            // console.log(userInfo);
        } else {
            console.log("No such document!");
        };
    };

    /**
     * This function updates the navigationState useState variable depending its current value. It allow fors navigation between forms. 
     */
    const updateNav = () => {
        if (navigationState === 'add') {
            setNavigationState('add');
        } else if (navigationState === 'edit') {
            setNavigationState('edit');
        };
    }

    /**
     * This function handles which form is displayed depending on the navigationState value. If the value is 'add' the AddDetailsComponent will be displayed and
     * if the value is 'edit' the EditDetailsComponent is displayed.
     */
    const handleNav = () => {
        if (navigationState === 'add') {
            return (
                <AddDetailsComponent db={db} firebaseUID={firebaseUID} getUserDetails={getUserDetails} setNavigationState={setNavigationState} />
            );
        } else if (navigationState === 'edit') {
            return (
                <EditDetailsComponent db={db} firebaseUID={firebaseUID} auth={auth} user={userInfo} getUserDetails={getUserDetails} setUserInfo={setUserInfo} setNavigationState={setNavigationState} />
            );
        };
    };

    return (
        <div className={styles.profileComponent}>
            <p className={styles.profileTitle}>Welcome {userInfo.firstname} 👋</p>
            <ProfileInfoComponent user={userInfo} />
            <ProfileNavigationComponent navigationState={navigationState} setNavigationState={setNavigationState} getUserDetails={getUserDetails} setUserInfo={setUserInfo} />
            {handleNav()}
        </div>
    )
}

export default ProfileComponent;