import styles from '@/styles/pages/home.module.scss';
import Base from 'Components/Base/BaseComponent';
import LoginComponent from 'Components/loginComponent/LoginComponent';
import SignOutComponent from 'Components/signOutComponent/signOutComponent';
import Head from 'next/head';

const Home = () => {

    return (
        <Base>
            <Head>
                <title>Home</title>
            </Head>
            <div className={styles.homePage}>
                <SignOutComponent />
            </div>
            {/* <LoginComponent /> */}
        </Base>
    );
}

export default Home;