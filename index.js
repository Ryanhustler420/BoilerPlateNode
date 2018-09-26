const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: 'BBA'},
    {id: 2, name: 'MBA'},
    {id: 3, name: 'BCA'}
];


app.get('/',(req,res) => {
    res.send('Hello World');
});

app.get('/api/courses',(req,res) => {
    res.send(courses);
});

app.post('/api/courses',(req,res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body,schema);
   
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.get('/api/courses/:id',(req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("Not Found");
    res.send(course);
});

const PORT = process.env.PORT || 3000 ;
app.listen(3000, () => console.log(`Listening on port ${PORT}...`));