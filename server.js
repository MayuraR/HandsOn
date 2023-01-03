const http = require('http');
const fs = require('fs');
// rendering an html file in the response using fs

// create a server
const server = http.createServer((req, res) => {  
    console.log('Request Made')
    res.setHeader('Content-Type', 'text/html')
    fs.readFile('./views/index.html', (err, data) => {
        if(err){
            console.log("error");
            res.end();
        } else {
            res.write(data)
            res.end();
        }
    })
});


// listen to any requests
server.listen(3000, 'localhost', () =>{
    console.log('Listening')
})