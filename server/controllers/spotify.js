// spotify.js
const spotifyRouter = require('express').Router();
const axios = require('axios');
const config = require('../utils/config');

// Function to get Spotify API Token using client credentials
const getSpotifyToken = async () => {
  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      'grant_type=client_credentials',
      {
        headers: {
          Authorization:
            'Basic ' +
            Buffer.from(`${config.SPOTIFY_CLIENT_ID}:${config.SPOTIFY_CLIENT_SECRET}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data.access_token; // Return the access token
  } catch (error) {
    console.error('Error fetching Spotify token:', error.message);
    return null; // Return null if token retrieval fails
  }
};

// Route to search for artists based on a query parameter
spotifyRouter.get('/artists', async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }
  try {
    const token = await getSpotifyToken();
    if (!token) {
      throw new Error('Failed to authenticate with Spotify');
    }

    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Limit the results to 8 artists
    const artists = response.data.artists.items.slice(0, 8).map((artist) => ({
      id: artist.id,
      name: artist.name,
      genres: artist.genres,
      followers: artist.followers.total,
      popularity: artist.popularity,
      image_url: artist.images[0]?.url || null,
    }));

    res.json(artists);
  } catch (error) {
    console.error('Error fetching artist data:', error.message);
    res.status(500).json({ error: 'Failed to fetch artist data' });
  }
});

// Route to search for albums based on a query parameter
spotifyRouter.get('/albums', async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }
  try {
    const token = await getSpotifyToken();
    if (!token) {
      throw new Error('Failed to authenticate with Spotify');
    }

    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Limit the results to 8 albums
    const albums = response.data.albums.items.slice(0, 8).map((album) => ({
      id: album.id,
      name: album.name,
      artist: album.artists[0].name,
      release_date: album.release_date,
      cover_url: album.images[0]?.url || null,
    }));

    res.json(albums);
  } catch (error) {
    console.error('Error fetching album data:', error.message);
    res.status(500).json({ error: 'Failed to fetch album data' });
  }
});

// Route to search for tracks based on a query parameter
spotifyRouter.get('/tracks', async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }
  try {
    const token = await getSpotifyToken();
    if (!token) {
      throw new Error('Failed to authenticate with Spotify');
    }

    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Limit the results to 8 tracks
    const tracks = response.data.tracks.items.slice(0, 8).map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      release_date: track.album.release_date,
      cover_url: track.album.images[0]?.url || null,
    }));

    res.json(tracks);
  } catch (error) {
    console.error('Error fetching track data:', error.message);
    res.status(500).json({ error: 'Failed to fetch track data' });
  }
});

// Route to get detailed information about an artist by ID
spotifyRouter.get('/artists/:id', async (req, res) => {

  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Artist ID is required' });
  }

  try {
    const token = await getSpotifyToken();

    if (!token) {
      throw new Error('Failed to authenticate with Spotify');
    }

    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Send the artist detail s as JSON
    res.json({
      id: response.data.id,
      name: response.data.name,
      genres: response.data.genres,
      followers: response.data.followers.total,
      popularity: response.data.popularity,
      image_url: response.data.images[0]?.url || null,
    });

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch artist details' });
  }
});

// Route to get detailed information about an album by ID
spotifyRouter.get('/albums/:id', async (req, res) => {
  const { id } = req.params;



  if (!id) {
    return res.status(400).json({ error: 'Album ID is required' });
  }

  try {
    const token = await getSpotifyToken();



    if (!token) {
      throw new Error('Failed to authenticate with Spotify');
    }


    const response = await axios.get(
      `https://api.spotify.com/v1/albums/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // Send the album details as JSON
    res.json({
      name: response.data.name,
      artist: response.data.artists[0].name,
      release_date: response.data.release_date,
      cover_url: response.data.images[0]?.url || null,
      total_tracks: response.data.total_tracks,
    });
  } catch (error) {
    console.error('Error fetching album details:', error.message);
    res.status(500).json({ error: 'Failed to fetch album details' });
  }
});

// Route to get detailed information about a track by ID
spotifyRouter.get('/tracks/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: 'Track ID is required' });
  }

  try {
    const token = await getSpotifyToken();
    if (!token) {
      throw new Error('Failed to authenticate with Spotify');
    }

    const response = await axios.get(
      `https://api.spotify.com/v1/tracks/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Send the track details as JSON
    res.json({
      id: response.data.id,
      name: response.data.name,
      artist: response.data.artists[0].name,
      album: response.data.album.name,
      release_date: response.data.album.release_date,
      cover_url: response.data.album.images[0]?.url,
      preview_url: response.data.preview_url,
    });

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch track details' });
  }
});

// Route to get all albums for a specific artist by ID
spotifyRouter.get('/artists/albums/:id', async (req, res) => {

  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: 'Artist ID is required' });
  }
  try {

    const token = await getSpotifyToken();
    if (!token) {
      throw new Error('Failed to authenticate with Spotify');
    }

    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${id}/albums`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Map the response to extract relevant album details
    const albums = response.data.items.map((album) => ({
      id: album.id,
      name: album.name,
      release_date: album.release_date,
      cover_url: album.images[0]?.url || null,
      total_tracks: album.total_tracks,
    }));

    res.json(albums); // Send the albums data as JSON
  } catch (error) {
    console.error(`Error fetching albums for artist ID ${id}:`, error.message);
    res.status(500).json({ error: "Failed to fetch artist's albums" });
  }
});

// Export the router to be used in the main server file
module.exports = spotifyRouter;