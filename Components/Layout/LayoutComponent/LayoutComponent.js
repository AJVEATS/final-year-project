import NavigationBarComponent from 'Components/Layout/NavigationBarComponent/NavigationBarComponent';
import styles from './LayoutComponent.module.scss';

const LayoutComponent = ({ children }) => {

    return (
        <div className={styles.layoutComponent}>
            <NavigationBarComponent />
            <div className={styles.mainContentContainer}>
                {/* <p className={styles.introText}>Good Afternoon Alex</p> */}
                {children}
            </div>
        </div>
    )
}

export default LayoutComponent;