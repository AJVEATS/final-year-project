import { firebaseConfig } from '@/pages/api/FirebaseAPI';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/router';
import styles from './SignOutComponent.module.scss';

const SignOutComponent = () => {

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const router = useRouter();

    const signOut = () => {
        auth.signOut()
            .then(() => {
                router.push('/');
            })
    };

    return (
        <button onClick={() => {
            console.log('signOut');
            // signOut();
        }}>Sign Out</button>
    );
}

export default SignOutComponent;