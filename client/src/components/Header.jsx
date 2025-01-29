import { Link, useNavigate } from "react-router-dom";
import { trackAuthState, signOutUser } from '../controllers/auth';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ArtistResult from '../pages/SearchResults/ArtistResult';
import AlbumResult from '../pages/SearchResults/AlbumResult';
import TrackResult from '../pages/SearchResults/TrackResult';
import UserResult from '../pages/SearchResults/UserResult';
import { RxHamburgerMenu } from "react-icons/rx";
import spotifyRouter from '../controllers/spotify';
import userRouter from '../controllers/user';
import userController from '../controllers/user';
import spotifyController from '../controllers/spotify';


const Header = () => {
    // State variables
    const [user, setUser] = useState(null);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('users'); // Default filter
    const [focused, setFocused] = useState(false); // Track focus on search bar
    const [results, setResults] = useState([]); // Search results
    const [loading, setLoading] = useState(false); // Loading state
    const [menuOpen, setMenuOpen] = useState(false); // Menu open/close state

    const navigate = useNavigate();

    // Track authentication state
    useEffect(() => {
        trackAuthState((currentUser) => {
            setUser(currentUser);

        });
        
    }, []);

    // Reload the page once when the component mounts


    // Fetch search results based on the selected API endpoint
    const fetchSearchResults = async (query, apiEndpoint) => {
        let response;
        switch (apiEndpoint) {
            case 'track':
                response = await spotifyController.searchTracks(query);
                break;
            case 'album':
                response = await spotifyController.searchAlbums(query);
                break;
            case 'artist':
                response = await spotifyController.searchArtists(query);
                break;
            default:
                throw new Error('Invalid API endpoint');
        }
        return response;
    };

    // Handle search input changes
    const handleSearchChange = async (e) => {
        const query = e.target.value;
        setSearch(query);
        
        if (query) {
            setLoading(true);
            try {
                if (filter === 'users') {
                    const response = await userController.searchUsers(query);
                    setResults(response.slice(0, 3));
                } else {
                    const endpoint = filter.slice(0, -1);
                    const apiEndpoint = endpoint === 'song' ? 'track' : endpoint;
                    const response = await fetchSearchResults(query, apiEndpoint);
                    setResults(response.slice(0, 5));
                }
            } catch (error) {
                console.error('Error fetching search results:', error);
                setResults([]);
            } finally {
                setLoading(false);
            }
        } else {
            setResults([]);
        }
    };

    // Handle filter changes
    const handleFilterChange = async (type) => {
        setFilter(type);
        
        if (search) {
            setLoading(true);
            try {
                let response;
                switch (type) {
                    case 'users':
                        response = await userController.searchUsers(search);
                        setResults(response.slice(0, 3));
                        break;
                    default:
                        const endpoint = type.slice(0, -1);
                        const apiEndpoint = endpoint === 'song' ? 'track' : endpoint;
                        response = await fetchSearchResults(search, apiEndpoint);
                        setResults(response.slice(0, 5));
                }
            } catch (error) {
                setResults([]);
            } finally {
                setLoading(false);
            }
        } else {
            setResults([]);
        }
    };

    // Handle focus and blur events on the search bar
    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setFocused(false);
        }
    };

    // Render search results based on the selected filter
    const renderResults = () => {
        if (loading) {
            return <div>Loading...</div>; // Show loading indicator
        }

        if (!results.length) return null;

        switch (filter) {
            case 'users':
                return results.map((item, index) => (
                    <UserResult key={index} item={item} onClick={() => handleUserResultClick(item)} />
                ));
            case 'artists':
                return results.map((item, index) => (
                    <ArtistResult key={index} item={item} onClick={() => handleResultClick(item, 'artist')} />
                ));
            case 'albums':
                return results.map((item, index) => (
                    <AlbumResult key={index} item={item} onClick={() => handleResultClick(item, 'album')} />
                ));
            case 'songs':
            default:
                return results.map((item, index) => (
                    <TrackResult key={index} item={item} onClick={() => handleResultClick(item, 'track')} />
                ));
        }
    };

    // Handle result clicks
    const handleResultClick = (item, type) => {
        setFocused(false);
        setSearch('');
        setResults([]);
        navigate(`/view/${type}/${item.id}`);
    };

    const handleUserResultClick = (item) => {
        setFocused(false);
        setSearch('');
        setResults([]);
        navigate(`/profile/others/${item.uid}`);
        closeMenu();
    };

    // Menu toggle functions
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const viewUserProfile = () => {
        if (user && user.uid) {
            navigate(`/profile/${user.uid}`);
        }
    };

    const handleSignOut = async () => {
        await signOutUser();
        closeMenu();
        setUser(null);
    };

    return (
        <header>
            <div className="logo-container">
                <Link to="/" id="logo">MuseShare</Link>
            </div>

            <div
                className="search-bar-container"
                onBlur={handleBlur}
                tabIndex={-1}
            >
                <div className="search-bar">
                    <input
                        type="text"
                        className="search-input"
                        placeholder={`Search ${filter}`}
                        value={search}
                        onChange={handleSearchChange}
                        onFocus={handleFocus}
                    />
                    {search && (
                        <button className="clear-button" onClick={() => setSearch('')}>✕</button>
                    )}
                </div>
                {focused && search && (
                    <div className="search-dropdown">
                        <div className="filters">
                            <button
                                className={`filter-button ${filter === 'users' ? 'active' : ''}`}
                                onClick={() => handleFilterChange('users')}
                            >
                                Users
                            </button>
                            <button
                                className={`filter-button ${filter === 'artists' ? 'active' : ''}`}
                                onClick={() => handleFilterChange('artists')}
                            >
                                Artists
                            </button>
                            <button
                                className={`filter-button ${filter === 'albums' ? 'active' : ''}`}
                                onClick={() => handleFilterChange('albums')}
                            >
                                Albums
                            </button>
                            <button
                                className={`filter-button ${filter === 'songs' ? 'active' : ''}`}
                                onClick={() => handleFilterChange('songs')}
                            >
                                Songs
                            </button>
                        </div>
                        <div className="search-results">
                            {renderResults()}
                        </div>
                    </div>
                )}
            </div>
            <nav>
                {user ? (
                    <div 
                        className="header-container" 
                        onMouseLeave={closeMenu}
                    >
                        <button id="hamburger" className="auth" onClick={toggleMenu}>
                            <RxHamburgerMenu />
                        </button>
                        {menuOpen && (
                            <div className="dropdown-menu">
                                <button onClick={viewUserProfile}>Profile</button>
                                <button onClick={handleSignOut}>Sign Out</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <Link id="login-button" to="/login">Login</Link>
                        <Link id="register-button" to="/register">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
  