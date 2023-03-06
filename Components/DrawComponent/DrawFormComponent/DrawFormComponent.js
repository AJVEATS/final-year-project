import styles from './DrawFormComponent.module.scss';
import { useState } from 'react';

const DrawFormComponent = ({ formState, setFormState, setPrivacy, setName, setDescription, name, description, uploadRoute }) => {

    const cancel = () => {
        console.log('cancel initiated');
        setFormState('none');
        return null;
    }

    const saveRoute = () => {
        console.log('saveRoute initiated');
        return null;
    }

    return (
        <div className={styles.drawFormComponent} style={{ 'display': formState }}>
            <p className={styles.formTitle}>Save Route</p>
            <form className={styles.drawForm}>
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
                    Route Visibility:
                    <select name='privacy' onChange={(e => {
                        setPrivacy(e.target.value);
                        console.log(e.target.value)
                    })}>
                        <option value={'public'}>Public</option>
                        <option value={'private'}>Private</option>
                    </select>
                </label>
                <button type='button' value='' onClick={() => cancel()}>Cancel</button>
                <button type='button' value='' onClick={() => uploadRoute()}>Save</button>
            </form>
        </div>
    );
}

export default DrawFormComponent;