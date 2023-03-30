import Head from 'next/head';
import styles from '@/styles/pages/locations.module.scss';
import React, { useEffect, useState } from 'react';
import Base from 'Components/Layout/Base/BaseComponent'
import LayoutComponent from 'Components/Layout/LayoutComponent/LayoutComponent'
import LocationsComponent from 'Components/LocationsComponent/LocationsComponent'
import { firebaseApp } from './api/FirebaseApp'
import { collection, getDocs, getFirestore, query } from 'firebase/firestore'
import SearchLocationsComponent from 'Components/SearchLocationsComponent/SearchLocationsComponent';

const Locations = () => {
    const [locations, setLocations] = useState([]);
    const [allLocations, setAllLocations] = useState([]);

    const db = getFirestore(firebaseApp);

    useEffect(() => {
        getNatureLocations();
    }, []);

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
                {/* <SearchLocationsComponent
                    locations={locations}
                    setLocations={setLocations} /> */}
            </LayoutComponent>
        </Base>
    )
}

export default Locations;
