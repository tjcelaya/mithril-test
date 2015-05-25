#!/usr/bin/env node

// var jsonServer = require('json-server')
// var server = jsonServer.create() // Returns an Express server
// var router = jsonServer.router('db.json') // Returns an Express router

// server.use(jsonServer.defaults) // logger, static and cors middlewares
// server.use(router) // Mount router on '/'

// server.listen(3000)

'use strict';
let express = require('express');
let app = express();
let PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.listen(PORT);

console.log(`listening on ${PORT}`);