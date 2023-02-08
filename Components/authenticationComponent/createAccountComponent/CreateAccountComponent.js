import styles from './CreateAccountComponent.module.scss';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Tooltip } from 'react-tooltip';

const CreateAccountComponent = ({ updateDisplayedComponent, auth }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const router = useRouter();

    const handleCreateAccountForm = (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    router.push('/home');
                })
                .catch((error) => {
                    console.log(error.code, error.message);
                })
        } else {
            alert(`The entered passwords do not match`);
        }
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
                        pattern="(?=.{8,25})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.!£%])(?=.*[0-9]).*$"
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
                        pattern="(?=.{8,25})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.!£%])(?=.*[0-9]).*$"
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
            <button type='button' value='' onClick={() => updateDisplayedComponent('login')}>Already have an account?</button>
        </div>
    )
}

export default CreateAccountComponent;