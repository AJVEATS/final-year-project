import { firebaseConfig } from '@/pages/api/FirebaseAPI';
import { getApps, initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from './BaseComponent.module.scss';

const Base = ({ children }) => {

    const router = useRouter();

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            console.log(`user logged in with the uid: ${uid}`);
            if (router.pathname == '/') {
                router.push('/home');
            }
            // router.push('/home');
        } else {
            console.log(`user is not logged in`);
            if (router.pathname != '/') {
                router.push('/');
            }

        }
    });

    return (
        <div>
            <Head>
                {/* <meta name="description" content="" /> */}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.base}>{children}</main>
        </div>
    );
}

export default Base;