/** 
 * @fileoverview This file represets the DrawComponent. It displays a map and allows users to draw and create their own walking routes.
 * Once a user has drawn a route, it uses the Mapbox Map matching API to match their created route to actual paths and roads and to get 
 * step by step instructions to follow the route offline. Once they have drawn a route they can add additonal information to the route with 
 * the DrawFormComponent, after a new document is created in firestore in the 'routes' collections. 
*/
import styles from './DrawComponent.module.scss';
import React, { useState, useEffect, useRef } from 'react';
import { firebaseApp } from '@/pages/api/FirebaseApp';
import { addDoc, collection, getFirestore } from "firebase/firestore";
import MapBoxKey from '@/pages/api/MapBoxKey';
import mapboxgl from '!mapbox-gl';
import moment from 'moment/moment';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { getAuth } from 'firebase/auth';
import DrawFormComponent from './DrawFormComponent/DrawFormComponent';
import { useRouter } from 'next/router';
import { getDistance } from 'geolib';

mapboxgl.accessToken = MapBoxKey.key;

const DrawComponent = () => {

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-1.891988);
    const [lat, setLat] = useState(50.742229);
    const [zoom, setZoom] = useState(13);
    const [duration, setDuration] = useState();

    const [drawnRoute, setdrawnRoute] = useState({});
    const [directions, setDirections] = useState([]);
    const [geoJsonPath, setGeoJsonPath] = useState([]);

    const [formState, setFormState] = useState('none');
    const [privacy, setPrivacy] = useState('public');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('beginner');

    const router = useRouter();

    useEffect(() => {

        if (map.current) return; // initialize map only once
        /**
         * Initialising a new map with mapbox gl
         */
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom,
            attributionControl: false
        });

        /**
         * Adding drawing functionality to the map
         */
        const draw = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
                line_string: true,
                trash: true
            },
            defaultMode: 'draw_line_string', // The map is set to draw mode when they first access the page
            styles: [ // Styling for the drawn route
                {
                    'id': 'gl-draw-line',
                    'type': 'line',
                    'filter': [
                        'all',
                        ['==', '$type', 'LineString'],
                        ['!=', 'mode', 'static']
                    ],
                    'layout': {
                        'line-cap': 'round',
                        'line-join': 'round'
                    },
                    'paint': {
                        'line-color': '#438EE4',
                        'line-dasharray': [0.2, 2],
                        'line-width': 2,
                        'line-opacity': 0.7
                    }
                },
                // Styling for the vertex point halos
                {
                    'id': 'gl-draw-polygon-and-line-vertex-halo-active',
                    'type': 'circle',
                    'filter': [
                        'all',
                        ['==', 'meta', 'vertex'],
                        ['==', '$type', 'Point'],
                        ['!=', 'mode', 'static']
                    ],
                    'paint': {
                        'circle-radius': 12,
                        'circle-color': '#FFF'
                    }
                },
                // Styling the vertex points
                {
                    'id': 'gl-draw-polygon-and-line-vertex-active',
                    'type': 'circle',
                    'filter': [
                        'all',
                        ['==', 'meta', 'vertex'],
                        ['==', '$type', 'Point'],
                        ['!=', 'mode', 'static']
                    ],
                    'paint': {
                        'circle-radius': 8,
                        'circle-color': '#438EE4'
                    }
                }
            ]
        });

        // Map Controls ---------------------------------------

        /**
         * Initialising a scale for the map.
         */
        const scale = new mapboxgl.ScaleControl({
            maxWidth: 80,
            unit: 'imperial'
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

        scale.setUnit('metric');

        // Map Drawing -------------------------------------------

        // Add the draw tool to the map
        map.current.addControl(draw, 'top-right');

        // Add create, update, or delete actions
        map.current.on('draw.create', updateRoute);
        map.current.on('draw.update', updateRoute);
        map.current.on('draw.delete', removeRoute);

        map.current.on(removeRoute, setDuration());

        // Uses the drawn coordinates to make the Map Matching API request
        /**
         * This functions updates the route created by the user so it matches to actual roads and paths.
         * It matches the drawn route using the Mapbox map matching API.
         */
        function updateRoute() {
            removeRoute(); // Overwrite any existing layers

            const profile = 'walking'; // Set the profile to walking, instead of the default driving

            // Get the coordinates
            const data = draw.getAll();
            const lastFeature = data.features.length - 1;
            const coords = data.features[lastFeature].geometry.coordinates;
            // Format the coordinates
            const newCoords = coords.join(';');
            // Set the radius for each coordinate pair to 25 meters
            const radius = coords.map(() => 25);
            getMatch(newCoords, radius, profile);
        };

        /**
         * This async function makes an map matching API call with the users drawn route to match it to
         * actual roads and footpaths. This is to allow for step by step to be created for the drawn
         * walking route.
         * 
         * @param {array} coordinates - the coordinates of the user drawn route
         * @param {array} radius - The radius for map matching
         * @param {String} profile - The type of travel. Set to walking
         */
        // Make a Map Matching request
        async function getMatch(coordinates, radius, profile) {
            // Separate the radiuses with semicolons
            const radiuses = radius.join(';');
            // Create the query
            const query = await fetch(
                `https://api.mapbox.com/matching/v5/mapbox/${profile}/${coordinates}?geometries=geojson&radiuses=${radiuses}&steps=true&access_token=${mapboxgl.accessToken}`,
                { method: 'GET' }
            );
            const response = await query.json();
            // Handle errors
            if (response.code !== 'Ok') {
                alert(
                    `${response.code} - ${response.message}.\n\nFor more information: https://docs.mapbox.com/api/navigation/map-matching/#map-matching-api-errors`
                );
                return;
            }
            const coords = response.matchings[0].geometry;
            // Draw the route on the map
            addRoute(coords);
            for (const coordinates in coords.coordinates) {
                let nextCoordinates = { latitude: coords.coordinates[coordinates][0], longitude: coords.coordinates[coordinates][1] };
                drawnRoute[coordinates] = nextCoordinates;
            }
            // console.log(drawnRoute);
            // console.log(calculateDistance(drawnRoute));
            getInstructions(response.matchings[0]);
            setFormState('block');
        };

        /**
         * Draws the map matched route as a new layer onto the map
         * 
         * @param {Object} data - The data of the drawn route.
         */
        function getInstructions(data) {
            // Output the instructions for each step of each leg in the response object
            for (const leg of data.legs) {
                const steps = leg.steps;
                for (const step of steps) {
                    // console.log(step.maneuver.instruction);
                    directions.push(step.maneuver.instruction);
                    // console.log(directions);
                };
            };
            setDuration(Math.floor(data.duration / 60));
            // console.log(`${Math.floor(data.duration / 60)} minutes`);
            setDuration(Math.floor(data.duration / 60));
        };

        /**
         * Draws the map matched route as a new layer onto the map
         * 
         * @param {array} coords - the coordinates of the matched route
         */
        function addRoute(coords) {
            // If a route is already loaded, remove it
            if (map.current.getSource('route')) {
                map.current.removeLayer('route');
                map.current.removeSource('route');
            } else {
                map.current.addLayer({
                    'id': 'route',
                    'type': 'line',
                    'source': {
                        'type': 'geojson',
                        'data': {
                            'type': 'Feature',
                            'properties': {},
                            'geometry': coords
                        }
                    },
                    'layout': {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    'paint': {
                        'line-color': '#03AA46',
                        'line-width': 8,
                        'line-opacity': 0.8
                    }
                });
            }
        };

        /** 
         * A function that removes the drawn route when the delete button is clikced.
         * Layers are removed if they exist.
        */
        function removeRoute() {
            if (!map.current.getSource('route')) return;
            map.current.removeLayer('route');
            map.current.removeSource('route');
        };
    }, []);

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    }, []);

    /**
     * Handles the save route button click, to show the save route form
     */
    const saveRouteButton = () => {
        setFormState('block');
    };

    async function uploadRoute() {
        const auth = getAuth();
        const firebaseUID = auth.currentUser.uid;

        const redirectUser = (routeId) => {
            router.push(`/routes/${routeId}`);
        };

        try {
            const db = getFirestore(firebaseApp);

            // let geoJsonPath = [];
            for (let sets in drawnRoute) {
                geoJsonPath.push([drawnRoute[sets].latitude, drawnRoute[sets].longitude]);
                // console.log(route.route[sets].latitude);
                // console.log(route.route[sets].longitude);
            };

            const calculateDistance = (coordinatesArray) => {
                // console.log(coordinatesArray);
                let total = 0;
                for (let i = 0; i < coordinatesArray.length; i++) {
                    if ((i + 1) < coordinatesArray.length) {
                        // console.log(geoJsonPath[i]);
                        // console.log(geoJsonPath[i + 1]);
                        total = total + getDistance(coordinatesArray[i], coordinatesArray[i + 1]);
                    }
                }
                return total;
            };

            // console.log(difficulty);

            const routeObject = {
                uid: firebaseUID,
                name: name,
                comments: {},
                description: description,
                date: moment().format('YYYY-MM-DD'),
                distance: calculateDistance(geoJsonPath),
                likes: 0,
                time: moment().format('hh:mm:ss'),
                route: drawnRoute,
                directions: directions,
                duration: duration,
                difficulty: difficulty,
                privacy: privacy,
            };

            const collectionRef = await addDoc(collection(db, 'routes'), routeObject);
            console.log(collectionRef.id);

            setFormState('hidden');
            alert('Your route has been saved 🥳');

            redirectUser(collectionRef.id);

        } catch (e) {
            console.error(`Error adding document: ${e}`);
            alert(`Error uploading route - ${e}`);
        };
    };

    return (
        <div className={styles.drawComponentContainer}>
            <div ref={mapContainer} className={styles.mapContainer} />
            <DrawFormComponent
                formState={formState}
                setFormState={setFormState}
                setPrivacy={setPrivacy}
                setName={setName}
                setDescription={setDescription}
                name={name}
                description={description}
                uploadRoute={uploadRoute}
                setDifficulty={setDifficulty}
            />
            <button
                className={styles.saveButton}
                disabled={!duration}
                onClick={() => saveRouteButton()} >
                💾
                Save
            </button>
        </div>
    );
}

export default DrawComponent;