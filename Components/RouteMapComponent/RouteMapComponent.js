import styles from './RouteMapComponent.module.scss';
import React, { useRef, useEffect, useState } from 'react';
import MapBoxKey from '@/pages/api/MapBoxKey';
import mapboxgl from '!mapbox-gl';

mapboxgl.accessToken = MapBoxKey.key;

const RouteMapComponent = ({ routeInfo, geoJsonPath }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-1.891988);
    const [lat, setLat] = useState(50.742229);
    const [zoom, setZoom] = useState(13);
    const [startingCoordinates, setStartingCoordinates] = useState([]);
    // const [geoJsonPath, setGeoJsonPath] = useState([]);

    useEffect(() => {
        startingCoordinates.push(geoJsonPath[0]);
        console.log(routeInfo.route);
        console.log(geoJsonPath[0]);
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
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

    }, []);

    // useEffect(() => {
    //     if (!map.current) return; // wait for map to initialize
    //     map.current.on('move', () => {
    //         setLng(map.current.getCenter().lng.toFixed(4));
    //         setLat(map.current.getCenter().lat.toFixed(4));
    //         setZoom(map.current.getZoom().toFixed(2));
    //     });
    // });

    return (
        <div className={styles.routeMapComponent}>
            <div ref={mapContainer} className={styles.mapContainer} />
        </div>
    );
}

export default RouteMapComponent;