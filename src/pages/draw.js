/**
* @fileoverview This file represets the draw page which allows users to draw and create custom walking routes
* which can be saved and shared with other users. This page includes the:
* - DrawComponent
* - LayoutComponent
* - Base
*/
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
                        Click the map to add your first point
                    </p>
                </div>
                <DrawComponent />
            </LayoutComponent>
        </Base>
    );
}

export default Draw;