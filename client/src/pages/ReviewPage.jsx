import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import AlbumReviewPage from './reviews/AlbumReviewPage';
import ArtistReviewPage from './reviews/ArtistReviewPage';
import TrackReviewPage from './reviews/TrackReviewPage';
import spotify from '../controllers/spotify';

const ReviewPage = () => {
    const { id } = useParams();
    const location = useLocation();
    const [itemDetails, setItemDetails] = useState(null);
    const [error, setError] = useState(null);

    // Function to extract query parameters
    const getQueryParams = (query) => {
        return new URLSearchParams(query);
    };

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const queryParams = getQueryParams(location.search);
                const type = queryParams.get('type');
                
                let response;

                switch (type) {
                    case 'album':
                        response = await spotify.searchAlbumById(id);
                        break;
                    case 'artist':
                        response = await spotify.searchArtistById(id);
                        break;
                    case 'track':
                        response = await spotify.searchTrackById(id);
                        break;
                    default:
                        throw new Error('Invalid type');
                }

                setItemDetails(response);
            } catch (error) {
                console.error('Error fetching item details:', error.message);
                setError('Failed to load item details.');
            }
        };

        fetchItemDetails();
    }, [id, location.search]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!itemDetails) {
        return <div>Loading...</div>;
    }

    const queryParams = getQueryParams(location.search);
    const type = queryParams.get('type');

    return (
        <div className="review-page">
            {type === 'album' && <AlbumReviewPage itemDetails={itemDetails} />}
            {type === 'artist' && <ArtistReviewPage itemDetails={itemDetails} />}
            {type === 'track' && <TrackReviewPage itemDetails={itemDetails} />}
        </div>
    );
};

export default ReviewPage; 