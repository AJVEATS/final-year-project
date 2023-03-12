import styles from './DrawFormComponent.module.scss';

const DrawFormComponent = ({ formState, setFormState, setPrivacy, setName, setDescription, name, description, uploadRoute, setDifficulty }) => {

    const cancel = () => {
        // console.log('cancel initiated');
        setFormState('none');
        return null;
    }

    return (
        <div className={styles.drawFormComponent} style={{ 'display': formState }}>
            <p className={styles.formTitle}>Save Route</p>
            <form className={styles.drawForm}>
                <label >
                    <input
                        className={styles.routeName}
                        type='text'
                        id='name'
                        name='name'
                        value={name}
                        placeholder='name'
                        onChange={e => {
                            setName(e.target.value);
                        }}
                        required
                        maxLength='40'
                    />
                </label>
                <label>
                    <textarea
                        className={styles.routeDescription}
                        value={description}
                        placeholder='Route Description'
                        onChange={e => setDescription(e.target.value)}
                        maxLength='240' />
                </label>
                <div className={styles.routeSelectContainer}>
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
                <div className={styles.buttonContainer}>
                    <button type='button' value='' onClick={() => cancel()}>Cancel</button>
                    <button type='button' value='' onClick={() => uploadRoute()}>Save</button>
                </div>
            </form>
        </div>
    );
}

export default DrawFormComponent;