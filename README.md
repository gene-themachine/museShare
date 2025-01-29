# MuseShare
![alt text](./pictures/home.png)

This is my 25w DALI lab Developer Challenge. 

[deployed url](https://react-intro-gene-themachine.onrender.com/)

MuseShare is a web application designed for music enthusiasts to review their favorite albums, artists, and tracks. 
You can also view your friends and other user's reviews. It utilizes the MERN stack.

## Why did I make it?
![alt text](./pictures/seereview.png)

I've always wanted to develop an application where people can share their opinions on
certain artists, albums, or tracks. They can simply say they're good or they go on a long explanation
of what a certain album symbolizes or what the song means. 

## Note!

In many instacnes, I've gotten a error from the youtube API because my API key is invalid or exhausted. However, time to time, it would work again. 
Similarly, because I am using the free Spotify API, I've had many instances where the application doesn't work because of api key exahustion. If you 
experience this problem, please give it some time to try it again. 

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
  - Firebase
 
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
     ```
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
     ```

7. Start the backend server:
   ```
   npm run dev
   ```

8. In a new terminal, start the frontend:
   ```
   cd client
   npm run dev
   ```


## Learning Journey

  This was the biggest project I've developed, and I've never used the MERN at such a big scale. Previously, some of the projects I've completed was a note application and a phonebook application, very simple and smaller projects. Although, I had similar experience with HTML, CSS, and javascript, I've only started learning react and full stack web dev towards the end of fall last year and only learned a great deal during the winterim and very much enjoyed the process. If you look at some of my old projects / dali app submissions from before, you could see that they are drastically different in functionality and style. Throughout this project, I've learned a great deal. This was the first time I've used Firebase authentication. I learned how to style things better and also some tips that could expedite my projects in the future. For example, at first I called the api request within a component instead of calling it from a controller. I did this for a while until I had to go back and fix them and call the controller instead. I also should've named things better looking back. Although I do have some experience with ESLint, I did not have enough time to implement it for this project. 

## Looking Forward
  
  I have many aspirations for this project. 
  I want users to be able to befriend each other and display the friend's reviews on Home, so the main user can know what their friends are listening to. 
  I also want to add lyrics for the trackviews and the users to be able to highlight sections of the lyrics they want to talk about. 
  I'd also like improve some spacing and placements. 


