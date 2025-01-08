const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// Routes configuration
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
const tvRoutes = require('./routes/movieRoutes');

// Connect to MongoDB database
const connectDatabase = require('./config/dbConnection');

// Middleware to authenticate token before accessing protected routes
const authenticateToken = require('./middleware/authenticateToken ');

dotenv.config();
connectDatabase();

const port = process.env.PORT || 3000;

const app = express();
app.use(cookieParser());

app.use(express.json());


app.use('/api/users', userRoutes);
app.use('/api/movies', authenticateToken, movieRoutes);
app.use('/api/tv', authenticateToken, tvRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});