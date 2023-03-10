import styles from './ProfileInfoComponent.module.scss';

const ProfileInfoComponent = ({ user }) => {
    // console.log(user);
    return (
        <div>
            <p className={styles.profileInfoComponent}>Firstname: {user.firstname}</p>
            <p className={styles.profileInfoComponent}>Lastname: {user.lastname}</p>
            <p className={styles.profileInfoComponent}>Location: {user.location}</p>
            <p className={styles.profileInfoComponent}>Bio: {user.bio}</p>
        </div>
    );
}

export default ProfileInfoComponent;