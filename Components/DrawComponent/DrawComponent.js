import styles from './DrawComponent.module.scss';
import { firebaseApp } from '@/pages/api/FirebaseApp';
import { doc, getFirestore, setDoc } from "firebase/firestore";
import React, { useState, useEffect, useRef } from 'react';
import MapBoxKey from '@/pages/api/MapBoxKey';
import mapboxgl from '!mapbox-gl';
import moment from 'moment/moment';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { getAuth } from 'firebase/auth';
import DrawFormComponent from './DrawFormComponent/DrawFormComponent';
import { useRouter } from 'next/router';
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom,
            attributionControl: false
        });

        const draw = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
                line_string: true,
                trash: true
            },
            // Set the draw mode to draw LineStrings by default
            defaultMode: 'draw_line_string',
            styles: [
                // Set the line style for the user-input coordinates
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
                // Style the vertex point halos
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
                // Style the vertex points
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

        // Map Drawing -------------------------------------------

        // Add the draw tool to the map
        map.current.addControl(draw, 'top-right');

        // Add create, update, or delete actions
        map.current.on('draw.create', updateRoute);
        map.current.on('draw.update', updateRoute);
        map.current.on('draw.delete', removeRoute);

        // Use the coordinates you just drew to make the Map Matching API request
        function updateRoute() {
            removeRoute(); // Overwrite any existing layers

            const profile = 'walking'; // Set the profile

            // Get the coordinates
            const data = draw.getAll();
            const lastFeature = data.features.length - 1;
            const coords = data.features[lastFeature].geometry.coordinates;
            // Format the coordinates
            const newCoords = coords.join(';');
            // Set the radius for each coordinate pair to 25 meters
            const radius = coords.map(() => 25);
            getMatch(newCoords, radius, profile);
        }

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
            console.log(drawnRoute);
            // console.log(calculateDistance(drawnRoute));
            getInstructions(response.matchings[0]);
        }

        function getInstructions(data) {
            let tripDirections = [];
            // Output the instructions for each step of each leg in the response object
            for (const leg of data.legs) {
                const steps = leg.steps;
                for (const step of steps) {
                    // console.log(step.maneuver.instruction);
                    directions.push(step.maneuver.instruction);
                    // console.log(directions);
                }
            }
            setDuration(Math.floor(data.duration / 60));
            // console.log(`${Math.floor(data.duration / 60)} minutes`);
            setDuration(Math.floor(data.duration / 60));
        }

        // Draw the Map Matching route as a new layer on the map
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
        }

        // If the user clicks the delete draw button, remove the layer if it exists
        function removeRoute() {
            if (!map.current.getSource('route')) return;
            map.current.removeLayer('route');
            map.current.removeSource('route');
        }
    }, []);

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    }, []);

    const saveRouteButton = () => {
        setFormState('block');
    };

    const uploadRoute = () => {
        const auth = getAuth();
        const firebaseUID = auth.currentUser.uid;
        const timeStamp = moment().format('YYYY-MM-DD~hh:mm:ss');

        const redirectUser = () => {
            router.push(`/routes/${firebaseUID.concat(timeStamp)}`);
        }

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

            console.log(difficulty);
            console.log(typeof difficulty);

            const routeObject = {
                uid: firebaseUID,
                name: name,
                description: description,
                date: moment().format('YYYY-MM-DD'),
                distance: calculateDistance(geoJsonPath),
                time: moment().format('hh:mm:ss'),
                route: drawnRoute,
                directions: directions,
                duration: duration,
                difficulty: difficulty,
                privacy: privacy,
            };

            const collectionRef = doc(db, 'routes', `${firebaseUID.concat(timeStamp)}`);

            setDoc(collectionRef, routeObject, { merge: true });

            setFormState('hidden');
            alert('Your route has been saved 🥳');

            redirectUser();

        } catch (e) {
            console.error(`Error adding document: ${e}`);
            alert(`Error uploading route - ${e}`);
        }
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
            <button onClick={() => saveRouteButton()} className={styles.saveButton}>
                <FontAwesomeIcon icon={faFloppyDisk} />
                Save
            </button>
        </div>
    );
}

export default DrawComponent;