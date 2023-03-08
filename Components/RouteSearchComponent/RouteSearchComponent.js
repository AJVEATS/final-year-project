import styles from './RouteSearchComponent.module.scss';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RouteSearchComponent = () => {
    return (
        <div className={styles.routeSearch}>
            <div className={styles.searchTitle}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <p className={styles.routeSearchTitle}>Search</p>
            </div>
        </div>
    );
}

export default RouteSearchComponent;