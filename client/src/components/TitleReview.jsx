import { useState } from 'react';

const TitleReview = ({ handleTitleChange }) => {
    // State variables
    const [inputValue, setInputValue] = useState('');

    // Handle input change and enforce word limit
    const handleInputChange = async (event) => {
        const value = event.target.value;
        const wordCount = value.trim().split(/\s+/).length;
        
        if (wordCount <= 15) {
            setInputValue(value);
            handleTitleChange(value);
        }
    };

    return (
        <div className="input-container">
            <textarea
                className="threewords-review-input"
                placeholder="Summarize your review"
                value={inputValue}
                onChange={handleInputChange}
                rows={1}
                style={{ resize: 'none', overflow: 'hidden' }}
                onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = `${e.target.scrollHeight}px`;
                }}
            />
        </div>
    );
};

export default TitleReview;    