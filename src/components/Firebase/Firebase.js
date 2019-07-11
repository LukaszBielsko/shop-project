import app from 'firebase/app';
import 'firebase/auth'
import 'firebase/database';

import config from '../../FirebaseDetails';


const firebaseConfig = {
    apiKey: config.apiKey,
    authDomain: config.authDomain, 
    databaseURL: config.databaseURL,
    projectId: config.projectId,
    storageBucket: "",
    messagingSenderId: config.messagingSenderId,
    appId: config.appId
};

class Firebase {
    constructor(){
        app.initializeApp(firebaseConfig);

        this.auth = app.auth();
        this.db = app.database()
    }

    // Auth API
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    authChange = () => this.auth.onAuthStateChanged(); 

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

}

export default Firebase;