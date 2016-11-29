/**
 * Created by SAYALI on 14-11-2016.
 */

// Initialized Firebase in index.html


// Get a reference to the database service
/*var fdatabase = firebase.database().ref('feedback_web');
var usersdata = firebase.database().ref('userlist');*/

var loggedinUser = firebase.auth().currentUser;

function logout(){
    firebase.auth().signOut().then(function() {
        console.log('Signed Out the old user!!');
    }, function(error) {
        console.error('Sign Out Error', error);
    });
    window.location = "http://localhost:3000/";
}

function handleSignUp(){
    var email = document.getElementById('emailSignUp').value;
    var password1 = document.getElementById('passwordSignUp1').value;
    var password2 = document.getElementById('passwordSignUp2').value;
    if (email.length < 5) {
        alert('Please enter a valid email address.');
        return;
    }
    if(password1!=password2){
        alert('Both entered passwords do not match.');
        return;
    }
    if (password1.length < 6) {
        alert('Password should be minimum 6 characters');
        return;
    }
    firebase.auth().createUserWithEmailAndPassword(email, password1).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
    });
    newuser();
}

function newuser() {
    var signname = document.getElementById('signname').value;
    var signemail = document.getElementById('emailSignUp').value;
    console.log("Sauucssfully created user with emailId "+signname);
    //logic to save data to database
}

function sendPasswordReset() {
    var email = document.getElementById('emailforgot').value;
    // [START sendpasswordemail]
    firebase.auth().sendPasswordResetEmail(email).then(function () {
        // Password Reset Email Sent!
        alert('Password Reset Email Sent!');
        // [END_EXCLUDE]
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/invalid-email') {
            alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
            alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
    });
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        currentUser=user;
        console.log(currentUser);
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;


        if (!emailVerified) {
            // alert('user  is Logged IN');
            sendEmailVerification();
        }
    } else {


    }
});

function sendEmailVerification() {
    firebase.auth().currentUser.sendEmailVerification().then(function() {
        alert('Please verify your Email!!');
    });

}