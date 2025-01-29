import TrackHomeBlog from '../../components/TrackHomeBlog';
import { useEffect, useState } from 'react';
import spotify from '../../controllers/spotify';
import blogController from '../../controllers/blog';

const RandomTrackBlogs = () => {
    const [blogData, setBlogData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await blogController.getRandomTracks();
                const blogsData = response;

                // Fetch photos for each blog and update blogData with photo URLs
                const updatedBlogsData = await Promise.all(
                    blogsData.map(async (blog) => {
                        const photoResponse = await spotify.searchTrackById(blog.item_id);
                        return { 
                            ...blog, 
                            cover_url: photoResponse.cover_url, 
                            artist: photoResponse.artist, 
                            name: photoResponse.name, 
                            release_date: photoResponse.release_date 
                        }; 
                    })
                );

                setBlogData(updatedBlogsData);
            } catch (error) {
                console.error('Error fetching blogs or photos:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div className="blogs-container">
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                blogData.map((blog, index) => (
                    <TrackHomeBlog key={index} info={blog} />
                ))
            )}
        </div>
    );
};

export default RandomTrackBlogs;