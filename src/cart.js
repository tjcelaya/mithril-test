'use strict';
import m from 'mithril';

export default class Cart {
    controller() {

    }
    view(ctrl, args) {
        return args.productsInCart.map(p => m('p', p));
    }
}