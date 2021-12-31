import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";


export const initializeLoginFramework = () => {
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
    .then(res => {
      const {displayName, photoURL, email,emailVerified} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true,
        emailVerified
      };
      return signedInUser;
    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })
}

export const handleSignOut = () => {
    return firebase.auth().signOut()
        .then(()=> {
           
        }).catch(err => {
            // An error happened.
        });
}

export const createUserWithEmailAndPassword = (name,email,password) => {
    return firebase.auth().createUserWithEmailAndPassword(email,password)
     .then((res) => {
       const newUserInfo = res.user;
       newUserInfo.name = name
       newUserInfo.error = '';
       newUserInfo.success = true;
       updateUserName(name);
       return newUserInfo;
     })
     .catch((error) => {
       const newUserInfo = {};
       newUserInfo.error = error.message;
       newUserInfo.success = false;
       return newUserInfo;
     });
 }

 export const signInWithEmailAndPassword = (email,password) => {
    return firebase.auth().signInWithEmailAndPassword(email,password)
     .then(res => {
       const {displayName,email,emailVerified} = res.user;

       const newUserInfo = {
         name: displayName,
         email: email,
         error: '' ,
         success: true,
         emailVerified
       }
       return newUserInfo;
     })
     .catch(error => {
       const newUserInfo = {};
       newUserInfo.error = error.message;
       newUserInfo.success = false;
       return newUserInfo;
     })
 }
 
 const updateUserName = name => {
     const user = firebase.auth().currentUser;
 
     user.updateProfile({
       displayName: name,
     }).then(function() {
       console.log('username updated successfully')
     }).catch(function(error) {
       console.log(error)
     });
}



export const storeAuthToken = (user) => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
      .then(function (idToken) {
        sessionStorage.setItem('token', idToken);
        sessionStorage.setItem('userInfo',JSON.stringify(user));
      }).catch(function (error) {
        // Handle error
      });
  }