import { Link, useNavigate } from "react-router-dom";
import { trackAuthState, signOutUser } from '../controllers/auth';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ArtistResult from '../pages/SearchResults/ArtistResult';
import AlbumResult from '../pages/SearchResults/AlbumResult';
import TrackResult from '../pages/SearchResults/TrackResult';
import UserResult from '../pages/SearchResults/UserResult';
import { RxHamburgerMenu } from "react-icons/rx";

const Header = () => {
    const [user, setUser] = useState(null);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('users'); // Changed default filter to users
    const [focused, setFocused] = useState(false); // To track focus on the search bar
    const [results, setResults] = useState([]); // Add this new state
    const [loading, setLoading] = useState(false); // Loading state for API calls
    const [menuOpen, setMenuOpen] = useState(false); // State to track menu open/close
    const navigate = useNavigate();


  
    useEffect(() => {
      trackAuthState((currentUser) => {
        setUser(currentUser);
      });
    }, []);
  
    const handleSearchChange = async (e) => {
      const query = e.target.value;
      setSearch(query);
        
      if (query) {
        setLoading(true);
        try {
          if (filter === 'users') {
            const response = await axios.get(`http://localhost:3000/api/users/profile`, {
              params: { name: query }
            });
            setResults(response.data.slice(0, 3));
          } else {
            const endpoint = filter.slice(0, -1);
            const apiEndpoint = endpoint === 'song' ? 'track' : endpoint;
            const response = await axios.get(`http://localhost:3000/api/${apiEndpoint}s`, { 
              params: { query } 
            });
            setResults(response.data.slice(0, 5));
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
  
    const handleFilterChange = async (type) => {
      setFilter(type);
      
      if (search) {
        setLoading(true);
        try {
          let response;
          switch (type) {
            case 'users':
              response = await axios.get(`http://localhost:3000/api/users/profile`, {
                params: { name: search }
              });
              setResults(response.data.slice(0, 3));
              break;
            default:
              const endpoint = type.slice(0, -1);
              const apiEndpoint = endpoint === 'song' ? 'track' : endpoint;
              response = await axios.get(`http://localhost:3000/api/${apiEndpoint}s`, {
                params: { query: search }
              });
              setResults(response.data.slice(0, 5));
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
  

    const handleFocus = () => {
      setFocused(true);
    };
  
    const handleBlur = (e) => {
      // Check if the blur event happened outside the filter container
      if (!e.currentTarget.contains(e.relatedTarget)) {
        setFocused(false);
      }
    };

  
    const renderResults = () => {
      if (loading) {
        // Show a loading indicator if data is still being fetched
        return <div></div>;
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
  
    const handleResultClick = (item, type) => {
      setFocused(false);
      setSearch('');
      setResults([]);


      navigate(`/view/${type}/${item.id}`);
    };


    const handleUserResultClick = (item) => {
      console.log(item);
      setFocused(false);
      setSearch('');
      setResults([]);
      navigate(`/profile/others/${item.uid}`);
    };
  
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
                  <button onClick={signOutUser}>Sign Out</button>
                  
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
  