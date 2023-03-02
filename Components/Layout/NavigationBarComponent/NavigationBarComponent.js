import Link from 'next/link';
import styles from './navigationBarComponent.module.scss';

const NavigationBarComponent = () => {
    return (
        <div className={styles.navigationBarComponent}>
            <div className={styles.navigationLogoContainer}>

            </div>
            <div className={styles.navigationLinks}>
                <Link href='/home'>Home</Link>
                <Link href='/home'>Create</Link>
                <Link href='/home'>Explore</Link>
                <Link href='/home'>Favourites</Link>
                <Link href='/home'>Your Walks</Link>
                <Link href='/account'>Account</Link>
            </div>
        </div>
    );
}

export default NavigationBarComponent;