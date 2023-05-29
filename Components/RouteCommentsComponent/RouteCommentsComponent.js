/**
 * @fileoverview This file represets the RouteCommentsComponent which displays all of the all of the route's comments.
 * Users are able to add comments and they are able to delete them.
 * 
 * @param {String} routeId - The current route's id.
 * @param {Object} comment - An object of all the route's comments.
 */
import styles from './RouteCommentsComponent.module.scss';
import React, { useState, useEffect } from 'react';
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CommentForm from 'Components/forms/CommentForm/CommentForm';
import { getAuth } from 'firebase/auth';
import { Tooltip } from 'react-tooltip';
import { arrayRemove, doc, getFirestore, updateDoc } from 'firebase/firestore';
import { firebaseApp } from '@/pages/api/FirebaseApp';

const RouteCommentsComponent = ({ routeId, comments }) => {
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [commentsArray, setCommentsArray] = useState(comments);
    const [displayComments, setDisplayComments] = useState();

    useEffect(() => {
        setCommentsArray(comments);
    }, [comments]);

    useEffect(() => {
        if (Object.values(commentsArray).length == 0) {
            setDisplayComments(
                <p>No comments</p>
            );
        } else if (Object.values(commentsArray).length > 0) {
            setDisplayComments(Object.keys(commentsArray).map((key) =>
                <div key={key} className={styles.comment}>
                    <div className={styles.commentTitleSection}>
                        <div className={styles.commentTitleText}>
                            <p className={styles.commentDate}>{commentsArray[key].comment}</p>
                        </div>
                        {(firebaseUID == commentsArray[key].uid) ? (
                            <div>
                                <div id='deleteComment' className={styles.commentButtonContainer}>
                                    <FontAwesomeIcon icon={faTrash} onClick={() => deleteComment(commentsArray[key], key)} />
                                </div>

                                <Tooltip anchorId='deleteComment' place='left' clickable>
                                    <p>Delete</p>
                                </Tooltip>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                    <p className={styles.commentText}>Posted - {commentsArray[key].date}</p>
                </div>
            ));
        }
    }, [commentsArray]);

    const auth = getAuth();
    const firebaseUID = auth.currentUser.uid;
    const db = getFirestore(firebaseApp);

    /**
     * This async function removes the user's comments from teh route's document in firestore.
     */
    async function deleteComment(comment, key) {
        try {
            const commentRef = doc(db, 'routes', routeId);
            await updateDoc(commentRef, {
                comments: arrayRemove(comment)
            });
            const removeComment = (key, { [key]: _, ...rest }) => rest;
            setCommentsArray(prev => removeComment(key, prev));
            delete commentsArray[key];
        } catch (e) {
            console.error(`Error updating document: ${e}`);
        }
    };

    return (
        <div id='comments' className={styles.routeCommentsComponet}>
            <div className={styles.commentsTitleSection}>
                <p className={styles.commentsTitle}>Comments</p>
                <button type='button' disabled={showCommentForm} onClick={() => setShowCommentForm(!showCommentForm)}>Add Comment</button>
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