#!/usr/bin/env node

const dotenv = require('dotenv');
const express = require('express');
const path = require('path');

dotenv.config()

const app = express();
const hostname = '127.0.0.1';
const port = process.env.PORT;

app.use(express.static("public"), (req, res) => {
    res.status(404).sendFile(path.join(__dirname,'public','404.html'));
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
  
