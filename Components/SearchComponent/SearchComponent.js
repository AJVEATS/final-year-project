import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './SearchComponent.module.scss';
import React, { useState } from 'react';

const SearchComponent = ({ distanceQuery, setDistanceQuery, durationQuery, setDurationQuery, clearFilters, nameQuery, setNameQuery, allRoutes, setRoutes }) => {
    const [formState, setFormState] = useState(false);

    const toggleSearchForm = () => {
        if (formState == false) {
            setFormState(true);
            document.getElementById('searchLabel').style.display = 'inline';
        } else if (formState == true) {
            setFormState(false);
            document.getElementById('searchLabel').style.display = 'none';
        }
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
                    <div className={styles.searchForm}>
                        <p>Search by name</p>
                        <div className={styles.inputContainer}>
                            <input
                                type='text'
                                id='name'
                                name='name'
                                value={nameQuery}
                                onChange={e => {
                                    setNameQuery(e.target.value);
                                }}
                                maxLength='20' />
                            <button type='button' value='' onClick={() => {
                                filterRoutesByName(nameQuery);
                            }}>Search</button>
                        </div>
                    </div>


                    <div className={styles.searchForm}>
                        <p>Max Duration: {durationQuery} minutes</p>
                        <div className={styles.inputContainer}>
                            <input
                                type='range'
                                id='duration'
                                name='duration'
                                min='0'
                                max='240'
                                value={durationQuery}
                                onChange={e => {
                                    setDurationQuery(e.target.value);
                                }} />
                            <button type='button' value='' onClick={() => {
                                filterRoutesByDuration(durationQuery);
                            }}>Search</button>
                        </div>
                    </div>
                    <div className={styles.searchForm}>

                        <p>Max Distance: {distanceQuery} m</p>
                        <div className={styles.inputContainer}>
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
                            <button type='button' onClick={() => filterRoutesByDistance(distanceQuery)}>Search</button>
                        </div>
                        <button type='button'
                            onClick={() => {
                                clearFilters();
                                setNameQuery('');
                            }}
                        >Clear filters</button>
                    </div>
                </div>
            ) : (
                <div></div>
            )
            }
            <div className={styles.searchButtonContaier} onClick={() => toggleSearchForm()} >
                <p id='searchLabel'>Search</p>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
        </div >
    );
}

export default SearchComponent;