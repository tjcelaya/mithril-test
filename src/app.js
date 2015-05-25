'use strict';
import m from 'mithril';
import { col, contain } from './helpers';
import Counter from './counter';
import Cart from './cart';
import ProductListing from './product-listing.js';

let Store = {
    model: {
        products: m.request({ url: 'http://localhost:3000/products', method: 'GET'}),
        cart: m.prop([]),
        addToCart: item => {
            // debugger;
            return Store.model.cart(Store.model.cart().concat(item));
        }
    },
    vm: {
        confirming: m.prop(false)
    },
    controller: function (args) {

    },
    view: (ctrl, args) => {
        let c = contain(
            col(8, m.component(ProductListing, {
                products: Store.model.products,
                addToCart: Store.model.addToCart
            })),
            col(4, m.component(Cart, { products: Store.model.cart }))
        );
        return c;
    }
};





m.mount(document.getElementById('app'), Store);
