const express = require('express');
const app = express();

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

app.get('/api/courses/:id',(req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("Not Found");
    res.send(course);
});

const PORT = process.env.PORT || 3000 ;
app.listen(3000, () => console.log(`Listening on port ${PORT}...`));