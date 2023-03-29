import styles from './ProfileInfoComponent.module.scss';

const ProfileInfoComponent = ({ user }) => {
    // console.log(user);
    return (
        <div className={styles.profileInfoComponent}>
            <p className={styles.profileInfoComponentTitle}>Your details</p>
            <p className={styles.profileInfoComponentText}><b>First name:</b> {user.firstname}</p>
            <p className={styles.profileInfoComponentText}><b>Last name:</b> {user.lastname}</p>
            <p className={styles.profileInfoComponentText}><b>Location:</b> {user.location}</p>
            <p className={styles.profileInfoComponentText}><b>Bio:</b> {user.bio}</p>
        </div>
    );
}

export default ProfileInfoComponent;