import styles from './EditRouteForm.module.scss';
import React, { useState, useEffect } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

const EditRouteForm = ({ displaySetting, route, setDisplaySetting, uid, db, routeId }) => {
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

    const closeForm = () => {
        setDisplaySetting('none');
    }

    const editRouteDetails = () => {
        route.privacy = privacy;
        route.name = name;
        route.description = description;
        route.difficulty = difficulty;

        try {
            const collectionRef = doc(db, 'routes', routeId);

            setDoc(collectionRef, route, { merge: true });
            alert('The route details have been updated');
            router.push(`/explore`);
        } catch (e) {
            console.error(`Error adding document: ${e}`);
        }
    }

    return (
        <div className={styles.editRouteFormContainer} style={{ 'display': displaySetting }}>
            <p>Edit Route Details</p>
            <form className={styles.editRouteForm}>
                <label>
                    Name:
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
                    Description
                    <textarea value={description} onChange={e => setDescription(e.target.value)} />
                </label>
                <label>
                    Route Difficulty:
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
                    Route Visibility:
                    <select name='privacy' onChange={(e => {
                        setPrivacy(e.target.value);
                        console.log(e.target.value)
                    })}>
                        <option value={'public'}>Public</option>
                        <option value={'private'}>Private</option>
                    </select>
                </label>
                <button type='button' value='' onClick={() => closeForm()}>Cancel</button>
                <button type='button' value='' onClick={() => editRouteDetails()}>Update Route</button>
            </form>
        </div>
    )
}

export default EditRouteForm;