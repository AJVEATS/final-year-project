// TODO Document this file
import styles from './CommentForm.module.scss';
import React, { useState } from 'react';
import moment from 'moment/moment';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

const CommentForm = ({ db, firebaseUID, routeId, commentsArray, setCommentsArray, setShowCommentForm }) => {
    const [newComment, setNewComment] = useState('');

    async function addComment() {
        if (newComment != '') {
            try {
                const newCommentObject = {
                    'commentId': `${firebaseUID}~${moment().format('LL')}`,
                    'comment': newComment,
                    'date': moment().format('LL'),
                    'uid': firebaseUID
                };
                const commentRef = doc(db, 'routes', routeId);
                updateDoc(commentRef, {
                    comments: arrayUnion(newCommentObject)
                });
                let commentsListLength = Object.values(commentsArray).length;
                console.log(commentsListLength);
                setCommentsArray({ ...commentsArray, [commentsListLength]: newCommentObject });
                setNewComment('');
                setShowCommentForm(false);
            } catch (e) {
                console.error(`Error adding comment: ${e}`);
                alert(`Error adding comment - ${e}`);
            }
        }
    };

    return (
        <div className={styles.commentFormContainer}>
            <p className={styles.commentFormTitle}>Post Comment</p>
            <form className={styles.commentForm}>
                <input
                    type='text'
                    id='newComment'
                    name='newComment'
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
                    require />
                <button type='button' onClick={() => addComment()}>post</button>
            </form>
        </div>
    )
}

export default CommentForm;