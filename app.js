const express = require('express');
const app = express();

// rendering an html file
app.get('/', (req, res) =>{
    res.sendFile('./views/index.html', {root: __dirname})
})


app.listen(3000);