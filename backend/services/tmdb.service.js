const axios = require('axios');

const fetchFromTMDB = async (url) => {
    const options = {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`
        }
    }

    const response = await axios.get(url, options);

    if(response.status !== 200) {
        throw new Error(`Failed to fetch data from TMDB, status: ${response.statusText}`);
    }

    return response.data;
}    

module.exports = fetchFromTMDB;