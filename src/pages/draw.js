import styles from '@/styles/pages/draw.module.scss';
import DrawComponent from 'Components/DrawComponent/DrawComponent';
import Base from 'Components/Layout/Base/BaseComponent';
import LayoutComponent from 'Components/Layout/LayoutComponent/LayoutComponent';
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from 'next/head';

const Draw = () => {

    return (
        <Base>
            <Head>
                <title>Draw</title>
            </Head>
            <LayoutComponent>
                <div className={styles.drawInterface}>
                    <p>Draw a new route ✏️</p>
                    <p className={styles.subTitle}>
                        <FontAwesomeIcon icon={faCircleInfo} />
                        Double click to add your first point
                    </p>
                </div>
                <DrawComponent />
            </LayoutComponent>
        </Base>
    );
}

export default Draw;