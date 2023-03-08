import styles from '@/styles/pages/home.module.scss';
import Base from 'Components/Layout/Base/BaseComponent';
import LayoutComponent from 'Components/Layout/LayoutComponent/LayoutComponent';
import ProfileComponent from 'Components/ProfileComponent/ProfileComponent';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import Head from 'next/head';
import Image from 'next/image';
import { firebaseConfig } from './api/FirebaseAPI';

import MapBoxKey from '@/pages/api/MapBoxKey';
import { firebaseApp } from './api/FirebaseApp';

const Home = () => {

    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (user) {
        // console.log(user);
    }

    return (
        <Base>
            <Head>
                <title>Home</title>
            </Head>
            <LayoutComponent>
                <img
                    className={styles.homeImage}
                    src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-1.8782,50.7220,11,0/1270x900?access_token=${MapBoxKey.key}`} />
            </LayoutComponent>
        </Base>
    );
}

export default Home;