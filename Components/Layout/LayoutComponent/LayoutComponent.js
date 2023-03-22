import NavigationBarComponent from 'Components/Layout/NavigationBarComponent/NavigationBarComponent';
import React, { useState, useEffect } from 'react';
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