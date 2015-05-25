'use strict';
import m from 'mithril';
import * as h from './helpers';

let Cart = {
    controller: function (args) {
        h.l('cart ctrl:', args);
    },
    view: function (ctrl, args) {
        let contents = args.products();

        if (contents.length === 0)
            return m('p', 'I am a cart, but I\'m empty!');

        return m('ul.list-group', contents.map(c =>
            m('li.list-group-item', c.title)));
        // return args.productsInCart.map(p => m('p', p));
    }
};

export default Cart;