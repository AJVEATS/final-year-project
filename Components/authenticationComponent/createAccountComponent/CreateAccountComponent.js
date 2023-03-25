import styles from './CreateAccountComponent.module.scss';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Tooltip } from 'react-tooltip';

const CreateAccountComponent = ({ updateDisplayedComponent, auth }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordCriteria, setPasswordCriteria] = useState({ hasNum: false, hasLowerCase: false, hasUpperCase: false, hasSpecialCharacter: false, meetsLength: false });
    const [terms, setTerms] = useState(false);

    const router = useRouter();

    const handleCreateAccountForm = (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
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
                        required
                    />
                    <Tooltip anchorId='password' place='bottom' clickable>
                        <p><b>Must contain:</b></p>
                        <p style={{ color: (passwordCriteria.hasUpperCase ? 'green' : 'red') }}>1 Uppercase</p>
                        <p style={{ color: (passwordCriteria.hasLowerCase ? 'green' : 'red') }}>1 Lowercase</p>
                        <p style={{ color: (passwordCriteria.hasNum ? 'green' : 'red') }}>1 Number</p>
                        <p style={{ color: (passwordCriteria.hasSpecialCharacter ? 'green' : 'red') }}>1 Special Character</p>
                        <p style={{ color: (passwordCriteria.meetsLength ? 'green' : 'red') }}>8 Characters long</p>
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
                </label>
                <p>By creating an account, you agree to the <br /><a>Terms of Service</a>. View the <a>Privacy Policy</a></p>
                <div className={styles.buttons}>
                    <button type='submit' value='submit'>Create Account</button>
                    <button type='button' value='' onClick={() => updateDisplayedComponent('login')}>Go to login</button>
                </div>
            </form>
        </div>
    )
}

export default CreateAccountComponent;