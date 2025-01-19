const asyncHandler = require('express-async-handler');

const getTrendyTv = asyncHandler(async (req, res) => {

    const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");

    const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];


    res.status(200).json({
        content: randomMovie
    });

    if(!randomMovie){
        res.status(404).json({ message: 'No trending tv found.' });
    }

})

const getTvDetails = asyncHandler(async (req, res) => {

    const {id} = req.params;

    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US'`)

    res.status(200).json(data);

    if(!data){
        res.status(404).json({ message: 'No details found for this movie.' });
    }
})

const getTvTrailers = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`)
    res.status(200).json(data.results);

    if(!data.results.length){
        res.status(404).json({ message: 'No trailers found for this movie.' });
    }

})

const getSimilarTv = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`)

    res.status(200).json(data.results);

    if(!data.results.length){
        res.status(404).json({ message: 'No similar movies found for this movie.' });
    }
})

const getTvsByCategory = asyncHandler(async (req, res) => {
    const {category} = req.params;

    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`)

    res.status(200).json(data.results);

    if(!data.results.length){
        res.status(404).json({ message: 'No movies found in this category.' });
    }
})


module.exports = {getTrendyTv, getTvDetails, getTvTrailers, getTvsByCategory, getSimilarTv};
















router.route('/trending').get(getTrendyTv)
router.route('/:id/trailers').get(getTvTrailer)
router.route('/:id/details').get(getTvDetails)
router.route('/:id/similar').get(getSimilarTv)
router.route('/:category').get(getTvsByCategory);