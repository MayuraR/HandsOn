const http = require('http');

// create a server
const server = http.createServer((req, res) => {  
    console.log('Request Made')
    // sending text in the response and setting the header
    res.setHeader('Content-Type', 'text/plain')
    res.write("HOME");
    res.end();
});


// listen to any requests
server.listen(3000, 'localhost', () =>{
    console.log('Listening')
})