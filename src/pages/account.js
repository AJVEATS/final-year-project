import Base from "Components/Layout/Base/BaseComponent";
import Head from "next/head";
import ProfileComponent from "Components/ProfileComponent/ProfileComponent";
import LayoutComponent from "Components/Layout/LayoutComponent/LayoutComponent";

const Account = () => {

    return (
        <Base>
            <Head>
                <title>Account</title>
            </Head>
            <LayoutComponent>
                <ProfileComponent />
            </LayoutComponent>
        </Base>
    )
}

export default Account;