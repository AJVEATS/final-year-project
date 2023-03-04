import styles from './AddDetailsComponent.module.scss';
import React, { useState, useEffect } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import Head from 'next/head';

const AddDetailsComponent = ({ db, firebaseUID }) => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [location, setLocation] = useState('');
    const [bio, setBio] = useState('');

    const handleAddDetailForm = () => {
        console.log('handleAddDetailsForm initiated');

        const addUserDetailsObject = {
            firstname: firstname,
            lastname: lastname,
            location: location,
            bio: bio,
        };

        console.log(addUserDetailsObject);

        try {

            const collectionRef = doc(db, 'users', firebaseUID);

            setDoc(collectionRef, addUserDetailsObject, { merge: true });

            alert('Your details have been saved');
        } catch (e) {
            console.error(`Error adding document: ${e}`);
        }

        return null;
    };

    const clearForm = () => {
        console.log('clearForm initiated');
        setFirstname('');
        setLastname('');
        setLocation('');
        setBio('');
    }

    return (
        <div>
            <Head>
                <title>Account - Add Details</title>
            </Head>
            <form className={styles.profileFormContainer}>
                <p className={styles.profileFormTitle}>Add details</p>
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
                <button type='button' value='' onClick={() => { clearForm() }}>Clear</button>
                <button type='button' value='' onClick={() => handleAddDetailForm()}>Save</button>
            </form>
        </div>
    )
}

export default AddDetailsComponent;