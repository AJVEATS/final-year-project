/**
 * @fileoverview This file represets the CreateAccountComponent which is a form to allow users to create an account
 * for the application. It uses firebase authentication to authenticate users and add the user to the firestore database. 
 * 
 * @param {function} updateDisplayedComponent - A function to update the current form being displayed
 * @param auth - Firebase authentication initialisation
 * @param db - Initialisation of cloud firestore and reference to the service
 */
import styles from './CreateAccountComponent.module.scss';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Tooltip } from 'react-tooltip';
import { doc, setDoc } from 'firebase/firestore';

const CreateAccountComponent = ({ updateDisplayedComponent, auth, db }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordCriteria, setPasswordCriteria] = useState({ hasNum: false, hasLowerCase: false, hasUpperCase: false, hasSpecialCharacter: false, meetsLength: false });

    const router = useRouter();

    /**
     * This function handles the input from the createAccountForm and creates a user with firebase authentication.
     * If the users inputs valid data an account will be created and they will be redirected to the homepage.
     */
    const handleCreateAccountForm = () => {
        if (password === confirmPassword) { // Checks both password are the same
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // console.log(userCredential.user.uid);
                    try {
                        const newUserObject = {
                            bio: '',
                            firstname: '',
                            lastname: '',
                            likes: [],
                            location: ''
                        };
                        const collectionRef = doc(db, 'users', userCredential.user.uid);
                        setDoc(collectionRef, newUserObject, { merge: true });
                    } catch (e) {
                        console.error(`Error adding document: ${e}`);
                    }
                    router.push('/home');
                })
                .catch((error) => {
                    // console.log(error.code, error.message);
                    alert(`${error.code} ${error.message}`);
                })
        } else {
            alert(`The entered passwords do not match`);
        }
    }

    /**
     * This function checks if the inputted password meets the password criteria. 
     * 
     * @param {string} password - The password inputted by the user.
     */
    const checkPassword = (password) => {
        passwordCriteria.hasNum = /[0-9]/.test(password);
        passwordCriteria.hasUpperCase = /[A-Z]/.test(password);
        passwordCriteria.hasLowerCase = /[a-z]/.test(password);
        passwordCriteria.hasSpecialCharacter = /[@#$%^&+=.!£%]/.test(password);

        if (password.length >= 8) {
            passwordCriteria.meetsLength = true;
        } else {
            passwordCriteria.meetsLength = false;
        }
    }

    return (
        <div className={styles.createAccount}>
            <p className={styles.title}>Create Account:</p>
            <form className={styles.createAccountForm} onSubmit={handleCreateAccountForm}>
                <label>
                    Email:
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={email}
                        onChange={e => {
                            setEmail(e.target.value);
                        }}
                        onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
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
                        onChange={e => {
                            setPassword(e.target.value);
                            checkPassword(e.target.value);
                        }}
                        onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
                        required
                    />
                    <Tooltip anchorId='password' place='bottom' clickable style={{ background: 'black' }}>
                        <p><b>Must contain:</b></p>
                        <p style={{ color: (passwordCriteria.hasUpperCase ? 'green' : 'red') }}><b>1 Uppercase</b></p>
                        <p style={{ color: (passwordCriteria.hasLowerCase ? 'green' : 'red') }}><b>1 Lowercase</b></p>
                        <p style={{ color: (passwordCriteria.hasNum ? 'green' : 'red') }}><b>1 Number</b></p>
                        <p style={{ color: (passwordCriteria.hasSpecialCharacter ? 'green' : 'red') }}><b>1 Special Character</b></p>
                        <p style={{ color: (passwordCriteria.meetsLength ? 'green' : 'red') }}><b>8 Characters long</b></p>
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
                        onKeyDown={(e) => { (e.key === 'Enter' ? handleCreateAccountForm() : null) }}
                        required
                    />
                    <Tooltip anchorId='confirmPassword' place='bottom' clickable style={{ background: 'black' }}>
                        <p><b>Both passwords should match</b></p>
                    </Tooltip>
                </label>
                <p className={styles.legal}>By creating an account, you agree to the <br /><a>Terms of Service</a>. View the <a>Privacy Policy</a></p>
                <div className={styles.buttons}>
                    <button type='button' value='' onClick={() => handleCreateAccountForm()}>Create Account</button>
                    <button type='button' value='' onClick={() => updateDisplayedComponent('login')}>Go to login</button>
                </div>
            </form>
        </div>
    )
}

export default CreateAccountComponent;