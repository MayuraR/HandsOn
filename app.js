const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Book = require('./schema/book.js');

// install mongoose: npm i mongoose

app.set('view engine','ejs');

// connect to mongodb & listen for requests
const url = "mongodb+srv://test1234:test1234@cluster0.lgtwz.mongodb.net/books?retryWrites=true&w=majority";

mongoose.connect(url)
  .then(result => {
    console.log('connect to db')
    app.listen(3000)
})
  .catch(err => console.log(err));

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


// MongoDB operations
app.get('/getAllBooks', (req, res) => {
    Book.find()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  });


app.get('/getBook', (req, res) => {
    Book.findById('63b58b39371fe30479310dab')
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  });

  // add a book
  app.get('/addBook', (req, res) => {
    const myBook = new Book({
        title: 'book2',
        author: 'author2'
    })
    myBook.save()
    .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  });

  app.get('/addBook1', (req, res) => {
    const myBook = new Book({
        title: 'book2'
    })
    myBook.save()
    .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
        res.send(err)
      });
  });

app.use((req, res) =>{
    res.status(404).render('error')
})