const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// Routes configuration
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
const connectDatabase = require('./config/dbConnection');

dotenv.config();
connectDatabase();

const port = process.env.PORT || 3000;

const app = express();
app.use(cookieParser());

app.use(express.json());


app.use('/api/users', userRoutes);
app.use('/api/movie', movieRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});