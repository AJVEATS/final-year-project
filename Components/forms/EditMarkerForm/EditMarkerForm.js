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

    // console.log(currentMarker);
    // console.log(currentMarkerId);

    const closeEditForm = () => {
        document.getElementById("editMarkerFormContainer").style.display = "none";
    };

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
            <p>Edit {currentMarker.name}</p>
            <form className={styles.editMarkerForm}>
                <label>
                    Area's name
                    <input
                        type='text'
                        id='name'
                        value={editName}
                        onChange={e => {
                            setEditName(e.target.value)
                            // console.log(editName)
                        }} />
                </label>
                <label>
                    Area's description
                    <input
                        type='text'
                        id='description'
                        value={editDescription}
                        onChange={e => {
                            setEditDescription(e.target.value)
                            // console.log(editDescription)
                        }} />
                </label>
                <label>
                    Area type
                    <select
                        name='area'
                        onChange={(e => {
                            setEditCategory(e.target.value);
                            // console.log(editCategory);
                        })}>
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
                    Is it dog friendly?
                    <select
                        name='dogFriendly'
                        defaultValue={currentMarker.dogFriendly}
                        onChange={(e => {
                            setEditDogFriendly(e.target.value);
                            // console.log(editDogFriendly);
                        })}>
                        <option value={currentMarker.dogFriendly}>{currentMarker.dogFriendly}</option>
                        <option value={'Unknown'}>Unknown</option>
                        <option value={'Yes'}>Yes</option>
                        <option value={'No'}>No</option>
                    </select>
                </label>
                <button type='button' value='' onClick={() => closeEditForm()}>Close</button>
                <button type='button' value='' onClick={() => handleEditFormClick()}>Update</button>
            </form>
        </div>
    );
}

export default EditMarkerForm;