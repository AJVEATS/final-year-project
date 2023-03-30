import styles from './SearchLocationsComponent.module.scss';
import React, { useEffect, useState } from 'react';

const SearchLocationsComponent = ({ locations, setLocations, removeMarkers, allLocations }) => {
    const [categoryQuery, setCategoryQuery] = useState('');
    console.log(locations);

    const handleSearchPopUp = () => {
        document.getElementById("searchLocationFormContainer").style.display = "block";
    };

    const searchByCategory = (query) => {
        console.log(query);
        // setLocations([]);
        const filteredMarkers = allLocations.filter(marker => marker.locationData.category == query);
        removeMarkers();
        setLocations(filteredMarkers);
        console.log(locations);
    };

    const resetFilters = () => {
        setLocations(allLocations);
    }

    return (
        <div className={styles.searchLocationsComponent}>
            <div id='searchLocationFormContainer' className={styles.searchLocationFormContainer}>
                <form className={styles.searchLocationForm}>
                    <label>
                        Search by category
                        <select
                            name='category'
                            onChange={e => {
                                setCategoryQuery(e.target.value)
                            }}
                            required>
                            <option value={'No category'}>No category</option>
                            <option value={'Woodland'}>Woodland</option>
                            <option value={'Garden'}>Garden</option>
                            <option value={'Mooreland'}>Mooreland</option>
                            <option value={'Park'}>Park</option>
                            <option value={'River'}>River</option>
                            <option value={'Lake/ Pond'}>Lake/ Pond</option>
                            <option value={'Golf Course'}>Golf Course</option>
                        </select>
                        <button type='button' value='' onClick={() => searchByCategory(categoryQuery)}>Search</button>
                    </label>
                    <button type='button' value='' onClick={() => resetFilters()}>Reset</button>
                </form>
            </div>
            <div className={styles.searchLocationsButtonContainer}>
                <button type='button' value='' onClick={() => handleSearchPopUp()}>Search</button>
            </div>
        </div>
    );
};

export default SearchLocationsComponent;