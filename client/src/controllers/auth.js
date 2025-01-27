import axios from 'axios';

const baseUrl = '/api/auth';

// Sign Up User
export const signUpUser = async (email, password) => {
  try {
    const userCredential = await axios.post(`${baseUrl}/signup`, { email, password });

    return userCredential.user;
  } catch (error) {
    console.error('Error signing up:', error.message);
    throw error;
  }
};

// Sign In User
export const signInUser = async (email, password) => {

  try {
    const userCredential = await axios.post(`${baseUrl}/signin`, { email, password });

    return userCredential.user;
  } catch (error) {
    console.error('Error signing in:', error.message);
    throw error;
  }
};

// Sign Out User
export const signOutUser = async () => {
  try {
    await axios.post(`${baseUrl}/signout`);
  } catch (error) {
    console.error('Error signing out:', error.message);
    throw error;
  }
};

// Track Auth State
export const trackAuthState = (callback) => {
  axios.get(`${baseUrl}/trackAuthState`)
    .then(response => {
      callback(response.data);
    })
    .catch(error => {
      console.error('Error tracking auth state:', error.message);
      throw error;
    });
};
  


export default {
  signUpUser,
  signInUser,
  signOutUser,
  trackAuthState,

};
