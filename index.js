#!/usr/bin/env node

const http = require('http');
const fs = require('fs/promises');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer( async (req, res) => {
    let data;
    try {
        if (req.url === '/' || req.url === "/home") {
            data = await fs.readFile('./index.html', 'utf8');
        } else if (req.url === '/about') {
            data = await fs.readFile('./about.html', 'utf8');
        } else if (req.url === '/contact-me') {
            data = await fs.readFile('./contact-me.html', 'utf8');
        } else {
            data = await fs.readFile('./404.html', 'utf8');
        }
    } catch(error) {
        console.log(error)
    } finally {
        res.writeHeader(200, { "Content-Type": "text/html" });
        res.write(data)
        res.end();
    }

});

async function displayIndex() {
    const fileName = './index.html';
    try {
      const newData = await fs.readFile(fileName, 'utf8');
      return newData

    //   await fs.writeFile( fileName, content, err => {} );
      console.log(newData);
    } catch (err) {
        console.log('error caught')
      console.log(err);
    }
  }



server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
  
