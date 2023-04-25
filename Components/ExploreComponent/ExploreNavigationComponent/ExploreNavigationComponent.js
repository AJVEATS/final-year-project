/**
* @fileoverview This file represets the ExploreNavigationComponent which handles the navigation of the ExploreComponent
* and the discover page. It includes theree button to switch between public created routes, your created routes and
* the user's liked routes. 
* 
* @param {String} filter - The current filter for the ExploreComponent
* @param {Function} setFilter - A function to update the filter useState string
* 
*/
import styles from './ExploreNavigationComponent.module.scss';

const ExploreNavigationComponent = ({ filter, setFilter }) => {
    return (
        <div className={styles.exploreNavigationComponent}>
            <button
                style={{
                    background: filter == 'public' ? '#306b34' : '#ffffff',
                    color: filter == 'public' ? '#ffffff' : '#000000'
                }}
                onClick={() => {
                    setFilter('public');
                }}>Public Walks</button>
            <button
                style={{
                    background: filter == 'users' ? '#306b34' : '#ffffff',
                    color: filter == 'users' ? '#ffffff' : '#000000'
                }}
                onClick={() => {
                    setFilter('users');
                }}>Your Walks</button>
            <button
                style={{
                    background: filter == 'likes' ? '#306b34' : '#ffffff',
                    color: filter == 'likes' ? '#ffffff' : '#000000'
                }}
                onClick={() => {
                    setFilter('likes');
                }}>Likes</button>
        </div>
    );
}

export default ExploreNavigationComponent;