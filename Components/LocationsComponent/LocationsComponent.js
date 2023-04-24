import styles from './LocationsComponent.module.scss';
import React, { useRef, useEffect, useState } from 'react';
import MapBoxKey from '@/pages/api/MapBoxKey';
import mapboxgl from '!mapbox-gl';
import CreateMarkerForm from 'Components/forms/CreateMarkerForm/CreateMarkerForm';
import EditMarkerForm from 'Components/forms/EditMarkerForm/EditMarkerForm';
import DeleteMarkerForm from 'Components/forms/DeleteMarkerForm/DeleteMarkerForm';
import { getAuth } from 'firebase/auth';
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
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [latitude, longitude],
            zoom: zoom,
            attributionControl: false
        });

        // Map Interaction -----------------------------------
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

        // Map Controls ---------------------------------------

        map.current.doubleClickZoom.disable();

        const scale = new mapboxgl.ScaleControl({
            maxWidth: 80,
            unit: 'metric'
        });
        map.current.addControl(scale);

        map.current.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true
        }), 'top-right');

        map.current.addControl(new mapboxgl.AttributionControl({
            compact: true,
        }), 'bottom-left');

        const nav = new mapboxgl.NavigationControl({
            visualizePitch: true
        });
        map.current.addControl(nav, 'top-right');
    }, []);

    useEffect(() => {
        const auth = getAuth();
        const firebaseUID = auth.currentUser.uid;

        // map.current.on('load', async () => {
        for (const location in locations) {
            // new mapboxgl.Marker().setLngLat(feature.geometry.coordinates).addTo(map.current);
            // console.log(locations[location]);
            let marker = new mapboxgl.Marker()
                .setLngLat(locations[location].locationData.coordinates)
                .setPopup(
                    new mapboxgl.Popup({ offset: 25 }) // add popups
                        .addClassName('popUpContainer')
                        .on('open', function (e) {
                            map.current.flyTo({
                                center: e.target._lngLat,
                                zoom: 15
                            });
                            if (firebaseUID == locations[location].locationData.uid) {
                                document.getElementById("editMarkerButton").style.display = "block";
                                document.getElementById("deleteMarkerButton").style.display = "block";
                                setCurrentMarker({ ...locations[location].locationData });
                                setCurrentMarkerId(locations[location].locationId);
                                // console.log(locations[location].locationData.uid);
                            }
                            // console.log(currentMarker);
                        })
                        .on('close', function (e) {
                            document.getElementById("editMarkerButton").style.display = "none";
                            document.getElementById("deleteMarkerButton").style.display = "none";
                            setCurrentMarker({});
                            setEditFormState(false);
                            setDeleteFormState(false);
                            // console.log(currentMarker);
                        })
                        .setHTML(
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
                                    <h3 class='popUpTitle'>${locations[location].locationData.name}</h3>
                                    <p class='popUpDescription'>${locations[location].locationData.description}</p>
                                    <p class='popUpAreaType'><b>Category:</b> ${locations[location].locationData.category}</p>
                                    <p class='popUpAreaDogs'><b>Dogs Allowed:</b> ${locations[location].locationData.dogFriendly}</p>
                                </div>`)
                )
                .addTo(map.current);
            markers.push(marker);
        }
        // });
        console.log(markers);
        // marker.remove();

        newMarkerObject.length = 0;
    }, [locations]);

    const addNewMarker = (marker) => {
        new mapboxgl.Marker()
            .setLngLat(marker.coordinates)
            .setPopup(
                new mapboxgl.Popup({ offset: 25 }) // add popups
                    .addClassName('popUpContainer')
                    .on('open', function (e) {
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
                    .on('close', function (e) {
                        document.getElementById("editMarkerButton").style.display = "none";
                        document.getElementById("deleteMarkerButton").style.display = "none";
                        setCurrentMarker({});
                        setEditFormState(false);
                        setDeleteFormState(false);
                        // console.log(currentMarker);
                    })
                    .setHTML(
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

    const handleEditClick = () => {
        if (editFormState == false) {
            setEditFormState(true);
            setDeleteFormState(false);
        } else if (editFormState == true) {
            setEditFormState(false);
        };
    };

    const handleDeleteClick = () => {
        if (deleteFormState == false) {
            setDeleteFormState(true);
            setEditFormState(false);
        } else if (deleteFormState == true) {
            setDeleteFormState(false);
        };
    };

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
            {editFormState ? (
                <EditMarkerForm
                    currentMarker={currentMarker}
                    currentMarkerId={currentMarkerId} />
            ) : (
                <div></div>
            )}
            {deleteFormState ? (
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