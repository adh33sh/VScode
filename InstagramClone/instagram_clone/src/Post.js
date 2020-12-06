import React, {useState, useEffect} from 'react';
import './Post.css';
import { db } from './firebase';
import Avatar from "@material-ui/core/Avatar";
import firebase from 'firebase';


function Post({ postId, username, caption, imageUrl, user}) {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
         let unsubscribe;
        if(postId) {
         const unsubsribe = db
            .collection("posts")
            .doc(postId)
            .collection("comments")
            .orderBy('timestamp','asc')
            .onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()));
            });
        }
        return () => {
            unsubscribe();
        };
    }, [postId]);
        
    const postComment = (event) => {
        event.preventDefault();

        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
    }


    return (
        <div className="post">
            <div className="post__header">
            <Avatar className="post__avatar"
            alt="Remy Sharp" 
            src="/static/images/avatar/1.jpg" />
            {/*header -> Avatar + username */}
            <h3>{username}</h3>
            </div>
            {/* Image */}
            <img class="post__image" src={imageUrl} alt=""/>
            {/* Username + Caption */}
            <h4 className="post__text"><strong>{username} : </strong>{caption}</h4>

            <div className="post__comments">
            {
                comments.map((comment) => (
                    <p>
                        <strong>{comment.username}</strong> {comment.text}
                    </p>
                ))
            }
            </div>

            {user && (

                      <form className="post__commentBox">
                      <input className="post__input"
                      type="text"
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      />
                      
                      <button
                      className="post__button"
                      disabled={!comment}
                      type="submit"
                      onClick={postComment}
                      >
                      Post
                      </button>
                      </form>
            )}
            
        </div>
    )
}

export default Post