import React from "react";
import { Link } from "react-router-dom";
import SingleContent from "./SingleContent/SingleContent";

const Contents = ({
  reviews,
  loggedInUser,
  getComments,
  getVotes,
  sortFeaturesByAlphabetically,
}) => {
  return (
    <div className="column column-50 ">
      <div className="dropdown float-right">
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
            <Link href="" className="dropdown-item pe-auto" onClick={getVotes}>
              Votes
            </Link>
          </li>
          <li>
            <Link
              href=""
              className="dropdown-item pe-auto"
              onClick={getComments}
            >
              Comments
            </Link>
          </li>
          <li>
            <Link
              href=""
              className="dropdown-item pe-auto"
              onClick={sortFeaturesByAlphabetically}
            >
              Alphabetically
            </Link>
          </li>
        </ul>
      </div>
      {reviews.length > 0 ? (
        reviews.map((singlereview) => (
          <SingleContent
            singlereview={singlereview}
            key={singlereview._id}
            loggedInUser={loggedInUser}
          />
        ))
      ) : (
        <div>
          <h4>No Published Content Found</h4>
        </div>
      )}
    </div>
  );
};

export default Contents;
