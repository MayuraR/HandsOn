const express = require('express');
const app = express();
const userRoute = require('./routers/user');


app.set('view engine','ejs');

app.use((req, res, next) => {
    console.log('Inside middleware')
    console.log(req.method);
    next();
})

app.get('/', (req, res) =>{
    res.render('index', {text : "VISIT US"})
})

app.use('/users', userRoute);


app.use((req, res) =>{
    res.status(404).render('error')
})

app.listen(3000);