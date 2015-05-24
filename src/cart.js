'use strict';
import m from 'mithril';
import * as h from './helpers';

let Cart = {
    controller: function (args) {
        h.l('cart ctrl:', args)
    },
    view: (ctrl, args) => {
        return m('p', 'I am a cart');
        // return args.productsInCart.map(p => m('p', p));
    }
}

export default Cart;