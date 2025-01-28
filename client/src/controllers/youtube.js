import axios from 'axios'
const baseUrl = '/api/youtube'

const searchYoutube = async (query) => {
    const response = await axios.get(`${baseUrl}/search`, { params: { query } })
    return response.data
}

export default { searchYoutube }