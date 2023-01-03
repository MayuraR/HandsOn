const express = require('express');
const app = express();

// uncomment each line and use nodemon 
// command for nodemon: nodemon app.js
app.get('/', (req, res) =>{
    res.send("HOME!");
    //res.send('<h1>HOME!</h1>')
    // res.sendStatus(500)
    // res.status(500).send("Error")
    // res.status(500).json({'message': 'error'})

    // res.download('./app.js')
})


app.listen(3000);