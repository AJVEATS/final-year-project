import styles from './RouteCommentsComponent.module.scss';
import React, { useState, useEffect } from 'react';
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CommentForm from 'Components/forms/CommentForm/CommentForm';
import { getAuth } from 'firebase/auth';
import { FieldValue, Firestore, arrayRemove, doc, getFirestore, updateDoc } from 'firebase/firestore';
import { firebaseApp } from '@/pages/api/FirebaseApp';

const RouteCommentsComponent = ({ routeId, comments }) => {
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [commentsArray, setCommentsArray] = useState([])
    // console.log(comments);

    useEffect(() => {
        setCommentsArray(Array.from(comments));
        console.log(commentsArray);
    }, [comments]);

    const auth = getAuth();
    const firebaseUID = auth.currentUser.uid;
    const db = getFirestore(firebaseApp);

    async function deleteComment(comment) {
        try {
            const commentRef = doc(db, 'routes', routeId);
            await updateDoc(commentRef, {
                comments: arrayRemove(comment)
            });
        } catch (e) {
            console.error(`Error updating document: ${e}`);
        }
    };

    const displayComments = Object.keys(comments).map(key =>
        <div key={key} className={styles.comment}>
            <div className={styles.commentTitleSection}>
                <div className={styles.commentTitleText}>
                    <p className={styles.commentDate}>{comments[key].date}</p>
                </div>
                {(firebaseUID == comments[key].uid) ? (
                    <div className={styles.commentButtonContainer}>
                        <FontAwesomeIcon icon={faPenToSquare} onClick={() => console.log('test')} />
                        <FontAwesomeIcon icon={faTrash} onClick={() => deleteComment(comments[key])} />
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
            <p className={styles.commentText}>{comments[key].comment}</p>
        </div>
    )

    return (
        <div className={styles.routeCommentsComponet}>
            <div className={styles.commentsTitleSection}>
                <p className={styles.commentsTitle}>Comments</p>
                <button type='button' onClick={() => setShowCommentForm(!showCommentForm)}>Add Comment</button>
            </div>
            {showCommentForm ? (
                <CommentForm
                    db={db}
                    firebaseUID={firebaseUID}
                    routeId={routeId} />
            ) : (
                <div></div>
            )}
            <div className={styles.commentsContainer}>
                {/* {commentsArray.map(data => (
                    <p>data.comment</p>
                ))} */}
                {displayComments}
                {/* <div className={styles.comment}>
                    <div className={styles.commentTitleSection}>
                        <div className={styles.commentTitleText}>
                            <p className={styles.commentAuthor}>Alexander</p>
                            <p className={styles.commentDate}>26-04-2023</p>
                        </div>
                        <div className={styles.commentButtonContainer}>
                            <FontAwesomeIcon icon={faPenToSquare} onClick={() => console.log('test')} />
                            <FontAwesomeIcon icon={faTrash} onClick={() => console.log('test')} />
                        </div>
                    </div>
                    <p className={styles.commentText}>Wow I love this route</p>
                </div> */}
            </div>
        </div>
    )
}

export default RouteCommentsComponent;