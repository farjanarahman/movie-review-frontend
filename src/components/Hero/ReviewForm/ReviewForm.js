import React, { useContext, useState } from "react";
import { Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../../App";


const ReviewForm = () => {
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [imageLink, setImageLink] = useState("");

  const [loggedInUser, setLoggedInUser] = useContext(AuthContext)

  const handleSubmit = e => {
    e.preventDefault();

    const reviewDate = new Date().toDateString();
    const publish = false;

    if(title && review && imageLink){
      try {
        fetch('http://localhost:5000/addReview', {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          body:JSON.stringify({publish, useremail: loggedInUser.email, username: loggedInUser.name, title, review, imageLink, reviewDate})
        })
        .then(res => res.json())
        .then(data => {
          if(data){
            toast('Your Feature request added successfully ..')
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    else{
      toast.error('Title or Detail field is empty ! Please try again')
    }
  }

  return (
    <div className="column column-50">
      <ToastContainer />
      <form onSubmit={handleSubmit}>

        <label htmlFor="titleField" className='my-3'>Title</label>
        <input type="text" placeholder="Title" id="titleField" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label htmlFor="reviewField" className='my-3'>Review</label>
        <textarea placeholder="Review" id="reviewField" value={review} onChange={(e) => setReview(e.target.value)}></textarea>
       
        <label htmlFor="imageField" className='my-3'>Image Link</label>
        <input type="text" placeholder="Image" id="imageField" value={imageLink} onChange={(e) => setImageLink(e.target.value)} />

        {
          loggedInUser.email ? <input className="button-primary mt-3" type="submit" value="REQUEST REVIEW" /> : <Link to='/login'> <a href='' className='button button-primary mt-3'> Login to Send Request </a> </Link>
        }
      </form>
    </div>
  );
};

export default ReviewForm;
