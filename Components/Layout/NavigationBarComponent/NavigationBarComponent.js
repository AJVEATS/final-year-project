import Link from 'next/link';
import styles from './navigationBarComponent.module.scss';
import { faPersonWalking, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavigationBarComponent = () => {
    return (
        <div className={styles.navigationBarComponent}>
            <div className={styles.navigationLogoContainer}>
                {/* <FontAwesomeIcon icon="fa-solid fa-person-walking" size="3x" /> */}
                <FontAwesomeIcon icon={faPersonWalking} />
            </div>
            <div className={styles.navigationLinks}>
                <Link href='/home'>Home</Link>
                <Link href='/draw'>Create</Link>
                <Link href='/explore'>Explore</Link>
                {/* <Link href='/home'>Favourites</Link> */}
                <Link href='/track'>Your Walks</Link>
                <Link href='/favourites'>Favourites</Link>
                <Link href='/locations'>Nature Spots</Link>
                <Link href='/account'>Account</Link>
            </div>
            <div className={styles.navigationIcon}>
                {/* <FontAwesomeIcon icon="fa-solid fa-person-walking" size="3x" /> */}
                <FontAwesomeIcon icon={faEllipsis} />
            </div>
        </div>
    );
}

export default NavigationBarComponent;