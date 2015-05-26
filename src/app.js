'use strict';
let m = require('mithril');
let Store = require('./store.js');

m.mount(document.getElementById('app'), Store);
