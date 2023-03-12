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

            // if (map.current) return; // initialize map only once
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [routeInfo.route[0]['latitude'], routeInfo.route[0]['longitude']],
                zoom: zoom
            });

            map.current.on('load', () => {
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
            });

            const coordinates = geoJsonPath;

            // Create a 'LngLatBounds' with both corners at the first coordinate.
            const bounds = new mapboxgl.LngLatBounds(
                coordinates[0],
                coordinates[0]
            );

            // Extend the 'LngLatBounds' to include every coordinate in the bounds result.
            for (const coord of coordinates) {
                bounds.extend(coord);
            }

            map.current.fitBounds(bounds, {
                padding: 20
            });
        }
    }, [routeInfo]);

    useEffect(() => {

        // if (map.current) return; // initialize map only once
        // map.current = new mapboxgl.Map({
        //     container: mapContainer.current,
        //     style: 'mapbox://styles/mapbox/streets-v12',
        //     center: [lng, lat],
        //     zoom: zoom
        // });

        // map.current.on('load', () => {
        //     map.current.addSource('route', {
        //         'type': 'geojson',
        //         'data': {
        //             'type': 'Feature',
        //             'properties': {},
        //             'geometry': {
        //                 'type': 'LineString',
        //                 'coordinates': geoJsonPath
        //             }
        //         }
        //     });
        //     map.current.addLayer({
        //         'id': 'route',
        //         'type': 'line',
        //         'source': 'route',
        //         'layout': {
        //             'line-join': 'round',
        //             'line-cap': 'round'
        //         },
        //         'paint': {
        //             'line-color': '#306b34',
        //             'line-width': 8
        //         }
        //     });
        // });

    });

    return (
        <div className={styles.routeMapComponent}>
            <div ref={mapContainer} className={styles.mapContainer} />
        </div>
    );
}

export default RouteMapComponent;