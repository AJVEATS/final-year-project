import styles from '@/styles/pages/home.module.scss';
import Base from 'Components/Layout/Base/BaseComponent';
import LayoutComponent from 'Components/Layout/LayoutComponent/LayoutComponent';
import ProfileComponent from 'Components/ProfileComponent/ProfileComponent';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import Head from 'next/head';
import { firebaseConfig } from './api/FirebaseAPI';
import { firebaseApp } from './api/FirebaseApp';

const Home = () => {

    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (user) {
        console.log(user);
    }

    return (
        <Base>
            <Head>
                <title>Home</title>
            </Head>
            <LayoutComponent>
                {/* <MapComponent /> */}
                {/* <ProfileComponent /> */}
            </LayoutComponent>
        </Base>
    );
}

export default Home;