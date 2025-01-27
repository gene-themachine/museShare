import ReviewBox from '../../components/ReviewBox';
import TitleReview from '../../components/TitleReview';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { trackAuthState } from '../../controllers/auth';
import userController from '../../controllers/user';


const TrackReviewPage = ({ itemDetails }) => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');

    useEffect(() => {
        trackAuthState( async (currentUser) => {
            setUser(currentUser);
            const userInfo = await userController.viewOthersProfile(currentUser.uid);

            setUsername(userInfo.username);
        });
    }, []);

    const handleTitleChange = (newTitle) => {
        setTitle(newTitle);
    };
    const handleReviewChange = (newReview) => {
        setReview(newReview);
    };
    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };


    const handleBlogSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/blogs', {
                title: title,
                description: review,
                type: 'track',
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
        <div className="track-review">
            <div className="track-header">
                <div className="track-details">
                    <h1>{itemDetails.name}</h1>
                    <p>Artist: {itemDetails.artist}</p>
                    <img src={itemDetails.cover_url} alt={`${itemDetails.name} cover`} className="review-image" />
                    <p>Album: {itemDetails.album}</p>
                    <p>Release Date: {new Date(itemDetails.release_date).toLocaleDateString()}</p>
                </div>
                <div className="track-review-box-tracks">
                    <h1>Add a Review</h1>
                    <h3>Summarize your review in a few words</h3> 
                    <TitleReview handleTitleChange={handleTitleChange} />
                    <ReviewBox onReviewChange={handleReviewChange} onRatingChange={handleRatingChange} />
                    <button className="submit-button" onClick={handleBlogSubmit}>Submit</button>  
                    {isSubmitted && <p>Blog submitted successfully</p>}
                </div>
            </div>
        </div>
    );
};

export default TrackReviewPage;
