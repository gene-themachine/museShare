import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ViewAlbumReviews from './ViewReview/ViewAlbumReviews';
import ViewArtistReviews from './ViewReview/ViewArtistReviews';
import ViewTracksReviews from './ViewReview/ViewTracksReviews';


const ViewReviewPage = () => {
    const { id, type } = useParams(); // Get both ID and type from URL params
    const [itemDetails, setItemDetails] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                if (!type) {
                    setError('Invalid type parameter');
                    return;
                }
                
                let response;
                if (type === 'album') {
                    response = await spotify.searchAlbumById(id);
                } else if (type === 'artist') {
                    response = await spotify.searchArtistById(id);
                } else if (type === 'track') {
                    response = await spotify.searchTrackById(id);
                }
                setItemDetails(response);
            } catch (error) {
                console.error('Error fetching item details:', error.message);
                setError('Failed to load item details.');
            }
        };

        fetchItemDetails();
    }, [id, type]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!itemDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="review-page">
            {type === 'album' && <ViewAlbumReviews itemDetails={itemDetails}/>}
            {type === 'artist' && <ViewArtistReviews itemDetails={itemDetails}/>}
            {type === 'track' && <ViewTracksReviews itemDetails={itemDetails}/>}
        </div>
    );
};

export default ViewReviewPage; 