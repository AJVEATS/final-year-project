/**
 * @fileoverview This file represets the RouteStatsComponent which displays all of the information for the current walking
 * route.
 * 
 * @param {Object} routeInfo - The data for the current route.
 * @param {Object} auth - Link the firebase application.
 * @param {Object} db - Link to the firestore database.
 * @param {String} routeId - The id of the current route.
 */
import styles from './RouteStatsComponent.module.scss';
import React, { useState, useEffect } from 'react';
import { faHeart, faPersonHiking } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { saveAs } from "file-saver";
import { arrayRemove, arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import RouteWeatherComponent from './RouteWeatherComponent/RouteWeatherComponent';

const RouteStatsComponent = ({ routeInfo, auth, db, routeId }) => {
    const [liked, setLiked] = useState(false);
    const [numberOfLikes, setNumberOfLikes] = useState(0)
    const [userLikes, setUserLikes] = useState([]);

    useEffect(() => {
        setNumberOfLikes(routeInfo.likes);
        getUserDetails();
    }, [routeInfo]);

    /**
     * This async function gets the user's account information from their firestore document in the 'users' collection 
     * to see if the current route is liked by the user.
     */
    async function getUserDetails() {
        const docRef = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data().likes);
            const likedRoutes = docSnap.data().likes;
            // console.log(typeof likedRoutes);
            for (const route in likedRoutes) {
                if (likedRoutes[route] == routeId) {
                    setLiked(true);
                    document.getElementById("likeHeart").style.color = "#f72525";
                };
            };
            setUserLikes({ ...docSnap.data().likes });
        } else {
            console.log("No such document!");
        };
    };

    /**
     * This async function add the current routes id to the user's liked routes array in their firestore
     * document.
     */
    async function addRouteToFavourites() {
        try {
            const uid = (auth.currentUser.uid);
            const userRef = doc(db, 'users', uid);
            updateDoc(userRef, {
                likes: arrayUnion(routeId)
            });
        } catch (e) {
            console.error(`Error updating document: ${e}`);
        };
    };

    /**
     * This async function removes the current routes id to the user's liked routes array in their firestore
     * document.
     */
    async function removeRouteFromFavourites() {
        try {
            const uid = (auth.currentUser.uid);
            const userRef = doc(db, 'users', uid);
            updateDoc(userRef, {
                likes: arrayRemove(routeId)
            });
        } catch (e) {
            console.error(`Error updating document: ${e}`);
        };
    };

    /**
     * This function handles the pressing of the route like button. If the user does not already like the route
     * the addToFavourite function is called, if the has already liked the route removeRouteFromFavourites function
     * is called.
     */
    const handleFavouritePress = () => {
        // console.log('handleFavouritePress() initiated');
        if (liked == false) {
            document.getElementById("likeHeart").style.color = "#f72525";
            setLiked(true);
            updateLikes(numberOfLikes + 1);
            addRouteToFavourites();
            setNumberOfLikes(numberOfLikes + 1);
        } else if (liked == true) {
            document.getElementById("likeHeart").style.color = "#000000";
            setLiked(false);
            updateLikes(numberOfLikes - 1);
            removeRouteFromFavourites();
            setNumberOfLikes(numberOfLikes - 1);
        };
    };

    /**
     * This function updates the amount of likes the route has when a user likes or unlikes a routes. The likes
     * value is updated in the route's document in the 'routes' collection in firestore. 
     * 
     * @param {Number} likes - The number of likes the route has.
     */
    const updateLikes = (likes) => {
        try {
            const routeRef = doc(db, 'routes', routeId)
            console.log('route id');
            console.log(routeId);
            routeInfo.likes = likes;
            console.log(routeInfo.likes);
            setDoc(routeRef, routeInfo, { merge: true });
        } catch (e) {
            console.error(`Error updating document: ${e}`);
        };
    };

    /**
     * This function handles the click of the 'Download Route Instructions' button. This function takes the step by step
     * directions of the route and formats them for download. The route's directions are saved as a .txt file to allow
     * user's to follow the route offline or without an internet connection.
     */
    const handleDirectionsClick = () => {
        let directions = `Directions for ${routeInfo.name} \n`;
        // console.log(routeInfo.directions[0]);
        for (const step in routeInfo.directions) {
            directions = directions + `- ${routeInfo.directions[step]} \n`;
        };
        const blob = new Blob([directions], { type: "text/plain;charset=utf-8" });
        saveAs(blob, `${routeInfo.name}_directions.txt`);
    };

    /**
     * This function formats the routes distance. If the route is under 1,000 meters the distance
     * is in meters, if it is over 1,000 it is formatted in kilometeres.
     * 
     * @param {Number} distance - The total distnce of the walking route in meters.
     * @returns {String} formattedDistance - The formatted distance of the route.
     */
    const formatDistance = (distance) => {
        let formattedDistance = '';
        if (distance >= 1000) {
            formattedDistance = `${(distance / 1000).toFixed(2)}km`
        } else if (distance < 1000) {
            formattedDistance = `${distance}m`;
        };
        return formattedDistance;
    };

    /**
     * This function formats the routes durartion. If the route is under 60 minutes the duration
     * is in minutes, if it is over 60 it is formatted in hours.
     * 
     * @param {Number} duration - The total duration of the walking route in minutes.
     * @returns {String} formattedDuration - The formatted duration of the route.
     */
    const formatDuration = (duration) => {
        // console.log(duration);
        let formattedDuration = '';
        if (duration >= 60) {
            const hours = Math.floor(duration / 60);
            const minutes = duration % 60;
            formattedDuration = `${hours}hr ${minutes}mins`;
        } else if (duration < 60) {
            formattedDuration = `${duration}mins`
        };
        return formattedDuration;
    };

    return (
        <div className={styles.routeInfoComponent}>
            <div className={styles.routeStatsContainer}>
                <div className={styles.routeStatsHeader}>
                    <p>Route Details</p>
                    <div className={styles.heartContainer}>
                        <FontAwesomeIcon id='likeHeart' icon={faHeart} onClick={() => handleFavouritePress()} />
                    </div>
                </div>
                <div className={styles.routeStatsDashboard}>
                    <div className={styles.routeStat}>
                        <div className={styles.routeStatValue}>
                            <p>{formatDuration(routeInfo.duration)}</p>
                        </div>
                        <p className={styles.routeStatLabel}>Length</p>
                    </div>
                    <div className={styles.routeStat}>
                        <div className={styles.routeStatValue}>
                            <p>{formatDistance(routeInfo.distance)}</p>
                        </div>
                        <p className={styles.routeStatLabel}>Distance</p>
                    </div>
                    <div className={styles.routeStat}>
                        <div className={styles.routeStatValue}>
                            <p className={styles.routeStatValueMetric}>{numberOfLikes}</p>
                        </div>
                        <p className={styles.routeStatLabel}>Likes</p>
                    </div>
                </div>
                <div className={styles.routeDescriptionContainer}>
                    <div className={styles.routeDifficultyContainer}>
                        <FontAwesomeIcon icon={faPersonHiking} />
                        <p>{routeInfo.difficulty} level</p>
                    </div>
                    <p className={styles.routeDescription}>{routeInfo.description}</p>
                </div>
                <RouteWeatherComponent
                    routeCoordinates={routeInfo.route}
                />
                <button id='downloadIntructions' className={styles.intructionsButton} onClick={() => handleDirectionsClick()}>Download Route Intructions</button>
                <div className={styles.routeElevationContainer}>
                </div>
            </div>
        </div>
    );
}

export default RouteStatsComponent;