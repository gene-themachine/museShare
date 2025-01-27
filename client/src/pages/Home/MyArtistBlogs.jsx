import ArtistHomeBlog from '../../components/ArtistHomeBlog';
import { useEffect, useState } from 'react';
import { trackAuthState } from '../../controllers/auth';
import blogController from '../../controllers/blog';
import spotify from '../../controllers/spotify';

const MyArtistBlogs = () => {
    const [blogData, setBlogData] = useState([]);
    const [blogInfo, setBlogInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async (currentUser) => {
            if (!currentUser) {
                setIsLoading(false);
                return;
            }
            try {
                if (currentUser.uid) {
                    const response = await blogController.getMyArtists(currentUser.uid);
                    const blogsData = response.data;

                    // Fetch photos for each blog and update blogData with photo URLs
                    const updatedBlogsData = await Promise.all(
                        blogsData.map(async (blog) => {
                            try {
                                const photoResponse = await spotify.searchArtistById(blog.item_id);
                                if (!photoResponse) {
                                    throw new Error('No data received from artist API');
                                }

                                return { 
                                    ...blog, 
                                    cover_url: photoResponse.image_url, 
                                    name: photoResponse.name, 
                                }; 
                            } catch (error) {
                                console.error(`Error fetching album data for ID ${blog.item_id}:`, error);
                                return {
                                    ...blog,
                                    cover_url: null,
                                    name: 'Unknown Artist',
                                };
                            }
                        })
                    );
                    console.log(updatedBlogsData);
                    setBlogInfo(updatedBlogsData);

                }
            } catch (error) {
                console.error('Error fetching blogs or photos:', error);
            } finally {
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
                blogInfo.map((blog, index) => (
                    <ArtistHomeBlog key={index} info={blog} />
                ))
            )}
        </div>
    );
};

export default MyArtistBlogs;