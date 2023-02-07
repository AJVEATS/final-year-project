import { firebaseConfig } from '@/pages/api/FirebaseAPI';
import { initializeApp } from 'firebase/app';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import styles from './ForgotPassword.module.scss';

const ForgotPassword = () => {
    const [forgottenEmail, setForgottenEmail] = useState('');

    const app = initializeApp(firebaseConfig);

    const handlePasswordResetForm = (e) => {
        e.preventDefault();

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);

        const auth = getAuth(app);

        sendPasswordResetEmail(auth, forgottenEmail)
            .then(() => {
                console.log('Password reset email has been sent');
                alert(`Password reset email has been sent to ${forgottenEmail}`);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`${errorCode} - ${errorMessage}`);
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
        </div>
    );
}

export default ForgotPassword;