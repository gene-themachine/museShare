import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { trackAuthState } from '../controllers/auth';
import UserAlbumBlog from '../components/UserAlbumBlog';
import UserArtistBlog from '../components/UserArtistBlog';


import userController from '../controllers/user';
import blogController from '../controllers/blog';
import spotify from '../controllers/spotify';
import UserTrackBlog from '../components/UserTrackBlog';
const OthersProfilePage = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [albumBlogs, setAlbumBlogs] = useState([]);
    const [artistBlogs, setArtistBlogs] = useState([]);
    const [trackBlogs, setTrackBlogs] = useState([]);


    useEffect(() => {
        const fetchUserData = async () => {
            try {

                const userData = await userController.viewOthersProfile(id);

                setUser(userData);
                fetchUserAlbumBlogs(id);
                fetchUserArtistBlogs(id);
                fetchUserTrackBlogs(id);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [id]);




    const fetchUserAlbumBlogs = async (id) => {
        try {
            let temp = await blogController.getMyAlbums(id);
            const blogsData = temp.data;
           

            const updatedBlogsData = await Promise.all(

                blogsData.map(async (blog) => {
                    try {
                        const albumData = await spotify.searchAlbumById(blog.item_id);

                        return { 

                            ...blog, 
                            cover_url: albumData.cover_url, 
                            artist: albumData.artist, 
                            name: albumData.name, 
                            release_date: albumData.release_date 
                        }; 
                    } catch (error) {
                        console.error(`Error fetching album data for ID ${blog.item_id}:`, error);
                        return {
                            ...blog,
                            cover_url: null,
                            artist: 'Unknown Artist',
                            name: 'Unknown Album',
                            release_date: null
                        };
                    }
                })
            );
            setAlbumBlogs(updatedBlogsData);
        } catch (error) {
            console.error('Error fetching user blogs:', error);
        }
    };

    const fetchUserTrackBlogs = async (id) => {
        try {
            let temp = await blogController.getMyTracks(id);
            const blogsData = temp.data;

            const updatedBlogsData = await Promise.all(
                blogsData.map(async (blog) => {
                    try {
                        const trackData = await spotify.searchTrackById(blog.item_id);
                        return { 
                            ...blog, 
                            name: trackData.name, 
                            artist: trackData.artist, 
                            album: trackData.album, 
                            cover_url: trackData.cover_url
                        }; 
                    } catch (error) {
                        console.error(`Error fetching track data for ID ${blog.item_id}:`, error);
                        return {
                            ...blog,
                            name: 'Unknown Track',
                            artist: 'Unknown Artist',
                            album: 'Unknown Album',
                            cover_url: null
                        };
                    }
                })
            );
            setTrackBlogs(updatedBlogsData);
        } catch (error) {
            console.error('Error fetching user track blogs:', error);
        }
    };

    const fetchUserArtistBlogs = async (id) => {
        try {
            let temp = await blogController.getMyArtists(id);
            const blogsData = temp.data;

            const updatedBlogsData = await Promise.all(
                blogsData.map(async (blog) => {
                    try {
                        const artistData = await spotify.searchArtistById(blog.item_id);
                        return { 
                            ...blog, 
                            name: artistData.name, 
                            genre: artistData.genres, 
                            cover_url: artistData.image_url
                        }; 
                    } catch (error) {
                        console.error(`Error fetching artist data for ID ${blog.item_id}:`, error);
                        return {
                            ...blog,
                            artist_name: 'Unknown Artist',
                            genre: 'Unknown Genre',
                            bio: 'No bio available.'
                        };
                    }
                })
            );
            setArtistBlogs(updatedBlogsData);
        } catch (error) {
            console.error('Error fetching user artist blogs:', error);
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-page">
            <div className="user-info">
                <img src={user.profilePicture || '../../user.png'} alt="profile-picture" className="user-profile-picture" />
                <h2 id="user-name">{user.name}</h2>
                <p>Genre: {user.genre || 'Unknown Genre'}</p>
                <p>About: {user.description || 'No description available.'}</p>
            </div>

            <div className="blogs-title-container">
                <h2 className="blogs-title">{user.name}'s music</h2>
                <h2 className="blogs-title-subheaders">Albums</h2>

                {albumBlogs.length > 0 && (
                    <>
                    <div className="user-blogs-container">
                        {albumBlogs.map((blog, index) => (
                            <UserAlbumBlog key={index} info={blog} />
                        ))}
                    </div>
                    </>
                )}

                {artistBlogs.length > 0 && (
                    <>
                    <h2 className="blogs-title-subheaders">Artists</h2>
                    <div className="user-blogs-container">
                        {artistBlogs.map((blog, index) => (
                            <UserArtistBlog key={index} info={blog} />
                        ))}
                    </div>
                    </>
                )}

                {trackBlogs.length > 0 && (
                    <>
                    <h2 className="blogs-title-subheaders">Tracks</h2>
                    <div className="user-blogs-container">
                        {trackBlogs.map((blog, index) => (
                            <UserTrackBlog key={index} info={blog} />
                        ))}
                    </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default OthersProfilePage;