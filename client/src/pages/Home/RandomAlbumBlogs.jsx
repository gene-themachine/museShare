import AlbumHomeBlog from '../../components/AlbumHomeBlog';
import axios from 'axios';
import { useEffect, useState } from 'react';

const RandomAlbumBlogs = () => {

    const [blogs, setBlogs] = useState([]);
    const [blogData, setBlogData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/blogs/random/album');
                const blogsData = response.data;
                setBlogs(blogsData);
                
                // Fetch photos for each blog and update blogData with photo URLs
                const updatedBlogsData = await Promise.all(
                    blogsData.map(async (blog) => {

                        const photoResponse = await axios.get(`http://localhost:3000/api/albums/${blog.item_id}`)
                        ;
                        const coverUrl = photoResponse.data.cover_url;
                        return { 
                            ...blog, 
                            cover_url: coverUrl, 
                            artist: photoResponse.data.artist, 
                            name: photoResponse.data.name, 
                            release_date: photoResponse.data.release_date 
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
                    <AlbumHomeBlog key={index} info={blog} />
                ))
            )}
        </div>
    );
};

export default RandomAlbumBlogs;