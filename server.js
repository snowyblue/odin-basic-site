
import dotenv from 'dotenv'
dotenv.config()

import http from 'http';
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const PORT = process.env.PORT;

const app = http.createServer((req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url)
    let extName = path.extname(filePath);

    let contentType = 'text/html';

    switch(extName){
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    fs.readFile(filePath, (err, data) => {
        if(err){
            if(err.code === 'ENOENT'){
                fs.readFile(path.join(__dirname,'public', '404.html'), (err, data) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data, 'utf8');
                })
            }
            else{
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        }
        else{
            res.writeHead(200, {'Content-Type': `${contentType}`});
            res.end(data);
        }
    })
})

app.listen(PORT, () => console.log(`Server started on ${PORT}`))