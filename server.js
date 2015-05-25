'use strict';
let express = require('express');
let app = express();

app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 3000);