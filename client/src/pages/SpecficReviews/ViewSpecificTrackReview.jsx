import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import blog from '../../controllers/blog';
import spotify from '../../controllers/spotify';
import users from '../../controllers/user';
import youtube from '../../controllers/youtube';

const ViewSpecificTrackReview = ({ id }) => {
    const [track, setTrack] = useState({});
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);
    const [blogInfo, setBlogInfo] = useState({});
    const [url, setUrl] = useState('https://www.youtube.com/embed/');

    useEffect(() => {
        const fetchInfo = async (id) => {
            if (id) {
                try {
                    const response = await blog.getBlogById(id);
                    const trackData = response.data;
                    
                    setBlogInfo(trackData);


                    try {
                        let temp = await users.viewOthersProfile(trackData.user);
                        setUser(temp);
                    } catch (error) {
                        console.error('Error fetching user data:', error.message);
                        setError('Failed to load user data.');
                    }
                    

                    try {
                        let temp = await spotify.searchTrackById(trackData.item_id);
                        setTrack(temp);

                    } catch (error) {
                        console.error('Error fetching track data:', error.message);
                        setError('Failed to load track data.');
                    }

                    try {
                        if(track.name && track.artist){
                            const videoResponse = await youtube.searchYoutube(track.name + " " + track.artist);
                            let tempUrl = "https://www.youtube.com/embed/" + videoResponse.id;
                            setUrl(tempUrl);
                        }

                    } catch (error) {
                        console.error('Error fetching youtube data:', error.message);
                        setError('Failed to load youtube data.');
                    }

                } catch (error) {
                    console.error('Error fetching blog data:', error.message);
                    setError('Failed to load track data.');
                }
            }
        };

        fetchInfo(id);
    }, [id]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="track-review">
            <div className="track-header">
                <div className="track-details">
                    <h1 className="track-name">{track.name}</h1>
                    <img
                        src={track.cover_url}
                        alt={`${track.name} cover`}
                        className="review-image"
                    />
                    <p>Artist: {track.artist}</p>
                    <p>Album: {track.album}</p>
                    <div className="youtube-video">
                        <iframe title="youtube detail" className="youtube-iframe" src={url} />
                    </div>
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

export default ViewSpecificTrackReview;