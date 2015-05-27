'use strict';
let m = require('mithril');

let load = (resource, id = null) => m.prop(require('../../db.json')[resource]);

export default load;