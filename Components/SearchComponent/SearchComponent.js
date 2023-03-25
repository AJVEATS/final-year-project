import RouteSearchComponent from './RouteSearchComponent/RouteSearchComponent';
import RouteSearchMobileComponent from './RouteSearchMobileComponent/RouteSearchMobileComponent';
import styles from './SearchComponent.module.scss';

const SearchComponent = ({ searchName, setSearchName, setSearchQuerySent }) => {
    return (
        <div className={styles.searchComponent}>
            <RouteSearchComponent searchName={searchName} setSearchName={setSearchName} setSearchQuerySent={setSearchQuerySent} />
            <RouteSearchMobileComponent />
        </div>
    );
}

export default SearchComponent;