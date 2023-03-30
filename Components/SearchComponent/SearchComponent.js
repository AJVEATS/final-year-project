import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './SearchComponent.module.scss';
import React, { useEffect, useState } from 'react';
import { collection, query, where } from "firebase/firestore";

const SearchComponent = ({ distanceQuery, setDistanceQuery, durationQuery, setDurationQuery, clearFilters, nameQuery, setNameQuery, allRoutes, setRoutes }) => {
    const [formState, setFormState] = useState(false);

    const toggleSearchForm = () => {
        if (formState == false) {
            setFormState(true);
            document.getElementById('searchLabel').style.display = 'inline';
        } else if (formState == true) {
            setFormState(false);
            document.getElementById('searchLabel').style.display = 'none';
        };
    };

    const filterRoutesByDistance = (distance) => {
        setRoutes([]);
        setDurationQuery(180);
        setNameQuery('');
        const distanceFilteredRoutes = allRoutes.filter(routes => routes.routeData.distance <= distance);
        console.log(distanceFilteredRoutes);
        // setRoutes([distanceFilteredRoutes]);
        setRoutes(distanceFilteredRoutes);
    };

    const filterRoutesByDuration = (duration) => {
        setRoutes([]);
        setDistanceQuery(10000);
        setNameQuery('');
        const durationFilteredRoutes = allRoutes.filter(routes => routes.routeData.duration <= duration);
        console.log(durationFilteredRoutes);
        setRoutes(durationFilteredRoutes);
        // setRoutes(durationFilteredRoutes);
    };

    const filterRoutesByName = (query) => {
        setRoutes([]);
        setDurationQuery(180);
        setDistanceQuery(10000);
        const nameFilteredRoutes = allRoutes.filter(routes => routes.routeData.name.toLowerCase().includes(query.toLowerCase()));
        console.log(nameFilteredRoutes);
        setRoutes(nameFilteredRoutes);
        // setRoutes(nameFilteredroutes);
    };

    return (
        <div className={styles.searchComponent}>
            {formState ? (
                <div className={styles.searchFormContainer}>
                    <form>
                        <label>
                            <p>Search by name</p>
                            <input
                                type='text'
                                id='name'
                                name='name'
                                value={nameQuery}
                                onChange={e => {
                                    setNameQuery(e.target.value);
                                }}
                                maxLength='20' />
                        </label>
                        <button type='button' value='' onClick={() => {
                            filterRoutesByName(nameQuery);
                        }}>Search</button>
                        <label>
                            <p>Max Duration: {durationQuery} minutes</p>
                            <input
                                type='range'
                                id='duration'
                                name='duration'
                                min='0'
                                max='180'
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
                <p id='searchLabel'>Search</p>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
        </div>
    );
}

export default SearchComponent;