import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReviewBox from '../../components/ReviewBox';
import { useNavigate } from 'react-router-dom';
import TitleReview from '../../components/TitleReview';
import { trackAuthState } from '../../controllers/auth';
import userController from '../../controllers/user';

const ArtistReviewPage = ({ itemDetails }) => {
    const { id } = useParams();
    const [albums, setAlbums] = useState([]);
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [user, setUser] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [username, setUsername] = useState('');
    useEffect(() => {
        
    }, []);

    useEffect(() => {
        const fetchAlbums = async (currentUser) => {
            try {
                const userInfo = await userController.viewOthersProfile(currentUser.uid);

                setUsername(userInfo.username);


                const response = await axios.get(`http://localhost:3000/api/artists/albums/${id}`);
                setAlbums(response.data);
            } catch (error) {
                console.error("Error fetching albums:", error);
            }
        };

        
        trackAuthState((currentUser) => {
            setUser(currentUser);

            
            fetchAlbums(currentUser);
        });

        
    }, [id]);

    const handleTitleChange = (newTitle) => {
        setTitle(newTitle);
    };

    const handleReviewChange = (newReview) => {
        setReview(newReview);
    };

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };


    const handleAlbumClick = (album) => {
        navigate(`/review/${album.id}?type=album`);

    };

    const handleBlogSubmit = async () => {
        try {

            const response = await axios.post('http://localhost:3000/api/blogs', {
                title: title,
                description: review,
                type: 'artist',
                email: user.email,
                item_id: id,
                rating: rating,
                username: username,
                id: user.uid
            });
            setIsSubmitted(true);
            setTitle('');
            setReview('');
            setRating(0);

        } catch (error) {
            console.error('Error submitting blog:', error.message);
        }
    };

    return (
        <div className="artist-review">
            <div className="artist-header">
                <div className = "artist-details">
                    <h1 className="artist-name">{itemDetails.name}</h1>
                    <img src={itemDetails.image_url} alt={`${itemDetails.name} cover`} className="review-image" />
                    <p>Genres: {itemDetails.genres.join(', ')}</p>

                </div>
                <div className="track-review-box-artist">
                    <h1>Add a Review</h1>
                    <h3>Summarize your review in a few words</h3>   
                    <TitleReview handleTitleChange={handleTitleChange} />
                    <ReviewBox onReviewChange={handleReviewChange} onRatingChange={handleRatingChange} />
                    <button className="submit-button" onClick={handleBlogSubmit}>Submit</button>  
                    {isSubmitted && <p>Blog submitted successfully</p>}

                </div>
        </div>
            
            <div className="albums-list">
                <h2 className="albums-title">Albums</h2>
                {albums.map(album => (
                    <button key={album.id} className="album-item" onClick={() => handleAlbumClick(album)}>
                        <img src={album.cover_url} alt={`${album.name} cover`} className="album-image" />
                        <p className="album-title">{album.name}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ArtistReviewPage; 