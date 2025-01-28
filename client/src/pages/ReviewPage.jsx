import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import AlbumReviewPage from './reviews/AlbumReviewPage'; // Import AlbumReviewPage
import ArtistReviewPage from './reviews/ArtistReviewPage'; // Import ArtistReviewPage
import TrackReviewPage from './reviews/TrackReviewPage';
import spotify from '../controllers/spotify';
const ReviewPage = () => {
    const { id } = useParams(); // Get the ID from the URL
    const location = useLocation();
    const [itemDetails, setItemDetails] = useState(null);
    const [error, setError] = useState(null); // State to track errors

    // Function to extract query parameters
    const getQueryParams = (query) => {
        return new URLSearchParams(query);
    };

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const queryParams = getQueryParams(location.search);
                const type = queryParams.get('type');
                let response; // Declare response variable

                switch (type) {
                    case 'album':
                        response = await spotify.searchAlbumById(id); // Assign response
                        break;
                    case 'artist':
                        response = await spotify.searchArtistById(id); // Assign response
                        break;
                    case 'track':
                        response = await spotify.searchTrackById(id); // Assign response
                        break;
                    default:
                        throw new Error('Invalid type'); // Handle unexpected types
                }

                setItemDetails(response);
            } catch (error) {
                console.error('Error fetching item details:', error.message);
                setError('Failed to load item details.'); // Set error message
            }
        };

        fetchItemDetails();
    },[]); 

    if (error) {
        return <div>{error}</div>; // Display error message if there's an error
    }

    if (!itemDetails) {
        return <div>Loading...</div>;
    }

    const queryParams = getQueryParams(location.search);
    const type = queryParams.get('type');

    return (
        <div className="review-page">
            {type === 'album' && <AlbumReviewPage itemDetails={itemDetails}/>}
            {type === 'artist' && <ArtistReviewPage itemDetails={itemDetails}/>}
            {type === 'track' && <TrackReviewPage itemDetails={itemDetails}/>}
        </div>
    );
};

export default ReviewPage; 