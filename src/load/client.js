'use strict';
let m = require('mithril');

let load = (resource, id = '') =>
    m.request({ url: `/api/products/${ id }`, method: 'GET'});

export default load;