import Base from "Components/Base/BaseComponent";
import Head from "next/head";
import styles from '@/styles/pages/account.module.scss';

const Account = () => {

    return (
        <Base>
            <Head>
                <title>Account page</title>
            </Head>
            <div className={styles.main}>
                <p>Account page</p>
            </div>
        </Base>
    )
}

export default Account;