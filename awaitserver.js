const http = require('http');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs/promises');

dotenv.config();

const PORT = process.env.PORT;

const app = http.createServer( async (req, res) => {
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    let extName = path.extname(filePath);
    let contentType = { 'Content-Type': 'text/html' };
    let data;

    switch(extName){
        case '.js':
            contentType = { 'Content-Type': 'text/javascript' };
            break;
        case '.css':
            contentType = { 'Content-Type': 'text/css' };
            break;
        case '.json':
            contentType = { 'Content-Type': 'application/json' };
            break;
        case '.png':
            contentType = { 'Content-Type': 'image/png'};
            break;
        case '.jpg':
            contentType = { 'Content-Type': 'image/jpg'};
            break;
    }

    try{
        data = await fs.readFile(filePath);
        res.writeHead(200, { 'Content-Type': `${contentType}`});
        res.end(data, 'utf8');
    }
    catch(err){
        if(err.code === 'ENOENT'){
            data = await fs.readFile(path.join(__dirname,'public','404.html'));
            res.writeHead(404, { 'Content-Type': 'text/html'});
            res.end(data,'utf8');
        }
        else{
            res.writeHead(500);
            res.end(`Server error: ${err.code}`);
        }
    }
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))