import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import blog from '../../controllers/blog';
import spotify from '../../controllers/spotify';
import users from '../../controllers/user';

const ViewSpecificAlbumReview = ({id}) => {

    const [album, setAlbum] = useState({});
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);
    const [blogInfo, setBlogInfo] = useState({});

    useEffect(() => {
        const fetchInfo = async (id) => {
            if (id) {
                try {
                    const response = await blog.getBlogById(id);


                    const albumData = response.data;
                    setBlogInfo(albumData);

                    try {
                        let temp = await users.viewOthersProfile(albumData.user);
                        setUser(temp);
                    }
                    catch (error) {
                        console.error('Error fetching user data:', error.message);
                        setError('Failed to load user data.');
                    }


                    try {
                        let temp = await spotify.searchAlbumById(albumData.item_id);
                        setAlbum(temp);

                    } catch (error) {
                        console.error('Error fetching album data:', error.message);
                        setError('Failed to load album data.');
                    }
                } catch (error) {
                    console.error('Error fetching blog data:', error.message);
                    setError('Failed to load album data.');
                }
            }
        };


        fetchInfo(id);
    }, [id]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="album-review">
            <div className="album-header" id="album-header">
                <div className="album-details">
                    <h1 className="album-name">{album.name}</h1>
                    <img
                        src={album.cover_url}
                        alt={`${album.name} cover`}
                        className="review-image"
                    />
                    <p>Artist: {album.artist}</p>
                    <p>Release Date: {new Date(album.release_date).toLocaleDateString()}</p>
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

export default ViewSpecificAlbumReview;