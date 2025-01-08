const asyncHandler = require('express-async-handler');
const fetchFromTMDB = require('../services/tmdb.service');

const getTrendyMovie = asyncHandler(async(req, res) => {

    const data = await fetchFromTMDB('https://api.themoviedb.org/3/trending/movie/day?language=en-US')

    const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];

    res.status(200).json({
        randomMovie
    });

    if(!randomMovie){
        res.status(404).json({ message: 'No trending movie found.' });
    }
});

const getMovieTrailer = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`)
    res.status(200).json(data.results);

    if(!data.results.length){
        res.status(404).json({ message: 'No trailers found for this movie.' });
    }

});

const getMovieDetails = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US'`)

    res.status(200).json(data);

    if(!data){
        res.status(404).json({ message: 'No details found for this movie.' });
    }
});

const getSimilarMovies = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`)

    res.status(200).json(data.results);

    if(!data.results.length){
        res.status(404).json({ message: 'No similar movies found for this movie.' });
    }
});

const getMoviesByCategory = asyncHandler(async (req, res) => {
    const {category} = req.params;

    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`)

    res.status(200).json(data.results);

    if(!data.results.length){
        res.status(404).json({ message: 'No movies found in this category.' });
    }
    
})

module.exports = {getTrendyMovie, getMovieTrailer, getMovieDetails, getSimilarMovies, getMoviesByCategory}