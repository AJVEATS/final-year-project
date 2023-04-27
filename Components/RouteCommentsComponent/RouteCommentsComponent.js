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
    const [commentsArray, setCommentsArray] = useState(comments);
    const [displayComments, setDisplayComments] = useState();
    // console.log(comments);

    useEffect(() => {
        setCommentsArray(comments);
    }, [comments]);

    useEffect(() => {
        let amountOfComments = Object.values(commentsArray).length;
        if (amountOfComments == 0) {
            setDisplayComments(
                <p>No comments</p>
            );
        } else if (amountOfComments > 0) {
            setDisplayComments(Object.keys(commentsArray).map((key) =>
                <div key={key} className={styles.comment}>
                    <div className={styles.commentTitleSection}>
                        <div className={styles.commentTitleText}>
                            <p className={styles.commentDate}>{commentsArray[key].date}</p>
                        </div>
                        {(firebaseUID == commentsArray[key].uid) ? (
                            <div className={styles.commentButtonContainer}>
                                {/* <FontAwesomeIcon icon={faPenToSquare} onClick={() => console.log('test')} /> */}
                                <FontAwesomeIcon icon={faTrash} onClick={() => deleteComment(commentsArray[key], key)} />
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                    <p className={styles.commentText}>{commentsArray[key].comment}</p>
                </div>
            ));
        }


    }, [commentsArray])

    const auth = getAuth();
    const firebaseUID = auth.currentUser.uid;
    const db = getFirestore(firebaseApp);

    async function deleteComment(comment, key) {
        try {
            const commentRef = doc(db, 'routes', routeId);
            await updateDoc(commentRef, {
                comments: arrayRemove(comment)
            });
            const removeComment = (key, { [key]: _, ...rest }) => rest;
            setCommentsArray(prev => removeComment(key, prev));
            delete commentsArray[key];
            console.log(commentsArray);
            // setCommentsArray(newCommentList);
        } catch (e) {
            console.error(`Error updating document: ${e}`);
        }
    };

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
                    routeId={routeId}
                    commentsArray={commentsArray}
                    setCommentsArray={setCommentsArray}
                    setShowCommentForm={setShowCommentForm} />
            ) : (
                <div></div>
            )}
            <div className={styles.commentsContainer}>
                {displayComments}
            </div>
        </div>
    )
}

export default RouteCommentsComponent;