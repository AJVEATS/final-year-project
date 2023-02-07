import styles from '@/styles/pages/home.module.scss';
import Base from 'Components/Base/BaseComponent';
import LoginComponent from 'Components/loginComponent/LoginComponent';
import SignOutComponent from 'Components/signOutComponent/signOutComponent';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCredential } from 'firebase/auth';
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
            <div className={styles.homePage}>
                <SignOutComponent />
                <p>{user.email}</p>
            </div>
        </Base>
    );
}

export default Home;