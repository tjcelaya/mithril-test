'use strict';
import m from 'mithril';
import { l, layoutCol, row, cols } from './helpers';

let ProductListing = {
    controller: function (args) {
        l('pl.ctrl got args:', args);
    },
    view: (ctrl, args) => { 
        return m('.product-listing',
            // layoutCol(3, ...
            args.products().map(p => {
                return m('.product',
                    m('h1', p.title),
                    m('img.pull-left', { src: p.image }),
                    m('p', p.description),
                    m('button.btn.btn-success.add-to-cart', {
                        onclick: args.addToCart.bind(null, p)
                    }, 'Add to Cart'));
        }));
    }
};

export default ProductListing;