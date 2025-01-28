import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArtistResult from './SearchResults/ArtistResult';
import AlbumResult from './SearchResults/AlbumResult';
import TrackResult from './SearchResults/TrackResult';
import spotify from '../controllers/spotify';

const AddReviewPage = () => {
    const [activeButton, setActiveButton] = useState('artist');
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleButtonClick = async (buttonType) => {
        setActiveButton(buttonType);
        if (search) {
            setLoading(true);
            try {
                let response;
                if (buttonType === 'artist') {
                    response = await spotify.searchArtists(search);
                } else if (buttonType === 'album') {
                    response = await spotify.searchAlbums(search);
                } else if (buttonType === 'track') {
                    response = await spotify.searchTracks(search);
                }
                setResults(response);
            } catch (error) {
                console.error('Error fetching data:', error.message);
                setResults([]);
            } finally {
                setLoading(false);
            }
        } else {
            setResults([]);
        }
    };

    const handleSearchChange = async (ev) => {
        const query = ev.target.value;
        setSearch(query);

        if (query) {
            setLoading(true);
            try {
                let response;
                if (activeButton === 'artist') {
                    response = await spotify.searchArtists(query);
                } else if (activeButton === 'album') {
                    response = await spotify.searchAlbums(query);
                } else if (activeButton === 'track') {
                    response = await spotify.searchTracks(query);
                }
                setResults(response);

            } catch (error) {
                console.error('Error fetching data:', error.message);
            } finally {
                setLoading(false);
            }
        } else {
            setResults([]);
        }
    };

    const handleResultClick = (item, type) => {
        navigate(`/review/${item.id}?type=${type}`);
    };

    const renderResults = () => {
        switch (activeButton) {
            case 'artist':
                return results.map((item, index) => (
                    <ArtistResult key={index} item={item} onClick={() => handleResultClick(item, activeButton)} />
                ));
            case 'album':
                return results.map((item, index) => (
                    <AlbumResult key={index} item={item} onClick={() => handleResultClick(item, activeButton)} />
                ));
            case 'track':
            default:
                return results.map((item, index) => (
                    <TrackResult key={index} item={item} onClick={() => handleResultClick(item, activeButton)} />
                ));
        }
    };

    return (
        <div className="add-review-page">
            <div className="add-review-container">
                <h1>Add a Review</h1>
            </div>

            <div className="button-container">
                <button
                    className={`artist-button ${activeButton === 'artist' ? 'active' : ''}`}
                    onClick={() => handleButtonClick('artist')} 
                >
                    Artists
                </button>

                <button
                    className={`album-button ${activeButton === 'album' ? 'active' : ''}`}
                    onClick={() => handleButtonClick('album')}
                >
                    Albums
                </button>

                <button
                    className={`track-button ${activeButton === 'track' ? 'active' : ''}`}
                    onClick={() => handleButtonClick('track')}
                >
                    Songs
                </button>
            </div>

            <form className="searchbar">
                <input
                    type="text"
                    placeholder="search"
                    value={search}
                    onChange={handleSearchChange}
                    className="searchbar-input"
                />
            </form>
            {loading && <div>Loading...</div>}
            <div className="results-container">
                {renderResults()}
            </div>
        </div>
    );
};

export default AddReviewPage;