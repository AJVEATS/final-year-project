import { firebaseConfig } from '@/pages/api/FirebaseAPI';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './LoginComponent.module.scss';

const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const provider = new GoogleAuthProvider();

    const handleLoginForm = (e) => {
        e.preventDefault();

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                router.push('/account');
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log(`${errorCode} - ${errorMessage}`);
            });

        // Or you can work with it as a plain object:
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
    }

    return (
        <div className={styles.loginComponent}>
            <p>Login:</p>
            <form onSubmit={handleLoginForm}>
                <label>
                    Email:
                    <input type='email' id='email' name='email' value={email} onChange={e => { setEmail(e.target.value); }} />
                </label>
                <label>
                    Password:
                    <input type='password' id='password' name='password' value={password} onChange={e => { setPassword(e.target.value); }} />
                </label>
                <button type='submit' value='submit'>login</button>
            </form>
        </div>
    )
}

export default LoginComponent;