import styles from './NavigationBarMobileComponent.module.scss';
import { faPersonWalking, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavigationBarMobileComponent = () => {
    return (
        <div className={styles.navigationBarMobileComponent}>
            <div className={styles.logo}>
                <FontAwesomeIcon icon={faPersonWalking} />
            </div>
            <div className={styles.bars}>
                <FontAwesomeIcon icon={faBars} />
            </div>
        </div>
    )
}

export default NavigationBarMobileComponent;