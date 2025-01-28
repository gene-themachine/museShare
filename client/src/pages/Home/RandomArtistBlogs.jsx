import ArtistHomeBlog from '../../components/ArtistHomeBlog';
import axios from 'axios';
import { useEffect, useState } from 'react';
import blogController from '../../controllers/blog';
import spotify from '../../controllers/spotify';
const RandomArtistBlogs = () => {

    const [blogs, setBlogs] = useState([]);
    const [blogData, setBlogData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await blogController.getRandomArtists();
                const blogsData = response;

                setBlogs(blogsData);

                // Fetch additional data for each blog and update blogData
                const updatedBlogsData = await Promise.all(
                    blogsData.map(async (blog) => {


                        const artistResponse = await spotify.searchArtistById(blog.item_id);

                        return { 
                            ...blog, 
                            name: artistResponse.name, 
                            genres: artistResponse.genres, 
                            followers: artistResponse.followers,
                            cover_url: artistResponse.image_url
                        }; 
                    })
                );
                setBlogData(updatedBlogsData);

            } catch (error) {
                console.error('Error fetching blogs or artist data:', error);
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
                    <ArtistHomeBlog key={index} info={blog} />
                ))
            )}
        </div>
    );
};

export default RandomArtistBlogs;
