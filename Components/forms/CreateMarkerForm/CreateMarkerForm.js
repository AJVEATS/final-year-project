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

    async function saveMarker() {
        // console.log('saveMarker initated');
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

        return null;
    };

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
                    Area's name
                    <input
                        type='text'
                        id='name'
                        name='name'
                        value={markerName}
                        onChange={e => {
                            setMarkerName(e.target.value)
                            // console.log(markerName);
                        }}
                        required />
                </label>
                <label>
                    Area's description
                    <input
                        type='text'
                        id='location'
                        name='location'
                        value={markerDescription}
                        onChange={e => {
                            setMarkerDescription(e.target.value)
                            // console.log(markerDescription);
                        }}
                        required />
                </label>
                <label>
                    Area type
                    <select
                        name='area'
                        onChange={(e => {
                            setMarkerCategory(e.target.value);
                            // console.log(markerCategory);
                        })}>
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
                    Is it dog friendly?
                    <select
                        name='dogFriendly'
                        onChange={(e => {
                            setDogFriendly(e.target.value);
                            // console.log(dogFriendly);
                        })}>
                        <option value={'Unknown'}>Unknown</option>
                        <option value={'Yes'}>Yes</option>
                        <option value={'No'}>No</option>
                    </select>
                </label>
                <button type='button' value='' onClick={() => cancel()}>Cancel</button>
                <button type='button' value='' onClick={() => saveMarker()}>Save</button>
            </form>
        </div>
    );
}

export default CreateMarkerForm;