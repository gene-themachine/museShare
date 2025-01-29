const UserArtistBlog = ({ info }) => {
    return (
        <div className="user-blog-container">
            <div className="user-album-cover">
                <img className="user-home-blog-image" src={info.cover_url} alt="cover" />
                <div className="user-album-info-overlay">
                    <div className="user-home-blog-text">
                        <div className="user-home-blog-text-top">
                            <h2 className="home-blog-artist">{info.name}</h2>
                            <p>{info.genre.join(', ')}</p>
                            <p className="user-home-blog-title">{info.title}</p>

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
                            <p>{info.title}</p>
                            <p>- {info.username}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );      
};

export default UserArtistBlog;