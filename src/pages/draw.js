import styles from '@/styles/pages/home.module.scss';
import DrawComponent from 'Components/DrawComponent/DrawComponent';
import DrawFormComponent from 'Components/DrawComponent/DrawFormComponent/DrawFormComponent';
import Base from 'Components/Layout/Base/BaseComponent';
import LayoutComponent from 'Components/Layout/LayoutComponent/LayoutComponent';
import MapComponent from 'Components/MapComponent/MapComponent';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import Head from 'next/head';
import { firebaseConfig } from './api/FirebaseAPI';
import { firebaseApp } from './api/FirebaseApp';

const Draw = () => {

    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (user) {
        console.log(user);
    }

    return (
        <Base>
            <Head>
                <title>Draw</title>
            </Head>
            <LayoutComponent>
                <DrawComponent />
            </LayoutComponent>
        </Base>
    );
}

export default Draw;