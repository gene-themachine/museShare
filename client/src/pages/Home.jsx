import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { trackAuthState } from '../controllers/auth';
import RandomAlbumBlogs from './Home/RandomAlbumBlogs';
import MyAlbumBlogs from './Home/MyAlbumBlogs';
import RandomArtistBlogs from './Home/RandomArtistBlogs';
import MyTrackBlogs from './Home/MyTrackBlogs';
import userController from '../controllers/user';
import blogController from '../controllers/blog';
import RandomTrackBlogs from './Home/RandomTrackBlogs';
import MyArtistBlogs from './Home/MyArtistBlogs';



function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [albumBlogs, setAlbumBlogs] = useState([]);
    const [artistBlogs, setArtistBlogs] = useState([]);
    const [trackBlogs, setTrackBlogs] = useState([]);



    useEffect(() => {
        trackAuthState(async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                const albumResponse = await blogController.getMyAlbums(currentUser.uid);
                const artistResponse = await blogController.getMyArtists(currentUser.uid);
                const trackResponse = await blogController.getMyTracks(currentUser.uid);
                
                setAlbumBlogs(albumResponse.data);

                setArtistBlogs(artistResponse.data);
                setTrackBlogs(trackResponse.data);
            }

        });
    }, []);

    const handleAddReviewClick = () => {
        navigate('/add-review');
    };

    return (
        <div>


            
            <div className="blogs-container">
                <div className="blogs-container-top">
                    <h2 className="random-blogs-title">Random Album Reviews</h2>
                    <RandomAlbumBlogs />
                </div>


            </div>

            <div className="blogs-container">
                <div className="blogs-container-bottom">
                    <h2 className="random-blogs-title">Random Artist Reviews</h2>
                    <RandomArtistBlogs />
                </div>
            </div>

            <div className="blogs-container">
                <div className="blogs-container-bottom">
                    <h2 className="random-blogs-title">Random Track Reviews</h2>
                    <RandomTrackBlogs />
                </div>
            </div>


            
            {albumBlogs.length > 0 && 
            <div className="blogs-container">
                <div className="blogs-container-bottom">
                    <h2 className="random-blogs-title">My Album Reviews</h2>
                    <MyAlbumBlogs />
                </div>
            </div>
            }



            {trackBlogs.length > 0 &&
            <div className="blogs-container">
                <div className="blogs-container-bottom">
                    <h2 className="random-blogs-title">My Track Reviews</h2>
                    <MyTrackBlogs />
                </div>
            </div>
            }

            {artistBlogs.length > 0 &&
            <div className="blogs-container">
                <div className="blogs-container-bottom">
                    <h2 className="random-blogs-title">My Artist Reviews</h2>
                    <MyArtistBlogs />
                </div>
            </div>
            } 

            


            {user && (
                <div 
                    id="addReviewButton"
                    className="add-review-button"
                    onClick={handleAddReviewClick}
                >
                    +
                </div>
                
            )}

        </div>
    );
}

export default Home;