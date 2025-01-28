import axios from 'axios'
const baseUrl = 'http://localhost:3000/api/youtube'

const searchYoutube = async (query) => {
    const response = await axios.get(`${baseUrl}/search`, { params: { query } })
    return response.data
}

export default { searchYoutube }