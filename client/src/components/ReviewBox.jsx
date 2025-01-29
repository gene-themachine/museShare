import { useState, useEffect } from 'react';

const ReviewBox = ({ onReviewChange, onRatingChange }) => {
    // State variables
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    // Effect to handle review and rating changes
    useEffect(() => {
        onReviewChange(review);
        onRatingChange(rating);
    }, [review, rating, onReviewChange, onRatingChange]);

    // Handle review text change
    const handleReviewChange = (e) => {
        setReview(e.target.value);
    };

    // Handle rating change
    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    // Handle mouse enter for star rating
    const handleMouseEnter = (newHoverRating) => {
        setHoverRating(newHoverRating);
    };

    // Handle mouse leave for star rating
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