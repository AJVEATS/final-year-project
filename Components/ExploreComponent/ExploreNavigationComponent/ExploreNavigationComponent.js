import Link from 'next/link';
import styles from './ExploreNavigationComponent.module.scss';

const ExploreNavigationComponent = ({ filter, setFilter }) => {
    return (
        <div className={styles.exploreNavigationComponent}>
            {/* <Link id='public' href='/explore'>Public Walks</Link>
            <Link id='users' href='/track'>Your Walk</Link>
            <Link id='likes' href='/likes'>Likes</Link> */}
            <button
                style={{
                    background: filter == 'public' ? '#306b34' : '#ffffff',
                    color: filter == 'public' ? '#ffffff' : '#000000'
                }}
                onClick={() => {
                    setFilter('public')
                }}>Public Walks</button>
            <button
                style={{
                    background: filter == 'users' ? '#306b34' : '#ffffff',
                    color: filter == 'users' ? '#ffffff' : '#000000'
                }}
                onClick={() => {
                    setFilter('users')
                }}>Your Walks</button>
            <button
                style={{
                    background: filter == 'likes' ? '#306b34' : '#ffffff',
                    color: filter == 'likes' ? '#ffffff' : '#000000'
                }}
                onClick={() => {
                    setFilter('likes')
                }}>Likes</button>
        </div>
    );
}

export default ExploreNavigationComponent;