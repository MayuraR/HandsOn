// creating a server using express
const express = require('express');
const app = express();


app.listen(3000);


// this will not return any response from the server
// when we will send a request to local host, we will get an error