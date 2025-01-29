import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { trackAuthState } from '../controllers/auth';
import UserAlbumBlog from '../components/UserAlbumBlog';
import UserArtistBlog from '../components/UserArtistBlog';
import blogController from '../controllers/blog';
import spotify from '../controllers/spotify';
import UserTrackBlog from '../components/UserTrackBlog';
import userController from '../controllers/user';

const UserPage = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [albumBlogs, setAlbumBlogs] = useState([]);
    const [artistBlogs, setArtistBlogs] = useState([]);
    const [trackBlogs, setTrackBlogs] = useState([]);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        trackAuthState((currentUser) => {
            if (currentUser) {
                fetchUserProfile(id, currentUser);
                setUser(currentUser);
                fetchUserAlbumBlogs(id, currentUser);
                fetchUserArtistBlogs(id, currentUser);
                fetchUserTrackBlogs(id, currentUser);
            }
        });
    }, [id]);

    const fetchUserProfile = async (id, currentUser) => {
        try {
            const response = await userController.viewOthersProfile(currentUser.uid);
            if (response && response.name) {
                setUserInfo(response);
            } else {
                console.error('Invalid response received:', response);
                setUserInfo(null); 
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
            setUserInfo(null); 
        }
    };

    const fetchUserTrackBlogs = async (id, currentUser) => {
        try {
            const response = await blogController.getMyTracks(currentUser.uid);
            const blogsData = response.data;

            const updatedBlogsData = await Promise.all(
                blogsData.map(async (blog) => {
                    try {
                        const trackResponse = await spotify.searchTrackById(blog.item_id);
                        if (!trackResponse) {
                            throw new Error('No data received from track API');
                        }
                        return { 
                            ...blog, 
                            name: trackResponse.name, 
                            artist: trackResponse.artist, 
                            album: trackResponse.album, 
                            cover_url: trackResponse.cover_url 
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

    const fetchUserAlbumBlogs = async (id, currentUser) => {
        try {
            const response = await blogController.getMyAlbums(currentUser.uid);
            const blogsData = response.data;

            const updatedBlogsData = await Promise.all(
                blogsData.map(async (blog) => {
                    try {
                        const photoResponse = await spotify.searchAlbumById(blog.item_id);
                        if (!photoResponse) {
                            throw new Error('No data received from album API');
                        }
                        return { 
                            ...blog, 
                            cover_url: photoResponse.cover_url, 
                            artist: photoResponse.artist, 
                            name: photoResponse.name, 
                            release_date: photoResponse.release_date 
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

    const fetchUserArtistBlogs = async (id, currentUser) => {
        try {
            const response = await blogController.getMyArtists(currentUser.uid);
            const blogsData = response.data;

            const updatedBlogsData = await Promise.all(
                blogsData.map(async (blog) => {
                    try {
                        const artistResponse = await spotify.searchArtistById(blog.item_id);
                        if (!artistResponse) {
                            throw new Error('No data received from artist API');
                        }
                        return { 
                            ...blog, 
                            name: artistResponse.name, 
                            genre: artistResponse.genres, 
                            cover_url: artistResponse.image_url 
                        }; 
                    } catch (error) {
                        console.error(`Error fetching artist data for ID ${blog.artist_id}:`, error);
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
                <img src='https://cdn-icons-png.freepik.com/512/12236/12236621.png?ga=GA1.1.2140913239.1738111894' alt="profile-picture" className="user-profile-picture" />
                <h2 id="user-name">{userInfo.name}</h2>
                <p>- {userInfo.username}</p>
            </div>

            <div className="blogs-title-container">
                <h2 className="blogs-title">{userInfo.name}'s Music</h2>
                <p className="blogs-title-subheaders">Albums</p>

                {albumBlogs.length > 0 && (
                    <div className="blogs-title-subheaders-container">
                        <div className="user-blogs-container">
                            {albumBlogs.map((blog, index) => (
                                <UserAlbumBlog key={index} info={blog} />
                            ))}
                        </div>
                    </div>
                )}

                {artistBlogs.length > 0 && (
                    <div className="blogs-title-subheaders-container">
                        <p className="blogs-title-subheaders">Artists</p>
                        <div className="user-blogs-container">
                            {artistBlogs.map((blog, index) => (
                                <UserArtistBlog key={index} info={blog} />
                            ))}
                        </div>
                    </div>
                )}

                {trackBlogs.length > 0 && (
                    <div className="blogs-title-subheaders-container">
                        <p className="blogs-title-subheaders">Songs</p>
                        <div className="user-blogs-container">
                            {trackBlogs.map((blog, index) => (
                                <UserTrackBlog key={index} info={blog} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserPage;