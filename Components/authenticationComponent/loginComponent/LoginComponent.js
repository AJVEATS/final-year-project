/**
 * @fileoverview This file represets the LoginComponent which allows users to login to their account if they have an account. It uses firebase for
 * authentication. 
 * 
 * @param {function} updateDisplayedComponent - A function to update the current form being displayed
 * @param auth - Firebase authentication initialisation
 * @param db - Initialisation of cloud firestore and reference to the service
 */
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './LoginComponent.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faEnvelopeCircleCheck } from "@fortawesome/free-solid-svg-icons";

const LoginComponent = ({ updateDisplayedComponent, auth, passwordResetSent, setPasswordResetSent }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggingIn, setLoggingIn] = useState(false);

    const router = useRouter();

    /**
     * This function takes the email and password inputted in the loginForm and uses the signInWithEmailAndPassword firebase authentication
     * hook to authenticate the user. They have inputted valid login credentials they will be redirected to the home page, if not an error 
     * will be triggered. 
     */
    const handleLoginForm = () => {
        if (email === '' && password === '') {
            alert('Please enter your email and password');
        } else if (email === '') {
            alert('Please enter your email');
        } else if (password === '') {
            alert('Please enter your password');
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    setLoggingIn(true);
                    router.replace('/home');
                })
                .catch((error) => {
                    // console.log(error.code, error.message);
                    alert(`${error.code} ${error.message}`);
                });
        }
    };

    if (passwordResetSent && loggingIn) {
        setPasswordResetSent(false);
    }

    return (
        <div className={styles.loginComponent}>
            <p className={styles.title}>Login: </p>
            <form className={styles.loginForm} onSubmit={handleLoginForm}>
                <label>
                    Email:
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={email}
                        onChange={e => { setEmail(e.target.value); }}
                        onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={password}
                        onChange={e => { setPassword(e.target.value); }}
                        onKeyDown={(e) => { (e.key === 'Enter' ? handleLoginForm() : null) }}
                        required
                    />
                </label>
                <div className={styles.inlineButtons}>
                    <button type='button' onClick={() => handleLoginForm()}>login</button>
                    <button type='button' onClick={() => {
                        setPasswordResetSent(false);
                        updateDisplayedComponent('forgotPassword');
                    }}>Forgot Password</button>
                    <button type='button' onClick={() => {
                        setPasswordResetSent(false);
                        updateDisplayedComponent('createAccount');
                    }}>New Here?</button>
                </div>
            </form>
            {passwordResetSent ? (
                <div className={styles.passwordResetNotificationContainer}>
                    <div className={styles.passwordResetNotification}>
                        <div className={styles.passwordResetNotificationIcon}>
                            <FontAwesomeIcon icon={faEnvelopeCircleCheck} />
                        </div>
                        <p className={styles.passwordResetNotificationText}>password reset email sent</p>
                    </div>
                </div>
            ) : (
                <div>

                </div>
            )}
            {loggingIn ? ( // If loggingIn is true the loadingContainer will display
                <div className={styles.loadingContainer}>
                    <div className={styles.loadingContent}>
                        <div className={styles.loadingIcon}>
                            <FontAwesomeIcon icon={faSpinner} />
                        </div>
                        <p className={styles.loadingText}>logging in</p>
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    )
}

export default LoginComponent;