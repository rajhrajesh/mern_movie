const asyncHandler = require('express-async-handler');
const fetchFromTMDB = require('../services/tmdb.service');
const User = require('../models/userModel');
// searchPerson, searchMovie, searchTv

const searchPerson = asyncHandler(async (req, res, type) => {
    const { query } = req.params;

    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);

    if (!data || !data.results.length) {
        res.status(404).json({ message: `No ${type} found with the query "${query}".` });
        return;
    }

    await User.findByIdAndUpdate(req.user.id, {
        $push: {
            searchHistory: {
                id: data.results[0].id,
                image: data.results[0].profile_path || data.results[0].poster_path, 
                title: data.results[0].name || data.results[0].title, 
                searchType: "person", 
                createdAt: new Date(),
            }
        }
    });
    

    res.status(200).json(data.results);
});

const searchMovie = asyncHandler(async (req, res) => {
    const {query} = req.params;

    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);
 
    if (!data ||!data.results.length) {
        res.status(404).json({ message: 'No movies found with this name.' });
        return;
    }

    await User.findByIdAndUpdate(req.user.id, {
        $push: {
            searchHistory: {
                id: data.results[0].id,
                image: data.results[0].profile_path || data.results[0].poster_path, 
                title: data.results[0].name || data.results[0].title, 
                searchType: "movie", 
                createdAt: new Date(),
            }
        }
    });
    
    res.status(200).json(data.results);
})

const searchTv = asyncHandler(async (req, res) => {
    const { query } = req.params;

    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);

    if (!data || !data.results.length) {
        res.status(404).json({ message: 'No TV shows found with this name.' });
        return;
        
    }

    await User.findByIdAndUpdate(req.user.id, {
        $push: {
            searchHistory: {
                id: data.results[0].id,
                image: data.results[0].profile_path || data.results[0].poster_path,
                title: data.results[0].name || data.results[0].title, 
                searchType: "tv", 
                createdAt: new Date(),
            }
        }
    });

    res.status(200).json(data.results);
});


const searchHistory = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.searchHistory);
});

const removeHistory = asyncHandler(async (req, res) => {
    let { id } = req.params;

    id = parseInt(id);

    const user = await User.findByIdAndUpdate(
        req.user.id,
        { $pull: { searchHistory: { id: id } } },
        { new: true } // Ensure the updated document is returned
    );

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({message: "History Item Removed", searchHistory: user.searchHistory});
});

module.exports = {searchPerson, searchMovie, searchTv,searchHistory, removeHistory};