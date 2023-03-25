import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import styles from './ForgotPassword.module.scss';

const ForgotPassword = ({ updateDisplayedComponent, auth }) => {
    const [forgottenEmail, setForgottenEmail] = useState('');

    const handlePasswordResetForm = (e) => {
        e.preventDefault();

        sendPasswordResetEmail(auth, forgottenEmail)
            .then(() => {
                alert(`Password reset email has been sent to ${forgottenEmail}`);
                updateDisplayedComponent('login');
            })
            .catch((error) => {
                // console.log(error.code, error.message);
                alert(`${error.code} ${error.message}`);
            })
    }

    return (
        <div className={styles.forogtPassword}>
            <p className={styles.title}>Reset Your Password</p>
            <form className={styles.forgotPasswordForm} onSubmit={handlePasswordResetForm}>
                <label>
                    Email
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={forgottenEmail}
                        onChange={e => { setForgottenEmail(e.target.value); }}
                        required
                    />
                </label>
                <div className={styles.buttons}>
                    <button type='submit' value='submit'>Send reset email</button>
                    <button type='button' value='' onClick={() => updateDisplayedComponent('login')}>login</button>
                </div>
            </form>
        </div>
    );
}

export default ForgotPassword;