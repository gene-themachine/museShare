import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import OneReview from './OneReview';
import blogController from '../../controllers/blog';
import { useNavigate } from 'react-router-dom';

const ViewAlbumReviews = ({ itemDetails }) => {
    const { id } = useParams();

    const [starLoaded, setStarLoaded] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(null);
    const [selectedRating, setSelectedRating] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await blogController.getBlogsByAlbum(id);
                setReviews(response.data);
                if (response.data.length > 0) {
                    // Calculate the average rating
                    const totalRating = response.data.reduce((acc, review) => acc + review.rating, 0);
                    const averageRating = totalRating / response.data.length;
                    setRating(averageRating);
                    setStarLoaded(true);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error.message);
            }
        };

        fetchReviews();
    }, [id]);

    const handleFilterClick = (rating) => {
        setSelectedRating(rating);
    };

    const filteredReviews = selectedRating
        ? reviews.filter(review => review.rating === selectedRating)
        : reviews;

    const handleReviewClick = (review) => {
        navigate(`/view-a-review/${review.id}`);
    };

    return (
        <div className="album-review">
            <div className="album-header" id="album-header">
                <div className="album-details">
                    <h1 className="album-name">{itemDetails.name}</h1>
                    <img
                        src={itemDetails.cover_url}
                        alt={`${itemDetails.name} cover`}
                        className="review-image"
                    />
                    <p>Artist: {itemDetails.artist}</p>
                    <p>Release Date: {new Date(itemDetails.release_date).toLocaleDateString()}</p>
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
                            <OneReview key={index} review={review} type="album" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewAlbumReviews;    