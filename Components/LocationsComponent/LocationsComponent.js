/**
 * @fileoverview This file represets the SignOutComponent which allows users to sign out of their account.
 * After signing out they will be redirected to the index page.This component includes:
 *  - SearchLocationsComponent: The form to allow users to search and filter through the recommended nature locations.
 *  - CreateMarkerForm: A form to create a new recommended nature location
 *  - EditMarkerForm: A form to edit an existing recommended nature location, created by the user.
 *  - DeleteMarkerForm: A form to delete an existing recommended nature location, created by the user.
 * 
 * @param {Object} locations - All of the location information for the locations that are currently displayed on the
 *                             map.
 * @param {function} setLocations - A function to update the locations useState variable, which are all the locations
 *                                  currently being displayed.
 * @param {Object} allLocations - All of the location information retrieved from the 'natureLocations' collection from
 *                                firestore.
 */
import styles from './LocationsComponent.module.scss';
import React, { useRef, useEffect, useState } from 'react';
import MapBoxKey from '@/pages/api/MapBoxKey';
import mapboxgl from '!mapbox-gl';
import { getAuth } from 'firebase/auth';
import CreateMarkerForm from 'Components/forms/CreateMarkerForm/CreateMarkerForm';
import EditMarkerForm from 'Components/forms/EditMarkerForm/EditMarkerForm';
import DeleteMarkerForm from 'Components/forms/DeleteMarkerForm/DeleteMarkerForm';
import SearchLocationsComponent from 'Components/SearchLocationsComponent/SearchLocationsComponent';

import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

mapboxgl.accessToken = MapBoxKey.key;

const LocationsComponent = ({ locations, setLocations, allLocations }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [latitude, setLatitude] = useState(-1.879497);
    const [longitude, setLongitude] = useState(50.739994);
    const [zoom, setZoom] = useState(13);
    const [newMarkerObject, setNewMarkerObject] = useState({});
    const [currentMarker, setCurrentMarker] = useState([]);
    const [currentMarkerId, setCurrentMarkerId] = useState('');
    const [markers, setMarker] = useState([]);
    const [deleteFormState, setDeleteFormState] = useState(false);
    const [editFormState, setEditFormState] = useState(false);

    useEffect(() => {

        // Map Controls ---------------------------------------

        /**
         * Initialising a new map with mapbox gl
         */
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [latitude, longitude],
            zoom: zoom,
            attributionControl: false
        });

        /**
         * A double click event listener to add new locations to the map. Double clicking will open the createMarkerForm
         * passing in the coordinates from where the user clicked.
         */
        map.current.on('dblclick', (e) => {
            document.getElementById("createMarkerForm").style.display = "block";
            document.getElementById("subTitleContainer").style.display = "none";
            let coordinates = { 'coordinates': [e.lngLat.lng, e.lngLat.lat] }
            // console.log(coordinates);
            setNewMarkerObject(newMarkerObject => ({
                ...newMarkerObject,
                ...coordinates
            }));
        });

        /**
         * Disabling the default mapbox double click zoom control 
         */
        map.current.doubleClickZoom.disable();

        /**
         * Initialising a scale for the map.
         */
        const scale = new mapboxgl.ScaleControl({
            maxWidth: 80,
            unit: 'metric'
        });

        /**
         * Adding the initialised scale to the map
         */
        map.current.addControl(scale);

        /**
         * Adding the geolocation control to the map, which allows users to show their current location on the map.
         * Clicking the button will adjust the map to show the users location at the center.
         */
        map.current.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true
        }), 'top-right');

        /**
         * Adding the appropriate attribute to mapbox and openstreet map as it is mandatory for using the Mapbox 
         * GL JS library
         */
        map.current.addControl(new mapboxgl.AttributionControl({
            compact: true,
        }), 'bottom-left');

        /**
         * Initialising navigation control for the map. Which displays the maps current orientation.
         */
        const nav = new mapboxgl.NavigationControl({
            visualizePitch: true
        });

        /**
         * Adding the initialised navigation control to the map
         */
        map.current.addControl(nav, 'top-right');
    }, []);

    useEffect(() => {
        const auth = getAuth();
        const firebaseUID = auth.currentUser.uid;

        /**
         * Iterates through all of the location data passed into the component through the location object.
         * For each location it adds a mapbox marker to the map.
         */
        for (const location in locations) {
            let marker = new mapboxgl.Marker()
                .setLngLat(locations[location].locationData.coordinates) // Setting the location of the marker
                .setPopup( // Setting up the location's marker popup
                    new mapboxgl.Popup({ offset: 25 })
                        .addClassName('popUpContainer')
                        .on('open', function (e) { // Setting the on open action for the popup
                            // Adjusts the map's view to place the location in the center of the view
                            map.current.flyTo({
                                center: e.target._lngLat,
                                zoom: 15
                            });
                            // If the location was created by the user the edit and delete location buttons are displayed
                            if (firebaseUID == locations[location].locationData.uid) {
                                document.getElementById("editMarkerButton").style.display = "block";
                                document.getElementById("deleteMarkerButton").style.display = "block";
                                setCurrentMarker({ ...locations[location].locationData });
                                setCurrentMarkerId(locations[location].locationId);
                            }
                        })
                        .on('close', function (e) { // Setting the on close action for the popup
                            document.getElementById("editMarkerButton").style.display = "none";
                            document.getElementById("deleteMarkerButton").style.display = "none";
                            setCurrentMarker({});
                            setEditFormState(false);
                            setDeleteFormState(false);
                        })
                        .setHTML( // Setting the HTML for the marker's popup, including styling
                            `<div>
                                <style>
                                .mapboxgl-popup {
                                    max-width: 300px !important;
                                }
                                .mapboxgl-popup-content { 
                                    border: solid 2px #306b34;
                                    border-radius: 10px;
                                    padding: 10px 15px;
                                    font-family: 'Gotham';
                                }
                                .mapboxgl-popup-close-button {
                                    font-size: 2.5em;
                                }
                                .popUpTitle {
                                    font-family: 'Gotham';
                                    font-size: 2em;
                                    margin-block-start: 0;
                                    margin-block-end: 0;
                                    margin: 0.5em 0;
                                }
                                .popUpDescription {
                                    font-size: 1.3em;
                                }
                                .popUpAreaType {
                                    font-size: 1.3em;
                                    margin-top: 0.5em;
                                }
                                .popUpAreaDogs {
                                    font-size: 1.3em;
                                    margin-top: 0.5em;
                                }
                                </style> 
                                <div class='popUp'>
                                    <h3 class='popUpTitle'>${locations[location].locationData.name}</h3>
                                    <p class='popUpDescription'>${locations[location].locationData.description}</p>
                                    <p class='popUpAreaType'><b>Category:</b> ${locations[location].locationData.category}</p>
                                    <p class='popUpAreaDogs'><b>Dogs Allowed:</b> ${locations[location].locationData.dogFriendly}</p>
                                </div>
                            </div>`)
                )
                .addTo(map.current); // Adding the marker to the intialised map
            markers.push(marker);
        }
        newMarkerObject.length = 0;
    }, [locations]);

    /**
     * This function adds a new marker to the map affter a user has doubled clicked, filled in the createMarkerForm and saved the location.
     */
    const addNewMarker = (marker) => {
        new mapboxgl.Marker()
            .setLngLat(marker.coordinates) // Setting the location of the marker
            .setPopup( // Setting up the location's marker popup
                new mapboxgl.Popup({ offset: 25 })
                    .addClassName('popUpContainer')
                    .on('open', function (e) { // Setting the on open action for the popup
                        // Adjusts the map's view to place the location in the center of the view
                        map.current.flyTo({
                            center: e.target._lngLat,
                            zoom: 15
                        });
                        document.getElementById("editMarkerButton").style.display = "block";
                        document.getElementById("deleteMarkerButton").style.display = "block";
                        setCurrentMarker({ marker });
                        // setCurrentMarkerId(locations[location].locationId);
                        // console.log(currentMarker);
                    })
                    .on('close', function (e) { // Setting the on close action for the popup
                        document.getElementById("editMarkerButton").style.display = "none";
                        document.getElementById("deleteMarkerButton").style.display = "none";
                        setCurrentMarker({});
                        setEditFormState(false);
                        setDeleteFormState(false);
                        // console.log(currentMarker);
                    })
                    .setHTML( // Setting the HTML for the marker's popup, including styling
                        `<style>
                            .mapboxgl-popup {
                                max-width: 300px !important;
                            }
                            .mapboxgl-popup-content { 
                                border: solid 2px #306b34;
                                border-radius: 10px;
                                padding: 10px 15px;
                                font-family: 'Gotham';
                            }
                            .mapboxgl-popup-close-button {
                                font-size: 2.5em;
                            }
                            .popUpTitle {
                                font-family: 'Gotham';
                                font-size: 2em;
                                margin-block-start: 0;
                                margin-block-end: 0;
                                margin: 0.5em 0;
                            }
                            .popUpDescription {
                                font-size: 1.3em;
                            }
                            .popUpAreaType {
                                font-size: 1.3em;
                                margin-top: 0.5em;
                            }
                            .popUpAreaDogs {
                                font-size: 1.3em;
                                margin-top: 0.5em;
                            }
                        </style>              
                        <div class='popUp'>
                            <h3 class='popUpTitle'>${marker.name}</h3>
                            <p class='popUpDescription'>${marker.description}</p>
                            <p class='popUpAreaType'><b>Category:</b> ${marker.category}</p>
                            <p class='popUpAreaDogs'><b>Dogs Allowed:</b> ${marker.dogFriendly}</p>
                        </div>`
                    )
            )
            .addTo(map.current);
    };

    /**
     * This function handles the edit marker button click by opening and closing the edit location
     * form.
     */
    const handleEditClick = () => {
        if (editFormState == false) {
            setEditFormState(true);
            setDeleteFormState(false);
        } else if (editFormState == true) {
            setEditFormState(false);
        };
    };

    /**
     * This function handles the delete marker button click by opening and closing the delete location
     * form.
     */
    const handleDeleteClick = () => {
        if (deleteFormState == false) {
            setDeleteFormState(true);
            setEditFormState(false);
        } else if (deleteFormState == true) {
            setDeleteFormState(false);
        };
    };

    /**
     * This function removes all of the markers currently displayed on the map 
     */
    const removeMarkers = () => {
        if (markers !== null) {
            for (let i = markers.length - 1; i >= 0; i--) {
                markers[i].remove();
            };
        };
    };

    return (
        <div className={styles.locationsMapComponent}>
            <div className={styles.pageInfo}>
                <div className={styles.titleContainer}>
                    <p>Nature Spots</p>
                </div>
                <div id='subTitleContainer' className={styles.subTitleContainer}>
                    <p>Double click to add a new location</p>
                </div>
            </div>
            <div ref={mapContainer} className={styles.mapContainer} />
            <div className={styles.locationsButtonsContainer}>
                <div className={styles.placeButtons}>
                    <button id='editMarkerButton' type='button' value='' onClick={() => handleEditClick()}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button id='deleteMarkerButton' className={styles.deleteButton} type='button' value='' onClick={() => handleDeleteClick()}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
                <SearchLocationsComponent
                    setLocations={setLocations}
                    removeMarkers={removeMarkers}
                    allLocations={allLocations} />
            </div>
            <CreateMarkerForm
                newMarkerObject={newMarkerObject}
                addNewMarker={addNewMarker} />
            {editFormState ? ( // If editFormState is true the EditMarkerForm is displayed
                <EditMarkerForm
                    currentMarker={currentMarker}
                    currentMarkerId={currentMarkerId} />
            ) : (
                <div></div>
            )}
            {deleteFormState ? ( // If deleteFormState is true the DeleteMarkerForm is displayed
                < DeleteMarkerForm
                    currentMarker={currentMarker}
                    currentMarkerId={currentMarkerId} />
            ) : (
                <div></div>
            )}
        </div>
    );
}

export default LocationsComponent;