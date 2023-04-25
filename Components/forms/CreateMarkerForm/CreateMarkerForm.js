/**
 * @fileoverview This file represets the CreateMarkerForm, which allows users to add a location to the recommended nature
 * location map. This form is shown when a user double clicks the map initialised in the LocationsComponent. After filling
 * in this form the new location will be added to the map and added to the 'natureLocations' collection in firestore.
 * 
 * @param {Object} newMarkerObject - An object used to add the new location to the map as a marker and to add to firestore
 * @param {Function} addNewMarker - A function from the LocationsComponent to add new locations to the map
 */
import styles from './CreateMarkerForm.module.scss';
import React, { useEffect, useState } from 'react';
import moment from 'moment/moment';
import { getAuth } from 'firebase/auth';
import { firebaseApp } from '@/pages/api/FirebaseApp';
import { addDoc, collection, getFirestore } from 'firebase/firestore';

const CreateMarkerForm = ({ newMarkerObject, addNewMarker }) => {
    const [markerName, setMarkerName] = useState('');
    const [markerDescription, setMarkerDescription] = useState('');
    const [markerCategory, setMarkerCategory] = useState('No category');
    const [dogFriendly, setDogFriendly] = useState('Unknown');

    useEffect(() => {
        // console.log(newMarkerObject.coordinates);
    }, [newMarkerObject]);

    /**
     * This async function is called when the user clicks the 'Save' button within the form. If the user has not entered
     * the location's details an alert is triggered informing the user to add details. Once a user has filled in the form
     * with valid inputs the newMarkerObject is saved to firestore as a new document in the 'natureLocations' collection.
     * 
     * @returns null
     */
    async function saveMarker() {
        // console.log('saveMarker initated');
        if (markerName != '' && markerDescription != '') {
            try {
                const auth = getAuth();
                const firebaseUID = auth.currentUser.uid;
                const db = getFirestore(firebaseApp);
                const date = moment().format('LL');

                newMarkerObject.name = markerName;
                newMarkerObject.description = markerDescription;
                newMarkerObject.category = markerCategory;
                newMarkerObject.dogFriendly = dogFriendly;
                newMarkerObject.date = date;
                newMarkerObject.uid = firebaseUID;

                delete newMarkerObject.length;
                // console.log(newMarkerObject);

                const collectionRef = await addDoc(collection(db, 'natureLocations'), newMarkerObject);
                document.getElementById("createMarkerForm").style.display = "none";
                document.getElementById("subTitleContainer").style.display = "block";

                alert(`${newMarkerObject.name} has been added`);
                addNewMarker(newMarkerObject);

                for (var variableKey in newMarkerObject) {
                    if (newMarkerObject.hasOwnProperty(variableKey)) {
                        delete newMarkerObject[variableKey];
                    };
                };

                setMarkerName('');
                setMarkerDescription('');
                setMarkerCategory('No category');
                setDogFriendly('Unknown');

                // console.log(newMarkerObject);
            } catch (e) {
                console.error(`Error adding document: ${e}`);
                alert(`Error uploading route - ${e}`);
            }
        } else {
            alert('Please fill in the locations details');
        }

        return null;
    };

    /**
     * This function is called when the 'cancel' button is clicked and hides the createMarkerForm
     * 
     * @returns null
     */
    const cancel = () => {
        // console.log('cancel initated');        
        document.getElementById("createMarkerForm").style.display = "none";
        document.getElementById("subTitleContainer").style.display = "block";
        return null;
    };

    return (
        <div id='createMarkerForm' className={styles.createMarkerFormContainer}>
            <p className={styles.createMarkerTitle}>Add Location</p>
            <form className={styles.createMarkerForm}>
                <label>
                    <p>Area's name</p>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        value={markerName}
                        onChange={e => setMarkerName(e.target.value)}
                        required />
                </label>
                <label>
                    <p>Area's description</p>
                    <textarea
                        type='text'
                        id='location'
                        name='location'
                        value={markerDescription}
                        onChange={e => setMarkerDescription(e.target.value)}
                        required />
                </label>
                <label>
                    <p>Area type</p>
                    <select
                        name='area'
                        onChange={e => setMarkerCategory(e.target.value)}>
                        <option value={'No category'}>No category</option>
                        <option value={'Woodland'}>Woodland</option>
                        <option value={'Garden'}>Garden</option>
                        <option value={'Mooreland'}>Mooreland</option>
                        <option value={'Park'}>Park</option>
                        <option value={'River'}>River</option>
                        <option value={'Beach'}>Beach</option>
                        <option value={'Lake/ Pond'}>Lake/ Pond</option>
                        <option value={'Golf Course'}>Golf Course</option>
                    </select>
                </label>
                <label>
                    <p>Is it dog friendly?</p>
                    <select
                        name='dogFriendly'
                        onChange={e => setDogFriendly(e.target.value)}>
                        <option value={'Unknown'}>Unknown</option>
                        <option value={'Yes'}>Yes</option>
                        <option value={'No'}>No</option>
                    </select>
                </label>
                <div className={styles.buttonContainer}>
                    <button type='button' value='' onClick={() => cancel()}>Cancel</button>
                    <button type='button' value='' onClick={() => saveMarker()}>Save</button>
                </div>
            </form>
        </div>
    );
}

export default CreateMarkerForm;