import styles from './CreateAccountComponent.module.scss';
import { firebaseApp } from '@/pages/api/FirebaseApp';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/pages/api/FirebaseAPI';
import { useRouter } from 'next/router';

const CreateAccountComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const router = useRouter();

    const handleCreateAccountForm = (e) => {
        e.preventDefault();

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);

        // You can pass formData as a fetch body directly:
        // fetch('/some-api', { method: form.method, body: formData });

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                router.push('./home')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log(`${errorCode} - ${errorMessage}`);
            })

        // Or you can work with it as a plain object:
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
    }

    return (
        <div className={styles.createAccount}>
            <p>Create Account:</p>
            <form method='POST' onSubmit={handleCreateAccountForm}>
                <label>
                    Email:
                    <input type='email' id='email' name='email' value={email} onChange={e => { setEmail(e.target.value); }} />
                </label>
                <label>
                    Password:
                    <input type='password' id='password' name='password' value={password} onChange={e => { setPassword(e.target.value); }} />
                </label>
                <button type='submit' value='submit'>Submit</button>
            </form>
        </div>
    )
}

export default CreateAccountComponent;