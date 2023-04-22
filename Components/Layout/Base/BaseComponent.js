/**
 * @fileoverview This file represets the Base Component which is the layout component for each pages HTML head.
 * 
 * @param children - The children elements
 */
import { firebaseConfig } from '@/pages/api/FirebaseAPI';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Base = ({ children }) => {

    const router = useRouter();

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    /**
     * This function checks if the user is logged in. If they are they are redirected to the home page, 
     * if not they are redirected to the index page.
     */
    onAuthStateChanged(auth, (user) => {
        if (user) {
            if (router.pathname == '/') {
                router.push('/home');
            };
        } else {
            if (router.pathname != '/') {
                router.push('/');
            };
        };
    });

    return (
        <div>
            <Head>
                {/* <meta name="description" content="" /> */}
                <title>Route Sharing</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href='https://em-content.zobj.net/thumbs/120/apple/325/mountain_26f0-fe0f.png' />
            </Head>
            <main>{children}</main>
        </div>
    );
}

export default Base;