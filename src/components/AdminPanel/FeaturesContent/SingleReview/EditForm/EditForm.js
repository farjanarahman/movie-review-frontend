import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const EditForm = ({ updateContent, loggedInUser }) => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [imageLink, setImageLink] = useState("");

  useEffect(() => {
    setTitle(updateContent.title);
    setReview(updateContent.review);
    setId(updateContent.id);
  }, [updateContent]);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (window.confirm("Are you sure want to update this review content ?")) {
      if (title && review && imageLink) {
        try {
          fetch(`http://localhost:5000/updateReview/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, review, imageLink }),
          })
            .then((res) => res.json())
            .then((data) => {
              if(data){
                    toast("This Review content updated successfully ..");
                    setTimeout(() => {
                        window.location.reload();
                    }, 6000)
                }  
              });
        } catch (error) {
          console.log(error);
        }
      } else {
        toast.error("Title or Review field is empty ! Please try again");
      }
    }
  };
  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <label htmlFor="titleField" className="my-3">
          Title
        </label>
        <input
          type="text"
          placeholder="Title"
          id="titleField"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="reviewField" className="my-3">
          Review
        </label>
        <textarea
          placeholder="Review"
          id="reviewField"
          rows={10}
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
         <label htmlFor="imageField" className="my-3">
          Image
        </label>
        <input
          type="text"
          placeholder="Image"
          id="imageField"
          value={imageLink}
          onChange={(e) => setImageLink(e.target.value)}
        />
        {loggedInUser.email ? (
          <input className="button-primary mt-3" type="submit" value="Update" />
        ) : (
          <Link to="/login">
            <a href="" className="button button-primary mt-3">
              Login to Update Review
            </a>
          </Link>
        )}
      </form>
    </div>
  );
};

export default EditForm;
