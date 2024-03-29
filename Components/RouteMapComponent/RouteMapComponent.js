/**
 * @fileoverview This file represets RouteMapComponent which displays a map containing a polyline 
 * showing the path of the walking route.
 * 
 * @param {Object} routeCoordinates - The route's information
 * @param {Object} geoJsonPath - The coordinates for the walking routes path. Used to draw the route's
 *                               polyline.
 */
import styles from './RouteMapComponent.module.scss';
import React, { useRef, useEffect, useState } from 'react';
import MapBoxKey from '@/pages/api/MapBoxKey';
import mapboxgl from '!mapbox-gl';

mapboxgl.accessToken = MapBoxKey.key;

const RouteMapComponent = ({ routeInfo, geoJsonPath }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [zoom, setZoom] = useState(13);

    useEffect(() => {
        if (routeInfo.route) {
            /**
             * Initialising a new map with mapbox gl
             */
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [routeInfo.route[0]['latitude'], routeInfo.route[0]['longitude']],
                zoom: zoom
            });

            /**
             * Asynchronously adds the walking routes path to the map. 
             */
            map.current.on('load', async () => { // 
                map.current.addSource('route', {
                    'type': 'geojson',
                    'data': {
                        'type': 'Feature',
                        'properties': {},
                        'geometry': {
                            'type': 'LineString',
                            'coordinates': geoJsonPath
                        }
                    }
                });
                map.current.addLayer({
                    'id': 'route',
                    'type': 'line',
                    'source': 'route',
                    'layout': {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    'paint': {
                        'line-color': '#306b34',
                        'line-width': 8
                    }
                });

                const routeLength = geoJsonPath.length - 1;

                /**
                 * Adds a marker to the start of the walking route to allow the user to easily identify the start
                 * of the walking route. The marker has a pop up which which onclick displays the text 'start'.
                 */
                const start = new mapboxgl.Marker()
                    .setLngLat({ 'lng': routeInfo.route[0]['latitude'], 'lat': routeInfo.route[0]['longitude'] })
                    .setPopup(
                        new mapboxgl.Popup({ offset: 25 })
                            .on('open', function (e) { // Setting the on open action for the popup
                                // Adjusts the map's view to place the location in the center of the view
                                map.current.flyTo({
                                    center: e.target._lngLat,
                                    zoom: 14
                                });
                            })
                            .setHTML( // Setting the HTML for the marker's popup, including styling
                                `<style>
                                    .popUp {
                                        font-family: 'Gotham';
                                        font-size: 2em;
                                        font-weight: bold;
                                    }
                                    .popUpText {
                                        padding: 10px;
                                    }
                                </style>
                                <div class='popUp'>
                                    <p class='popUpText'>Start of route</p>
                                </div>`
                            )
                    )
                    .addTo(map.current); // Adding the marker to the intialised map

                /**
                 * Adds a marker to the end of the walking route to allow the user to easily identify the end
                 * of the walking route. The marker has a pop up which which onclick displays the text 'end'.
                 */
                const end = new mapboxgl.Marker()
                    .setLngLat({ 'lng': routeInfo.route[routeLength]['latitude'], 'lat': routeInfo.route[routeLength]['longitude'] })
                    .setPopup(
                        new mapboxgl.Popup({ offset: 25 })
                            .on('open', function (e) { // Setting the on open action for the popup
                                // Adjusts the map's view to place the location in the center of the view
                                map.current.flyTo({
                                    center: e.target._lngLat,
                                    zoom: 14
                                });
                            })
                            .setHTML( // Setting the HTML for the marker's popup, including styling
                                `<style>
                                    .popUp {
                                        font-family: 'Gotham';
                                        font-size: 2em;
                                        font-weight: bold;
                                    }
                                    .popUpText {
                                        padding: 10px;
                                    }
                                </style>
                                <div class='popUp'>
                                    <p class='popUpText'>End of route</p>
                                </div>`
                            )
                    )
                    .addTo(map.current); // Adding the marker to the intialised map
            });

            const coordinates = geoJsonPath;

            // Creates a 'LngLatBounds' with both corners at the first coordinate.
            const bounds = new mapboxgl.LngLatBounds(
                coordinates[0],
                coordinates[0]
            );

            // Extend the 'LngLatBounds' to include every coordinate in the bounds result.
            for (const coord of coordinates) {
                bounds.extend(coord);
            }

            // Adjusts the map's bounds to show all of the walking route's path
            map.current.fitBounds(bounds, {
                padding: 20
            });

            // async function getElevationProfile(geoJsonPath) {
            //     let elevationArray = [];
            //     for (let i = 0; i < geoJsonPath.length; i++) {
            //         const response = await fetch(`https://api.elevationapi.com/api/Elevation?lat=${geoJsonPath[i][1]}&lon=${geoJsonPath[i][0]}&dataSet=AW3D30`);
            //         const json = await response.json();
            //         console.log(json);
            //     }
            // }

            // getElevationProfile(geoJsonPath);
        }
    }, [routeInfo, geoJsonPath]);

    return (
        <div className={styles.routeMapComponent}>
            <div ref={mapContainer} className={styles.mapContainer} />
        </div>
    );
}

export default RouteMapComponent;