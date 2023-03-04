import SignOutComponent from 'Components/signOutComponent/SignOutComponent'
import styles from './ProfileNavigationComponent.module.scss'

const ProfileNavigationComponent = ({ navigationState, setNavigationState }) => {
    return (
        <div className={styles.profileNavigationComponent}>
            <button onClick={() => {
                setNavigationState('add')
            }}>Add details</button>
            <button onClick={() => setNavigationState('edit')}>Edit details</button>
            <SignOutComponent />
        </div >
    )
}

export default ProfileNavigationComponent;