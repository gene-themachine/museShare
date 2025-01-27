import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const ArtistResult = ({ item, onClick }) => (
    
    <button className="result-item" onClick={onClick}>
        <img src={item.image_url} alt={`${item.name} cover`} className="result-image" />
        <div className="result-info">
            <p className="result-details">
                <span className="result-name">{item.name}</span> 
            </p>
        </div>
    </button>
);

export default ArtistResult; 