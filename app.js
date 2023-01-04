const express = require('express');
const app = express();

app.set('view engine','ejs');

app.use((req, res, next) => {
    console.log('Inside middleware')
    console.log(req.method);
    next();
})

app.get('/', (req, res) =>{
    res.render('index', {text : "VISIT US"})
})

app.get('/about', (req, res) =>{
    res.render('contactUs', {text123 : "VISIT US"})
})

app.get('/contact', (req, res) =>{
    res.redirect('/about')
})

app.use((req, res) =>{
    res.status(404).render('error')
})

app.listen(3000);