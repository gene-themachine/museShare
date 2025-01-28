import axios from 'axios'
const baseUrl = 'http://localhost:3000/api'

//Search for albums 
const searchAlbums = async (search) => {
    const response = await axios.get(`${baseUrl}/albums`, { params: { query: search } })
    return response.data
}

//Search for artists
const searchArtists = async (search) => {
    const response = await axios.get(`${baseUrl}/artists`, { params: { query: search } })
    return response.data
}

//Search for tracks
const searchTracks = async (search) => {
    const response = await axios.get(`${baseUrl}/tracks`, { params: { query: search } })
    return response.data
}

//Search for an album by id
const searchAlbumById = async (id) => {
    const response = await axios.get(`${baseUrl}/albums/${id}`)
    return response.data
}

//Search for an artist by id
const searchArtistById = async (id) => {
    const response = await axios.get(`${baseUrl}/artists/${id}`)
    return response.data
}

//Search for a track by id
const searchTrackById = async (id) => {
    const response = await axios.get(`${baseUrl}/tracks/${id}`)
    return response.data
}


//Search for an artist's albums
const searchArtistAlbums = async (id) => {
    const response = await axios.get(`${baseUrl}/artists/albums/${id}`)
    return response.data
}

export default { searchAlbums, searchArtists, searchTracks, searchAlbumById, searchArtistById, searchTrackById, searchArtistAlbums }

