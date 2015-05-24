'use strict';
import m from 'mithril';
import h from 'helpers';

export default class ProductListing {
    constructor() {
        h.l('initialize ProductListing');
        h.l('pl got args:', arguments);
    }
    controller(args) {
        h.l('pl.ctrl got args:', args);
    }
    view(ctrl, args) {
        return args.productsInCart.map(p => m('p', p));
    }
}