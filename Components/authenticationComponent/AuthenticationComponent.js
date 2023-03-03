import { firebaseConfig } from '@/pages/api/FirebaseAPI';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useState } from 'react';
import styles from './AuthenticationComponent.module.scss';
import CreateAccountComponent from './createAccountComponent/CreateAccountComponent';
import ForgotPassword from './forgotPassword/ForgotPassword';
import LoginComponent from './loginComponent/LoginComponent';

const AuthenticationComponent = () => {
    const [componentDisplayed, setComponentDisplayed] = useState('createAccount');

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const updateComponentDisplayedState = (newValue) => {
        setComponentDisplayed(newValue);
    }

    const handleComponentDisplayed = () => {

        if (componentDisplayed === 'login') {
            return (
                <LoginComponent updateDisplayedComponent={updateComponentDisplayedState} auth={auth} />
            )
        } else if (componentDisplayed === 'forgotPassword') {
            return (
                <ForgotPassword updateDisplayedComponent={updateComponentDisplayedState} auth={auth} />
            )
        } else if (componentDisplayed === 'createAccount') {
            return (
                <CreateAccountComponent updateDisplayedComponent={updateComponentDisplayedState} auth={auth} />
            )
        }
    }

    return (
        <div className={styles.authenticationComponent}>
            {handleComponentDisplayed()}
        </div>
    );
}

export default AuthenticationComponent;

