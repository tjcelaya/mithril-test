#!/usr/bin/env node
'use strict';

// var jsonServer = require('json-server')
// var server = jsonServer.create() // Returns an Express server
// var router = jsonServer.router('db.json') // Returns an Express router

// server.use(jsonServer.defaults) // logger, static and cors middlewares
// server.use(router) // Mount router on '/'

// server.listen(3000)

let PORT          = process.env.PORT || 3000;
let someData      = require('./db.json');
let express       = require('express');
let bodyParser    = require('body-parser');
let expressDomain = require('express-domain');
let passport      = require('passport');
let morgan        = require('morgan');
let mithrilRender = require('mithril-node-render');
let app           = express();
let router        = express.Router();

app.use(expressDomain());
app.use(morgan('dev'));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

router.get('/products', function (req, res) {
    res.send(JSON.stringify(someData.products));
});

app.use('/api', router);

app.listen(PORT);
console.log(`listening on ${PORT}`);
module.exports = app;
