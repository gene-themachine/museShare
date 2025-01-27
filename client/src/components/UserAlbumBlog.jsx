const UserAlbumBlog = ({ info }) => {
    return (
        <div className="user-blog-container">
            <div className="user-album-cover">
                <img className="user-home-blog-image" src={info.cover_url} alt={"cover"} />
                <div className="user-album-info-overlay">
                    <div className="user-home-blog-text">
                        <div className="user-home-blog-text-top">
                            <h2>{info.name}</h2>
                            <p className="user-home-blog-artist">{info.artist}</p>
                            <p>{info.release_date}</p>

                            <p>{info.title}</p>

                            <div className="user-star-rating">
                                {[...Array(5)].map((_, index) => (
                                    <span
                                        key={index}
                                        className="user-star"
                                        style={{ color: index < info.rating ? '#ffd700' : '#e4e5e9' }}
                                    >
                                        ★
                                    </span>
                                ))}

                            </div>

                        </div>
                        
                        <div className="user-home-blog-text-bottom">
                            


                            <div className="user-home-blog-star-rating">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );      
};

export default UserAlbumBlog;