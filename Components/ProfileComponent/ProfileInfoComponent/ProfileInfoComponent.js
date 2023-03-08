import styles from './ProfileInfoComponent.module.scss';

const ProfileInfoComponent = ({ user }) => {
    console.log(user);
    return (
        <div>
            <p className={styles.profileInfoComponent}>{user.firstname}</p>
            <p className={styles.profileInfoComponent}>{user.lastname}</p>
            <p className={styles.profileInfoComponent}>{user.location}</p>
            <p className={styles.profileInfoComponent}>{user.bio}</p>
        </div>
    );
}

export default ProfileInfoComponent;