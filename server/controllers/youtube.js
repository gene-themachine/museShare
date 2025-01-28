const youtubeRouter = require('express').Router();
const axios = require('axios');
const config = require('../utils/config');

// Function to get YouTube API Token using API key
const getYoutubeToken = () => {
  return config.YOUTUBE_API_KEY; // Assuming you are using an API key for YouTube
};

// Route to search for the first matching video based on a query
youtubeRouter.get('/search', async (req, res) => {
  const { query } = req.query; // Get the search query from the request parameters
  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }
  console.log(query);

  try {
    const apiKey = getYoutubeToken();


    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`,
      {
        params: {
          part: 'snippet',
          q: query,
          type: 'video',
          key: apiKey,
          maxResults: 1, // Limit to 1 result
        },
      }
    );

    if (response.data.items.length === 0) {
      return res.status(404).json({ error: 'No videos found' });
    }

    const video = response.data.items[0];
    const videoDetails = {
      id: video.id.videoId,
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.default.url,
    };

    res.json(videoDetails);
  } catch (error) {
    console.error('Error fetching video data:', error.message);
    res.status(500).json({ error: 'Failed to fetch video data' });
  }
});

module.exports = youtubeRouter;
