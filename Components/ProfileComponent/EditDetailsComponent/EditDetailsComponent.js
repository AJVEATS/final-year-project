import styles from './EditDetailsComponent.module.scss';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import DeleteAccountComponent from '../DeleteAccountComponent/DeleteAccountComponent';

const EditDetailsComponents = ({ db, firebaseUID, auth, user }) => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [location, setLocation] = useState('');
    const [bio, setBio] = useState('');

    const [popUpState, setPopUpState] = useState('none');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setFirstname(user.firstname);
        setLastname(user.lastname)
        setLocation(user.location);
        setBio(user.bio);
    }, [user]);

    // console.log(user);

    const openDeleteAccountPopUp = () => {
        console.log('openDeleteAccountPopUp initiated');
        setPopUpState('block');
    }

    // const closeDeleteAccountPopUp = () => {
    //     console.log('closeDeleteAccountPopUp initiated');
    //     setPopUpState('none');
    // }

    // const deleteAccount = () => {
    //     console.log('deleteAccount initiated');
    // }

    const handleEditDetailForm = () => {
        console.log('handleEditDetailsForm initiated');

        const editUserDetailsObject = {
            firstname: firstname,
            lastname: lastname,
            location: location,
            bio: bio,
        };

        // console.log(editUserDetailsObject);

        try {

            const collectionRef = doc(db, 'users', firebaseUID);

            setDoc(collectionRef, editUserDetailsObject, { merge: true });

            alert('Your details have been updated');
        } catch (e) {
            console.error(`Error adding document: ${e}`);
        }

        return null;
    };

    return (
        <div>
            <Head>
                <title>Account - Edit Details</title>
            </Head>
            <form className={styles.profileFormContainer}>
                <p className={styles.profileFormTitle}>Edit details</p>
                <label>
                    First name
                    <input
                        type='text'
                        id='firstname'
                        name='firstname'
                        value={firstname}
                        onChange={e => {
                            setFirstname(e.target.value);
                        }}
                    />
                </label>
                <label>
                    Last name
                    <input
                        type='text'
                        id='lastname'
                        name='lastname'
                        value={lastname}
                        onChange={e => {
                            setLastname(e.target.value);
                        }}
                    />
                </label>
                <label>
                    location
                    <input
                        type='text'
                        id='location'
                        name='location'
                        value={location}
                        onChange={e => {
                            setLocation(e.target.value);
                        }}
                    />
                </label>
                <label>
                    Bio
                    <textarea value={bio} onChange={e => setBio(e.target.value)} />
                </label>
                {/* <button type='button' value='' onClick={() => openDeleteAccountPopUp()}>Delete Account</button> */}
                <button type='button' value='' onClick={() => handleEditDetailForm()}>Save</button>
            </form>
            {/* <DeleteAccountComponent popUpState={popUpState} setPopUpState={setPopUpState} auth={auth} /> */}
        </div>
    )
}

export default EditDetailsComponents;