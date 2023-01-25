#!/usr/bin/env node

//using commonJs module loader
import http from 'http';
import fs from "fs/promises";
import dotenv from 'dotenv';
import express from 'express';

dotenv.config()

const app = express();
const hostname = '127.0.0.1';
const port = process.env.PORT;

app.use(express.static("public"));

app.get('/', async (req, res) => {
    res.send( await fs.readFile('./public/index.html', 'utf8') );
});

app.get('/about', async (req, res) => {
    res.send( await fs.readFile('./public/about.html', 'utf8') );
});

app.get('/contact-me', async (req, res) => {
    res.send( await fs.readFile('./public/contact-me.html', 'utf8') );
});

app.use( async (req, res) => {
    res.status(404).send( await fs.readFile('./public/404.html', 'utf8'));
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
  
