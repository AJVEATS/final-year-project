import styles from './EditDetailsComponent.module.scss';
import React, { useState, useEffect } from 'react';

const EditDetailsComponents = () => {
    const [bio, setBio] = useState('');

    const deleteAccount = () => {
        return null;
    }

    return (
        <div>
            <form className={styles.profileFormContainer}>
                <p className={styles.profileFormTitle}>Edit details</p>
                <label>
                    First name
                    <input type='text' name='firstName' />
                </label>
                <label>
                    Last name
                    <input type='text' name='lastName' />
                </label>
                <label>
                    location
                    <input type='text' name='location' />
                </label>
                <label>
                    Bio
                    <textarea value={bio} onChange={setBio} />
                </label>
                <button onClick={() => { deleteAccount() }}>Delete Account</button>
                <button onClick={() => { clearForm() }}>Clear</button>
                <input type='submit' value='submit' />
            </form>
        </div>
    )
}

export default EditDetailsComponents;