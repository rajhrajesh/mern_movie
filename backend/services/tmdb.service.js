const fetchFromTMDB = async (url) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`  // Ensure API Key is correct
        }
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            console.error(`Failed to fetch from TMDB, status: ${response.statusText}, status code: ${response.status}`);
            throw new Error(`Failed to fetch data from TMDB, status: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in fetchFromTMDB:', error.message);
        throw new Error('An error occurred while fetching data from TMDB.');
    }
};

module.exports = fetchFromTMDB;
