/**
 * @fileoverview This file represets the EditMarkerForm, which allows users to edit a location that they have created.
 * This form is shown when a user clicks on a location that they have created and clicked the 'edit' button. The user is
 * required to enter the location's name and a description in order to update the location's information in the firestore
 * database. Users are also able to set the location's category and if it is dog friendly. 
 * 
 * @param {Object} currentMarker - An object containing the data of the marker being edited
 * @param {String} currentMarkerId - The id of the marker being edited
 */
import styles from './EditMarkerForm.module.scss';
import React, { useEffect, useState } from 'react';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { firebaseApp } from '@/pages/api/FirebaseApp';

const EditMarkerForm = ({ currentMarker, currentMarkerId }) => {
    const [editName, setEditName] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editCategory, setEditCategory] = useState('');
    const [editDogFriendly, setEditDogFriendly] = useState('');

    useEffect(() => {
        // console.log(currentMarker);
        setEditName(currentMarker.name);
        setEditDescription(currentMarker.description);
        setEditCategory(currentMarker.category);
        setEditDogFriendly(currentMarker.dogFriendly);

    }, [currentMarker]);

    /**
     * This function closes the edit location when the user clicks the 'close' button.
     */
    const closeEditForm = () => {
        document.getElementById("editMarkerFormContainer").style.display = "none";
    };

    /**
     * This function updates the location's information stored in the location's document in the 
     * 'natureLocations' collection in the firestore database. The user must have entered a valid
     * name and description in order to update the location. If the user does not enter the 
     * required information, the user is altered to fill in the required fields.
     */
    const handleEditFormClick = () => {
        if (editName != '' && editDescription != '') {

            const updatedMarker = {
                name: editName,
                description: editDescription,
                category: editCategory,
                dogFriendly: editDogFriendly
            };

            try {
                const db = getFirestore(firebaseApp);
                const collectionRef = doc(db, 'natureLocations', currentMarkerId);
                setDoc(collectionRef, updatedMarker, { merge: true });
                document.getElementById("editMarkerFormContainer").style.display = "none";
                alert(`${editName} has been updated`);
            } catch (e) {
                console.error(`Error adding document: ${e}`);
            };
        } else {
            alert('Please enter a name and description for the location');
        }
    };

    return (
        <div id='editMarkerFormContainer' className={styles.editMarkerFormContainer}>
            <p className={styles.editFormTitle}>Edit {currentMarker.name}</p>
            <form className={styles.editMarkerForm}>
                <label>
                    <p>Area's name:</p>
                    <input
                        type='text'
                        id='name'
                        value={editName}
                        onChange={e => setEditName(e.target.value)} />
                </label>
                <label>
                    <p>Area's description:</p>
                    <textarea
                        type='text'
                        id='description'
                        placeholder='Description'
                        value={editDescription}
                        onChange={e => setEditDescription(e.target.value)}
                        maxLength='240' />
                </label>
                <label>
                    <p>Area Category:</p>
                    <select
                        name='area'
                        onChange={e => setEditCategory(e.target.value)}>
                        <option value={currentMarker.category}>{currentMarker.category}</option>
                        <option value={'No category'}>No category</option>
                        <option value={'Woodland'}>Woodland</option>
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
                        defaultValue={currentMarker.dogFriendly}
                        onChange={e => setEditDogFriendly(e.target.value)}>
                        <option value={currentMarker.dogFriendly}>{currentMarker.dogFriendly}</option>
                        <option value={'Unknown'}>Unknown</option>
                        <option value={'Yes'}>Yes</option>
                        <option value={'No'}>No</option>
                    </select>
                </label>
                <div className={styles.buttonContainer}>
                    <button type='button' value='' onClick={() => closeEditForm()}>Close</button>
                    <button type='button' value='' onClick={() => handleEditFormClick()}>Update</button>
                </div>
            </form>
        </div >
    );
}

export default EditMarkerForm;