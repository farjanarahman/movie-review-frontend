import React, { useEffect, useState } from 'react';
import SingleReview from './SingleReview/SingeReview';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditForm from './SingleReview/EditForm/EditForm';

const ReviewsContent = ({loggedInUser}) => {
    const [reviews, setReviews] = useState([]);
    const [updateContent, setUpdateContent ] = useState({
        id: '',
        title: '',
        description: ''
    });

    useEffect(() => {
        try {
            fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
        } catch (error) {
         
        }
    },[updateContent.id])
    const publishReview = (status, id) => {
        try {
            fetch(`http://localhost:5000/updatePublishStatus/${id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({publish: status})
            })
            .then(res => {
                if(res.ok){
                    console.log("This review publish status is successfully updated 😊")
                    toast('This review publish status is successfully updated 😊')
                }
            })
        } catch (error) {

        }
    }
    const deleteReview = id => {
        try {
            fetch(`http://localhost:5000/deleteReview/${id}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => res.json() )
            .then(data => {
                if(data){
                    if(data){
                        toast('This review is successfully deleted...')
                        setTimeout(() => {
                            window.location.reload();
                        },3000)
                    }
                }
            })
        } catch (error) {
            
        }
    }
    const getUpdateContent = content => {
        setUpdateContent(content)
    }
    return (
        <div className='container mt-5'>
             <ToastContainer />
            <div className='row'>
                <div className='column column-50'>
                
                    {
                     reviews.length > 0 ? (reviews.map( singlereview => <SingleReview key={singlereview._id} singlereview={singlereview} publishReview={publishReview} deleteReview={deleteReview} getUpdateContent={getUpdateContent} />)) 
                      : <div>
                          <h2 className='upper text-center'>No Records found</h2>
                      </div>
                    }
                </div>
                <div className='column column-50'>
                    <EditForm updateContent={updateContent} loggedInUser={loggedInUser}></EditForm>
                </div>
            </div>
        </div>
    );
};

export default ReviewsContent;