import Head from 'next/head'
import styles from '@/styles/pages/locations.module.scss'
import Base from 'Components/Layout/Base/BaseComponent'
import LayoutComponent from 'Components/Layout/LayoutComponent/LayoutComponent'

const Locations = () => {

    return (
        <Base>
            <Head>
                <title>Nature Spots</title>
            </Head>
            <LayoutComponent>
                <p>Nature locations</p>
            </LayoutComponent>
        </Base>
    )
}

export default Locations;
