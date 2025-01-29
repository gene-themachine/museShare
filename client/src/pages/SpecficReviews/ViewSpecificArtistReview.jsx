import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import blog from '../../controllers/blog';
import spotify from '../../controllers/spotify';
import users from '../../controllers/user';

const ViewSpecificArtistReview = ({ id }) => {
    const [artist, setArtist] = useState({});
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);
    const [blogInfo, setBlogInfo] = useState({});



    useEffect(() => {
        const fetchInfo = async (id) => {
            if (id) {
                try {
                    const response = await blog.getBlogById(id);
                    const artistData = response.data;
                    setBlogInfo(artistData);

                    try {
                        let temp = await users.viewOthersProfile(artistData.user);
                        setUser(temp);
                    } catch (error) {
                        console.error('Error fetching user data:', error.message);
                        setError('Failed to load user data.');
                    }

                    try {
                        let temp = await spotify.searchArtistById(artistData.item_id);
                        setArtist(temp);
                    } catch (error) {
                        console.error('Error fetching artist data:', error.message);
                        setError('Failed to load artist data.');
                    }
                } catch (error) {
                    console.error('Error fetching blog data:', error.message);
                    setError('Failed to load artist data.');
                }
            }
        };

        fetchInfo(id);
    }, [id]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="artist-review">
            <div className="artist-header">
                <div className="artist-details">
                    <h1 className="artist-name">{artist.name}</h1>
                    <img
                        src={artist.image_url}
                        alt={`${artist.name} cover`}
                        className="review-image"
                    />
                    <p>Genres: {artist.genres?.join(', ')}</p>
                    <p>Followers: {artist.followers?.toLocaleString()}</p>
                </div>
                <div className="view-specific-reviews">
                    <div className="review-specific-content">
                        <h2 className="review-specific-title">{blogInfo.title}</h2>
                        <p className="review-specific-description">{blogInfo.description}</p>
                    </div>
                    <div className="review-user">
                        <p className="review-user-username">{user.username}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewSpecificArtistReview;