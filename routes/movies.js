const { Movie, Validate } = require('../models/movie');
const { Genre } = require('../models/genre');
const express = require('express');
const router = express.Router();

router.get('/', async (req,res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
});

router.post('/',async (req,res) => {
    const { error } = Validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid genre.');

    const movie = new Movie({ 
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyrentalRate: req.body.dailyrentalRate        
    });
    
    await movie.save();
    res.send(movie);
});

router.put('/:id',async (req,res) => {
    const { error } = Validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const movie = await Movie.findByIdAndUpdate(req.params.id,{ name: req.body.name },{
        new:true
    });

    if(!movie) return res.status(404).send("Not Found");
    res.send(movie);
});

router.get('/:id',async (req,res) => {
    const movie = await Movie.find(req.params.id);
    if(!movie) return res.status(404).send("Not Found");
    res.send(movie);
});

router.delete('/:id',async (req,res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if(!movie) return res.status(404).send("Not Found");
    res.send(movie);
});

module.exports = router;