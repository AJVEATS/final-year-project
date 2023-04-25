/**
 * @fileoverview This file represets the DeleteMarkerForm, which allows users to delete a location that they have created.
 * This form is shown when a user clicks on a location that they have created and clicked the 'delete' button. The user is
 * required to enter the location's name in order to delete it from the firestore database.
 * 
 * @param {Object} currentMarker - An object containing the data of the marker being deleted
 * @param {String} currentMarkerId - The id of the marker being deleted
 */
import styles from './DeleteMarkerForm.module.scss';
import React, { useEffect, useState } from 'react';
import { deleteDoc, doc, getFirestore } from 'firebase/firestore';
import { firebaseApp } from '@/pages/api/FirebaseApp';

const DeleteMarkerForm = ({ currentMarker, currentMarkerId }) => {
    const [markerName, setMarkerName] = useState('');

    useEffect(() => {
    }, [currentMarker]);

    /**
     * This async function handles the form after the 'Delete' has been pressed. It first checks if the name inputted by the user
     * is the same as the location's name. If they are, the location document is deleted from the firestore 'natureLocations'
     * collection. If the names are different the user is altered that they are different.
     * 
     * @param {string} inputtedName - The text that the user has inputted into the text input
     */
    async function handleDeleteClick(inputtedName) {
        if (inputtedName === currentMarker.name) {
            try {
                const db = getFirestore(firebaseApp);
                setMarkerName('');
                deleteDoc(doc(db, 'natureLocations', currentMarkerId));
                document.getElementById("deleteMarkerFormContainer").style.display = "none";
                alert('the marker has been deleted');
            } catch (e) {
                console.error(`Error deleting marker: ${e}`);
                alert(`Error deleting marker - ${e}`);
            };
        } else if (inputtedName != currentMarker.name) {
            alert('they do not match');
        };
    };

    /**
     * This functions the handles the user clicking the 'cancel' button, which closes the deleteMarkerForm
     */
    const handleCancelClick = () => {
        document.getElementById("deleteMarkerFormContainer").style.display = "none";
    };

    return (
        <div id='deleteMarkerFormContainer' className={styles.deleteMarkerFormContainer}>
            <p className={styles.deleteFormTitle}>{currentMarker.name}</p>
            <form className={styles.deleteMarkerForm}>
                <label>
                    <p>Re-enter location's name</p>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        value={markerName}
                        onChange={e => setMarkerName(e.target.value)}
                        required />
                </label>
                <div className={styles.buttonContainer}>
                    <button type='button' value='' onClick={() => handleCancelClick()}>Cancel</button>
                    <button type='button' value='' onClick={() => handleDeleteClick(markerName)}>Delete</button>
                </div>
            </form>
        </div>
    );
}

export default DeleteMarkerForm;