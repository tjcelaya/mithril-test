'use strict';
import m from 'mithril';
import { col, contain } from './helpers';
import Counter from './counter';
import Cart from './cart';
import ProductListing from './product-listing.js';

let MyApp = {
    model: {
        products: () => m.request({ url: 'http://localhost:3000/products', method: 'GET' })
    },
    vm: {
        confirming: m.prop(false)
    },
    controller: () => {
        return {
            getProducts: MyApp.model.products()
        };
    },
    view: (ctrl) => {
        return contain(
            col(8, m.component(ProductListing, { purchases: ['array', 'of', 'things'] })),
            col(4, m.component(Cart, { purchases: ['array', 'of', 'things'] }))
        )
    }
};
m.mount(document.getElementById('app'), MyApp)
