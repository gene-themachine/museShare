import { useNavigate } from 'react-router-dom';


const OneReview = ({ review, type }) => {
    const navigate = useNavigate();

    const handleReviewClick = (review, type) => {
        navigate(`/view-a-review/${type}s/${review._id}`);
    }
    
    return (
        <button id="review-result-item" className="review-button" onClick={() => handleReviewClick(review ,type)}>
            <div className="review-result-rating">
                {[...Array(5)].map((_, index) => (
                    <span key={index} className={`star ${index < review.rating ? 'filled' : ''}`}>★</span>
                ))}
            </div>

            <div className="review-result-info">
                <h3 className="review-result-title">{review.title}</h3>
                <p className="review-result-author">By: {review.username}</p>
            </div>
        </button>
    );
};

export default OneReview;