const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {     
    console.log('Request Made')
    res.setHeader('Content-Type', 'text/html')
    // Routing
    // setting status codes
    let path = './views/'       // storing the path of the folder which contains html files
    switch(req.url){            // switichng the url's path (retrieved from the request object) and concatenating the html file's name accordingly
        case '/':            
            res.statusCode = 200;
            path += 'index.html'; 
            break;
        case '/about':
            res.statusCode = 200;
            path += 'contactUs.html';
            break;
        // redirects
        case '/contactUs':
            res.statusCode = 301;       // setting statusCode for redirect
            res.setHeader('Location', '/about')
            res.end();
            break;
        default:
            res.statusCode = 404;
            path += 'error.html'
            break;
    }

    fs.readFile(path, (err, data) => {
        if(err){
            console.log(err);
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    })


});



server.listen(3000, 'localhost', () =>{
    console.log('Listening')
})