import React from 'react';
import Contents from './Contents/Contents';
import ReviewForm from './ReviewForm/ReviewForm';


const Hero = ({reviews, loggedInUser, getComments, getVotes, sortFeaturesByAlphabetically }) => {
    return (
        <div className='container my-5'>
            <div className="row">
                <ReviewForm loggedInUser={loggedInUser}/>
                <Contents  reviews={reviews} loggedInUser={loggedInUser} getComments={getComments} getVotes={getVotes} sortFeaturesByAlphabetically={sortFeaturesByAlphabetically}/>
            </div>
        </div>
    );
};

export default Hero;