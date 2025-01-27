import { useState, useEffect } from 'react';

const ReviewBox = ({ onReviewChange, onRatingChange }) => {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [wordRecommendation, setWordRecommendation] = useState([]);

    useEffect(() => {
        onReviewChange(review);
        onRatingChange(rating);
    }, [review, rating, onReviewChange, onRatingChange]);

    const handleReviewChange = (e) => {
        setReview(e.target.value);
    };

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleMouseEnter = (newHoverRating) => {
        setHoverRating(newHoverRating);
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    return (
        <div className="review-box">
            <div className="star-rating">
                {[...Array(5)].map((_, index) => (
                    <span
                        key={index}
                        className={`star ${index < (hoverRating || rating) ? 'filled' : ''}`}
                        onClick={() => handleRatingChange(index + 1)}
                        onMouseEnter={() => handleMouseEnter(index + 1)}
                        onMouseLeave={handleMouseLeave}
                    >
                        ★
                    </span>
                ))}
                <span className="rating-display">{hoverRating || rating}</span>
            </div>
            <textarea
                className="review-textarea"
                placeholder="Write your review here..."
                value={review}
                onChange={handleReviewChange}
            />
        </div>
    );
};

export default ReviewBox; 