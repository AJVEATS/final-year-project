import Head from 'next/head';
import styles from './BaseComponent.module.scss';

const Base = ({ children }) => {

    return (
        <div>
            <Head>
                {/* <meta name="description" content="Generated by create next app" /> */}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.base}>{children}</main>
        </div>
    );
}

export default Base;