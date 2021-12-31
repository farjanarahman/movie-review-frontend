import firebase from "firebase/app";
import React, { useEffect,useContext, useState  } from "react";
import { AuthContext } from "../../App";
import { initializeLoginFramework } from "../../components/Account/loginManager/loginManager";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";

const Home = () => {
  const [search, setSearch] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loggedInUser, setLoggedInUser] = useContext(AuthContext);
  initializeLoginFramework();
  useEffect(() => {
    checkUserLoggedIn();
  }, []);
  const checkUserLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedInUser({
          isSignedIn: true,
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          error: user.error ? user.error : "",
          success: true,
        });
      } else {
        setLoggedInUser({
          isSignedIn: false,
          name: "",
          email: "",
          photo: "",
          error: "",
          success: false,
        });
      }
    });
  };

  const getSearchResult = (searchTerm) => {
    setSearch(searchTerm);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/getPublishedReviews?search=${search}`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [search]);

  useEffect(() => {
    try {
      fetch("http://localhost:5000/getPublishedReviews")
        .then((res) => res.json())
        .then((data) => setReviews(data));
    } catch (error) {
      console.log(error);
    }
  }, []);

  
  
 

  const getVotes = () => {
    try {
      fetch(`http://localhost:5000/votes`)
        .then((res) => res.json())
        .then((data) => sortFeaturesByVotes(data));
    } catch (error) {}
  };

  const sortFeaturesByVotes = (votes) => {
    let contentIds = [];

    votes.map((vote) => {
      contentIds.push(...contentIds, vote.contentId);
    });

    let uniqueContentIds = [...new Set(contentIds)];

    const filteredData = uniqueContentIds.map((key) => {
      const data = votes.filter((vote) => vote.contentId === key);
      data.contentId = key;

      return data;
    });

    const desc = filteredData.sort((a, b) => b.length - a.length);

    const descOrder = desc.map((element) => {
      return reviews.filter((feature) => feature._id === element.contentId);
    });

    const newData = descOrder.map((el) => {
      return Object.assign({}, ...el);
    });

    setReviews(newData);
  };

  const getComments = () => {
    try {
      fetch(`http://localhost:5000/comments`)
        .then((res) => res.json())
        .then((data) => {
          sortReviewsByComments(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const sortReviewsByComments = (comments) => {
    let contentIds = [];
    comments.map((comment) =>
      contentIds.push(...contentIds, comment.contentId)
    );
    let uniqueContentIds = [...new Set(contentIds)];

    let filteredData = uniqueContentIds.map((key) => {
      const data = comments.filter((comment) => comment.contentId === key);
      data.contentId = key;

      return data;
    });

    const desc = filteredData.sort((a, b) => b.length - a.length);

    const descOrder = desc.map((element) => {
      return reviews.filter((feature) => feature._id === element.contentId);
    });

    const newData = descOrder.map((el) => {
      return Object.assign({}, ...el);
    });

    setReviews(newData);
  };

  const sortFeaturesByAlphabetically = () => {
    // let sortedData =  reviews.sort((a, b) => {
    //    if (a.title < b.title) {
    //      return -1;
    //    }
    //    else if (a.title > b.title) {
    //      return 1;
    //    }
    //    return 0 ;
    //  });

    try {
      const sortedData = reviews.sort((a, b) => a.title.localeCompare(b.title))

      const newData = [...sortedData]

      console.log(newData)
  
      setReviews(newData)
    } catch (error) {
      
    }

   };

  return (
    <>
      <Header getSearchResult={getSearchResult} />
      <Hero
        reviews={reviews}
        loggedInUser={loggedInUser}
        getComments={getComments}
        getVotes={getVotes}
        sortFeaturesByAlphabetically={sortFeaturesByAlphabetically}
      />
    </>
  );
};

export default Home;
