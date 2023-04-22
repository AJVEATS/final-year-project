/**
 * @fileoverview This file represets the ForgotPasswordComponent which is a form to allow users to send a password reset email to their
 * email address, if they have an account and have forgotten their password.
 * 
 * @param {function} updateDisplayedComponent - A function to update the current form being displayed
 * @param auth - Firebase authentication initialisation
 * @param db - Initialisation of cloud firestore and reference to the service
 */
import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import styles from './ForgotPasswordComponet.module.scss';

const ForgotPassword = ({ updateDisplayedComponent, auth }) => {
    const [forgottenEmail, setForgottenEmail] = useState('');

    /**
     * This function takes the email inputted in the forgotPasswordForm and uses the sendPasswordResetEmail firebase authentication
     * hook to send a password reset email to the user if they have an account.
     */
    const handlePasswordResetForm = () => {
        sendPasswordResetEmail(auth, forgottenEmail)
            .then(() => {
                alert(`Password reset email has been sent to ${forgottenEmail}`);
                updateDisplayedComponent('login');
            })
            .catch((error) => {
                // console.log(error.code, error.message);
                alert(`${error.code} ${error.message}`);
            })
    };

    return (
        <div className={styles.forogtPassword}>
            <p className={styles.title}>Reset Your Password</p>
            <form className={styles.forgotPasswordForm} onSubmit={handlePasswordResetForm}>
                <label>
                    Email:
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={forgottenEmail}
                        onChange={e => { setForgottenEmail(e.target.value); }}
                        onKeyDown={(e) => { (e.key === 'Enter' ? handlePasswordResetForm() : null) }}
                        required
                    />
                </label>
                <div className={styles.buttons}>
                    <button type='button' value='' onClick={() => handlePasswordResetForm()}>Send reset email</button>
                    <button type='button' value='' onClick={() => updateDisplayedComponent('login')}>login</button>
                </div>
            </form>
        </div>
    );
}

export default ForgotPassword;