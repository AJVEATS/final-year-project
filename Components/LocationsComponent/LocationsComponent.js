import styles from './LocationsComponent.module.scss';
import React, { useRef, useEffect, useState } from 'react';
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MapBoxKey from '@/pages/api/MapBoxKey';
import mapboxgl from '!mapbox-gl';
import CreateMarkerForm from 'Components/forms/CreateMarkerForm/CreateMarkerForm';

mapboxgl.accessToken = MapBoxKey.key;

const LocationsComponent = ({ locations }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [latitude, setLatitude] = useState(-1.879497);
    const [longitude, setLongitude] = useState(50.739994);
    const [markerCoordinates, setMarkerCoordinates] = useState([]);
    const [zoom, setZoom] = useState(13);
    const [addMode, setAddMode] = useState(false);
    const [newMarkerObject, setNewMarkerObject] = useState({});

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
            console.log(coordinates);
            setNewMarkerObject(newMarkerObject => ({
                ...newMarkerObject,
                ...coordinates
            }));
        });

        // Map Controls ---------------------------------------

        map.current.doubleClickZoom.disable();

        const scale = new mapboxgl.ScaleControl({
            maxWidth: 80,
            unit: 'imperial'
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

        scale.setUnit('metric');
    }, []);

    useEffect(() => {
        map.current.on('load', async () => {
            for (const location in locations) {
                // new mapboxgl.Marker().setLngLat(feature.geometry.coordinates).addTo(map.current);
                console.log(locations[location]);
                new mapboxgl.Marker()
                    .setLngLat(locations[location].locationData.coordinates)
                    .setPopup(
                        new mapboxgl.Popup({ offset: 25 }) // add popups
                            .setHTML(
                                `<h3>${locations[location].locationData.name}</h3><p>${locations[location].locationData.description}</p>`
                            )
                    )
                    .addTo(map.current);
            }
        });
        newMarkerObject.length = 0;
    }, [locations]);

    const addNewMarker = (marker) => {
        new mapboxgl.Marker()
            .setLngLat(marker.coordinates)
            .setPopup(
                new mapboxgl.Popup({ offset: 25 }) // add popups
                    .setHTML(
                        `<h3>${marker.name}</h3><p>${marker.description}</p>`
                    )
            )
            .addTo(map.current);
    }

    return (
        <div className={styles.locationsMapComponent}>
            <div className={styles.pageInfo}>
                <div className={styles.titleContainer}>
                    <p>Coummunity Nature Locations</p>
                </div>
                <div id='subTitleContainer' className={styles.subTitleContainer}>
                    <p>Double click to add a new location</p>
                </div>
            </div>
            <div ref={mapContainer} className={styles.mapContainer} />
            <CreateMarkerForm
                newMarkerObject={newMarkerObject}
                addNewMarker={addNewMarker} />
        </div>
    );
}

export default LocationsComponent;