# MuseShare
![alt text](./pictures/home.png)

MuseShare is a web application designed for music enthusiasts to review their favorite albums, artists, and tracks. 
You can also view your friends and other user's reviews. It utilizes the MERN stack.

## Why did I make it?
![alt text](./pictures/seereview.png)

I've always wanted to develop an application where people can share their opinions on
certain artists, albums, or tracks. They can simply say they're good or they go on a long explanation
of what a certain album symbolizes or what the song means. 

## Features

- **User Authentication**: Users can register, log in, and manage their profiles. Used firebase.
  ![alt text](./pictures/login.png)
- **Music Reviews**: Users can create and share reviews for albums, artists, and tracks.
  ![alt text](./pictures/addreview.png)
  ![alt text](./pictures/seereviews.png)
- **Dynamic Content**: The application fetches data from a backend server, allowing users to view and interact with the latest music reviews.
- **Responsive Design**: The app is designed to be mobile-friendly, ensuring a good user experience across devices.

## Technologies Used

- **Frontend**: 
  - React
  - Vite
  - React Router for navigation
  - Axios for API calls
  - Youtube API
  - Spotify API

- **Backend**: 
  - Node.js
  - Express
  - MongoDB for data storage
 
![alt text](./pictures/profile.png)

## Getting Started

To get started with MuseShare, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the client directory and install dependencies:
   ```
   cd client
   npm install
   ```
   Also make sure to change baseURL in the controllers to something like localhost:3000/ and then whatever comes next. 

4. Navigate to the server directory and install dependencies:
   ```
   cd server
   npm install
   ```

5. Set up your environment variables in a `.env` file in the server directory.
   Needed variables:
      PORT
      MONGODB_URI
      SPOTIFY_CLIENT_ID
      SPOTIFY_CLIENT_SECRET
      FIREBASE_API_KEY
      FIREBASE_AUTH_DOMAIN
      FIREBASE_PROJECT_ID
      FIREBASE_STORAGE_BUCKET
      FIREBASE_MESSAGING_SENDER_ID
      FIREBASE_APP_ID
      YOUTUBE_API_KEY   

6. Start the backend server:
   ```
   npm run dev
   ```

7. In a new terminal, start the frontend:
   ```
   cd client
   npm run dev
   ```
