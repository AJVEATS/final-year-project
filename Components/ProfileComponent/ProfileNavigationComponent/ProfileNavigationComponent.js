/**
 * @fileoverview This file represents the ProfileInfoComponent which displays the user's account information.
 * 
 * @param {String} navigationState - The navigation state for the profile page 
 * @param {Function} setNavigationState - A function to update the navigationState.
 */
import styles from './ProfileNavigationComponent.module.scss';
import SignOutComponent from 'Components/signOutComponent/SignOutComponent';

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