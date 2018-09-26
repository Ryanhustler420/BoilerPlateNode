const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/vidly',{ useNewUrlParser: true })
.then(() => {console.log('Connected to MongoDB...')})
.catch(err => console.error('Could not connect :( to mongodb...'));


app.use(express.json());
app.use('/api/genres',genres);
app.use('/api/customers',customers);

const PORT = process.env.PORT || 3000 ;
app.listen(3000, () => console.log(`Listening on port ${PORT}...`));
