const http = require('http');

// create a server
const server = http.createServer((req, res) => {  
    console.log('Request Made')
    // sending html in the response and setting the header
    res.setHeader('Content-Type', 'text/html')
    res.write("<h1>HOME</h1>");
    res.end();
});


// listen to any requests
server.listen(3000, 'localhost', () =>{
    console.log('Listening')
})