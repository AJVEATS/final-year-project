import styles from '@/styles/pages/explore.module.scss';
import ExploreComponent from 'Components/ExploreComponent/ExploreComponent';
import Base from 'Components/Layout/Base/BaseComponent';
import LayoutComponent from 'Components/Layout/LayoutComponent/LayoutComponent';
import Head from 'next/head';

const Explore = () => {
    return (
        <Base>
            <Head>
                <title>Explore</title>
            </Head>
            <LayoutComponent>
                <ExploreComponent />
            </LayoutComponent>
        </Base>
    );
}
export default Explore;