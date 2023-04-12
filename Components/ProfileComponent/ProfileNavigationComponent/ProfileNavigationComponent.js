import SignOutComponent from 'Components/signOutComponent/SignOutComponent'
import styles from './ProfileNavigationComponent.module.scss'

const ProfileNavigationComponent = ({ navigationState, setNavigationState }) => {
    return (
        <div className={styles.profileNavigationComponent}>
            <button
                style={{
                    background: navigationState == 'add' ? '#306b34' : '#ffffff',
                    color: navigationState == 'add' ? '#ffffff' : '#000000'
                }}
                onClick={() => {
                    setNavigationState('add');
                }}>Add details</button>
            <button
                style={{
                    background: navigationState == 'edit' ? '#306b34' : '#ffffff',
                    color: navigationState == 'edit' ? '#ffffff' : '#000000'
                }}
                onClick={() => {
                    setNavigationState('edit');
                }}>Edit details</button>
            <SignOutComponent />
        </div >
    )
}

export default ProfileNavigationComponent;