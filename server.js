const http = require('http');

// create a server
const server = http.createServer((req, res) => {  
    console.log('Request Made')
    console.log(req);   // log the reqest object
    console.log(req.url, req.method);   // log the path and the method of the request
});


// listen to any requests
server.listen(3000, 'localhost', () =>{
    console.log('Listening')
})