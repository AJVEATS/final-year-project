import { getPreciseDistance } from 'geolib';
import Link from 'next/link';
import styles from './ExploreComponent.module.scss';

const ExploreComponent = ({ routes }) => {
    // console.log(routes);

    return (
        <div className={styles.exploreList}>
            <p className={styles.exploreTitle}>Explore</p>
            {routes.map((data) => (
                <Link
                    href={{
                        pathname: `/routes/${data.routeId}`
                    }}>
                    <div key={data.routeId} className={styles.routeCard}>
                        <p className={styles.routeTitle}>{(data.routeData.name)}</p>
                        <div className={styles.routeStats}>
                            <p className={styles.routeDistance}>00.00km</p>
                            <p>{`${data.routeData.duration} minutes`}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default ExploreComponent;