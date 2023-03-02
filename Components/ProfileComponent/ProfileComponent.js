import Head from 'next/head';
import styles from './ProfileComponent.module.scss'
import ProfileNavigationComponent from './ProfileNavigationComponent/ProfileNavigationComponent';

import React, { useState, useEffect } from 'react';
import AddDetailsComponent from './AddDetailsComponent/AddDetailsComponent';
import EditDetailsComponents from './EditDetailsComponent/EditDetailsComponent';

const ProfileComponent = () => {
    const [navigationState, setNavigationState] = useState('add');

    console.log('add');

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
                <AddDetailsComponent />
            );
        } else if (navigationState === 'edit') {
            return (
                <EditDetailsComponents />
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
            <ProfileNavigationComponent navigationState={navigationState} setNavigationState={setNavigationState} />
            {handleNav()}
        </div>
    )
}

export default ProfileComponent;