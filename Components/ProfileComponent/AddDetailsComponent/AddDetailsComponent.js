import styles from './AddDetailsComponent.module.scss';
import React, { useState, useEffect } from 'react';

const AddDetailsComponent = () => {
    const [bio, setBio] = useState('');
    return (
        <div>
            <form className={styles.profileFormContainer}>
                <p className={styles.profileFormTitle}>Add details</p>
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
                <button onClick={() => { clearForm() }}>Clear</button>
                <input type='submit' value='submit' />
            </form>
        </div>
    )
}

export default AddDetailsComponent;