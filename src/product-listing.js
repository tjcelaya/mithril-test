'use strict';
import m from 'mithril';
import * as h from './helpers';

let ProductListing = {
    controller: (args) => {
        h.l('pl.ctrl got args:', args);
    },
    view: (ctrl, args) => {
        return h.layoutRow(args.purchases.map(p => m('p', p)));
    }
}

export default ProductListing;