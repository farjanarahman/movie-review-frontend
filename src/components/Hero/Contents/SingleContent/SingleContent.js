import React, {  useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Comment from "./Comment/Comment";


const SingleContent = ({ singlereview, loggedInUser }) => {
  const { _id, username, useremail, reviewDate, title, review, imageLink } = singlereview;
  const [comment, setComment] = useState("");
  const [votes, setVotes] = useState(0);

  const [contentComments, setContentComments] = useState([]);


  useEffect(() => {
    fetch(`http://localhost:5000/getVotes/${_id}`)
      .then((res) => res.json())
      .then((data) => setVotes(data.length));
  }, []);
  useEffect(() => {
    try {
      fetch(`http://localhost:5000/getComments/${_id}`)
        .then((res) => res.json())
        .then((data) => setContentComments(data));
    } catch (error) {
      console.log(error);
    }
  }, []);

  
  const handleSubmit = (e) => {
    e.preventDefault();

    const commentDate = new Date().toDateString();

    if (comment) {
      try {
        fetch(`http://localhost:5000/setUserComment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contentId: _id,
            username: loggedInUser.name,
            useremail: loggedInUser.email,
            comment,
            commentDate,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              window.location.reload();
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const createVote = (id) => {
    try {
      fetch(`http://localhost:5000/setUserVote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contentId: id,
          voterId: id + loggedInUser.email,
          username: loggedInUser.name,
          useremail: loggedInUser.email,
          voteDate: new Date().toDateString(),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            toast("You voted successfully");
            window.location.reload();
          }
        })
        .catch((err) => {
          if (err)
            toast.error(
              "You Already voted, it's not possible to create new vote !"
            );
        });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="bg-light p-5 rounded mb-5">
      <ToastContainer />
      <div className="text-center mb-5 ms-5">
         <img src={imageLink} alt="" height={100} width={100} className=""/>
      </div>
      <div>
      <h3>{title}</h3>
      <p>
        <span>
          <strong>
            {username} | {useremail} | {reviewDate}
          </strong>
        </span>
      </p>
      <hr />
      <p>{review}</p>
      </div>

      <div className="d-flex justify-content-between">
        {loggedInUser.email ? (
          <button
            className="button button-outline mt-3"
            onClick={() => createVote(_id)}
          >
            Vote
          </button>
        ) : (
          <Link to="/login">
            <a href="" className="button button-primary mt-3">
              Login for vote
            </a>
          </Link>
        )}

        <p className="mt-4" style={{ color: "purple" }}>
          {" "}
          <strong> Votes: {votes} </strong>{" "}
        </p>
      </div>

      <hr />

      <div>
        {contentComments.map((comment) => (
          <Comment comment={comment} key={comment._id} />
        ))}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Please leave your comment here"
            id="titleField"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          {loggedInUser.email ? (
            <input
              className="button-primary mt-3"
              type="submit"
              value="Leave a comment"
            />
          ) : (
            <Link to="/login">
              <a href="" className="button button-primary mt-3">
                Login for leavning a comment
              </a>
            </Link>
          )}
        </form>
      </div>
    </div>
  );
};

export default SingleContent;
