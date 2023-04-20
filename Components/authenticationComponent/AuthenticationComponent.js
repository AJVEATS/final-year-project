/**
 * @fileoverview This file represets the AuthenicationComponent which handle the authentication for the application.
 * It includes:
 *  - LoginComponent to allow the user to login to their account if they have an account already
 *  - ForgotPa
 * 
 * @param {Object} data - An object of the activities altitude and the time stamp for the altitude value.
 * 
 */

import styles from './AuthenticationComponent.module.scss';
import React, { useState } from 'react';

import { firebaseConfig } from '@/pages/api/FirebaseAPI';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import CreateAccountComponent from './createAccountComponent/CreateAccountComponent';
import ForgotPasswordComponet from './ForgotPasswordComponet/ForgotPasswordComponet';
import LoginComponent from './loginComponent/LoginComponent';
import { firebaseApp } from '@/pages/api/FirebaseApp';
import { getFirestore } from 'firebase/firestore';

const AuthenticationComponent = () => {
    const [componentDisplayed, setComponentDisplayed] = useState('createAccount');

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(firebaseApp);

    const updateComponentDisplayedState = (newValue) => {
        setComponentDisplayed(newValue);
    };

    const handleComponentDisplayed = () => {

        if (componentDisplayed === 'login') {
            return (
                <LoginComponent updateDisplayedComponent={updateComponentDisplayedState} auth={auth} />
            );
        } else if (componentDisplayed === 'forgotPassword') {
            return (
                <ForgotPasswordComponet updateDisplayedComponent={updateComponentDisplayedState} auth={auth} />
            );
        } else if (componentDisplayed === 'createAccount') {
            return (
                <CreateAccountComponent updateDisplayedComponent={updateComponentDisplayedState} auth={auth} db={db} />
            );
        };
    };

    return (
        <div className={styles.authenticationComponent}>
            {handleComponentDisplayed()}
        </div>
    );
}

export default AuthenticationComponent;

