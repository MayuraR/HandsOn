const express = require('express');
const app = express();

// routing
app.get('/', (req, res) =>{
    res.sendFile('./views/index.html', {root: __dirname})
})

app.get('/about', (req, res) =>{
    res.sendFile('./views/contactUs.html', {root: __dirname});
})

// where you place app.use is very important
app.use((req, res) =>{
    res.status(404).sendFile('./views/error.html', {root: __dirname});
})

app.listen(3000);