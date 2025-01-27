import { useState, useEffect } from 'react';
import TitleReview from '../../components/TitleReview';
import ReviewBox from '../../components/ReviewBox';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { trackAuthState } from '../../controllers/auth';
import userController from '../../controllers/user';


const AlbumReviewPage = ({ itemDetails }) => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [user, setUser] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [itemDetailsCopy, setItemDetailsCopy] = useState(itemDetails);
    const [username, setUsername] = useState('');


    useEffect(() => {
        trackAuthState(async (currentUser) => {
            setUser(currentUser);


            if (currentUser) {
                const userInfo = await userController.viewOthersProfile(currentUser.uid);
                setUsername(userInfo.username);

            }
        });
    }, []);

    useEffect(() => {

        const fetchAlbumData = async () => {
            try {                    
                const response = await axios.get(`http://localhost:3000/api/albums/${id}`);
                setItemDetailsCopy(response.data);
            } catch (error) {
                console.error('Error fetching album data:', error.message);
            }
        };

        fetchAlbumData();

        
    }, [id, itemDetails.total_tracks, user]);


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
                type: 'album',
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
        <div className="album-review">
            <div className="album-header">
                <div className="album-details">
                    <h1 className="album-name">{itemDetailsCopy.name}</h1>
                    <img
                        src={itemDetailsCopy.cover_url}
                        alt={`${itemDetailsCopy.name} cover`}
                        className="review-image"
                    />
                    <p>Artist: {itemDetailsCopy.artist}</p>
                    <p>Release Date: {new Date(itemDetailsCopy.release_date).toLocaleDateString()}</p>
                </div>

                <div className="track-review-box-album">
                    <h1>Add a Review</h1>
                    <h3>Summarize your review in a few words</h3>
                    <TitleReview handleTitleChange={handleTitleChange} />
                    <ReviewBox onReviewChange={handleReviewChange} onRatingChange={handleRatingChange} />

                    <button className="submit-button" onClick={handleBlogSubmit}>Submit</button>  
                    {isSubmitted && <p>Blog submitted successfully</p>}
                </div>
            </div>
            {/* Add more album-specific details here */}
        </div>
    );
};

export default AlbumReviewPage;
