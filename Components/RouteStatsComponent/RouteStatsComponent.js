import styles from './RouteStatsComponent.module.scss';
import { faHeart, faPersonHiking } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { saveAs } from "file-saver";
import { arrayRemove, arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';

const RouteStatsComponent = ({ routeInfo, auth, db, routeId }) => {
    const [liked, setLiked] = useState(false);
    const [numberOfLikes, setNumberOfLikes] = useState(0)
    const [userLikes, setUserLikes] = useState([]);

    useEffect(() => {
        setNumberOfLikes(routeInfo.likes);
        getUserDetails();

    }, [routeInfo]);

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
                    document.getElementById("likeHeart").style.color = "#306b34";
                };
            };
            setUserLikes({ ...docSnap.data().likes });
        } else {
            console.log("No such document!");
        };
    };

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

    const handleFavouritePress = () => {
        // console.log('handleFavouritePress() initiated');
        if (liked == false) {
            document.getElementById("likeHeart").style.color = "#306b34";
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

    const updateLikes = (likes) => {
        try {
            const routeRef = doc(db, 'routes', routeId)
            console.log('route id');
            console.log(routeId);
            routeInfo.likes = likes;
            console.log(routeInfo.likes);
            setDoc(routeRef, routeInfo, { merge: true });

            // const uid = (auth.currentUser.uid);
            // const userRef = doc(db, 'users', uid);
            // updateDoc(userRef, {
            //     likes: arrayUnion(routeId)
            // });
        } catch (e) {
            console.error(`Error updating document: ${e}`);
        };
    };

    const handleDirectionsClick = () => {
        let directions = `Directions for ${routeInfo.name} \n`;
        console.log(routeInfo.directions[0]);
        for (const step in routeInfo.directions) {
            directions = directions + `- ${routeInfo.directions[step]} \n`;
        };
        const blob = new Blob([directions], { type: "text/plain;charset=utf-8" });
        saveAs(blob, `${routeInfo.name}_directions.txt`);
    };

    const formatDistance = (distance) => {
        let formattedDistance = '';
        if (distance >= 1000) {
            formattedDistance = `${(distance / 1000).toFixed(2)}km`
        } else if (distance < 1000) {
            formattedDistance = `${distance}m`;
        };
        return formattedDistance
    };

    const formatDuration = (duration) => {
        // console.log(duration);
        let formattedDuration = '';
        if (duration >= 60) {
            formattedDuration = `${(duration / 60).toFixed(1)}hrs`
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
                <button id='downloadIntructions' className={styles.intructionsButton} onClick={() => handleDirectionsClick()}>Download Route Intructions</button>
                <div className={styles.routeElevationContainer}>

                </div>
            </div>
        </div>
    );
}

export default RouteStatsComponent;