import Base from "Components/Layout/Base/BaseComponent";
import Head from "next/head";
import styles from '@/styles/pages/account.module.scss';
import ProfileComponent from "Components/ProfileComponent/ProfileComponent";
import LayoutComponent from "Components/Layout/LayoutComponent/LayoutComponent";

const Account = () => {

    return (
        <Base>
            <Head>
                <title>Account page</title>
            </Head>
            <LayoutComponent>
                <ProfileComponent />
            </LayoutComponent>
        </Base>
    )
}

export default Account;