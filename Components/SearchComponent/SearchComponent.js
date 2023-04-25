/**
 * @fileoverview This file represets the SearchComponent which allows users to filter and search the walking routes displayed  
 * on the discover page. The user is able to search for routes by name, distance and duration.
 * 
 * @param {Number} distanceQuery - The max distance that the user has entered into the search form duration query input.
 * @param {function} setDistanceQuery - A function to update the distance query value.
 * @param {Number} durationQuery - The max duration that the user has entered into the search form duration query input.
 * @param {function} setDurationQuery - A function to update the duration query value.
 * @param {function} clearFilters - A function reset/clear all of the search form's inputs and values.
 * @param {string} nameQuery - The text the user has inputted into the search by name input for searching route by name.
 * @param {function} setNameQuery - A function to update the locations useState variable from the LocationsComponent.
 * @param {object} allRoutes - An object containing all of routes from firestore 'routes' collection.
 * @param {function} setRoutes - A function to update the routes useState object variable.
 * 
 */
import styles from './SearchComponent.module.scss';
import React, { useState } from 'react';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchComponent = ({ distanceQuery, setDistanceQuery, durationQuery, setDurationQuery, clearFilters, nameQuery, setNameQuery, allRoutes, setRoutes }) => {
    const [formState, setFormState] = useState(false);

    /**
     * This function handles the search form popup. If the formState useState is true the form
     * will display.
     */
    const toggleSearchForm = () => {
        if (formState == false) {
            setFormState(true);
            document.getElementById('searchLabel').style.display = 'inline';
        } else if (formState == true) {
            setFormState(false);
            document.getElementById('searchLabel').style.display = 'none';
        }
    };

    /**
     * This function takes in the users max route distance query and updates the routes displayed to only show routes
     * that are under the distance entered by the user
     * @param {Number} distance - The max distance value entered by the user.
     */
    const filterRoutesByDistance = (distance) => {
        setRoutes([]);
        setDurationQuery(240);
        setNameQuery('');
        const distanceFilteredRoutes = allRoutes.filter(routes => routes.routeData.distance <= distance);
        console.log(distanceFilteredRoutes);
        // setRoutes([distanceFilteredRoutes]);
        setRoutes(distanceFilteredRoutes);
    };

    /**
     * This function takes in the users max route duration query and updates the routes displayed to only show routes
     * that are under the duration entered by the user
     * @param {Number} duration - The max duration value entered by the user.
     */
    const filterRoutesByDuration = (duration) => {
        setRoutes([]);
        setDistanceQuery(10000);
        setNameQuery('');
        const durationFilteredRoutes = allRoutes.filter(routes => routes.routeData.duration <= duration);
        console.log(durationFilteredRoutes);
        setRoutes(durationFilteredRoutes);
        // setRoutes(durationFilteredRoutes);
    };

    /**
     * This function takes in the users route name query string and updates the routes displayed to only show routes
     * that include the string entered by the user.
     * @param {String} query - The name string query entered by the user
     */
    const filterRoutesByName = (query) => {
        setRoutes([]);
        setDurationQuery(240);
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