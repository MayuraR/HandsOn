const express = require('express');
const app = express();

// set view engine used
// we will be using ejs so step 1: install ejs
// Step 2: set view engine 

app.set('view engine','ejs');
// Step 3: rename .html to .ejs

// app.set('views', 'data')

app.get('/', (req, res) =>{
    // res.sendFile('./views/index.html', {root: __dirname})
    // res.render('index')
    // step 2:
    res.render('index', {text : "VISIT US"})
})

app.get('/about', (req, res) =>{
    // res.sendFile('./views/contactUs.html', {root: __dirname});
    res.render('contactUs', {text123 : "VISIT US"})
})

app.get('/contact', (req, res) =>{
    res.redirect('/about')
})

// where you place app.use is very important
app.use((req, res) =>{
    // res.status(404).sendFile('./views/error.html', {root: __dirname});
    res.status(404).render('error')
})

app.listen(3000);