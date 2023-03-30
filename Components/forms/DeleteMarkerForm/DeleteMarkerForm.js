import styles from './DeleteMarkerForm.module.scss';
import React, { useEffect, useState } from 'react';
import { deleteDoc, doc, getFirestore } from 'firebase/firestore';
import { firebaseApp } from '@/pages/api/FirebaseApp';

const DeleteMarkerForm = ({ currentMarker, currentMarkerId }) => {
    const [markerName, setMarkerName] = useState('');

    useEffect(() => {
        // console.log(newMarkerObject.coordinates);
    }, [currentMarker]);

    console.log(currentMarker.name);

    async function handleDeleteClick(inputtedName) {
        console.log(typeof currentMarker.name);
        console.log(typeof inputtedName);
        console.log(inputtedName == currentMarker);

        if (inputtedName === currentMarker.name) {
            // alert('they match');

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

    const handleCancelClick = () => {
        document.getElementById("deleteMarkerFormContainer").style.display = "none";
    };

    return (
        <div id='deleteMarkerFormContainer' className={styles.deleteMarkerFormContainer}>
            <p>{currentMarker.name}</p>
            <form className={styles.deleteMarkerForm}>
                <label>
                    Re-enter location's name
                    <input
                        type='text'
                        id='name'
                        name='name'
                        value={markerName}
                        onChange={e => {
                            setMarkerName(e.target.value)
                            // console.log(markerName);
                        }}
                        required
                    />
                </label>
                <button type='button' value='' onClick={() => handleCancelClick()}>Cancel</button>
                <button type='button' value='' onClick={() => handleDeleteClick(markerName)}>Delete Location</button>
            </form>
        </div>
    );
}

export default DeleteMarkerForm;