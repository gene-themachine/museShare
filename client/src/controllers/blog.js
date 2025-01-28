import axios from 'axios'
const baseUrl = 'http://localhost:3000/api/blogs'

const postBlog = async (blog) => {
    const response = await axios.post(baseUrl, blog)
    return response.data
}

const getAllBlogs = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getRandomAlbums = async () => {
    const response = await axios.get(`${baseUrl}/random/album`)
    return response.data
}

const getRandomArtists = async () => {
    const response = await axios.get(`${baseUrl}/random/artist`)
    return response.data
}

const getRandomTracks = async () => {
    const response = await axios.get(`${baseUrl}/random/track`)
    return response.data
}

const getMyAlbums = async (id) => {
    const response = await axios.get(`${baseUrl}/mine/album/${id}`)
    return response
}

const getMyArtists = async (id) => {
    const response = await axios.get(`${baseUrl}/mine/artist/${id}`)
    return response
}

const getMyTracks = async (id) => {
    const response = await axios.get(`${baseUrl}/mine/track/${id}`) 
    return response 
}

const getBlogsByAlbum = async (id) => {
    const response = await axios.get(`${baseUrl}/album/${id}`)
    return response
}

const getBlogsByArtist = async (id) => {
    const response = await axios.get(`${baseUrl}/artist/${id}`)
    return response
}

const getBlogsByTrack = async (id) => {
    const response = await axios.get(`${baseUrl}/track/${id}`)
    return response
}

const getBlogById = async (id) => { 
    const response = await axios.get(`${baseUrl}/${id}`)
    return response
}


export default {postBlog, getAllBlogs, getRandomAlbums, getRandomArtists, getRandomTracks, getMyAlbums, getMyArtists, getMyTracks, getBlogsByAlbum, getBlogsByArtist, getBlogsByTrack, getBlogById }
