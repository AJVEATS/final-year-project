import Link from 'next/link';
import styles from './ExploreNavigationComponent.module.scss';

const ExploreNavigationComponent = () => {
    return (
        <div className={styles.exploreNavigationComponent}>
            <Link id='public' href='/explore'>Public Walks</Link>
            <Link id='users' href='/track'>Your Walk</Link>
            <Link id='likes' href='/likes'>Likes</Link>
        </div>
    );
}

export default ExploreNavigationComponent;