const express = require('express');
const app = express();

app.get('/',(req,res) => {
    res.send('Hello World');
});

app.get('/api/courses',(req,res) => {

});

const PORT = process.env.PORT || 3000 ;
app.listen(3000, () => console.log(`Listening on port ${PORT}...`));