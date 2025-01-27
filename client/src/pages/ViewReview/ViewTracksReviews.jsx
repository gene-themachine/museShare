import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import OneReview from './OneReview';
import blogController from '../../controllers/blog';

const ViewTracksReviews = ({ itemDetails }) => {
    const { id } = useParams();

    const [starLoaded, setStarLoaded] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(null);
    const [selectedRating, setSelectedRating] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await blogController.getBlogsByTrack(id);
                setReviews(response.data);
                if (response.data.length > 0) {
                    let totalRating = 0;
                    response.data.forEach(review => {
                        totalRating += review.rating;
                    });
                    const averageRating = response.data.length ? totalRating / response.data.length : 0;
                    setRating(averageRating);
                    setStarLoaded(true);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error.message);
            }
        };

        fetchReviews();
    }, [id]);

    const handleFilterClick = (star) => {
        setSelectedRating(star);
    };

    const filteredReviews = selectedRating
        ? reviews.filter(review => review.rating === selectedRating)
        : reviews;

    if (!itemDetails) return <div>Loading...</div>;

    return (
        <div className="track-view">
            <div className="track-header">
                <div className="track-details">
                    <h1>{itemDetails.name}</h1>
                    <img
                        src={itemDetails.cover_url}
                        alt={`${itemDetails.name} cover`}
                        className="review-image"
                    />
                    <p>Artist: {itemDetails.artist}</p>
                    <p>Album: {itemDetails.album}</p>
                </div>
                <div className="view-reviews">
                    <h1 className="absolute-reviews">Reviews</h1>
                    {starLoaded ? (
                        <div className="star-rating">
                            <span className="average-rating-stars-text">Average Rating: {rating} ★</span>
                        </div>
                    ) : (
                        <div>{reviews.length === 0 && <div>No reviews yet</div>}</div>
                    )}
                    <div className="review-divider"></div>

                    <div id="review-filter-option-title">Filter by rating</div>
                    <div className="review-filter-option">
                        {[5, 4, 3, 2, 1].map(star => (
                            <div
                                key={star}
                                className={`substars ${selectedRating === star ? 'selected' : ''}`}
                                onClick={() => handleFilterClick(star)}
                            >
                                {star}★
                            </div>
                        ))}
                    </div>
                    
                    <div className="review-divider"></div>

                    <div id="reviews-container">
                        {filteredReviews.map((review, index) => (
                            <OneReview key={index} review={review} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewTracksReviews;
