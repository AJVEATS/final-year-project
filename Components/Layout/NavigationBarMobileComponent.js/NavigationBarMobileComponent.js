/**
 * @fileoverview This file represets the NavigationBarMobileComponet which is the navigation menu
 * for mobile and tablet devices (screens smaller than 1000 pixels wide).
 */
import styles from './NavigationBarMobileComponent.module.scss';
import { faPersonWalking, faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link';

const NavigationBarMobileComponent = () => {

    /**
     * This function opens the mobile navigation curtain menu
     */
    const openMenu = () => {
        // console.log('open menu initiated');
        document.getElementById("curtainMenu").style.width = "100%";
    };

    /**
     * This function closes the mobile navigation curtain menu
     */
    const closeMenu = () => {
        // console.log('close menu initiated');
        document.getElementById("curtainMenu").style.width = 0;
    };

    return (
        <div className={styles.navigationBarMobileComponent}>
            <div className={styles.navigationBarMobile}>
                <div className={styles.logo}>
                    <FontAwesomeIcon icon={faPersonWalking} />
                </div>
                <div className={styles.bars}>
                    <FontAwesomeIcon icon={faBars} onClick={() => openMenu()} />
                </div>
            </div>
            <div id='curtainMenu' className={styles.curtainMenu}>
                <div className={styles.curtainTop}>
                    <FontAwesomeIcon icon={faPersonWalking} />
                    <FontAwesomeIcon className={styles.closeButton} icon={faX} onClick={() => closeMenu()} />
                </div>
                <div className={styles.curtainNavigationLinks}>
                    <Link href='/home'>Home</Link>
                    <Link href='/draw'>Create</Link>
                    <Link href='/discover'>Routes</Link>
                    <Link href='/locations'>Nature Areas</Link>
                    <Link href='/account'>Account</Link>
                </div>
            </div>
        </div>
    )
}

export default NavigationBarMobileComponent;