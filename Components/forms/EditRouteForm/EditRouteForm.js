/**
 * @fileoverview This file represets the ExploreComponent which displays the walking routes. It allows users to 
 * apply filters to change which routes are displayed with the ExploreNavigationComponent. The walking routes 
 * are displayed as a list, their distance and duration are formatted as well.
 * 
 * @param {String} displaySetting - The display state of the edit route form.
 * @param {Object} route - An object containing the routes information  
 * @param {Function} setDisplaySetting - A function to update the display stat of the edit route form
 * @param {Object} db - Initialisation of cloud firestore and reference to the service
 * @param {String} routeId - The id of the route being edited
 * 
*/
import styles from './EditRouteForm.module.scss';
import React, { useState, useEffect } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from 'next/router';

const EditRouteForm = ({ displaySetting, route, setDisplaySetting, db, routeId }) => {
    const [privacy, setPrivacy] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('');

    useEffect(() => {
        setPrivacy(route.privacy)
        setName(route.name);
        setDescription(route.description);
        setDifficulty(route.difficulty);
    }, [route]);

    const router = useRouter();

    /**
     * This function closes the edit route form
     */
    const closeForm = () => {
        setDisplaySetting('none');
    };

    /**
     * This function takes the inputs from the edit route form and updates the route document from the 'routes' collection
     * in the firestore database
     */
    const editRouteDetails = () => {
        route.privacy = privacy;
        route.name = name;
        route.description = description;
        route.difficulty = difficulty;

        try {
            const collectionRef = doc(db, 'routes', routeId);
            setDoc(collectionRef, route, { merge: true });
            setDisplaySetting('none');
            alert('The route details have been updated');
            router.push(`/routes/${routeId}`);
        } catch (e) {
            console.error(`Error adding document: ${e}`);
        }
    };

    return (
        <div className={styles.editRouteFormContainer} style={{ 'display': displaySetting }}>
            <p className={styles.title}>

                <FontAwesomeIcon icon={faPenToSquare} />
                Update Route Details</p>
            <form className={styles.editRouteForm}>
                <label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        value={name}
                        onChange={e => {
                            setName(e.target.value);
                        }}
                        required
                    />
                </label>
                <label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} />
                </label>
                <div className={styles.formSelects}>
                    <label>
                        <p>Route Difficulty:</p>
                        <select name='difficulty' onChange={(e => {
                            setDifficulty(e.target.value);
                            console.log(e.target.value)
                        })}>
                            <option value={'beginner'}>Beginner</option>
                            <option value={'medium'}>Medium</option>
                            <option value={'advanced'}>Advanced</option>
                        </select>
                    </label>
                    <label>
                        <p>Route Visibility:</p>
                        <select name='privacy' onChange={(e => {
                            setPrivacy(e.target.value);
                            console.log(e.target.value)
                        })}>
                            <option value={'public'}>Public</option>
                            <option value={'private'}>Private</option>
                        </select>
                    </label>
                </div>
                <div className={styles.formButtons}>
                    <button type='button' value='' onClick={() => closeForm()}>Cancel</button>
                    <button type='button' value='' onClick={() => editRouteDetails()}>Update Route</button>
                </div>
            </form>
        </div>
    )
}

export default EditRouteForm;