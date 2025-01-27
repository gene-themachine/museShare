import React from 'react';

const AlbumResult = ({ item, onClick }) => (
    <button className="result-item" onClick={onClick}>
        <img src={item.cover_url} alt={`${item.name} cover`} className="result-image" />
        <div className="result-info">
            <p className="result-details">
                <span className="result-name">{item.name}</span> by <span className="result-artist">{item.artist}</span>
            </p>
        </div>
    </button>
);

export default AlbumResult; 