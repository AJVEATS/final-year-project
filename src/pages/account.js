import Base from "Components/Base/BaseComponent";
import Head from "next/head";
import styles from '@/styles/pages/account.module.scss';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./api/FirebaseAPI";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";

const Account = () => {

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const router = useRouter();

    const signOut = () => {
        auth.signOut()
            .then(() => {
                router.push('/');
            })
    }

    return (
        <Base>
            <Head>
                <title>Account page</title>
            </Head>
            <div className={styles.main}>
                <p>Account page</p>
                <button onClick={signOut}>Sign Out</button>
            </div>
        </Base>
    )
}

export default Account;