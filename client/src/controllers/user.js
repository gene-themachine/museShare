import axios from 'axios'

const baseUrl = '/api/users'

// Create User
const createUser = async (email, name, username, id) => {
    const response = await axios.post(baseUrl, {
        email,
        name,
        username,
        uid: id
    })
    return response.data
}

// View Others Profile
const viewOthersProfile = async (id) => {
    const response = await axios.get(`${baseUrl}/profile/others/${id}`)
    return response.data
}

// Get All Users
const getAllUsers = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

// Search Users
const searchUsers = async (query) => {
    const response = await axios.get(`${baseUrl}/profile`, { params: { query } })
    return response.data
}

export default { createUser, viewOthersProfile, getAllUsers, searchUsers }
