import styles from './TrackComponent.module.scss'

const TrackComponent = ({ routes }) => {
    return (
        <div className={styles.trackList}>
            <p className={styles.trackTitle}>Your create routes</p>
            {routes.map((data) => (
                <div key={data.routeId} className={styles.routeCard}>
                    <p>{(data.routeData.name)}</p>
                    <p>{data.routeData.privacy}</p>
                    <p>{`${data.routeData.duration} minutes`}</p>
                </div>
            ))}
        </div>
    )
}

export default TrackComponent;