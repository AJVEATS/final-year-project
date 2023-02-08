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
                console.log(error.code, error.message);
            })
    }

    return (
        <div className={styles.forogtPassword}>
            <p>Reset Your Password</p>
            <form onSubmit={handlePasswordResetForm}>
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
                <button type='submit' value='submit'>Send</button>
            </form>
            <button type='button' value='' onClick={() => updateDisplayedComponent('login')}>Go Back</button>
        </div>
    );
}

export default ForgotPassword;