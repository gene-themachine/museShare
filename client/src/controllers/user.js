import axios from 'axios'
const baseUrl = '/api/users'

const createUser = async (email, name, username, id) => {
    const response = await axios.post(baseUrl, {
        email: email,
        name: name,
        username: username,
        uid: id
    })
    return response.data
}

const viewOthersProfile = async (id) => {
    const response = await axios.get(`${baseUrl}/profile/others/${id}`)
    return response.data
}

const getAllUsers = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const searchUsers = async (query) => {
    const response = await axios.get(`${baseUrl}/profile`, { params: { query } })
    return response.data
}


export default { createUser, viewOthersProfile, getAllUsers, searchUsers}
