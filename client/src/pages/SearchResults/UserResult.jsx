import React from 'react';

const UserResult = ({ item, onClick }) => (
    <button className="result-item" onClick={onClick}>
        <div className="result-info">
            <p className="result-details">
                <span className="result-name">{item.name}</span>
            </p>
        </div>
    </button>
);

export default UserResult;
