import { useState, useEffect } from 'react';
import axios from 'axios';

const TitleReview = ({ handleTitleChange }) => {
    const [inputValue, setInputValue] = useState('');
    const [words, setWords] = useState([]);
    const [results, setResults] = useState([]);
    



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
    )
}

export default TitleReview;    