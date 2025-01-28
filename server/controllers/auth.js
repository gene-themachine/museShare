const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } = require('firebase/auth');
require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const authRouter = require('express').Router();

// Sign Up User
authRouter.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      res.json(userCredential.user);
    } catch (error) {
      console.error('Error signing up:', error.message);
      res.status(400).json({ error: error.message });
    }
});
  
// Sign In User
authRouter.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      res.json(userCredential.user);
    } catch (error) {
      console.error('Error signing in:', error.message);
      res.status(400).json({ error: error.message });
    }
});
  
// Sign Out User
authRouter.post('/signout', async (req, res) => {
    try {
      await signOut(auth);
      res.status(200).json({ message: 'User signed out' });
    } catch (error) {
      console.error('Error signing out:', error.message);
      res.status(400).json({ error: error.message });
    }
});
    
// Track Auth State
authRouter.get('/trackAuthState', (req, res) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            return res.json(user);
        } else {
            return res.status(404).json({ error: 'No user found' });
        }
    });
});

module.exports = authRouter;