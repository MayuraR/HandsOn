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
app.use(express.urlencoded({ extended: true }));

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


  app.get('/create', (req, res) => {
    res.render('create');
  });

  app.post('/book', (req, res) => {
    console.log(req.body);
    const newBook = new Book(req.body);
  
    newBook.save()
      .then(result => {
        res.send(result)
      })
      .catch(err => {
        console.log(err);
      });
  });

  app.get('/getRecent', (req, res) => {
    // find the recently created book
    Book.find().sort({ createdAt: -1 })
    .then(result => {
      res.send(result.slice(-1));
    })
    .catch(err => {
      console.log(err);
    });
  });

  app.get('/books/:id', (req, res) => {
    const id = req.params.id;
    Book.findById(id)
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  });

  // Done using postman's desktop agent
  app.delete('/books/:id', (req, res) => {
    console.log('!!!!')
    const id = req.params.id;
    
    Book.findByIdAndDelete(id)
      .then(result => {
        res.send("Deleted");
      })
      .catch(err => {
        console.log(err);
      });
  });

app.use((req, res) =>{
    res.status(404).render('error')
})