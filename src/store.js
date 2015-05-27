'use strict';
let m                = require('mithril');
let h                = require('./helpers');
let load             = require('./load');
let Counter          = require('./counter');
let Cart             = require('./cart');
let ProductListing   = require('./product-listing.js');

let Store = {
    model: {
        products: load('products'),
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
        return this;
    },
    view: (ctrl, args) => {
        let c = h.contain(
            h.col(8, m.component(ProductListing, {
                products: Store.model.products,
                addToCart: Store.model.addToCart
            })),
            h.col(4, m.component(Cart, { products: Store.model.cart }))
        );
        return c;
    }
}

export default Store;