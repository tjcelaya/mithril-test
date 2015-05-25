'use strict';
import m from 'mithril';
import * as h from './helpers';

let ProductListing = {
    controller: function (args) {
        h.l('pl.ctrl got args:', args);
    },
    view: (ctrl, args) => { 
        return m('.product-listing',
            // layoutCol(3, ...
            args.products().map(p => {
                return m('.product',
                    m('h1', p.title),
                    m('img.pull-left', { src: p.image || h.MISSING_IMAGE, width: "50px", height: "50px" }),
                    m('p', p.description),
                    m('button.btn.btn-success.add-to-cart', {
                        onclick: args.addToCart.bind(null, p)
                    }, 'Add to Cart'));
        }));
    }
};

export default ProductListing;