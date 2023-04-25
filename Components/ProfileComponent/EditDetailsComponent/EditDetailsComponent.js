/**
 * @fileoverview This file represents the EditDetailsComponent form that allows users to edit their exisiting
 * details for their account. These account details are stored in the firebase firestore.
 * 
 * @param {Object} db -  An object containing the routes path coordinates
 * @param {String} firebaseUID - The user's firebase user id
 * @param {Object} user - The user's account details 
 * @param {function} getUserDetails - A function to get the user's details from their firestore 'users' document
 * @param {functino} setUserInfo - A funcion to update the user's details that are displayed
 * @param {function} setNavigationState - A function to set the setNavigationState value
 */
import styles from './EditDetailsComponent.module.scss';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';

import { useRouter } from 'next/router'

const EditDetailsComponents = ({ db, firebaseUID, user, getUserDetails, setUserInfo, setNavigationState }) => {
    console.log(typeof user);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [location, setLocation] = useState('');
    const [bio, setBio] = useState('');
    const [popUpState, setPopUpState] = useState('none');

    const router = useRouter();

    useEffect(() => {
        setFirstname(user.firstname);
        setLastname(user.lastname)
        setLocation(user.location);
        setBio(user.bio);
    }, [user]);

    // console.log(user);

    /**
     * This fuction handles the edit detail form. It takes the details inputted by the user and updates their information
     * within their firestore 'users' document. The users will be alerted when their details have been updated.
     * 
     * @returns null
     */
    const handleEditDetailForm = () => {
        console.log('handleEditDetailsForm initiated');

        // An object containing the user's details that will be added to firestore.
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
            getUserDetails();
        } catch (e) {
            console.error(`Error adding document: ${e}`);
        }

        return null;
    };

    /**
     * This async fuction handles the delete account details button. It deletes all of the user's account information from the firestore
     * 'users' document.
     * 
     * @returns null
     */
    async function handleDeleteDetails() {

        try {
            deleteDoc(doc(db, 'users', firebaseUID));
            setFirstname('');
            setLastname('')
            setLocation('');
            setBio('');
            setUserInfo([]);
            setNavigationState('add');
            alert('details have been deleted');
        } catch (e) {
            console.error(`Error deleting details: ${e}`);
            alert(`Error deleting details - ${e}`);
        }

        return null;
    }

    return (
        <div>
            <Head>
                <title>Account - Edit Details</title>
            </Head>
            <form className={styles.profileFormContainer}>
                <p className={styles.profileFormTitle}>Edit details</p>
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
                            }} />
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
                            }} />
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
                        }} />
                </label>
                <label>
                    Bio
                    <textarea value={bio} onChange={e => setBio(e.target.value)} />
                </label>
                <button type='button' value='' onClick={() => handleEditDetailForm()}>Save Details</button>
                <button type='button' value='' className={styles.deleteDetailsButton} onClick={() => handleDeleteDetails()}>Delete Details</button>
            </form>
        </div>
    )
}

export default EditDetailsComponents;