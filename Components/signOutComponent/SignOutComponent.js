/**
 * @fileoverview This file represets the SignOutComponent which allows users to sign out of their account.
 * After signing out they will be redirected to the index page.
 */
import { firebaseConfig } from '@/pages/api/FirebaseAPI';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/router';

const SignOutComponent = () => {

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const router = useRouter();

    /**
     * This function uses the signOut firebase authentication hook to sign the user out of their account and
     * redirect them to the application's index page
     */
    const signOut = () => {
        auth.signOut()
            .then(() => {
                router.push('/');
            })
    };

    return (
        <button onClick={() => {
            console.log('signOut');
            signOut();
        }}>Sign Out</button>
    );
}

export default SignOutComponent;