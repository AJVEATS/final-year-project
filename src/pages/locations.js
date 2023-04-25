/**
 * @fileoverview This file represets the locations page which displays the recommended nature locations. The locations
 * data is retrieved from 'natureLocations' collection from firestore.This component includes:
 *  - LayoutComponent: which is the main layout component for the application.
 *  - LocationsComponent: A map that displays all of the recommended nature locations 
 */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { firebaseApp } from './api/FirebaseApp';
import { collection, getDocs, getFirestore, query } from 'firebase/firestore';
import Base from 'Components/Layout/Base/BaseComponent';
import LayoutComponent from 'Components/Layout/LayoutComponent/LayoutComponent';
import LocationsComponent from 'Components/LocationsComponent/LocationsComponent';

const Locations = () => {
    const [locations, setLocations] = useState([]);
    const [allLocations, setAllLocations] = useState([]);

    const db = getFirestore(firebaseApp);

    useEffect(() => {
        if (allLocations.length == 0) {
            getNatureLocations();
        }
    }, []);

    /**
     * This async function gets the locations from the firestore document from the 'natureLocations'
     * collection. The locations and allLocations useState variables are set the the data retrieved.
     */
    async function getNatureLocations() {
        const locationQuery = query(collection(db, 'natureLocations'));
        const querySnapshot = await getDocs(locationQuery);
        setLocations([]);
        querySnapshot.forEach((doc) => {
            setLocations(locations => [...locations, { locationId: doc.id, locationData: doc.data() }]);
            setAllLocations(locations => [...locations, { locationId: doc.id, locationData: doc.data() }]);
            // console.log(doc.id, " => ", doc.data()); // For Testing            
        });
    };

    return (
        <Base>
            <Head>
                <title>Nature Spots</title>
            </Head>
            <LayoutComponent>
                <LocationsComponent
                    locations={locations}
                    setLocations={setLocations}
                    allLocations={allLocations} />
            </LayoutComponent>
        </Base>
    )
}

export default Locations;
