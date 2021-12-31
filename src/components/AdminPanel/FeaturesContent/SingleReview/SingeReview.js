import React from "react";
import { Link } from "react-router-dom";

const SingleReview = ({
  singlereview,
  publishReview,
  deleteReview,
  getUpdateContent,
}) => {
  const { _id, title, review, username, useremail, imageLink, reviewDate } =
    singlereview;

  const alertForPublishReview = (status, id) => {
    if (status) {
      if (
        window.confirm("Are you sure want to publish this review request ?")
      ) {
        publishReview(status, id);
      }
    } else {
      if (
        window.confirm(
          "Are you sure want to undo publish this review request ?"
        )
      ) {
        publishReview(status, id);
      }
    }
  };

  const alertForDeleteReview = (id) => {
    if (window.confirm("Are you sure want to delete this review content? ")) {
      deleteReview(id);
    }
  };

  return (
    <div className="bg-light p-5 rounded mb-5">
      <div className="d-flex justify-content-between">
        <div>
          {" "}
          <img src={imageLink} alt="" width={100} height={100} />{" "}
        </div>
        <div className="mt-3">
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
        <div className="dropdown">
          <button
            className="btn btn-dark dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Actions
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <Link
                href=""
                className="dropdown-item pe-auto"
                onClick={() => alertForPublishReview(true, _id)}
              >
                Publish
              </Link>
            </li>
            <li>
              <Link
                href=""
                className="dropdown-item pe-auto"
                onClick={() => getUpdateContent({ id: _id, title, review })}
              >
                Edit
              </Link>
            </li>
            <li>
              <Link
                href=""
                className="dropdown-item pe-auto"
                onClick={() => alertForDeleteReview(_id)}
              >
                Delete
              </Link>
            </li>
            <hr />
            <li>
              <Link
                href=""
                className="dropdown-item pe-auto"
                onClick={() => alertForPublishReview(false, _id)}
              >
                Undo Publish
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SingleReview;
