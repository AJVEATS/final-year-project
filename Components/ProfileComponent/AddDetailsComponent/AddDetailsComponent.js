import styles from './AddDetailsComponent.module.scss';
import React, { useState, useEffect } from 'react';
import { doc, setDoc } from 'firebase/firestore';

const AddDetailsComponent = ({ db }) => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [location, setLocation] = useState('');
    const [bio, setBio] = useState('');

    const handleAddDetailForm = () => {
        console.log('handleAddDetailsForm initiated');
        console.log(firstname);
        console.log(lastname);
        console.log(location);
        console.log(bio);

        const addUserDetailsObject = {
            firstname: firstname,
            lastname: lastname,
            location: location,
            bio: bio,
        }
        try {

            const collectionRef = doc(db, 'users', 'userID');

            setDoc(collectionRef, addUserDetailsObject, { merge: true });
        } catch (e) {
            console.error(`Error adding document: ${e}`);
        }

        return null;
    };

    return (
        <div>
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
                <button onClick={() => { clearForm() }}>Clear</button>
                <button type='button' value='' onClick={() => handleAddDetailForm()}>Save</button>
            </form>
        </div>
    )
}

export default AddDetailsComponent;