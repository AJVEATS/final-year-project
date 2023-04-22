/**
 * @fileoverview This file represets the LayoutComponent which is the main layout component of the application.
 * This includes the navigation bar (mobile and desktop).
 * 
 * @param children - The children elements
 */
import NavigationBarComponent from 'Components/Layout/NavigationBarComponent/NavigationBarComponent';
import NavigationBarMobileComponent from '../NavigationBarMobileComponent.js/NavigationBarMobileComponent';
import styles from './LayoutComponent.module.scss';

const LayoutComponent = ({ children }) => {
    return (
        <div className={styles.layoutComponent}>
            <NavigationBarMobileComponent className={styles.navigationBarComponentMobile} />
            <NavigationBarComponent className={styles.navigationBarComponent} />
            <div className={styles.mainContentContainer}>
                {children}
            </div>
        </div>
    )
}

export default LayoutComponent;