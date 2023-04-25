/**
 * @fileoverview This file represets the SearchLocationsComponent which allows users to filter and search the locations
 * from the locations page. The user is able to search for locations by name, location category or dog friendliness.
 * 
 * @param {function} setLocations - A function to update the locations useState variable from the LocationsComponent, 
 *                                  which are the markers currently being displayed on the map.
 * @param {function} removeMarkers - A function from the LocationsComponent to remove all markers from the map
 * @param {object} allLocations - An object containing all all of the locations
 * 
 */
import styles from './SearchLocationsComponent.module.scss';
import React, { useState } from 'react';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchLocationsComponent = ({ setLocations, removeMarkers, allLocations }) => {
    const [categoryQuery, setCategoryQuery] = useState('No category');
    const [dogFriendlyQuery, setDogFriendlyQuery] = useState('Unknown');
    const [nameQuery, setNameQuery] = useState('');
    const [showSearchForm, setShowSearchForm] = useState(false);

    /**
     * This function handles the search locations form popup. If the showSearchForm useState is true the form
     * will display.
     */
    const handleSearchPopUp = () => {
        if (showSearchForm == false) {
            document.getElementById("searchLabel").style.display = "block";
            setShowSearchForm(true);
        } else if (showSearchForm == true) {
            document.getElementById("searchLabel").style.display = "none";
            setShowSearchForm(false);
        };
    };

    /**
     * This function takes in the users location category query and updates the locations to only show locations
     * that meet the user's query criteria.
     * @param {String} query - A string which contains the user's category query
     */
    const searchByCategory = (query) => {
        // console.log(query);
        const filteredMarkers = allLocations.filter(marker => marker.locationData.category == query);
        removeMarkers();
        setLocations(filteredMarkers);
    };

    /**
     * This function takes in the users location dog friendliness query and updates the locations to only show locations
     * that meet the user's query criteria.
     * @param {String} query - A string which contains the user's dog friendliness query
     */
    const searchByDogFriendliness = (query) => {
        // console.log(query);
        const filteredMarkers = allLocations.filter(marker => marker.locationData.dogFriendly == query);
        removeMarkers();
        setLocations(filteredMarkers);
    };

    /**
     * This function takes in the users location name query and updates the locations to only show locations
     * that include the user's query within the location's name.
     * @param {String} query - A string which contains the user's location name query
     */
    const searchByName = (query) => {
        const filteredMarkers = allLocations.filter(marker => marker.locationData.name.toLowerCase().includes(query.toLowerCase()));
        removeMarkers();
        setLocations(filteredMarkers);
    };

    /**
     * This function resets all of the values in the search form's input fields.
     */
    const resetFilters = () => {
        setLocations(allLocations);
        setNameQuery('');
        setCategoryQuery('');
        setDogFriendlyQuery('');
    };

    return (
        <div className={styles.searchLocationsComponent}>
            {showSearchForm ? (
                <div id='searchLocationFormContainer' className={styles.searchLocationFormContainer}>
                    <div className={styles.searchLocationForms}>
                        <form>
                            <label>Search by name</label>
                            <div className={styles.inputButtonContainer}>
                                <input
                                    type='name'
                                    id='name'
                                    name='name'
                                    value={nameQuery}
                                    onChange={e => {
                                        setNameQuery(e.target.value);
                                    }}
                                    onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
                                    maxLength='20' />
                                <button type='button' value='' onClick={() => { searchByName(nameQuery) }}>Search</button>
                            </div>
                        </form>
                        <form>
                            <label>Search by category</label>
                            <div className={styles.inputButtonContainer}>
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
                            </div>
                        </form>
                        <form>
                            <label>Search by dog friendliness</label>
                            <div className={styles.inputButtonContainer}>
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
                            </div>
                        </form>
                        <button type='button' value='' onClick={() => resetFilters()}>Reset</button>
                    </div>
                </div>
            ) : (
                <div></div>
            )}
            <div className={styles.searchLocationsButtonContainer} onClick={() => handleSearchPopUp()}>
                <p id='searchLabel'>Search</p>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
        </div>
    );
};

export default SearchLocationsComponent;