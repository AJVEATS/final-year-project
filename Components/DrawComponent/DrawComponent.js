import styles from './DrawComponent.module.scss';
import { firebaseApp } from '@/pages/api/FirebaseApp';
import { doc, getFirestore, setDoc } from "firebase/firestore";

const DrawComponent = () => {

    const db = getFirestore(firebaseApp);

    const saveRoute = () => {

        try {

            const route = {
                id: '2',
                name: 'test 2',
            };

            const collectionRef = doc(db, 'routes', 'route1');

            setDoc(collectionRef, route, { merge: true });

        } catch (e) {
            console.error(`Error adding document: ${e}`);
        }

    };

    return (
        <div>
            <button onClick={() => saveRoute()}>Save</button>
        </div>
    );
}

export default DrawComponent;