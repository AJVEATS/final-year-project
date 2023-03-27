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
    const [zoom, setZoom] = useState(13);
    const [addMode, setAddMode] = useState(false);

    // console.log(locations);

    const geojson = {
        type: 'FeatureCollection',
        features: [
            // {
            //     type: 'Feature',
            //     geometry: {
            //         type: 'Point',
            //         coordinates: [-1.8672507180326647, 50.739431618148444]
            //     },
            //     properties: {
            //         title: 'The Winton Recreation Ground',
            //         description: 'Winton, Bournemouth'
            //     }
            // },
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [-1.9019653200398352, 50.7250298861336]
                },
                properties: {
                    title: 'The Dingle',
                    description: 'Westbourne, Bournemouth'
                }
            },
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [-1.8728253234511953, 50.744936450010215]
                },
                properties: {
                    title: 'Pine Road Play Area',
                    description: 'Winton, Bournemouth'
                }
            },
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [-1.9059539476056955, 50.730567548029086]
                },
                properties: {
                    title: 'Coy Pond',
                    description: 'Westbourne, Bournemouth'
                }
            },
        ]
    };

    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [latitude, longitude],
            zoom: zoom,
            attributionControl: false
        });

        map.current.on('load', async () => {
            for (const location in locations) {
                // new mapboxgl.Marker().setLngLat(feature.geometry.coordinates).addTo(map.current);
                console.log(locations[location]);
                new mapboxgl.Marker()
                    .setLngLat(locations[location].locationData.coordinates)
                    .setPopup(
                        new mapboxgl.Popup({ offset: 25 }) // add popups
                            .setHTML(
                                `<h3>${locations[location].locationData.title}</h3><p>${locations[location].locationData.description}</p>`
                            )
                    )
                    .addTo(map.current);
            }
        });

        // Map Interaction -----------------------------------
        map.current.on('dblclick', (e) => {
            document.getElementById("createMarkerForm").style.display = "block";
            // console.log(e.lngLat);
            // const marker = new mapboxgl.Marker().setLngLat(e.lngLat).addTo(map.current);
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

    const handleAddMarkerClick = () => {
        if (addMode === false) {
            setAddMode(true);
            console.log(addMode);
        } else if (addMode === true) {
            setAddMode(false);
            console.log(addMode);
        }
        console.log('handleAddMarkerClick initated');
    };

    return (
        <div className={styles.locationsMapComponent}>
            <div ref={mapContainer} className={styles.mapContainer} />
            <button type='button' value='' className={styles.addMarkerButton} onClick={() => handleAddMarkerClick()}>
                <FontAwesomeIcon icon={faLocationDot} />
                Add Marker
            </button>
            <CreateMarkerForm />
        </div>
    );
}

export default LocationsComponent;