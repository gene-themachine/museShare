const ArtistHomeBlog = ({ info }) => {
    return (
        <div className="home-blog-container">
            <div className="album-cover">
                <img className="home-blog-image" src={info.cover_url} alt="cover" />
                
                <div className="album-info-overlay">
                    <div className="home-blog-text">
                        
                        <div className="home-blog-text-top">
                            <h2 className="home-blog-artist">{info.name}</h2>
                            
                            <div className="star-rating">
                                {[...Array(5)].map((_, index) => (
                                    <span
                                        key={index}
                                        className="star"
                                        style={{ color: index < info.rating ? '#ffd700' : '#e4e5e9' }}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                        </div>
                        
                        <div className="home-blog-text-bottom">
                            {info.title && (
                                <h2 className="home-blog-three-words">{info.title}</h2>
                            )}

                            <p>- {info.username}</p>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );      
};

export default ArtistHomeBlog;