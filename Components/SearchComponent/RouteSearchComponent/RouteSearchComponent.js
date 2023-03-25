import styles from './RouteSearchComponent.module.scss';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RouteSearchComponent = ({ searchName, setSearchName, setSearchQuerySent }) => {

    const handleSearch = () => {
        setSearchQuerySent(true);
    }

    return (
        <div className={styles.routeSearch}>
            <div className={styles.searchTitle}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <p className={styles.routeSearchTitle}>Search</p>
            </div>
            <form className={styles.searchForm}>
                <label >
                    <input
                        // className={styles.routeName}
                        type='text'
                        id='searchName'
                        name='searchName'
                        value={searchName}
                        placeholder='search by name'
                        onChange={e => {
                            setSearchName(e.target.value);
                        }}
                        required
                        maxLength='40'
                    />
                </label>
                <button type='button' value='' onClick={() => handleSearch()}>search</button>
            </form>
        </div>
    );
}

export default RouteSearchComponent;