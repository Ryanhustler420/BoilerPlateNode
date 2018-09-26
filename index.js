const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const rentals = require('./routes/rentals');
const movies = require('./routes/movies');
const users = require('./routes/users');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/vidly',{ useNewUrlParser: true })
.then(() => {console.log('Connected to MongoDB...')})
.catch(err => console.error('Could not connect :( to mongodb...'));


app.use(express.json());
app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/api/movies',movies);
app.use('/api/rentals',rentals);
app.use('/api/users',users);

const PORT = process.env.PORT || 3000 ;
app.listen(3000, () => console.log(`Listening on port ${PORT}...`));
