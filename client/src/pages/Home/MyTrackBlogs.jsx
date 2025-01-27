import AlbumHomeBlog from '../../components/AlbumHomeBlog';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { trackAuthState } from '../../controllers/auth';
import blogController from '../../controllers/blog';
import spotify from '../../controllers/spotify';

const MyTrackBlogs = () => {

    const [blogs, setBlogs] = useState([]);
    const [blogData, setBlogData] = useState([]);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async (currentUser) => {
            if (!currentUser) {
                setIsLoading(false);
                return;
            }
            try {
                if (currentUser.uid) {

                    const response = await blogController.getMyTracks(currentUser.uid);

                    const blogsData = response.data;

                    // Fetch photos for each blog and update blogData with photo URLs
                    const updatedBlogsData = await Promise.all(
                        blogsData.map(async (blog) => {
                            try {  

                                const photoResponse = await spotify.searchTrackById(blog.item_id);

                                if (!photoResponse) {
                                    throw new Error('No data received from track API');
                                }
                                return { 
                                    ...blog, 
                                    cover_url: photoResponse.cover_url, 
                                    artist: photoResponse.artist, 
                                    name: photoResponse.name, 
                                    release_date: photoResponse.release_date 
                                }; 
                            } catch (error) {
                                console.error(`Error fetching track data for ID ${blog.item_id}:`, error);
                                // Return blog with default/fallback values
                                return {
                                    ...blog,
                                    cover_url: null,
                                    artist: 'Unknown Artist',
                                    name: 'Unknown Track',
                                    release_date: null
                                };
                            }
                        })
                    );
                    setBlogData(updatedBlogsData);

                    setIsLoading(false);
            }
                

            } catch (error) {
                console.error('Error fetching blogs or photos:', error);
                setIsLoading(false);
            }
        };
        trackAuthState((currentUser) => {
            fetchBlogs(currentUser);
        });
    }, []);



    return (
        <div className="blogs-container">
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                
                blogData.map((blog, index) => (
                    <AlbumHomeBlog key={index} info={blog} />
                ))
            )}
        </div>
    );
};

export default MyTrackBlogs;