import styles from './CreateAccountComponent.module.scss';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/pages/api/FirebaseAPI';
import { useRouter } from 'next/router';
import { Tooltip } from 'react-tooltip';

const CreateAccountComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const router = useRouter();

    const app = initializeApp(firebaseConfig);

    const handleCreateAccountForm = (e) => {
        e.preventDefault();

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);

        const auth = getAuth(app);
        if (password === confirmPassword) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    router.push('/home');
                })
                .catch((error) => {
                    console.log('ERROR');
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    console.log(`${errorCode} - ${errorMessage}`);
                })
        } else {
            alert(`The entered passwords do not match`);
        }
        // Or you can work with it as a plain object:
        // const formJson = Object.fromEntries(formData.entries());
        // console.log(formJson);
    }

    return (
        <div className={styles.createAccount}>
            <p>Create Account:</p>
            <form onSubmit={handleCreateAccountForm}>
                <label>
                    Email:
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={email}
                        onChange={e => { setEmail(e.target.value); }}
                        required
                    />
                    <Tooltip anchorId='email' place='bottom' clickable>
                        <p>Email Address</p>
                    </Tooltip>
                </label>
                <label>
                    Password:
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={password}
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\S.*).{8,}"
                        onChange={e => { setPassword(e.target.value); }}
                        required
                    />
                    <Tooltip anchorId='password' place='bottom' clickable>
                        <p><b>Must contain:</b></p>
                        <p>1 Uppercase</p>
                        <p>1 Lowercase</p>
                        <p>1 Number</p>
                        <p>1 Symbol</p>
                    </Tooltip>
                </label>
                <label>
                    Confirm Password:
                    <input
                        type='password'
                        id='confirmPassword'
                        name='confirmPassword'
                        value={confirmPassword}
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\S.*).{8,}"
                        onChange={e => { setConfirmPassword(e.target.value); }}
                        required
                    />
                    <Tooltip anchorId='confirmPassword' place='bottom' clickable>
                        <p><b>Must contain:</b></p>
                        <p>1 Uppercase</p>
                        <p>1 Lowercase</p>
                        <p>1 Number</p>
                        <p>1 Symbol</p>
                    </Tooltip>
                </label>
                <button type='submit' value='submit'>Submit</button>
            </form>
            <button type='button' value='' onClick={console.log('Login button pressed')}>Already have an account?</button>
        </div>
    )
}

export default CreateAccountComponent;