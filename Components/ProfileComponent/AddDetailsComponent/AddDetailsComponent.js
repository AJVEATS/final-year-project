/**
 * @fileoverview This file represents the AddDetailsComponent form that allows users to add details to their account.
 * These account details are stored in the firebase firestore.
 * 
 * @param {Object} db -  An object containing the routes path coordinates
 * @param {String} firebaseUID - The user's firebase user id
 * @param {function} getUserDetails - A function to get the user's details from their firestore 'users' document
 * @param {function} setNavigationState - A function to set the setNavigationState value
 */
import styles from './AddDetailsComponent.module.scss';
import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import Head from 'next/head';

const AddDetailsComponent = ({ db, firebaseUID, getUserDetails, setNavigationState }) => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [location, setLocation] = useState('');
    const [bio, setBio] = useState('');

    /**
     * This fuction handles the add detail form. It takes the details inputted by the user and adds their information
     * to their firestore 'users' document. The users will be alerted when their details have been updated.
     * 
     * @returns null
     */
    const handleAddDetailForm = () => {
        // console.log('handleAddDetailsForm initiated');

        // An object containing the user's details that will be added to firestore.
        const addUserDetailsObject = {
            firstname: firstname,
            lastname: lastname,
            location: location,
            likes: [],
            bio: bio,
        };

        // console.log(addUserDetailsObject);

        try {
            const collectionRef = doc(db, 'users', firebaseUID);
            setDoc(collectionRef, addUserDetailsObject, { merge: true });
            alert('Your details have been saved');
            getUserDetails();
            setNavigationState('edit');
        } catch (e) {
            console.error(`Error adding document: ${e}`);
        }

        return null;
    };

    /**
     * This function resets all of the inputs within the add details form.
     */
    const clearForm = () => {
        // console.log('clearForm initiated');
        setFirstname('');
        setLastname('');
        setLocation('');
        setBio('');
    };

    return (
        <div>
            <Head>
                <title>Account - Add Details</title>
            </Head>
            <form className={styles.profileFormContainer}>
                <p className={styles.profileFormTitle}>Add details</p>
                <div className={styles.nameSection}>
                    <label className={styles.firstnameLabel}>
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
                </div>
                <label>
                    Location
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
                <button type='button' value='' className={styles.clearButton} onClick={() => { clearForm() }}>Clear</button>
                <button type='button' value='' onClick={() => handleAddDetailForm()}>Save Details</button>
            </form>
        </div>
    )
}

export default AddDetailsComponent;