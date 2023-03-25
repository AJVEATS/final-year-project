import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './SearchComponent.module.scss';
import React, { useEffect, useState } from 'react';
import { collection, query, where } from "firebase/firestore";

const SearchComponent = ({ distanceQuery, setDistanceQuery, filterRoutesByDistance, durationQuery, setDurationQuery, filterRoutesByDuration, clearFilters }) => {
    const [formState, setFormState] = useState(false);

    const toggleSearchForm = () => {
        if (formState == false) {
            setFormState(true);
        } else if (formState == true) {
            setFormState(false);
        }
    };

    return (
        <div className={styles.searchComponent}>
            {formState ? (
                <div className={styles.searchFormContainer}>
                    <form>
                        <label>
                            <p>Max Duration: {durationQuery} minutes</p>
                            <input
                                type='range'
                                id='duration'
                                name='duration'
                                min='0'
                                max='100'
                                value={durationQuery}
                                onChange={e => {
                                    setDurationQuery(e.target.value);
                                }} />
                        </label>
                        <button type='button' value='' onClick={() => {
                            filterRoutesByDuration(durationQuery);
                        }}>Search</button>
                    </form>
                    <form>
                        <label>
                            <p>Max Distance: {distanceQuery} m</p>
                            <input
                                type='range'
                                id='distance'
                                name='distance'
                                min='0'
                                max='10000'
                                value={distanceQuery}
                                onChange={e => {
                                    setDistanceQuery(e.target.value);
                                }} />
                        </label>
                        <button type='button' value='' onClick={() => filterRoutesByDistance(distanceQuery)}>Search</button>
                    </form>
                    <button type='button' value='' onClick={() => clearFilters()}>Clear filters</button>
                </div>
            ) : (
                <div></div>
            )}
            <div className={styles.searchButtonContaier} onClick={() => toggleSearchForm()} >
                <p>Search</p>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
        </div>
    );
}

export default SearchComponent;