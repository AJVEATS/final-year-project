import RouteSearchComponent from './RouteSearchComponent/RouteSearchComponent';
import RouteSearchMobileComponent from './RouteSearchMobileComponent/RouteSearchMobileComponent';
import styles from './SearchComponent.module.scss';

const SearchComponent = () => {
    return (
        <div className={styles.searchComponent}>
            <RouteSearchComponent />
            <RouteSearchMobileComponent />
        </div>
    );
}

export default SearchComponent;