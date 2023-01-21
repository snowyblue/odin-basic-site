#!/usr/bin/env node

const http = require('http');
const fs = require('fs/promises');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer( async (req, res) => {
    let data;
    try {
        if (req.url === '/' || req.url === "/home" || req.url === "/index.html") {
            data = await fs.readFile('./index.html', 'utf8');
            res.writeHeader(200, { "Content-Type": "text/html" });
        } else if (req.url === '/about' || req.url === "/about.html") {
            data = await fs.readFile('./about.html', 'utf8');
            res.writeHeader(200, { "Content-Type": "text/html" });
        } else if (req.url === '/contact-me' || req.url === "/contact-me.html") {
            data = await fs.readFile('./contact-me.html', 'utf8');
            res.writeHeader(200, { "Content-Type": "text/html" });
        } else {
            data = await fs.readFile('./404.html', 'utf8');
            res.writeHeader(404, { "Content-Type": "text/html" });
        }
    } catch(error) {
        console.log(error)
    } finally {
        console.log(res)
        res.write(data)
        res.end();
    }
});


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
  
