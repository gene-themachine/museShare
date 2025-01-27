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
                
                const response = await axios.get(`http://localhost:3000/api/${type}s/${id}`);
                setItemDetails(response.data);
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