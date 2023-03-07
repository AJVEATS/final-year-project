import styles from './ExploreComponent.module.scss';

const ExploreComponent = ({ routes }) => {

    return (
        // <div className={styles.exploreComponent}>
        //     <div className={styles.exploreMainContent}>
        <div className={styles.exploreList}>
            <p className={styles.exploreTitle}>Explore</p>
            {routes.map((data) => (
                <div key={data.routeId} className={styles.routeCard}>
                    <p>{(data.routeData.name)}</p>
                    <p>{data.routeData.privacy}</p>
                    <p>{`${data.routeData.duration} minutes`}</p>
                </div>
            ))}
        </div>
    );
}

export default ExploreComponent;