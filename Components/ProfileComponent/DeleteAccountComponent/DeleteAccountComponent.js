import styles from './DeleteAccountComponent.module.scss';
import React, { useState } from 'react';
import { deleteUser, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

const DeleteAccountComponent = ({ popUpState, setPopUpState, auth }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const closeDeleteAccountPopUp = () => {
        console.log('closeDeleteAccountPopUp initiated');
        setPopUpState('none');
    }

    const deleteAccount = () => {
        const user = auth.currentUser;

        var credentials = auth.EmailAuthProvider.credential(
            user.email,
            password
        );

        reauthenticateWithCredential(user, credentials).then(() => {
            // User re-authenticated.
            console.log('reauthenticated');
        }).catch((error) => {
            // An error ocurred
            console.log(error);
            // ...
        });

        // deleteUser(user).then(() => {
        //     console.log('user deleted');
        // }).catch((error) => {
        //     // An error ocurred
        //     // ...
        //     console.log(error);
        // });
        console.log('deleteAccount initiated');
    }

    return (
        <div className={styles.deleteAccountPopUp} style={{ 'display': popUpState }}>
            <p className={styles.popUpTitle}>Want to delete your account?</p>
            <p className={styles.popUpSubTitle}>Enter your sign in to delete your account</p>
            <form className={styles.deleteAccountForm}>
                <input
                    type='text'
                    id='text'
                    name='email'
                    value={email}
                    onChange={e => {
                        setEmail(e.target.value);
                    }}
                    required
                />
                <input
                    type='text'
                    id='password'
                    name='password'
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value);
                    }}
                    required
                />
                <button type='button' value='' onClick={() => closeDeleteAccountPopUp()}>Cancel</button>
                <button type='button' value='' onClick={() => deleteAccount()}>Delete</button>
            </form>
        </div>
    )
}

export default DeleteAccountComponent;