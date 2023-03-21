import NavigationBarComponent from 'Components/Layout/NavigationBarComponent/NavigationBarComponent';
import React, { useState, useEffect } from 'react';
import NavigationBarMobileComponent from '../NavigationBarMobileComponent.js/NavigationBarMobileComponent';
import styles from './LayoutComponent.module.scss';

const LayoutComponent = ({ children }) => {
    const [isScreenMobile, setIsScreenMobile] = useState(false);

    useEffect(() => {
        const handleScreenResize = () => {
            if (screen.width <= 1000) {
                // console.log('this is a mobile device');
                setIsScreenMobile(true);
            } else if (screen.width > 1000) {
                // console.log('this is not a mobile device');
                setIsScreenMobile(false);
            }
            // console.log(isScreenMobile);
        }
        handleScreenResize();
        window.addEventListener('resize', handleScreenResize);
    }, []);

    return (
        <div className={styles.layoutComponent}>
            {isScreenMobile && <NavigationBarMobileComponent />}
            {!isScreenMobile && <NavigationBarComponent />}
            <div className={styles.mainContentContainer}>
                {/* <p className={styles.introText}>Good Afternoon Alex</p> */}
                {children}
            </div>
        </div>
    )
}

export default LayoutComponent;