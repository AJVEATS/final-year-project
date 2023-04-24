/**
 * @fileoverview This file represets the AuthenicationComponent which handles the authentication for the application.
 * It includes:
 *  - LoginComponent to allow the user to login to their account if they have an account already
 *  - ForgotPasswordComponent to allow the user to reset their account password via email
 *  - CreateAccountComponent to allow the user to create an account
 * 
 */
import styles from './AuthenticationComponent.module.scss';
import React, { useState } from 'react';
import { firebaseConfig } from '@/pages/api/FirebaseAPI';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseApp } from '@/pages/api/FirebaseApp';
import { getFirestore } from 'firebase/firestore';
import CreateAccountComponent from './createAccountComponent/CreateAccountComponent';
import ForgotPasswordComponet from './ForgotPasswordComponet/ForgotPasswordComponet';
import LoginComponent from './loginComponent/LoginComponent';

const AuthenticationComponent = () => {
    const [componentDisplayed, setComponentDisplayed] = useState('createAccount');

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(firebaseApp);

    /**
     * This function updates the useState variable componentDisplayed
     * by setting the value as the string value passed into the function.
     * 
     * @param {string} newValue - The navigations new state.
     * 
     */
    const updateComponentDisplayedState = (newValue) => {
        setComponentDisplayed(newValue);
    };

    /**
     * This function controls which form is displayed. It is controled by the useState variable componentDisplayed.
     */
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

