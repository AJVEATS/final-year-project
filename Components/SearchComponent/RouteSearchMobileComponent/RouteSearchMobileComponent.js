import styles from './RouteSearchMobileComponent.module.scss';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RouteSearchMobileComponent = () => {

    const handleSearchButtonClick = () => {
        console.log('handleSearchButtonCLick');
    }

    return (
        <div className={styles.routeSearchMobileComponent}>
            <div className={styles.routeSearchMobileForm}>

            </div>
            <div className={styles.searchButtonContaier}>
                <FontAwesomeIcon icon={faMagnifyingGlass} onClick={() => handleSearchButtonClick()} />
            </div>
        </div>
    );
}

export default RouteSearchMobileComponent;