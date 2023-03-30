import styles from './SearchLocationsComponent.module.scss';
import React, { useEffect, useState } from 'react';

const SearchLocationsComponent = ({ locations, setLocations, removeMarkers, allLocations }) => {
    const [categoryQuery, setCategoryQuery] = useState('');
    const [dogFriendlyQuery, setDogFriendlyQuery] = useState('');
    const [nameQuery, setNameQuery] = useState('');
    const [showSearchForm, setShowSearchForm] = useState(false);
    // console.log(locations);

    const handleSearchPopUp = () => {
        if (showSearchForm == false) {
            document.getElementById("searchLocationFormContainer").style.display = "block";
            setShowSearchForm(true);
        } else if (showSearchForm == true) {
            document.getElementById("searchLocationFormContainer").style.display = "none";
            setShowSearchForm(false);
        };
    };

    const searchByCategory = (query) => {
        // console.log(query);
        const filteredMarkers = allLocations.filter(marker => marker.locationData.category == query);
        removeMarkers();
        setLocations(filteredMarkers);
        // console.log(locations);
    };

    const searchByDogFriendliness = (query) => {
        // console.log(query);
        const filteredMarkers = allLocations.filter(marker => marker.locationData.dogFriendly == query);
        removeMarkers();
        setLocations(filteredMarkers);
    };

    const searchByName = (query) => {
        const filteredMarkers = allLocations.filter(marker => marker.locationData.name.toLowerCase().includes(query.toLowerCase()));
        removeMarkers();
        setLocations(filteredMarkers);
    }

    const resetFilters = () => {
        setLocations(allLocations);
        setCategoryQuery('');
        setDogFriendlyQuery('');
    };

    return (
        <div className={styles.searchLocationsComponent}>
            <div id='searchLocationFormContainer' className={styles.searchLocationFormContainer}>
                <div className={styles.searchLocationForm}>
                    <form>
                        <label>
                            Search by name
                            <input
                                type='name'
                                id='name'
                                name='name'
                                value={nameQuery}
                                onChange={e => {
                                    setNameQuery(e.target.value);
                                }}
                                maxLength='20' />
                        </label>
                        <button type='button' value='' onClick={() => { searchByName(nameQuery) }}>Search</button>
                    </form>
                    <form>
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
                    </form>
                    <form>
                        <label>
                            Search by dog friendliness
                            <select
                                name='dogFriendly'
                                onChange={e => {
                                    setDogFriendlyQuery(e.target.value)
                                }}
                                required>
                                <option value={'Unknown'}>Unknown</option>
                                <option value={'Yes'}>Yes</option>
                                <option value={'No'}>No</option>
                            </select>
                            <button type='button' value='' onClick={() => searchByDogFriendliness(dogFriendlyQuery)}>Search</button>
                        </label>
                    </form>
                    <button type='button' value='' onClick={() => resetFilters()}>Reset</button>
                </div>
            </div>
            <div className={styles.searchLocationsButtonContainer}>
                <button type='button' value='' onClick={() => handleSearchPopUp()}>Search</button>
            </div>
        </div>
    );
};

export default SearchLocationsComponent;