import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './LoginComponent.module.scss';

const LoginComponent = ({ updateDisplayedComponent, auth }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const handleLoginForm = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                router.replace('/home');
            })
            .catch((error) => {
                // console.log(error.code, error.message);
                alert(`${error.code} ${error.message}`);
            });
    };

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
                        onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
                        required
                    />
                </label>
                <div className={styles.inlineButtons}>
                    <button type='button' onClick={() => handleLoginForm()}>login</button>
                    <button type='button' onClick={() => updateDisplayedComponent('forgotPassword')}>Forgot Password</button>
                </div>
            </form>
            <button type='button' onClick={() => updateDisplayedComponent('createAccount')}>New Here?</button>
        </div>
    )
}

export default LoginComponent;