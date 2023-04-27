/**
 * @fileoverview This file represets the NavigationBarComponet which is the navigation menu
 * for desktop and laptop devices (screens larger than 1000 pixels wide).
 */
import Link from 'next/link';
import styles from './navigationBarComponent.module.scss';
import { faPersonWalking, faEllipsis, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavigationBarComponent = () => {
    return (
        <div className={styles.navigationBarComponent}>
            <div className={styles.navigationLogoContainer}>
                <FontAwesomeIcon icon={faPersonWalking} />
            </div>
            <div className={styles.navigationLinks}>
                <Link href='/home'>Home</Link>
                <Link href='/draw'>Create</Link>
                <Link href='/discover'>Routes</Link>
                <Link href='/locations'>Nature Areas</Link>
                <Link href='/account'>Account</Link>
            </div>
            <div className={styles.navigationIcon}>
                <div className={styles.bottomIcon}>
                    <FontAwesomeIcon icon={faAnglesRight} />
                </div>
            </div>
        </div>
    );
}

export default NavigationBarComponent;