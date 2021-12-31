import React, { useContext } from "react";
import { AuthContext } from "../../../../../App";

const Comment = ({ comment }) => {
  const {_id, username, useremail, comment: contentComment, commentDate } = comment;

  const [ loggedInUser, setLoggedInUser ] = useContext(AuthContext)

  const deleteComment = (id) => {
        if(window.confirm('Are you sure want to delete this comment ?')){
            fetch(`http://localhost:5000/deleteComment/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
              })
              .then( res => res.json() )
              .then( data => {
                  if(data){
                      window.location.reload();
                  }
              })
        }
      }
  return (
    <div className="border p-4 mb-3">
      <div className='d-flex justify-content-between'>
        <div>
          <p>
            <span> <strong> {username} </strong> </span> | <span> <strong> {useremail} </strong> </span> | <span> <strong> {commentDate} </strong> </span>
          </p>
          <p> {contentComment} </p>
        </div>
        {
            (loggedInUser.email === useremail) &&  <button className='button button-small button-outline' onClick={() => deleteComment(_id)}> Delete </button>
        }
      </div>
    </div>
  );
};

export default Comment;
