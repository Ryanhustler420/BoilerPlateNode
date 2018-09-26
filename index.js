const genres = require('./routes/genres');
const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/genres',genres);

const PORT = process.env.PORT || 3000 ;
app.listen(3000, () => console.log(`Listening on port ${PORT}...`));
