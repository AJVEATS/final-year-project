import Head from 'next/head'
import styles from '@/styles/pages/favourites.module.scss'
import Base from 'Components/Layout/Base/BaseComponent'
import LayoutComponent from 'Components/Layout/LayoutComponent/LayoutComponent'

const Favourites = () => {

    return (
        <Base>
            <Head>
                <title>Favourite Routes</title>
            </Head>
            <LayoutComponent>
                <p>Favourites</p>
            </LayoutComponent>
        </Base>
    )
}

export default Favourites;
